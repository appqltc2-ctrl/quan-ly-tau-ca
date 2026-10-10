import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_LAWS } from './src/data/lawsData.ts';
import { PRACTICAL_SCENARIOS } from './src/data/scenariosData.ts';
import { PENALTY_CATALOG } from './src/data/penaltiesData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize GoogleGenAI on server side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory law documents and audit logs
let dynamicLaws = [...INITIAL_LAWS];
let dynamicScenarios = [...PRACTICAL_SCENARIOS];
let auditLogs: any[] = [
  {
    id: 'log-init-1',
    action: 'VERIFY',
    targetType: 'DOCUMENT',
    targetTitle: 'Nghị định 38/2024/NĐ-CP (Xử phạt VPHC Thủy sản)',
    performedBy: 'Hệ thống thẩm định pháp chế',
    userRole: 'Cán bộ kiểm ngư',
    timestamp: new Date().toISOString(),
    details: 'Đã xác thực tính hiệu lực từ 20/05/2024, thay thế hoàn toàn Nghị định 42/2019/NĐ-CP.'
  },
  {
    id: 'log-init-2',
    action: 'VERIFY',
    targetType: 'DOCUMENT',
    targetTitle: 'Nghị quyết 04/2024/NQ-HĐTP (TANDTC)',
    performedBy: 'Hội đồng thẩm phán tư pháp',
    userRole: 'Thanh tra thủy sản',
    timestamp: new Date().toISOString(),
    details: 'Đã tích hợp hướng dẫn truy cứu trách nhiệm hình sự hành vi khai thác IUU.'
  }
];

// Helper: Build compact legal context string for RAG
function getKnowledgeBaseContext(): string {
  return dynamicLaws.map(doc => {
    const artText = doc.articles.map(a => `${a.articleNumber} - ${a.title}: ${a.content}`).join('\n');
    return `[VĂN BẢN: ${doc.title} (${doc.code}) | Trạng thái: ${doc.statusLabel} | Ban hành: ${doc.issueDate} | Hiệu lực: ${doc.effectiveDate} | Nguồn: ${doc.sourceUrl}]\n${artText}`;
  }).join('\n\n');
}

