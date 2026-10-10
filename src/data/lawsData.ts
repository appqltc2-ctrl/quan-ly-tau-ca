import { LawDocument } from '../types';

export const INITIAL_LAWS: LawDocument[] = [
  {
    id: 'law-18-2017',
    code: '18/2017/QH14',
    title: 'Luật Thủy sản năm 2017',
    docType: 'Luật',
    issuingAgency: 'Quốc hội khóa XIV',
    issueDate: '21/11/2017',
    effectiveDate: '01/01/2019',
    status: 'con_hieu_luc',
    statusLabel: 'Còn hiệu lực',
    summary: 'Đạo luật nền tảng điều chỉnh hoạt động thủy sản tại Việt Nam, bao gồm bảo vệ và phát triển nguồn lợi thủy sản, nuôi trồng, khai thác thủy sản, quản lý tàu cá, cảng cá, khu neo đậu tránh trú bão và phòng chống khai thác IUU.',
    topics: ['Tổng thể thủy sản', 'Đăng ký & Đăng kiểm', 'Giấy phép khai thác', 'Vùng khai thác', 'Chống khai thác IUU'],
    sourceUrl: 'https://vbpl.vn/bocongan/Pages/vbpq-van-ban-goc.aspx?ItemID=126938',
    isVerified: true,
    articles: [
      {
        id: 'law-18-d50',
        articleNumber: 'Điều 50',
        title: 'Điều kiện cấp Giấy phép khai thác thủy sản',
        content: '1. Tổ chức, cá nhân khai thác thủy sản bằng tàu cá có chiều dài lớn nhất từ 06 mét trở lên phải có Giấy phép khai thác thủy sản.\n2. Điều kiện cấp Giấy phép: Nằm trong hạn ngạch Giấy phép khai thác thủy sản; có nghề khai thác phù hợp; có Giấy chứng nhận đăng ký tàu cá; có Giấy chứng nhận an toàn kỹ thuật tàu cá (đối với tàu thuộc diện đăng kiểm); trang thiết bị thông tin liên lạc, thiết bị giám sát hành trình (đối với tàu từ 15 mét trở lên); thuyền trưởng, máy trưởng có văn bằng/chứng chỉ chuyên môn phù hợp.',
        keyPoints: [
          'Tàu từ 06m trở lên bắt buộc có Giấy phép khai thác thủy sản.',
          'Phải nằm trong hạn ngạch giấy phép được cơ quan có thẩm quyền công bố.',
          'Tàu từ 15m trở lên bắt buộc lắp thiết bị giám sát hành trình (VMS).'
        ]
      },
      {
        id: 'law-18-d60',
        articleNumber: 'Điều 60',
        title: 'Hành vi khai thác thủy sản bất hợp pháp (IUU)',
        content: 'Bao gồm 14 hành vi: Khai thác không có giấy phép; Khai thác trong vùng cấm, thời gian cấm; Khai thác loài thủy sản cấm khai thác, loài có kích thước nhỏ hơn quy định; Sử dụng ngư cụ bị cấm, chất nổ, xung điện; Không lắp đặt hoặc không vận hành thiết bị giám sát hành trình (VMS); Không ghi nhật ký khai thác hoặc ghi không trung thực; Khai thác vượt quá hạn ngạch; Chuyển tải trái phép; Xuất cảnh đi khai thác trái phép tại vùng biển nước ngoài; Không nộp báo cáo khai thác, v.v.',
        keyPoints: [
          'Liệt kê 14 hành vi vi phạm nghiêm trọng bị coi là khai thác IUU (Thẻ vàng EC).',
          'Tàu ngắt kết nối VMS hoặc vượt ranh giới trên biển đều thuộc nhóm hành vi IUU.',
          'Khai thác vùng biển nước ngoài có thể bị xử lý hình sự theo Nghị quyết 04/2024/NQ-HĐTP.'
        ]
      },
      {
        id: 'law-18-d67',
        articleNumber: 'Điều 67',
        title: 'Đăng ký tàu cá',
        content: '1. Tàu cá có chiều dài lớn nhất từ 06 mét trở lên phải được đăng ký vào Sổ đăng ký tàu cá quốc gia và được cấp Giấy chứng nhận đăng ký tàu cá.\n2. Tàu cá thuộc sở hữu của tổ chức, cá nhân Việt Nam được đăng ký tại cơ quan quản lý nhà nước về thủy sản cấp tỉnh.\n3. Hồ sơ và thủ tục đăng ký thực hiện theo quy định của Bộ Nông nghiệp và Phát triển nông thôn.',
        keyPoints: [
          'Tàu từ 06 mét trở lên bắt buộc đăng ký và cấp Giấy chứng nhận đăng ký.',
          'Cơ quan thực hiện: Chi cục Thủy sản cấp tỉnh nơi chủ tàu thường trú.'
        ]
      },
      {
        id: 'law-18-d68',
        articleNumber: 'Điều 68',
        title: 'Đăng kiểm tàu cá',
        content: '1. Tàu cá có chiều dài lớn nhất từ 12 mét trở lên phải được đăng kiểm định kỳ theo Quy chuẩn kỹ thuật quốc gia về an toàn kỹ thuật tàu cá.\n2. Cơ sở đăng kiểm tàu cá phải đáp ứng đủ điều kiện về cơ sở vật chất, năng lực đăng kiểm viên và được cơ quan có thẩm quyền cấp giấy chứng nhận đủ điều kiện.',
        keyPoints: [
          'Tàu từ 12 mét trở lên bắt buộc đăng kiểm định kỳ.',
          'Được cấp Giấy chứng nhận an toàn kỹ thuật tàu cá (Sổ đăng kiểm).'
        ]
      },
      {
        id: 'law-18-d71',
        articleNumber: 'Điều 71',
        title: 'Thuyền viên tàu cá và người làm việc trên tàu cá',
        content: 'Thuyền viên làm việc trên tàu cá phải có đủ tiêu chuẩn sức khỏe; có chứng chỉ chuyên môn, nghiệp vụ phù hợp; có tên trong Sổ danh bạ thuyền viên hoặc danh sách thuyền viên được cơ quan có thẩm quyền xác nhận.',
        keyPoints: [
          'Phải có tên trong Sổ danh bạ thuyền viên.',
          'Thuyền trưởng, máy trưởng phải có chứng chỉ phù hợp với công suất máy và chiều dài tàu.'
        ]
      }
    ]
  },
  {
    id: 'nd-38-2024',
    code: '38/2024/NĐ-CP',
    title: 'Nghị định số 38/2024/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực thủy sản',
    docType: 'Nghị định',
    issuingAgency: 'Chính phủ',
    issueDate: '05/04/2024',
    effectiveDate: '20/05/2024',
    status: 'con_hieu_luc',
    statusLabel: 'Còn hiệu lực',
    replacedBy: 'Thay thế hoàn toàn Nghị định 42/2019/NĐ-CP',
    summary: 'Văn bản cốt lõi và mới nhất hiện hành về chế tài xử phạt vi phạm hành chính trong lĩnh vực thủy sản. Tăng cường mức xử phạt đối với các hành vi vi phạm VMS, vi phạm vùng biển nước ngoài, không ghi nhật ký, chống khai thác IUU.',
    topics: ['Xử phạt vi phạm hành chính', 'VMS', 'Chống khai thác IUU', 'Giấy phép khai thác', 'Vùng khai thác'],
    sourceUrl: 'https://vanban.chinhphu.vn/?pageid=27160&docid=210214',
    isVerified: true,
    articles: [
      {
        id: 'nd-38-d20',
        articleNumber: 'Điều 20',
        title: 'Vi phạm quy định về thiết bị giám sát hành trình tàu cá (VMS)',
        content: '1. Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng đối với hành vi không duy trì hoạt động hoặc vô hiệu hóa thiết bị giám sát hành trình đối với tàu cá dưới 15 mét (nếu tự nguyện lắp).\n2. Phạt tiền từ 20.000.000 đồng đến 30.000.000 đồng: Không bật thiết bị giám sát hành trình khi tàu cá hoạt động đối với tàu từ 15m đến dưới 24m; Không báo cáo vị trí theo quy định khi thiết bị giám sát hành trình bị hỏng.\n3. Phạt tiền từ 300.000.000 đồng đến 500.000.000 đồng đối với hành vi: Tháo thiết bị giám sát hành trình trên tàu cá mà không có sự giám sát của đơn vị cung cấp; Không duy trì hoạt động của thiết bị giám sát hành trình trong quá trình hoạt động trên biển đối với tàu cá từ 24 mét trở lên; Cố tình làm sai lệch thông tin, vị trí của tàu cá.\n4. Phạt tiền từ 800.000.000 đồng đến 1.000.000.000 đồng đối với hành vi: Gửi thiết bị giám sát hành trình sang tàu khác hoặc chở thiết bị giám sát hành trình của tàu khác; Không trang bị thiết bị giám sát hành trình đối với tàu từ 24 mét trở lên trong vùng khơi.\n5. Hình thức xử phạt bổ sung: Tước quyền sử dụng văn bằng, chứng chỉ thuyền trưởng từ 03 tháng đến 12 tháng; Tịch thu thiết bị VMS; Tịch thu tàu cá trong trường hợp vi phạm nghiêm trọng tái phạm.',
        keyPoints: [
          'Mất kết nối VMS quá 6 giờ không báo cáo tọa độ bằng bộ đàm/vệ tinh bị xử phạt nặng.',
          'Hành vi gửi/nhận thiết bị VMS của tàu khác bị phạt từ 800 triệu đến 1 tỷ đồng.',
          'Tước quyền sử dụng chứng chỉ thuyền trưởng từ 3 - 12 tháng.'
        ]
      },
      {
        id: 'nd-38-d21',
        articleNumber: 'Điều 21',
        title: 'Vi phạm quy định về Giấy phép khai thác thủy sản',
        content: '1. Phạt tiền từ 5.000.000 đồng đến 10.000.000 đồng: Khai thác thủy sản không mang theo bản chính Giấy phép khai thác thủy sản.\n2. Phạt tiền từ 20.000.000 đồng đến 30.000.000 đồng: Sử dụng Giấy phép khai thác thủy sản đã hết hạn dưới 30 ngày.\n3. Phạt tiền từ 50.000.000 đồng đến 100.000.000 đồng: Khai thác không có Giấy phép đối với tàu từ 12m đến dưới 15m.\n4. Phạt tiền từ 300.000.000 đồng đến 500.000.000 đồng: Khai thác thủy sản không có Giấy phép khai thác thủy sản đối với tàu từ 15m đến dưới 24m.\n5. Phạt tiền từ 800.000.000 đồng đến 1.000.000.000 đồng đối với tàu từ 24 mét trở lên không có giấy phép.',
        keyPoints: [
          'Không mang theo bản chính: phạt 5 - 10 triệu đồng.',
          'Tàu từ 15m - dưới 24m không có giấy phép: phạt 300 - 500 triệu đồng.',
          'Tàu từ 24m trở lên không có giấy phép: phạt 800 triệu - 1 tỷ đồng, tịch thu thủy sản khai thác.'
        ]
      },
      {
        id: 'nd-38-d22',
        articleNumber: 'Điều 22',
        title: 'Vi phạm quy định về vùng khai thác thủy sản',
        content: '1. Phạt tiền từ 10.000.000 đồng đến 15.000.000 đồng: Tàu khai thác tại vùng ven bờ không đúng quy định.\n2. Phạt tiền từ 20.000.000 đồng đến 30.000.000 đồng: Tàu có chiều dài từ 12 mét đến dưới 15 mét khai thác tại vùng ven bờ.\n3. Phạt tiền từ 100.000.000 đồng đến 150.000.000 đồng: Tàu từ 15 mét trở lên khai thác thủy sản tại vùng lộng hoặc vùng ven bờ.\n4. Phạt tiền từ 800.000.000 đồng đến 1.000.000.000 đồng: Khai thác hải sản vượt ranh giới cho phép trên biển hoặc tại vùng biển quốc tế mà không được phép.',
        keyPoints: [
          'Tàu từ 15m trở lên chỉ được hoạt động ở vùng khơi, cấm khai thác ở vùng ven bờ và vùng lộng (phạt 100 - 150 triệu).',
          'Vượt ranh giới vùng biển Việt Nam: phạt đến 1 tỷ đồng và tịch thu tàu cá.'
        ]
      },
      {
        id: 'nd-38-d28',
        articleNumber: 'Điều 28',
        title: 'Vi phạm quy định về nhật ký, báo cáo khai thác thủy sản',
        content: '1. Phạt tiền từ 10.000.000 đồng đến 15.000.000 đồng: Không ghi nhật ký khai thác đối với tàu cá từ 12 mét đến dưới 15 mét.\n2. Phạt tiền từ 25.000.000 đồng đến 50.000.000 đồng: Không ghi hoặc ghi không đúng nhật ký khai thác đối với tàu cá từ 15 mét đến dưới 24 mét.\n3. Phạt tiền từ 50.000.000 đồng đến 100.000.000 đồng: Không nộp nhật ký khai thác thủy sản hoặc khai khống sản lượng, sai loài đối với tàu từ 24 mét trở lên.',
        keyPoints: [
          'Nhật ký khai thác là tài liệu pháp lý truy xuất nguồn gốc eCDT.',
          'Phạt từ 25 - 50 triệu đồng nếu tàu từ 15m - 24m không ghi nhật ký đầy đủ.'
        ]
      },
      {
        id: 'nd-38-d35',
        articleNumber: 'Điều 35',
        title: 'Vi phạm quy định về đăng ký tàu cá',
        content: 'Phạt tiền từ 5.000.000 đồng đến 10.000.000 đồng đối với hành vi sử dụng tàu cá không có Giấy chứng nhận đăng ký tàu cá hoặc Giấy chứng nhận đăng ký tàu cá đã bị thu hồi; Không làm thủ tục cấp lại khi có thay đổi tên tàu, chủ tàu.',
        keyPoints: [
          'Tàu cá chưa đăng ký hoặc mua bán chưa sang tên đổi chủ bị phạt từ 5 - 10 triệu đồng.'
        ]
      },
      {
        id: 'nd-38-d36',
        articleNumber: 'Điều 36',
        title: 'Vi phạm quy định về đăng kiểm và an toàn kỹ thuật tàu cá',
        content: 'Phạt tiền từ 5.000.000 đồng đến 10.000.000 đồng đối với hành vi sử dụng tàu cá không có Giấy chứng nhận an toàn kỹ thuật hoặc đã hết hạn dưới 01 tháng. Phạt từ 15.000.000 đồng đến 25.000.000 đồng nếu hết hạn từ 01 tháng trở lên đối với tàu từ 15m trở lên.',
        keyPoints: [
          'Hết hạn đăng kiểm vẫn ra khơi sẽ bị đình chỉ hoạt động và phạt tiền đến 25 triệu đồng.'
        ]
      }
    ]
  },
  {
    id: 'nd-42-2019',
    code: '42/2019/NĐ-CP',
    title: 'Nghị định số 42/2019/NĐ-CP về xử phạt vi phạm hành chính trong lĩnh vực thủy sản',
    docType: 'Nghị định',
    issuingAgency: 'Chính phủ',
    issueDate: '16/05/2019',
    effectiveDate: '05/07/2019',
    status: 'het_hieu_luc',
    statusLabel: 'Hết hiệu lực (Đã bị thay thế)',
    replacedBy: 'Nghị định số 38/2024/NĐ-CP (ngày 05/04/2024, có hiệu lực từ 20/05/2024)',
    replacementNote: 'CẢNH BÁO: Văn bản này đã hết hiệu lực hoàn toàn từ ngày 20/05/2024 theo Khoản 1 Điều 47 Nghị định 38/2024/NĐ-CP. Mọi mức phạt cũ tại Nghị định này không còn giá trị áp dụng. Vui lòng chuyển sang tra cứu Nghị định 38/2024/NĐ-CP.',
    summary: 'Nghị định cũ về xử phạt vi phạm hành chính trong lĩnh vực thủy sản, đã hết hiệu lực từ ngày 20/05/2024 do được thay thế bởi Nghị định 38/2024/NĐ-CP.',
    topics: ['Xử phạt vi phạm hành chính (Văn bản cũ)'],
    sourceUrl: 'https://vbpl.vn/bocongan/Pages/vbpq-van-ban-goc.aspx?ItemID=136279',
    isVerified: true,
    articles: [
      {
        id: 'nd-42-d1',
        articleNumber: 'Toàn văn',
        title: 'Quy định bãi bỏ và điều khoản chuyển tiếp',
        content: 'Nghị định số 42/2019/NĐ-CP hết hiệu lực thi hành kể từ ngày Nghị định số 38/2024/NĐ-CP có hiệu lực (ngày 20 tháng 5 năm 2024). Đối với hành vi vi phạm hành chính xảy ra trước ngày Nghị định 38/2024/NĐ-CP có hiệu lực mà sau đó mới bị phát hiện hoặc đang xem xét giải quyết thì áp dụng quy định có lợi cho cá nhân, tổ chức vi phạm.',
        keyPoints: ['Đã hết hiệu lực kể từ 20/05/2024.']
      }
    ]
  },
  {
    id: 'nd-26-2019',
    code: '26/2019/NĐ-CP',
    title: 'Nghị định số 26/2019/NĐ-CP quy định chi tiết một số điều và biện pháp thi hành Luật Thủy sản',
    docType: 'Nghị định',
    issuingAgency: 'Chính phủ',
    issueDate: '08/03/2019',
    effectiveDate: '25/04/2019',
    status: 'het_hieu_luc_mot_phan',
    statusLabel: 'Còn hiệu lực một phần (Được sửa đổi bởi NĐ 37/2024/NĐ-CP)',
    summary: 'Quy định chi tiết về hạn ngạch giấy phép, tiêu chuẩn thuyền viên, kiểm soát tàu cá xuất nhập cảng, phân vùng khai thác thủy sản, và thiết bị giám sát hành trình (VMS). Đã được sửa đổi, bổ sung bởi Nghị định 37/2024/NĐ-CP.',
    topics: ['Phân vùng khai thác', 'VMS', 'Kiểm soát tàu cảng', 'Hạn ngạch giấy phép'],
    sourceUrl: 'https://vbpl.vn/bocongan/Pages/vbpq-van-ban-goc.aspx?ItemID=134568',
    isVerified: true,
    articles: [
      {
        id: 'nd-26-d42',
        articleNumber: 'Điều 42',
        title: 'Phân vùng khai thác thủy sản',
        content: '1. Vùng biển Việt Nam được phân thành 03 vùng khai thác thủy sản: Vùng ven bờ (giới hạn từ mép nước biển khi triều kiệt ra đến 06 hải lý); Vùng lộng (từ ngoài 06 hải lý đến đường ranh giới ngoài của vùng biển nội thủy và lãnh hải, thường đến 24 hải lý); Vùng khơi (từ ranh giới ngoài của vùng lộng trở ra đến ranh giới vùng đặc quyền kinh tế).\n2. Tàu cá có chiều dài lớn nhất dưới 12 mét hoạt động tại vùng ven bờ.\n3. Tàu cá từ 12 mét đến dưới 15 mét hoạt động tại vùng lộng.\n4. Tàu cá từ 15 mét trở lên hoạt động tại vùng khơi.',
        keyPoints: [
          'Dưới 12m: Vùng ven bờ.',
          'Từ 12m đến dưới 15m: Vùng lộng.',
          'Từ 15m trở lên: Vùng khơi. Tuyệt đối không được khai thác tại vùng ven bờ và vùng lộng.'
        ]
      },
      {
        id: 'nd-26-d44',
        articleNumber: 'Điều 44',
        title: 'Quy định về quản lý thiết bị giám sát hành trình tàu cá (VMS)',
        content: '1. Thiết bị giám sát hành trình phải phát tín hiệu định vị tối thiểu 02 giờ/lần đối với tàu từ 24 mét trở lên và 03 giờ/lần đối với tàu từ 15m đến dưới 24m.\n2. Trường hợp thiết bị VMS bị hỏng, thuyền trưởng phải sử dụng các thiết bị thông tin liên lạc khác (HF, bộ đàm, điện thoại vệ tinh) báo cáo vị trí của tàu cá về Chi cục Thủy sản và cơ quan kiểm ngư địa phương 06 giờ/lần và đưa tàu về bờ để khắc phục trong thời hạn tối đa 10 ngày kể từ khi thiết bị hỏng.',
        keyPoints: [
          'VMS hỏng: Thuyền trưởng phải báo cáo tọa độ 06 giờ/lần về bờ qua đài bờ/bộ đàm.',
          'Phải đưa tàu về cảng sửa chữa trong vòng 10 ngày kể từ khi mất kết nối.',
          'Nghiêm cấm tự ý ngắt nguồn, kẹp chì niêm phong phải còn nguyên vẹn.'
        ]
      }
    ]
  },
  {
    id: 'nd-37-2024',
    code: '37/2024/NĐ-CP',
    title: 'Nghị định số 37/2024/NĐ-CP sửa đổi, bổ sung một số điều của Nghị định số 26/2019/NĐ-CP',
    docType: 'Nghị định',
    issuingAgency: 'Chính phủ',
    issueDate: '04/04/2024',
    effectiveDate: '19/05/2024',
    status: 'con_hieu_luc',
    statusLabel: 'Còn hiệu lực',
    summary: 'Văn bản sửa đổi then chốt phục vụ gỡ Thẻ vàng EC, thắt chặt giám sát tàu cá VMS qua hệ thống giám sát quốc gia, kiểm soát nghiêm ngặt sản lượng bốc dỡ qua hệ thống phần mềm điện tử eCDT, cập nhật phụ lục danh mục các loài thủy sản và kích thước tối thiểu cho phép khai thác.',
    topics: ['Sửa đổi NĐ 26/2019', 'Hệ thống eCDT', 'Quản lý VMS chặt chẽ', 'Kích thước loài tối thiểu'],
    sourceUrl: 'https://vanban.chinhphu.vn/?pageid=27160&docid=210212',
    isVerified: true,
    articles: [
      {
        id: 'nd-37-vms',
        articleNumber: 'Điều 1 Khoản 23',
        title: 'Sửa đổi, bổ sung quy định về quản lý thiết bị giám sát hành trình và xử lý dữ liệu VMS',
        content: 'Quy định trách nhiệm kết nối dữ liệu liên tục 24/7 giữa tàu cá, nhà mạng cung cấp dịch vụ và Hệ thống giám sát tàu cá tại Cục Thủy sản. Khi tàu mất kết nối quá 06 giờ trên biển mà không báo cáo vị trí hoặc mất kết nối quá 10 ngày liên tục, hệ thống sẽ đưa vào danh sách tàu có nguy cơ cao vi phạm IUU và thông báo ngay cho lực lượng chức năng tại cảng kiểm tra, xử phạt khi cập cảng.',
        keyPoints: [
          'Tích hợp cảnh báo tự động mất kết nối VMS 6h và 10 ngày.',
          'Tàu mất kết nối được xếp vào diện nguy cơ cao vi phạm IUU, kiểm tra 100% khi cập cảng.'
        ]
      },
      {
        id: 'nd-37-ecdt',
        articleNumber: 'Điều 1 Khoản 30',
        title: 'Hệ thống truy xuất nguồn gốc thủy sản điện tử (eCDT)',
        content: 'Chủ tàu, thuyền trưởng thực hiện thủ tục khai báo xuất bến, nhập bến, ghi nộp nhật ký khai thác và cấp biên bản bốc dỡ thủy sản qua ứng dụng eCDT quốc gia để đảm bảo minh bạch chuỗi cung ứng xuất khẩu sang thị trường EU và quốc tế.',
        keyPoints: [
          'Ứng dụng phần mềm eCDT trong kiểm soát tàu xuất/nhập bến và bốc dỡ thủy sản tại cảng chỉ định.'
        ]
      }
    ]
  },
  {
    id: 'tt-23-2018',
    code: '23/2018/TT-BNNPTNT',
    title: 'Thông tư số 23/2018/TT-BNNPTNT quy định về đăng kiểm và đăng ký tàu cá',
    docType: 'Thông tư',
    issuingAgency: 'Bộ Nông nghiệp và Phát triển nông thôn',
    issueDate: '15/11/2018',
    effectiveDate: '01/01/2019',
    status: 'het_hieu_luc_mot_phan',
    statusLabel: 'Còn hiệu lực một phần (Đã sửa đổi bởi TT 01/2022 và TT 06/2024)',
    summary: 'Quy định chi tiết về quy trình thẩm định thiết kế, kiểm tra an toàn kỹ thuật, cấp sổ đăng kiểm và thủ tục đăng ký, cấp biển số tàu cá, đánh dấu nhận biết tàu cá bằng màu sơn.',
    topics: ['Đăng kiểm tàu cá', 'Đăng ký tàu cá', 'Quy chuẩn an toàn', 'Đánh dấu nhận biết'],
    sourceUrl: 'https://vbpl.vn/bocongan/Pages/vbpq-van-ban-goc.aspx?ItemID=133465',
    isVerified: true,
    articles: [
      {
        id: 'tt-23-d24',
        articleNumber: 'Điều 24',
        title: 'Quy định về đánh dấu tàu cá',
        content: '1. Tàu cá hoạt động tại vùng biển Việt Nam phải được đánh dấu bằng màu sơn quy định tại ca bin hoặc phần mạn mũi tàu:\n- Tàu hoạt động vùng ven bờ: Cabin sơn màu vàng nhạt.\n- Tàu hoạt động vùng lộng: Cabin sơn màu xanh ngọc.\n- Tàu hoạt động vùng khơi (từ 15m trở lên): Cabin sơn màu trắng; mạn tàu sơn màu quy định theo biển số địa phương (ví dụ BV, QNg, KG,...).\n2. Biển số tàu cá phải được kẻ ở hai bên mạn mũi tàu và đuôi tàu bằng chữ in hoa và chữ số màu phản quang rõ nét.',
        keyPoints: [
          'Quy định màu sơn nhận diện: Ven bờ (vàng), Vùng lộng (xanh ngọc), Vùng khơi (trắng).',
          'Biển số phải sơn rõ ở hai bên mạn mũi và đuôi tàu.'
        ]
      }
    ]
  },
  {
    id: 'nq-04-2024',
    code: '04/2024/NQ-HĐTP',
    title: 'Nghị quyết số 04/2024/NQ-HĐTP của Hội đồng Thẩm phán TANDTC hướng dẫn truy cứu trách nhiệm hình sự hành vi vi phạm khai thác thủy sản',
    docType: 'Nghị quyết',
    issuingAgency: 'Hội đồng Thẩm phán Tòa án nhân dân tối cao',
    issueDate: '12/06/2024',
    effectiveDate: '01/08/2024',
    status: 'con_hieu_luc',
    statusLabel: 'Còn hiệu lực',
    summary: 'Văn bản tư pháp đặc biệt quan trọng: Hướng dẫn áp dụng các tội danh trong Bộ luật Hình sự để xử lý nghiêm các hành vi môi giới đưa tàu đi khai thác trái phép ở vùng biển nước ngoài, tháo hoặc gửi thiết bị VMS, làm giả hồ sơ xuất khẩu thủy sản.',
    topics: ['Truy cứu trách nhiệm hình sự', 'Chống khai thác IUU', 'Hành vi vượt biên giới trên biển'],
    sourceUrl: 'https://congbobanan.toaan.gov.vn/van-ban-phap-luat',
    isVerified: true,
    articles: [
      {
        id: 'nq-04-d3',
        articleNumber: 'Điều 3 & Điều 4',
        title: 'Truy cứu trách nhiệm hình sự đối với hành vi xuất cảnh trái phép để khai thác thủy sản',
        content: '1. Hành vi đưa tàu cá, thuyền viên xuất cảnh trái phép sang vùng biển nước ngoài để khai thác thủy sản bị xử lý theo Điều 347 (Tội vi phạm quy định về xuất cảnh, nhập cảnh) hoặc Điều 348 (Tội tổ chức, môi giới cho người khác xuất cảnh, nhập cảnh hoặc ở lại Việt Nam trái phép) Bộ luật Hình sự.\n2. Hành vi tháo thiết bị VMS gửi sang tàu khác hoặc nhận mang VMS của tàu khác để hợp thức hóa tọa độ trên biển nhằm che giấu hành vi sang vùng biển nước ngoài có thể bị xử lý về tội Cản trở hoặc gây rối loạn hoạt động của mạng máy tính, mạng viễn thông (Điều 287 BLHS).',
        keyPoints: [
          'Tổ chức, môi giới tàu sang vùng biển nước ngoài khai thác có thể phạt tù đến 15 năm.',
          'Hành vi gửi/nhận thiết bị VMS để che giấu vị trí có thể bị xử lý hình sự thay vì chỉ phạt hành chính.'
        ]
      }
    ]
  },
  {
    id: 'ct-32-2024',
    code: '32-CT/TW',
    title: 'Chỉ thị số 32-CT/TW của Ban Bí thư về tăng cường sự lãnh đạo của Đảng đối với công tác chống khai thác IUU',
    docType: 'Chỉ thị',
    issuingAgency: 'Ban Bí thư Trung ương Đảng',
    issueDate: '10/04/2024',
    effectiveDate: '10/04/2024',
    status: 'con_hieu_luc',
    statusLabel: 'Còn hiệu lực',
    summary: 'Chỉ thị chính trị cấp cao nhất chỉ đạo toàn bộ hệ thống chính trị, cấp ủy, chính quyền địa phương ven biển quyết tâm gỡ cảnh báo Thẻ vàng của Ủy ban Châu Âu (EC), xử lý nghiêm trách nhiệm người đứng đầu nếu để tàu cá địa phương vi phạm vùng biển nước ngoài.',
    topics: ['Chỉ đạo chính trị', 'Chống khai thác IUU', 'Trách nhiệm chính quyền'],
    sourceUrl: 'https://xaydungdang.org.vn',
    isVerified: true,
    articles: [
      {
        id: 'ct-32-nd',
        articleNumber: 'Mục 2 & Mục 3',
        title: 'Nhiệm vụ trọng tâm chống khai thác IUU',
        content: 'Kiểm soát 100% tàu cá xuất nhập cảng; 100% tàu cá từ 15m trở lên phải lắp đặt và duy trì VMS hoạt động; điều tra, xử lý dứt điểm 100% các vụ việc vi phạm khai thác ở vùng biển nước ngoài; kiểm điểm trách nhiệm người đứng đầu cấp ủy, chính quyền nếu lơ là quản lý.',
        keyPoints: [
          'Mục tiêu kiểm soát 100% tàu cá qua cảng và 100% giám sát VMS.',
          'Không có vùng cấm trong xử lý vi phạm IUU.'
        ]
      }
    ]
  }
];
