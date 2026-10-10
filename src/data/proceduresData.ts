import { ProcedureItem } from '../types';

export const PROCEDURE_CATALOG: ProcedureItem[] = [
  {
    id: 'proc-01-registration',
    title: 'Thủ tục Đăng ký tàu cá và cấp Giấy chứng nhận đăng ký tàu cá (đóng mới / mua lại)',
    category: 'Đăng ký tàu cá',
    targetGroup: 'Tổ chức, cá nhân là chủ sở hữu tàu cá có chiều dài lớn nhất từ 06m trở lên',
    competentAuthority: 'Chi cục Thủy sản / Cơ quan quản lý nhà nước về thủy sản cấp tỉnh',
    totalTime: '03 - 05 ngày làm việc kể từ ngày nhận đủ hồ sơ hợp lệ',
    fee: 'Theo quy định Thông tư 284/2016/TT-BTC (khoảng 150.000đ - 300.000đ tùy chiều dài tàu)',
    legalBasis: 'Điều 67 Luật Thủy sản 2017; Điều 36 Nghị định 26/2019/NĐ-CP; Thông tư 23/2018/TT-BNNPTNT và Thông tư 06/2024/TT-BNNPTNT.',
    requiredDocuments: [
      'Đơn đề nghị cấp Giấy chứng nhận đăng ký tàu cá (theo Mẫu quy định).',
      'Giấy chứng nhận an toàn kỹ thuật tàu cá (bản chính) đối với tàu thuộc diện đăng kiểm.',
      'Giấy chứng nhận xóa đăng ký tàu cá (nếu là tàu mua lại từ tỉnh/chủ khác) hoặc Giấy chứng nhận xuất xưởng (nếu đóng mới).',
      'Hóa đơn mua bán, văn bản tặng cho hoặc hợp đồng mua bán chuyển nhượng có công chứng/chứng thực.',
      'Chứng từ nộp lệ phí trước bạ theo quy định của cơ quan Thuế.',
      'Ảnh màu chụp toàn cảnh tàu cá (kích thước 9x12cm, chụp 2 bên mạn có biển số tạm thời).'
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Chuẩn bị và nộp hồ sơ',
        detail: 'Chủ tàu nộp 01 bộ hồ sơ trực tiếp tại Trung tâm Phục vụ hành chính công cấp tỉnh hoặc gửi qua bưu chính hoặc nộp trực tuyến qua Cổng Dịch vụ công quốc gia.',
        responsibleAgency: 'Trung tâm Phục vụ hành chính công / Bộ phận Một cửa Chi cục Thủy sản',
        duration: 'Trong ngày'
      },
      {
        stepNumber: 2,
        stepTitle: 'Thẩm định hồ sơ và kiểm tra thực tế',
        detail: 'Chi cục Thủy sản kiểm tra tính hợp lệ của hồ sơ; đối chiếu thông tin kỹ thuật, hạn ngạch phát triển tàu cá của tỉnh và thông tin đăng kiểm viên.',
        responsibleAgency: 'Phòng Quản lý tàu cá & Cơ sở dịch vụ hậu cần Chi cục Thủy sản',
        duration: '02 ngày làm việc'
      },
      {
        stepNumber: 3,
        stepTitle: 'Cấp Giấy chứng nhận và vào Sổ đăng ký quốc gia',
        detail: 'Cơ quan cấp số đăng ký chính thức, in Giấy chứng nhận đăng ký tàu cá và cập nhật vào Cơ sở dữ liệu nghề cá quốc gia (VNFishbase).',
        responsibleAgency: 'Lãnh đạo Chi cục Thủy sản ký duyệt',
        duration: '01 ngày làm việc'
      },
      {
        stepNumber: 4,
        stepTitle: 'Trả kết quả và sơn đánh dấu tàu cá',
        detail: 'Chủ tàu nhận kết quả, tiến hành kẻ số đăng ký và sơn màu nhận diện cabin (Trắng: vùng khơi, Xanh ngọc: vùng lộng, Vàng: ven bờ) theo quy định.',
        responsibleAgency: 'Chủ tàu thực hiện',
        duration: 'Ngay sau khi nhận kết quả'
      }
    ],
    importantNotes: [
      'Tàu cá thuộc diện đóng mới hoặc cải hoán phải có Văn bản chấp thuận đóng mới của Sở NN&PTNT trước khi thi công.',
      'Nếu mua tàu từ địa phương khác, bắt buộc phải có Giấy chứng nhận xóa đăng ký của Chi cục Thủy sản tỉnh cũ cấp mới được nộp hồ sơ.'
    ],
    formTemplateName: 'Mau_01_Don_dang_ky_tau_ca.docx'
  },
  {
    id: 'proc-02-license',
    title: 'Thủ tục Cấp Giấy phép khai thác thủy sản (lần đầu hoặc cấp lại do hết hạn)',
    category: 'Giấy phép khai thác',
    targetGroup: 'Chủ tàu cá có chiều dài lớn nhất từ 06 mét trở lên',
    competentAuthority: 'Chi cục Thủy sản cấp tỉnh (đối với tàu dưới 15m và tàu từ 15m trở lên phân cấp)',
    totalTime: '06 ngày làm việc kể từ ngày nhận đủ hồ sơ hợp lệ',
    fee: 'Từ 200.000đ đến 500.000đ tùy loại nghề và chiều dài tàu',
    legalBasis: 'Điều 50, 51 Luật Thủy sản 2017; Điều 45 Nghị định 26/2019/NĐ-CP (sửa đổi bởi NĐ 37/2024/NĐ-CP).',
    requiredDocuments: [
      'Đơn đề nghị cấp Giấy phép khai thác thủy sản (Mẫu số 04.KT Phụ lục IV NĐ 26/2019/NĐ-CP).',
      'Bản sao chụp Giấy chứng nhận đăng ký tàu cá.',
      'Bản sao chụp Giấy chứng nhận an toàn kỹ thuật tàu cá (đối với tàu từ 12m trở lên).',
      'Bản chụp chứng chỉ chuyên môn của thuyền trưởng, máy trưởng tàu cá (đối với tàu từ 15m trở lên).',
      'Giấy xác nhận đã lắp đặt thiết bị giám sát hành trình (VMS) và mã định danh truyền dữ liệu về hệ thống quốc gia (đối với tàu từ 15m trở lên).'
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Nộp hồ sơ',
        detail: 'Chủ tàu gửi 01 bộ hồ sơ đến Chi cục Thủy sản hoặc qua Cổng Dịch vụ công tỉnh.',
        responsibleAgency: 'Bộ phận một cửa',
        duration: '0.5 ngày'
      },
      {
        stepNumber: 2,
        stepTitle: 'Kiểm tra điều kiện hạn ngạch và thiết bị',
        detail: 'Cơ quan thụ lý đối chiếu hạn ngạch Giấy phép khai thác của địa phương được Bộ NN&PTNT giao; kiểm tra tình trạng kết nối tín hiệu VMS trên Hệ thống giám sát tàu cá quốc gia.',
        responsibleAgency: 'Phòng Khai thác thủy sản',
        duration: '03 ngày làm việc'
      },
      {
        stepNumber: 3,
        stepTitle: 'Cấp Giấy phép khai thác',
        detail: 'Ban hành Giấy phép khai thác thủy sản nêu rõ: số đăng ký, vùng biển cho phép hoạt động (khơi/lộng/ven bờ), nghề chính, nghề phụ, thời hạn giấy phép (thường 24 - 60 tháng).',
        responsibleAgency: 'Chi cục Thủy sản',
        duration: '02 ngày làm việc'
      }
    ],
    importantNotes: [
      'Chỉ cấp giấy phép khi tàu nằm trong hạn ngạch đã được phê duyệt.',
      'Hết hạn giấy phép phải nộp hồ sơ xin cấp lại trước thời điểm hết hạn tối thiểu 30 ngày.',
      'Khi hoạt động trên biển, thuyền trưởng bắt buộc phải mang theo bản chính trên tàu.'
    ],
    formTemplateName: 'Mau_04_Don_xin_cap_GPKTTS.docx'
  },
  {
    id: 'proc-03-inspection',
    title: 'Thủ tục Đăng kiểm và cấp Giấy chứng nhận an toàn kỹ thuật tàu cá định kỳ',
    category: 'Đăng kiểm kỹ thuật',
    targetGroup: 'Chủ tàu cá có chiều dài lớn nhất từ 12 mét trở lên',
    competentAuthority: 'Cơ sở đăng kiểm tàu cá được Bộ NN&PTNT công nhận (Trung tâm Đăng kiểm tàu cá)',
    totalTime: '03 ngày làm việc sau khi kết thúc kiểm tra thực tế trên đà/dưới nước',
    fee: 'Theo biểu giá dịch vụ đăng kiểm quy định của Bộ Tài chính',
    legalBasis: 'Điều 68 Luật Thủy sản 2017; Thông tư 23/2018/TT-BNNPTNT và Thông tư 01/2022/TT-BNNPTNT.',
    requiredDocuments: [
      'Giấy đề nghị kiểm tra an toàn kỹ thuật tàu cá.',
      'Hồ sơ thiết kế kỹ thuật tàu cá (đối với kiểm tra lần đầu hoặc cải hoán).',
      'Giấy chứng nhận an toàn kỹ thuật kỳ trước.',
      'Nhật ký hoạt động và hồ sơ bảo dưỡng máy chính, máy phụ.'
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Yêu cầu kiểm tra & Đưa tàu lên đà',
        detail: 'Chủ tàu nộp đơn và thỏa thuận thời gian, địa điểm kiểm tra với Cơ sở đăng kiểm. Kéo tàu lên triền/đà để kiểm tra phần vỏ đáy, trục láp, chân vịt.',
        responsibleAgency: 'Chủ tàu & Cơ sở đăng kiểm',
        duration: '01 - 02 ngày'
      },
      {
        stepNumber: 2,
        stepTitle: 'Đăng kiểm viên kiểm tra hiện trường',
        detail: 'Đo độ dày tôn vỏ/gỗ, thử kín nước hầm hàng, kiểm tra máy chính, hệ thống lái, trang bị cứu sinh (phao áo, bè cứu sinh), cứu hỏa, thông tin liên lạc và VMS.',
        responsibleAgency: 'Đăng kiểm viên thủy sản',
        duration: 'Trong ngày'
      },
      {
        stepNumber: 3,
        stepTitle: 'Cấp Sổ chứng nhận an toàn kỹ thuật',
        detail: 'Đăng kiểm viên lập biên bản kiểm tra kỹ thuật và cấp Giấy chứng nhận an toàn kỹ thuật tàu cá có thời hạn tương ứng.',
        responsibleAgency: 'Cơ sở đăng kiểm tàu cá',
        duration: '02 ngày làm việc'
      }
    ],
    importantNotes: [
      'Tàu cá kiểm tra định kỳ hàng năm; kiểm tra trên đà chu kỳ 02 năm/lần.',
      'Tuyệt đối không đưa tàu ra khơi khi sổ đăng kiểm đã hết hạn dù chỉ 01 ngày.'
    ],
    formTemplateName: 'Mau_Don_yeu_cau_kiem_tra_dang_kiem.docx'
  },
  {
    id: 'proc-04-departure-arrival',
    title: 'Thủ tục Kiểm tra, kiểm soát tàu cá Xuất bến và Nhập bến (Hệ thống eCDT)',
    category: 'Kiểm soát cảng & IUU',
    targetGroup: 'Thuyền trưởng tàu cá có chiều dài từ 15 mét trở lên cập và rời cảng cá chỉ định',
    competentAuthority: 'Ban Quản lý Cảng cá & Văn phòng Kiểm soát nghề cá (Kiểm ngư, Biên phòng)',
    totalTime: '01 - 02 giờ trước giờ dự kiến xuất/nhập bến',
    fee: 'Không thu phí thủ tục kiểm soát nghề cá (chỉ thu giá dịch vụ cảng nếu bốc dỡ hàng)',
    legalBasis: 'Điều 61, 62 Luật Thủy sản 2017; Điều 37 Nghị định 37/2024/NĐ-CP; Thông tư 21/2018/TT-BNNPTNT.',
    requiredDocuments: [
      'Bản chính Giấy chứng nhận đăng ký tàu cá.',
      'Bản chính Giấy chứng nhận an toàn kỹ thuật còn hạn.',
      'Bản chính Giấy phép khai thác thủy sản còn hạn.',
      'Sổ danh bạ thuyền viên và Chứng chỉ thuyền trưởng, máy trưởng.',
      'Sổ Nhật ký khai thác thủy sản (ghi chép đầy đủ).',
      'Xác nhận kết nối tín hiệu VMS 24/7 từ nhà mạng.'
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: 'Thông báo trước khi vào/rời cảng',
        detail: 'Thuyền trưởng thông báo cho Ban Quản lý Cảng cá trước ít nhất 01 giờ khi cập cảng và trước ít nhất 02 giờ khi xuất bến qua điện thoại hoặc ứng dụng eCDT.',
        responsibleAgency: 'Thuyền trưởng',
        duration: 'Trước 01 - 02 giờ'
      },
      {
        stepNumber: 2,
        stepTitle: 'Kiểm tra hồ sơ và trang thiết bị thực tế',
        detail: 'Tổ liên ngành tại Văn phòng đại diện kiểm tra giấy tờ, kiểm tra thiết bị VMS, đối chiếu danh sách thuyền viên, kiểm tra ngư cụ trên tàu.',
        responsibleAgency: 'Văn phòng Kiểm soát nghề cá liên ngành',
        duration: '30 phút'
      },
      {
        stepNumber: 3,
        stepTitle: 'Giám sát bốc dỡ và cấp Biên bản bốc dỡ',
        detail: 'Giám sát 100% sản lượng thủy sản bốc dỡ qua cảng đối với tàu khơi, đối chiếu số liệu nhật ký khai thác, ký Biên bản bốc dỡ phục vụ cấp chứng nhận eCDT.',
        responsibleAgency: 'Cán bộ thống kê Ban Quản lý cảng cá',
        duration: 'Theo thời gian bốc dỡ'
      }
    ],
    importantNotes: [
      'Chỉ được cập cảng cá chỉ định có đủ năng lực giám sát IUU theo danh sách Bộ NN&PTNT công bố.',
      'Tàu có cảnh báo mất tín hiệu VMS sẽ bị lưu giữ tại cảng để xác minh làm rõ trước khi cho phép bốc dỡ cá.'
    ],
    formTemplateName: 'Mau_Bao_cao_xuat_nhap_ben_eCDT.pdf'
  }
];