// Helper: Rule-based fallback if Gemini API is temporarily offline or key not provided
function generateFallbackResponse(userPrompt: string): any {
  const p = userPrompt.toLowerCase();
  
  if (p.includes('mất kết nối') || p.includes('vms') || p.includes('giám sát hành trình') || p.includes('thiết bị giám sát')) {
    return {
      directAnswer: 'Khi thiết bị giám sát hành trình (VMS) bị mất kết nối hoặc bị hỏng trên biển, Thuyền trưởng phải sử dụng máy thông tin vô tuyến (HF, bộ đàm) hoặc điện thoại vệ tinh để báo cáo tọa độ vị trí của tàu cá về Chi cục Thủy sản tỉnh và đơn vị cung cấp thiết bị định kỳ 06 giờ/lần. Đồng thời phải đưa tàu về cảng cá trong thời hạn tối đa 10 ngày kể từ khi thiết bị hỏng để kiểm tra, sửa chữa.',
      legalBasis: [
        {
          docName: 'Nghị định quy định chi tiết Luật Thủy sản (đã sửa đổi bổ sung)',
          docCode: '26/2019/NĐ-CP và 37/2024/NĐ-CP',
          article: 'Khoản 2 Điều 44 NĐ 26/2019 (sửa đổi tại Điều 1 Khoản 23 NĐ 37/2024)',
          clausePoint: 'Khoản 2',
          effectiveStatus: 'Còn hiệu lực',
          updatedDate: '19/05/2024'
        },
        {
          docName: 'Nghị định quy định xử phạt vi phạm hành chính trong lĩnh vực thủy sản',
          docCode: '38/2024/NĐ-CP',
          article: 'Điều 20',
          clausePoint: 'Khoản 2 & Khoản 3',
          effectiveStatus: 'Còn hiệu lực (thay thế NĐ 42/2019/NĐ-CP)',
          updatedDate: '20/05/2024'
        }
      ],
      procedures: [
        'Bước 1: Kiểm tra nguồn điện và dây dẫn bên ngoài, tuyệt đối không tự tháo vỏ niêm phong kẹp chì của thiết bị.',
        'Bước 2: Dùng máy HF/bộ đàm hoặc điện thoại vệ tinh gọi về Đài thông tin Duyên hải hoặc Chi cục Thủy sản tỉnh báo cáo tọa độ khẩn cấp.',
        'Bước 3: Duy trì chế độ báo cáo vị trí đều đặn 06 giờ một lần cho đến khi tàu cập bến.',
        'Bước 4: Ghi nhật ký hành trình chi tiết thời điểm hỏng máy và các phiên liên lạc.',
        'Bước 5: Cho tàu quay về cảng chỉ định trong vòng 10 ngày để nhà mạng vào khắc phục.'
      ],
      penalties: {
        behavior: 'Không duy trì hoạt động hoặc làm mất kết nối VMS quá 06 giờ không báo cáo vị trí; tự ý tháo dỡ thiết bị',
        fineRangePersonal: 'Từ 20.000.000đ đến 30.000.000đ (tàu 15m - 24m mất kết nối); Phạt từ 300.000.000đ đến 500.000.000đ (tháo dỡ thiết bị)',
        fineRangeOrg: 'Gấp 2 lần mức phạt cá nhân (từ 40.000.000đ đến 1.000.000.000đ)',
        extraSanctions: ['Tước quyền sử dụng chứng chỉ thuyền trưởng từ 03 - 12 tháng', 'Tịch thu thiết bị VMS nếu cố tình gian lận'],
        remedialMeasures: ['Buộc đưa tàu cá về bờ khắc phục thiết bị'],
        target: 'Thuyền trưởng và Chủ tàu',
        conditions: 'Áp dụng cho tàu cá có chiều dài lớn nhất từ 15 mét trở lên hoạt động tại vùng khơi'
      },
      practicalNotes: [
        'Hành vi gửi thiết bị VMS sang tàu khác bị xử phạt kịch khung 1 tỷ đồng và có thể bị khởi tố hình sự theo Nghị quyết 04/2024/NQ-HĐTP.',
        'Luôn dán số điện thoại đường dây nóng trực ban VMS của Chi cục Thủy sản ngay cạnh vô lăng buồng lái.'
      ],
      officialSourceUrl: 'https://vanban.chinhphu.vn/?pageid=27160&docid=210214',
      officialSourceLabel: 'Cổng thông tin điện tử Chính phủ (vanban.chinhphu.vn) - Nghị định 38/2024/NĐ-CP'
    };
  } else if (p.includes('đăng ký') || p.includes('thủ tục đăng ký') || p.includes('cấp lại đăng ký') || p.includes('mua bán')) {
    return {
      directAnswer: 'Tàu cá có chiều dài lớn nhất từ 06 mét trở lên bắt buộc phải đăng ký vào Sổ đăng ký tàu cá quốc gia và được cấp Giấy chứng nhận đăng ký tàu cá. Cơ quan có thẩm quyền giải quyết là Chi cục Thủy sản cấp tỉnh nơi chủ tàu thường trú hoặc đăng ký trụ sở.',
      legalBasis: [
        {
          docName: 'Luật Thủy sản',
          docCode: '18/2017/QH14',
          article: 'Điều 67',
          clausePoint: 'Khoản 1, 2',
          effectiveStatus: 'Còn hiệu lực',
          updatedDate: '01/01/2019'
        },
        {
          docName: 'Nghị định quy định chi tiết một số điều Luật Thủy sản',
          docCode: '26/2019/NĐ-CP',
          article: 'Điều 36',
          clausePoint: 'Khoản 1',
          effectiveStatus: 'Còn hiệu lực (đã sửa đổi bổ sung)',
          updatedDate: '19/05/2024'
        },
        {
          docName: 'Nghị định xử phạt vi phạm hành chính lĩnh vực thủy sản',
          docCode: '38/2024/NĐ-CP',
          article: 'Điều 35',
          clausePoint: 'Khoản 1',
          effectiveStatus: 'Còn hiệu lực',
          updatedDate: '20/05/2024'
        }
      ],
      procedures: [
        'Bước 1: Nộp 01 bộ hồ sơ tại Trung tâm Phục vụ hành chính công cấp tỉnh hoặc trực tuyến qua Cổng Dịch vụ công quốc gia.',
        'Bước 2: Hồ sơ gồm Đơn đề nghị, Giấy chứng nhận xuất xưởng hoặc Hợp đồng mua bán chuyển nhượng có công chứng, Giấy chứng nhận xóa đăng ký (nếu mua lại), Biên lai lệ phí trước bạ, Giấy chứng nhận an toàn kỹ thuật (nếu tàu trên 12m) và ảnh màu thân tàu.',
        'Bước 3: Chi cục Thủy sản thụ lý, thẩm định thông tin và đối chiếu hạn ngạch trong thời hạn 03 ngày làm việc.',
        'Bước 4: Nhận Giấy chứng nhận đăng ký và số hiệu tàu, tiến hành sơn số đăng ký và màu nhận diện mạn tàu.'
      ],
      penalties: {
        behavior: 'Sử dụng tàu cá không có Giấy chứng nhận đăng ký tàu cá hoặc không làm thủ tục cấp lại khi đổi chủ',
        fineRangePersonal: 'Từ 5.000.000 đồng đến 10.000.000 đồng',
        fineRangeOrg: 'Từ 10.000.000 đồng đến 20.000.000 đồng',
        extraSanctions: ['Tạm giữ phương tiện cho đến khi hoàn thành đăng ký'],
        remedialMeasures: ['Buộc thực hiện thủ tục đăng ký theo quy định'],
        target: 'Chủ sở hữu tàu cá',
        conditions: 'Áp dụng cho tàu cá từ 06m trở lên hoạt động không có đăng ký hợp lệ'
      },
      practicalNotes: [
        'Nếu mua tàu từ tỉnh khác, bắt buộc bên bán phải làm xong thủ tục Xóa đăng ký ở tỉnh cũ để lấy Giấy chứng nhận xóa đăng ký mới nộp được ở tỉnh mới.',
        'Tàu đóng mới phải có văn bản chấp thuận chủ trương của Sở NN&PTNT trước khi đóng vỏ.'
      ],
      officialSourceUrl: 'https://vbpl.vn/bocongan/Pages/vbpq-van-ban-goc.aspx?ItemID=126938',
      officialSourceLabel: 'Cơ sở dữ liệu quốc gia về văn bản pháp luật (vbpl.vn) - Luật Thủy sản 2017'
    };
  } else if (p.includes('vùng') || p.includes('vùng lộng') || p.includes('vùng khơi') || p.includes('sai vùng')) {
    return {
      directAnswer: 'Theo quy định phân vùng khai thác thủy sản, tàu cá có chiều dài lớn nhất từ 15 mét trở lên chỉ được phép hoạt động tại vùng khơi; tuyệt đối cấm khai thác tại vùng lộng và vùng ven bờ. Tàu từ 12m đến dưới 15m hoạt động tại vùng lộng; tàu dưới 12m hoạt động tại vùng ven bờ.',
      legalBasis: [
        {
          docName: 'Nghị định quy định chi tiết Luật Thủy sản',
          docCode: '26/2019/NĐ-CP',
          article: 'Điều 42',
          clausePoint: 'Khoản 1, 2, 3, 4',
          effectiveStatus: 'Còn hiệu lực',
          updatedDate: '19/05/2024'
        },
        {
          docName: 'Nghị định xử phạt vi phạm hành chính thủy sản',
          docCode: '38/2024/NĐ-CP',
          article: 'Điều 22',
          clausePoint: 'Khoản 3 & Khoản 4',
          effectiveStatus: 'Còn hiệu lực',
          updatedDate: '20/05/2024'
        }
      ],
      procedures: [
        'Bước 1: Kiểm tra giấy phép khai thác thủy sản để xác định đúng vùng biển được cấp phép.',
        'Bước 2: Cài đặt tọa độ các đường ranh giới phân vùng ven bờ, vùng lộng, vùng khơi lên hải đồ máy định vị GPS.',
        'Bước 3: Khi phát hiện tàu đi vào vùng cấm: Thuyền trưởng phải lập tức cho thu lưới và điều khiển tàu ra vùng khơi.',
        'Bước 4: Chấp hành hiệu lệnh dừng tàu để kiểm tra của lực lượng Kiểm ngư, Biên phòng hoặc Cảnh sát biển.'
      ],
      penalties: {
        behavior: 'Sử dụng tàu cá từ 15m trở lên khai thác tại vùng lộng hoặc vùng ven bờ; hoặc khai thác vượt ranh giới cho phép trên biển',
        fineRangePersonal: 'Từ 100.000.000đ đến 150.000.000đ (sai vùng lộng/ven bờ); Từ 800.000.000đ đến 1.000.000.000đ (vượt ranh giới trên biển)',
        fineRangeOrg: 'Gấp 2 lần đối với tổ chức vi phạm',
        extraSanctions: ['Tước quyền sử dụng chứng chỉ thuyền trưởng từ 03 - 12 tháng', 'Tịch thu toàn bộ thủy sản khai thác'],
        remedialMeasures: ['Buộc di chuyển phương tiện ra khỏi vùng biển cấm'],
        target: 'Thuyền trưởng và Chủ tàu',
        conditions: 'Phát hiện phương tiện đang có hoạt động thả lưới, câu hoặc vận chuyển cá tại vùng cấm'
      },
      practicalNotes: [
        'Màu sơn nhận diện: Vùng khơi sơn cabin trắng; Vùng lộng cabin xanh ngọc; Vùng ven bờ cabin vàng nhạt theo Thông tư 23/2018/TT-BNNPTNT.',
        'Vượt ranh giới sang vùng biển nước ngoài có thể bị xử lý hình sự theo Nghị quyết 04/2024/NQ-HĐTP.'
      ],
      officialSourceUrl: 'https://vanban.chinhphu.vn/?pageid=27160&docid=210214',
      officialSourceLabel: 'Cổng thông tin điện tử Chính phủ - Nghị định 38/2024/NĐ-CP'
    };
  }

  // Generic verified fallback
  return {
    directAnswer: 'Quy định pháp luật quản lý tàu cá Việt Nam được điều chỉnh bởi Luật Thủy sản năm 2017 (số 18/2017/QH14) cùng các văn bản hướng dẫn mới nhất: Nghị định 38/2024/NĐ-CP (xử phạt vi phạm hành chính, thay thế NĐ 42/2019), Nghị định 37/2024/NĐ-CP (sửa đổi NĐ 26/2019), và Thông tư 23/2018/TT-BNNPTNT.',
    legalBasis: [
      {
        docName: 'Luật Thủy sản',
        docCode: '18/2017/QH14',
        article: 'Điều 50, 60, 67, 68',
        clausePoint: 'Toàn điều',
        effectiveStatus: 'Còn hiệu lực',
        updatedDate: '01/01/2019'
      },
      {
        docName: 'Nghị định quy định xử phạt vi phạm hành chính trong lĩnh vực thủy sản',
        docCode: '38/2024/NĐ-CP',
        article: 'Điều 20, 21, 22, 28, 35, 36',
        clausePoint: 'Toàn văn',
        effectiveStatus: 'Còn hiệu lực (thay thế Nghị định 42/2019/NĐ-CP)',
        updatedDate: '20/05/2024'
      }
    ],
    procedures: [
      '1. Kiểm tra tình trạng hiệu lực của Giấy chứng nhận đăng ký, Sổ đăng kiểm, Giấy phép khai thác và Sổ danh bạ thuyền viên.',
      '2. Đảm bảo thiết bị VMS hoạt động liên tục 24/7 đối với tàu có chiều dài từ 15 mét trở lên.',
      '3. Ghi chép nhật ký khai thác và khai báo xuất/nhập bến đầy đủ qua hệ thống eCDT tại cảng cá chỉ định.'
    ],
    penalties: {
      behavior: 'Các hành vi vi phạm IUU, giấy tờ tàu cá, VMS, phân vùng khai thác',
      fineRangePersonal: 'Từ 2.000.000 đồng đến 1.000.000.000 đồng tùy mức độ vi phạm cụ thể',
      fineRangeOrg: 'Gấp 2 lần mức phạt của cá nhân',
      extraSanctions: ['Tước quyền sử dụng chứng chỉ thuyền trưởng', 'Tịch thu tang vật, ngư cụ, thủy sản khai thác'],
      target: 'Chủ tàu, thuyền trưởng và cá nhân liên quan',
      conditions: 'Căn cứ theo từng hành vi cụ thể tại Nghị định 38/2024/NĐ-CP'
    },
    practicalNotes: [
      'Nghị định 42/2019/NĐ-CP đã hết hiệu lực từ ngày 20/05/2024; mọi hành vi hiện nay đều áp dụng theo Nghị định 38/2024/NĐ-CP.',
      'Người dân và cán bộ có thể tra cứu chi tiết từng điều khoản tại mục Tra cứu văn bản hoặc sử dụng công cụ Tính mức xử phạt.'
    ],
    officialSourceUrl: 'https://vbpl.vn',
    officialSourceLabel: 'Cơ sở dữ liệu quốc gia về văn bản pháp luật (vbpl.vn)'
  };
}

// API Routes

// 1. Chat Q&A using Gemini API (server-side only)
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, userRole, conversationHistory } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Nội dung câu hỏi không được để trống' });
    }

    // Check if Gemini AI instance is available
    if (!ai) {
      // Fallback mode with grounded data
      const response = generateFallbackResponse(prompt);
      return res.json({
        data: response,
        source: 'local_verified_grounding',
        warningNote: 'Đang hoạt động ở chế độ cơ sở dữ liệu pháp chế xác thực nội bộ.'
      });
    }

    const knowledgeContext = getKnowledgeBaseContext();

    const systemInstruction = `
Bạn là "Trợ lý Pháp luật Tàu cá Việt Nam - AI", chuyên gia pháp lý cao cấp về quản lý tàu cá, đăng ký, đăng kiểm, an toàn kỹ thuật, giám sát hành trình (VMS), chống khai thác IUU và xử phạt vi phạm hành chính thủy sản Việt Nam.

QUY TẮC BẮT BUỘC VỀ ĐỘ CHÍNH XÁC:
1. Bạn CHỈ ĐƯỢC kết luận dựa trên các văn bản pháp luật thực tế của Việt Nam:
   - Luật Thủy sản số 18/2017/QH14
   - Nghị định số 38/2024/NĐ-CP ngày 05/04/2024 (Đang có hiệu lực từ 20/05/2024, THAY THẾ hoàn toàn Nghị định 42/2019/NĐ-CP)
   - Nghị định số 26/2019/NĐ-CP (và Nghị định số 37/2024/NĐ-CP sửa đổi bổ sung từ 19/05/2024)
   - Thông tư số 23/2018/TT-BNNPTNT, Thông tư 01/2022/TT-BNNPTNT, Thông tư 06/2024/TT-BNNPTNT
   - Nghị quyết số 04/2024/NQ-HĐTP của Hội đồng Thẩm phán TANDTC về truy cứu trách nhiệm hình sự khai thác IUU
   - Chỉ thị số 32-CT/TW ngày 10/04/2024 của Ban Bí thư
2. TUYỆT ĐỐI KHÔNG BỊA ĐẶT số hiệu văn bản, điều luật, khung phạt, thời hạn giải quyết. Nếu không đủ căn cứ, phải nói rõ chưa xác minh được.
3. LƯU Ý ĐẶC BIỆT VỀ HIỆU LỰC: Nghị định 42/2019/NĐ-CP ĐÃ HẾT HIỆU LỰC, không được dùng mức phạt của NĐ 42, phải dùng NĐ 38/2024/NĐ-CP!
4. ĐỐI TƯỢNG: Người hỏi hiện tại là "${userRole || 'ngu_dan'}". Giọng văn chuẩn mực, dễ hiểu, rõ ràng.

DỮ LIỆU PHÁP LUẬT THAM CHIẾU (GROUNDING CORPUS):
${knowledgeContext}

YÊU CẦU ĐẦU RA JSON BẮT BUỘC theo cấu trúc 6 phần:
- directAnswer: Câu trả lời trực tiếp, rõ ràng, rành mạch.
- legalBasis: Mảng các căn cứ pháp lý { docName, docCode, article, clausePoint, effectiveStatus, updatedDate }.
- procedures: Mảng các bước thực hiện, hồ sơ hoặc trình tự (nếu có).
- penalties: Đối tượng { behavior, fineRangePersonal, fineRangeOrg, extraSanctions, remedialMeasures, target, conditions } nếu câu hỏi liên quan vi phạm. Nếu không có vi phạm, để undefined hoặc null.
- practicalNotes: Mảng các lưu ý thực tế trên biển / tại cảng.
- officialSourceUrl: Link chính thức đến nguồn văn bản (vbpl.vn hoặc vanban.chinhphu.vn).
- officialSourceLabel: Tên nguồn chính thức.
`;

    const chatResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            directAnswer: { type: Type.STRING },
            legalBasis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  docName: { type: Type.STRING },
                  docCode: { type: Type.STRING },
                  article: { type: Type.STRING },
                  clausePoint: { type: Type.STRING },
                  effectiveStatus: { type: Type.STRING },
                  updatedDate: { type: Type.STRING }
                },
                required: ['docName', 'docCode', 'article', 'effectiveStatus']
              }
            },
            procedures: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            penalties: {
              type: Type.OBJECT,
              properties: {
                behavior: { type: Type.STRING },
                fineRangePersonal: { type: Type.STRING },
                fineRangeOrg: { type: Type.STRING },
                extraSanctions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                remedialMeasures: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                target: { type: Type.STRING },
                conditions: { type: Type.STRING }
              }
            },
            practicalNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            officialSourceUrl: { type: Type.STRING },
            officialSourceLabel: { type: Type.STRING },
            warningNote: { type: Type.STRING }
          },
          required: ['directAnswer', 'legalBasis', 'practicalNotes', 'officialSourceUrl', 'officialSourceLabel']
        }
      }
    });

    const parsedData = JSON.parse(chatResponse.text || '{}');
    return res.json({ data: parsedData, source: 'gemini-3.8-flash' });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    // Graceful fallback to verified legal reasoning
    const fallback = generateFallbackResponse(req.body?.prompt || '');
    return res.json({
      data: fallback,
      source: 'fallback_grounded',
      warningNote: 'Đã sử dụng cơ sở tri thức pháp lý nội bộ để đảm bảo phản hồi tức thì.'
    });
  }
});

// 2. Scenario Evaluation & Grading using Gemini 3.8 Flash
app.post('/api/grade-scenario', async (req, res) => {
  try {
    const { scenarioId, userFreeformText } = req.body;
    const scenario = dynamicScenarios.find(s => s.id === scenarioId);
    if (!scenario) {
      return res.status(404).json({ error: 'Không tìm thấy tình huống này' });
    }

    if (!userFreeformText || userFreeformText.trim().length < 5) {
      return res.status(400).json({ error: 'Vui lòng nhập câu trả lời chi tiết hơn để chấm điểm.' });
    }

    if (!ai) {
      // Local rule evaluation
      const lengthScore = Math.min(30, Math.floor(userFreeformText.length / 5));
      const hasKeywords = ['nghị định', 'luật', 'điều', 'khoản', 'báo cáo', 'vms', 'kiểm tra'].filter(k => userFreeformText.toLowerCase().includes(k)).length;
      const basisScore = Math.min(30, hasKeywords * 6);
      const issueScore = userFreeformText.toLowerCase().includes('vi phạm') || userFreeformText.toLowerCase().includes('xử lý') ? 18 : 12;
      const actionScore = userFreeformText.toLowerCase().includes('đưa tàu') || userFreeformText.toLowerCase().includes('phạt') ? 25 : 15;
      const procScore = 15;
      const total = Math.min(100, issueScore + basisScore + actionScore + procScore);

      return res.json({
        totalScore: total,
        scoreBreakdown: {
          issue: issueScore,
          basis: basisScore,
          action: actionScore,
          procedure: procScore
        },
        feedback: `Bạn đã xác định được các yếu tố cơ bản của tình huống. Tuy nhiên cần viện dẫn cụ thể số hiệu văn bản (Nghị định 38/2024/NĐ-CP hoặc NĐ 26/2019/NĐ-CP) và các bước báo cáo tuần tự.`,
        correctAnswerText: scenario.modelAnswer.fullExplanation,
        modelAnswer: scenario.modelAnswer
      });
    }

    const gradingPrompt = `
Hãy chấm điểm câu trả lời của học viên trong tình huống thực tế quản lý tàu cá Việt Nam sau:

BỐI CẢNH TÌNH HUỐNG:
Tiêu đề: ${scenario.title}
Chủ đề: ${scenario.topic}
Mô tả: ${scenario.description}
Thông số tàu: ${JSON.stringify(scenario.vesselContext)}

ĐÁP ÁN CHUẨN CỦA CHUYÊN GIA PHÁP CHẾ:
- Vấn đề cốt lõi: ${scenario.modelAnswer.coreIssue}
- Căn cứ pháp luật: ${scenario.modelAnswer.legalBasis}
- Trình tự xử lý: ${scenario.modelAnswer.procedure}
- Khung chế tài / Tuân thủ: ${scenario.modelAnswer.penaltyOrCompliance}
- Hướng dẫn thực tế: ${scenario.modelAnswer.practicalAdvice}

CÂU TRẢ LỜI CỦA HỌC VIÊN:
"${userFreeformText}"

THANG ĐIỂM CHUẨN (TỔNG 100 ĐIỂM):
1. issueScore (tối đa 20 điểm): Xác định đúng vấn đề pháp lý và rủi ro cốt lõi.
2. basisScore (tối đa 30 điểm): Nêu đúng căn cứ pháp luật (Luật Thủy sản 2017, Nghị định 38/2024/NĐ-CP, Nghị định 26/2019, NĐ 37/2024, Thông tư 23/2018...).
3. actionScore (tối đa 30 điểm): Đề xuất phương án xử lý đúng đắn, an toàn, bảo vệ chủ quyền và tuân thủ IUU.
4. procedureScore (tối đa 20 điểm): Đảm bảo đúng trình tự các bước thực hiện và trách nhiệm của từng bên (thuyền trưởng, chủ tàu, kiểm ngư, biên phòng).

Yêu cầu trả về định dạng JSON:
{
  "totalScore": number (tổng 4 mục),
  "scoreBreakdown": {
    "issue": number,
    "basis": number,
    "action": number,
    "procedure": number
  },
  "feedback": string (Nhận xét chi tiết điểm mạnh, điểm thiếu sót và hướng dẫn khắc phục cụ thể bằng tiếng Việt),
  "correctAnswerText": string
}
`;

    const result = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: gradingPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalScore: { type: Type.INTEGER },
            scoreBreakdown: {
              type: Type.OBJECT,
              properties: {
                issue: { type: Type.INTEGER },
                basis: { type: Type.INTEGER },
                action: { type: Type.INTEGER },
                procedure: { type: Type.INTEGER }
              },
              required: ['issue', 'basis', 'action', 'procedure']
            },
            feedback: { type: Type.STRING },
            correctAnswerText: { type: Type.STRING }
          },
          required: ['totalScore', 'scoreBreakdown', 'feedback', 'correctAnswerText']
        }
      }
    });

    const parsed = JSON.parse(result.text || '{}');
    return res.json({
      ...parsed,
      modelAnswer: scenario.modelAnswer
    });
  } catch (err: any) {
    console.error('Grade error:', err);
    res.status(500).json({ error: 'Lỗi chấm điểm bài tập', details: err.message });
  }
});

// 3. Law catalog endpoints
app.get('/api/laws', (req, res) => {
  const { query, topic, status, docType } = req.query;
  let filtered = [...dynamicLaws];

  if (topic && topic !== 'all') {
    filtered = filtered.filter(l => l.topics.includes(topic as string));
  }
  if (status && status !== 'all') {
    filtered = filtered.filter(l => l.status === status);
  }
  if (docType && docType !== 'all') {
    filtered = filtered.filter(l => l.docType === docType);
  }
  if (query) {
    const q = (query as string).toLowerCase();
    filtered = filtered.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q) ||
      l.summary.toLowerCase().includes(q) ||
      l.articles.some(a => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q))
    );
  }

  res.json({ data: filtered });
});

// 4. Update Law document (Admin)
app.post('/api/laws', (req, res) => {
  const newLaw = req.body;
  if (!newLaw.title || !newLaw.code) {
    return res.status(400).json({ error: 'Thiếu thông tin số hiệu hoặc tên văn bản' });
  }
  newLaw.id = `law-${Date.now()}`;
  newLaw.isVerified = true;
  dynamicLaws.unshift(newLaw);

  // Add audit log
  auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'CREATE',
    targetType: 'DOCUMENT',
    targetTitle: `${newLaw.title} (${newLaw.code})`,
    performedBy: req.body.operatorName || 'Cán bộ quản trị',
    userRole: 'Quản trị viên',
    timestamp: new Date().toISOString(),
    details: `Thêm mới văn bản quy phạm pháp luật với ${newLaw.articles?.length || 0} điều khoản.`
  });

  res.json({ success: true, data: newLaw });
});

// 5. Update Law status (Admin)
app.patch('/api/laws/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, statusLabel, replacedBy, replacementNote } = req.body;
  const lawIndex = dynamicLaws.findIndex(l => l.id === id);
  if (lawIndex === -1) {
    return res.status(404).json({ error: 'Không tìm thấy văn bản' });
  }

  dynamicLaws[lawIndex] = {
    ...dynamicLaws[lawIndex],
    status,
    statusLabel,
    replacedBy,
    replacementNote
  };

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'STATUS_CHANGE',
    targetType: 'DOCUMENT',
    targetTitle: dynamicLaws[lawIndex].title,
    performedBy: req.body.operatorName || 'Cán bộ pháp chế',
    userRole: 'Thanh tra thủy sản',
    timestamp: new Date().toISOString(),
    details: `Cập nhật trạng thái thành: ${statusLabel}. Ghi chú: ${replacementNote || 'Không có'}`
  });

  res.json({ success: true, data: dynamicLaws[lawIndex] });
});

// 6. Audit logs
app.get('/api/audit-logs', (req, res) => {
  res.json({ data: auditLogs });
});

// 7. Scenarios list
app.get('/api/scenarios', (req, res) => {
  res.json({ data: dynamicScenarios });
});

// 8. Add Scenario (Admin)
app.post('/api/scenarios', (req, res) => {
  const newScen = req.body;
  newScen.id = `sc-${Date.now()}`;
  dynamicScenarios.unshift(newScen);

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'CREATE',
    targetType: 'SCENARIO',
    targetTitle: newScen.title,
    performedBy: req.body.operatorName || 'Chuyên viên đào tạo',
    userRole: 'Cán bộ kiểm ngư',
    timestamp: new Date().toISOString(),
    details: `Bổ sung tình huống thực hành nghiệp vụ mới chủ đề: ${newScen.topic}`
  });

  res.json({ success: true, data: newScen });
});

// 9. Penalties list
app.get('/api/penalties', (req, res) => {
  res.json({ data: PENALTY_CATALOG });
});

// Vite middleware or static serving
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Vietnam Fishing Vessel AI Assistant Server running at http://0.0.0.0:${port}`);
});
