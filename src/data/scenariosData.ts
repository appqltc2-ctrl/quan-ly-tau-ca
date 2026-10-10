import { Scenario } from '../types';

export const PRACTICAL_SCENARIOS: Scenario[] = [
  {
    id: 'sc-01-vms-loss',
    title: 'Thiết bị VMS mất kết nối khi tàu đang hoạt động trên vùng biển khơi',
    topic: 'Quản lý thiết bị giám sát hành trình (VMS)',
    difficulty: 'Trung bình',
    description: 'Tàu cá mang số hiệu BV-98246-TS (chiều dài 19.5m, công suất 450CV) do Thuyền trưởng Nguyễn Văn An điều khiển đang đánh bắt tại tọa độ 09°45\'N - 108°12\'E (cách bờ biển khoảng 65 hải lý). Vào lúc 08h00 sáng, hệ thống màn hình VMS trên tàu báo mất tín hiệu vệ tinh. Thuyền trưởng kiểm tra thấy dây nguồn vẫn cắm nhưng đèn định vị không sáng. Sau 3 giờ tìm cách khởi động lại vẫn không có tín hiệu kết nối.',
    vesselContext: {
      vesselCode: 'BV-98246-TS',
      lengthMeters: 19.5,
      engineHp: 450,
      activityArea: 'Vùng khơi (Bà Rịa - Vũng Tàu)',
      crewCount: 11,
      equipmentStatus: 'VMS mất tín hiệu vệ tinh từ 08h00',
      coordinates: '09°45\'N - 108°12\'E'
    },
    options: [
      {
        id: 'opt-1a',
        text: 'Tiếp tục đánh bắt hết mẻ cá trong 3 ngày nữa rồi mới quay vào bờ sửa chữa, vì tàu vẫn còn trong vùng biển Việt Nam.',
        isCorrect: false,
        score: 15,
        feedback: 'Sai nghiêm trọng! Tàu từ 15m trở lên mất kết nối VMS quá 06 giờ mà không báo cáo vị trí sẽ bị xếp vào diện nghi vấn vi phạm IUU và bị xử phạt theo Nghị định 38/2024/NĐ-CP (mức phạt từ 20 đến 30 triệu đồng, tái phạm có thể tước bằng).'
      },
      {
        id: 'opt-1b',
        text: 'Tự dùng tua-vít tháo vỏ hộp VMS và cắt niêm phong kẹp chì ra xem có lỏng dây mạch bên trong không để tự hàn lại.',
        isCorrect: false,
        score: 10,
        feedback: 'Vi phạm nghiêm trọng! Hành vi tự ý phá niêm phong, tháo gỡ thiết bị VMS không có sự giám sát của đơn vị cung cấp thiết bị bị phạt từ 300.000.000 đồng đến 500.000.000 đồng theo Khoản 3 Điều 20 NĐ 38/2024/NĐ-CP.'
      },
      {
        id: 'opt-1c',
        text: 'Ngay lập tức sử dụng máy thông tin liên lạc HF/bộ đàm báo cáo vị trí (tọa độ) về Chi cục Thủy sản tỉnh và đơn vị cung cấp VMS; duy trì báo cáo định kỳ 06 giờ/lần; nhanh chóng thu lưới đưa tàu về bờ khắc phục sự cố trong vòng tối đa 10 ngày.',
        isCorrect: true,
        score: 100,
        feedback: 'Hoàn toàn chính xác! Đúng chuẩn quy định tại Khoản 2 Điều 44 Nghị định 26/2019/NĐ-CP (sửa đổi bởi NĐ 37/2024/NĐ-CP): Báo cáo vị trí qua thiết bị viễn thông thay thế 06 giờ/lần và đưa tàu về bờ khắc phục trước 10 ngày.'
      },
      {
        id: 'opt-1d',
        text: 'Nhờ tàu cá bạn bên cạnh mang giùm thiết bị VMS của mình lên tàu họ để giữ sóng liên tục cho đỡ bị phạt.',
        isCorrect: false,
        score: 0,
        feedback: 'Cực kỳ nguy hiểm! Hành vi gửi thiết bị VMS sang tàu khác bị phạt từ 800 triệu đến 1 tỷ đồng (Khoản 4 Điều 20 NĐ 38/2024/NĐ-CP), tước bằng thuyền trưởng 12 tháng, và có thể bị khởi tố hình sự theo Nghị quyết 04/2024/NQ-HĐTP.'
      }
    ],
    modelAnswer: {
      coreIssue: 'Xử lý sự cố mất kết nối thiết bị giám sát hành trình (VMS) khi đang hoạt động trên biển đối với tàu cá từ 15 mét trở lên.',
      legalBasis: 'Khoản 2 Điều 44 Nghị định 26/2019/NĐ-CP (được sửa đổi, bổ sung tại Nghị định 37/2024/NĐ-CP); Điều 20 Nghị định số 38/2024/NĐ-CP.',
      procedure: '1. Không được tự ý tháo mở vỏ máy, không can thiệp kẹp chì niêm phong.\n2. Lập tức sử dụng thiết bị thông tin HF/vô tuyến điện/điện thoại vệ tinh liên lạc về Đài bờ Chi cục Thủy sản hoặc Bộ đội Biên phòng và đơn vị cung cấp thiết bị.\n3. Báo cáo định kỳ tọa độ tàu cá tối thiểu 06 giờ/lần.\n4. Ghi chép nhật ký hành trình rõ thời điểm mất kết nối và các lần báo cáo tọa độ.\n5. Đưa tàu quay về cập cảng cá chỉ định để kiểm tra, khắc phục trong thời gian không quá 10 ngày kể từ khi mất tín hiệu.',
      penaltyOrCompliance: 'Nếu không báo cáo tọa độ 6h/lần hoặc quá 10 ngày không đưa tàu về bờ: Phạt tiền từ 20.000.000 đồng đến 30.000.000 đồng (Điều 20 NĐ 38/2024/NĐ-CP). Nếu tháo thiết bị: Phạt từ 300.000.000 đồng đến 500.000.000 đồng.',
      fullExplanation: 'Quy định quản lý VMS là một trong những tiêu chí cốt lõi trong khuyến nghị của Ủy ban Châu Âu (EC) về chống khai thác IUU. Việc chấp hành chế độ báo cáo 6h/lần qua máy HF và đưa tàu về cảng trước 10 ngày bảo đảm tính minh bạch và tránh bị xếp vào danh sách vi phạm nghiêm trọng.',
      practicalAdvice: 'Luôn lưu sẵn số điện thoại đường dây nóng trực ban trạm bờ Chi cục Thủy sản và số kỹ thuật nhà mạng vệ tinh (Viettel/VNPT/Vishipel) trong ca-bin.'
    },
    rubric: {
      issueScore: 20,
      basisScore: 30,
      actionScore: 30,
      procedureScore: 20
    }
  },
  {
    id: 'sc-02-unregistered-vessel',
    title: 'Tàu cá mua bán chưa sang tên đổi chủ nhưng đã đưa đi đánh bắt trên biển',
    topic: 'Đăng ký tàu cá & Thủ tục hành chính',
    difficulty: 'Cơ bản',
    description: 'Ông Trần Văn Bình mua lại một tàu cá vỏ gỗ dài 16m (công suất 380CV) từ một chủ tàu ở tỉnh Kiên Giang thông qua hợp đồng viết tay có công chứng xã vào tháng 3/2024. Vì đang mùa đánh bắt cá cơm, ông Bình chưa làm thủ tục xóa đăng ký ở Kiên Giang và chưa làm thủ tục cấp đăng ký mới mang tên mình tại Chi cục Thủy sản tỉnh Cà Mau, nhưng đã đưa tàu ra khơi.',
    vesselContext: {
      vesselCode: 'KG-91234-TS (chưa đổi tên mới)',
      lengthMeters: 16.0,
      engineHp: 380,
      activityArea: 'Vùng biển Cà Mau',
      crewCount: 8,
      equipmentStatus: 'Hồ sơ pháp lý chưa sang tên'
    },
    options: [
      {
        id: 'opt-2a',
        text: 'Có thể đi khai thác bình thường vì đã có hợp đồng mua bán công chứng, khi nào hết mùa biển thì về sang tên sau.',
        isCorrect: false,
        score: 10,
        feedback: 'Sai! Hợp đồng mua bán chỉ là căn cứ xác lập quyền sở hữu dân sự, không thay thế được Giấy chứng nhận đăng ký tàu cá và Giấy phép khai thác mang tên chủ sở hữu mới.'
      },
      {
        id: 'opt-2b',
        text: 'Tàu vi phạm quy định chưa làm thủ tục đăng ký lại khi thay đổi chủ sở hữu; đồng thời giấy phép khai thác của chủ cũ không còn giá trị hợp lệ. Bị phạt từ 5.000.000đ - 10.000.000đ về đăng ký và có thể bị phạt hành vi khai thác không phép từ 300 - 500 triệu đồng.',
        isCorrect: true,
        score: 100,
        feedback: 'Chính xác! Căn cứ Điều 67 Luật Thủy sản 2017, Điều 36 NĐ 26/2019/NĐ-CP và Điều 35, Điều 21 Nghị định 38/2024/NĐ-CP.'
      },
      {
        id: 'opt-2c',
        text: 'Chỉ cần tự sơn lại số hiệu tàu mới theo mã tỉnh Cà Mau (CM-xxxx-TS) là hợp lệ ra khơi.',
        isCorrect: false,
        score: 0,
        feedback: 'Hoàn toàn sai và vi phạm nghiêm trọng hành vi tự ý tẩy xóa, vẽ sai số hiệu tàu cá, sẽ bị tạm giữ phương tiện và xử lý nghiêm.'
      }
    ],
    modelAnswer: {
      coreIssue: 'Sử dụng tàu cá chuyển nhượng chưa đăng ký sang tên đổi chủ và không có Giấy phép khai thác thủy sản hợp lệ khi hoạt động trên biển.',
      legalBasis: 'Điều 67 Luật Thủy sản 2017; Điều 36, 37 Nghị định 26/2019/NĐ-CP; Điều 21, Điều 35 Nghị định 38/2024/NĐ-CP.',
      procedure: '1. Yêu cầu chủ cũ làm thủ tục xóa đăng ký tàu cá tại Chi cục Thủy sản tỉnh nơi đăng ký cũ (Kiên Giang) để lấy Giấy chứng nhận xóa đăng ký.\n2. Nộp hồ sơ xin cấp mới Giấy chứng nhận đăng ký tàu cá tại Chi cục Thủy sản nơi cư trú mới (Cà Mau).\n3. Đăng kiểm an toàn kỹ thuật tàu cá.\n4. Xin cấp Giấy phép khai thác thủy sản đứng tên chủ mới trong hạn ngạch cho phép.',
      penaltyOrCompliance: 'Mức phạt: 5.000.000đ - 10.000.000đ hành vi không làm thủ tục thay đổi chủ tàu (Điều 35 NĐ 38/2024); Nếu đi khai thác bị xử phạt hành vi không có giấy phép từ 300.000.000đ - 500.000.000đ đối với tàu từ 15m đến 24m (Điều 21 NĐ 38/2024).',
      fullExplanation: 'Tàu cá là phương tiện đặc thù gắn liền với quản lý hạn ngạch, an toàn sinh mạng và truy xuất nguồn gốc thủy sản. Việc mua bán bằng giấy tay không cho phép tàu hoạt động trên biển khi chưa hoàn tất thủ tục đăng ký và cấp giấy phép mới.',
      practicalAdvice: 'Trước khi giao tiền mua tàu cá, người mua cần yêu cầu bên bán cung cấp đầy đủ giấy tờ xóa đăng ký hoặc ủy quyền làm thủ tục chuyển vùng tại cơ quan thủy sản.'
    },
    rubric: {
      issueScore: 20,
      basisScore: 30,
      actionScore: 30,
      procedureScore: 20
    }
  },
  {
    id: 'sc-03-wrong-zone',
    title: 'Tàu cá chiều dài 17 mét đánh bắt trong vùng lộng (sai vùng quy định)',
    topic: 'Vùng khai thác & Tuyến khai thác hải sản',
    difficulty: 'Trung bình',
    description: 'Tàu cá QNg-96789-TS có chiều dài lớn nhất 17.2 mét được cấp giấy phép khai thác vùng khơi. Do phát hiện đàn mực xuất hiện dày đặc cách bờ chỉ 10 hải lý (nằm trong vùng lộng), Thuyền trưởng đã cho tàu hạ neo và giàn đèn đánh bắt mực tại khu vực này.',
    vesselContext: {
      vesselCode: 'QNg-96789-TS',
      lengthMeters: 17.2,
      engineHp: 500,
      activityArea: 'Vùng lộng (cách bờ 10 hải lý)',
      crewCount: 14,
      equipmentStatus: 'Đầy đủ VMS, định vị ghi nhận vị trí cách bờ 10 hải lý'
    },
    options: [
      {
        id: 'opt-3a',
        text: 'Thuyền trưởng được phép khai thác ở vùng lộng nếu có đóng thuế tài nguyên đầy đủ cho địa phương.',
        isCorrect: false,
        score: 0,
        feedback: 'Sai hoàn toàn! Quy định phân vùng căn cứ vào chiều dài tàu nhằm bảo vệ nguồn lợi ven bờ, không phụ thuộc vào tiền thuế.'
      },
      {
        id: 'opt-3b',
        text: 'Vi phạm quy định về vùng khai thác. Tàu từ 15 mét trở lên chỉ được phép hoạt động tại vùng khơi. Hành vi đưa tàu 17.2m khai thác ở vùng lộng bị phạt tiền từ 100.000.000đ đến 150.000.000đ theo Điều 22 Nghị định 38/2024/NĐ-CP, tước bằng thuyền trưởng từ 3 - 6 tháng.',
        isCorrect: true,
        score: 100,
        feedback: 'Chính xác! Căn cứ Điều 42 Nghị định 26/2019/NĐ-CP và Khoản 3 Điều 22 Nghị định 38/2024/NĐ-CP.'
      },
      {
        id: 'opt-3c',
        text: 'Chỉ bị nhắc nhở nếu chưa bốc dỡ hải sản lên bờ.',
        isCorrect: false,
        score: 15,
        feedback: 'Sai! Lực lượng tuần tra Kiểm ngư/Cảnh sát biển khi phát hiện phương tiện đang thả lưới/câu sai vùng sẽ lập biên bản vi phạm hành chính tại chỗ.'
      }
    ],
    modelAnswer: {
      coreIssue: 'Tàu cá có chiều dài lớn nhất từ 15 mét trở lên khai thác thủy sản tại vùng biển không được phép (khai thác tại vùng lộng thay vì vùng khơi).',
      legalBasis: 'Khoản 4 Điều 42 Nghị định 26/2019/NĐ-CP; Khoản 3 Điều 22 Nghị định 38/2024/NĐ-CP.',
      procedure: '1. Thuyền trưởng phải dừng ngay hoạt động thả lưới/câu tại vùng lộng.\n2. Thu hồi ngư cụ và di chuyển phương tiện ra ngoài đường ranh giới vùng khơi (ngoài 24 hải lý hoặc đường phân định vùng lộng/khơi).\n3. Khi cơ quan chức năng kiểm tra: Phải xuất trình giấy tờ, chấp hành hiệu lệnh và ký biên bản vi phạm (nếu có).',
      penaltyOrCompliance: 'Phạt tiền từ 100.000.000 đồng đến 150.000.000 đồng đối với hành vi sử dụng tàu cá có chiều dài từ 15m trở lên khai thác tại vùng lộng hoặc ven bờ. Hình thức phạt bổ sung: Tước quyền sử dụng chứng chỉ thuyền trưởng từ 03 đến 06 tháng.',
      fullExplanation: 'Quy định phân vùng nhằm phân tầng nguồn lợi: vùng ven bờ và lộng dành cho tàu nhỏ sinh kế của ngư dân ven bờ và bảo vệ bãi đẻ non nớt của các loài thủy sản. Tàu lớn công suất cao càn quét vùng lộng sẽ gây hủy diệt sinh thái nghiêm trọng.',
      practicalAdvice: 'Thuyền trưởng cần cài đặt đường ranh giới phân vùng ven bờ, vùng lộng, vùng khơi lên hải đồ điện tử hoặc máy định vị GPS để cảnh báo âm thanh khi tàu chớm chạm vào ranh giới.'
    },
    rubric: {
      issueScore: 20,
      basisScore: 30,
      actionScore: 30,
      procedureScore: 20
    }
  },
  {
    id: 'sc-04-logbook-falsification',
    title: 'Thuyền trưởng không ghi nhật ký khai thác hoặc ghi sai sự thật sản lượng cá',
    topic: 'Nhật ký khai thác & Truy xuất nguồn gốc thủy sản (eCDT)',
    difficulty: 'Cơ bản',
    description: 'Tàu đánh bắt xa bờ BĐ-97112-TS (chiều dài 21 mét) đi biển 25 ngày trở về cảng cá Quy Nhơn. Khi Văn phòng Thanh tra kiểm soát nghề cá tại cảng lên tàu kiểm tra, Thuyền trưởng nộp một cuốn nhật ký giấy trắng tinh, giải thích là do sóng to gió lớn bận làm cá nên chưa kịp ghi chép, xin được ngồi ghi bổ sung trong 30 phút.',
    vesselContext: {
      vesselCode: 'BĐ-97112-TS',
      lengthMeters: 21.0,
      engineHp: 720,
      activityArea: 'Vùng biển Trường Sa',
      crewCount: 16,
      equipmentStatus: 'Nhật ký khai thác chưa ghi chép bất kỳ trang nào'
    },
    options: [
      {
        id: 'opt-4a',
        text: 'Cán bộ cảng có thể châm chước cho thuyền trưởng ngồi ghi lại số liệu ước tính trước khi cân cá lên xe đông lạnh.',
        isCorrect: false,
        score: 0,
        feedback: 'Sai nghiêm trọng! Đây là hành vi hợp thức hóa hồ sơ gian dối bị nghiêm cấm trong quy trình chống khai thác IUU. Cán bộ để xảy ra việc này sẽ bị xử lý kỷ luật.'
      },
      {
        id: 'opt-4b',
        text: 'Hành vi không ghi nhật ký khai thác đối với tàu từ 15m đến dưới 24m bị phạt tiền từ 25.000.000đ đến 50.000.000đ theo Điều 28 Nghị định 38/2024/NĐ-CP; lô thủy sản sẽ không được cấp Giấy xác nhận nguyên liệu thủy sản khai thác (SC) xuất khẩu.',
        isCorrect: true,
        score: 100,
        feedback: 'Chính xác! Nhật ký khai thác phải ghi chép theo từng mẻ lưới ngay trên biển và nộp trong vòng 2-24h khi cập cảng.'
      },
      {
        id: 'opt-4c',
        text: 'Chỉ bị phạt 500.000 đồng tiền lệ phí hành chính.',
        isCorrect: false,
        score: 10,
        feedback: 'Sai! Mức phạt tiền theo NĐ 38/2024 lên tới hàng chục triệu đồng và ảnh hưởng trực tiếp đến truy xuất nguồn gốc eCDT.'
      }
    ],
    modelAnswer: {
      coreIssue: 'Không ghi chép nhật ký khai thác thủy sản trong chuyến biển đối với tàu cá có chiều dài lớn nhất từ 15m đến dưới 24m.',
      legalBasis: 'Điều 60 Luật Thủy sản 2017; Điều 36 Thông tư 21/2018/TT-BNNPTNT; Khoản 2 Điều 28 Nghị định số 38/2024/NĐ-CP.',
      procedure: '1. Thanh tra nghề cá tại cảng tiến hành lập biên bản vi phạm hành chính đối với thuyền trưởng.\n2. Giám sát chặt chẽ toàn bộ sản lượng thủy sản bốc dỡ qua cảng để đối chiếu chủng loại và khối lượng thực tế.\n3. Từ chối cấp Giấy xác nhận nguyên liệu thủy sản khai thác (SC) phục vụ xuất khẩu đối với lô hàng này.\n4. Ban hành quyết định xử phạt vi phạm hành chính.',
      penaltyOrCompliance: 'Phạt tiền từ 25.000.000 đồng đến 50.000.000 đồng đối với hành vi không ghi hoặc ghi không đúng nhật ký khai thác tàu cá từ 15m đến dưới 24m. Thuyền trưởng có thể bị tước quyền sử dụng chứng chỉ từ 03 đến 06 tháng.',
      fullExplanation: 'Nhật ký khai thác là mắt xích pháp lý quyết định tính hợp pháp của lô cá xuất khẩu sang thị trường Châu Âu. Mọi sự gian lận hoặc thiếu nhật ký đều vi phạm quy định chống khai thác IUU của Việt Nam và quốc tế.',
      practicalAdvice: 'Khuyến khích thuyền trưởng ghi chép nhật ký điện tử (e-logbook) trên điện thoại hoặc máy tính bảng kết nối eCDT ngay sau mỗi mẻ kéo lưới.'
    },
    rubric: {
      issueScore: 20,
      basisScore: 30,
      actionScore: 30,
      procedureScore: 20
    }
  },
  {
    id: 'sc-05-border-crossing',
    title: 'Tàu cá vượt ranh giới cho phép trên biển sang vùng biển nước láng giềng',
    topic: 'Vượt ranh giới trên biển & Chống khai thác IUU',
    difficulty: 'Nâng cao',
    description: 'Tàu cá KG-95432-TS do thuyền trưởng điều khiển đã vượt qua đường phân định ranh giới cho phép trên vùng biển Tây Nam khoảng 5 hải lý. Hệ thống giám sát tàu cá tại Trung tâm Giám sát quốc gia (Cục Thủy sản) phát hiện tàu phát tín hiệu cảnh báo vượt ranh giới (vùng đỏ). Trực ban đã lập tức liên lạc qua hệ thống viễn thông nhưng tàu không trả lời và tiếp tục tiến sâu vào vùng biển nước ngoài.',
    vesselContext: {
      vesselCode: 'KG-95432-TS',
      lengthMeters: 24.5,
      engineHp: 800,
      activityArea: 'Khu vực giáp ranh vùng biển Tây Nam',
      crewCount: 18,
      equipmentStatus: 'VMS cảnh báo vượt ranh giới trên phần mềm giám sát'
    },
    options: [
      {
        id: 'opt-5a',
        text: 'Hành vi này bị phạt tiền từ 800 triệu đến 1 tỷ đồng theo NĐ 38/2024/NĐ-CP, tước bằng thuyền trưởng, tịch thu toàn bộ hải sản, và chủ tàu/thuyền trưởng có thể bị truy cứu trách nhiệm hình sự theo Nghị quyết 04/2024/NQ-HĐTP của TANDTC.',
        isCorrect: true,
        score: 100,
        feedback: 'Rất chính xác! Đây là vi phạm IUU mức độ cao nhất (Thẻ vàng/Thẻ đỏ), vừa bị xử phạt hành chính mức tối đa 1 tỷ đồng vừa đối mặt với án tù hình sự về tội vi phạm quy định xuất cảnh trái phép.'
      },
      {
        id: 'opt-5b',
        text: 'Chỉ vi phạm dân sự, chỉ cần nộp phạt thuế hải quan nước ngoài là được.',
        isCorrect: false,
        score: 0,
        feedback: 'Hoàn toàn sai! Tàu xâm phạm vùng biển nước ngoài có nguy cơ bị lực lượng chấp pháp nước ngoài bắt giữ, tịch thu tàu và phạt tù ngư dân.'
      },
      {
        id: 'opt-5c',
        text: 'Cơ quan chức năng chỉ cảnh báo, không có chế tài xử phạt nếu tàu chưa bị nước bạn bắt.',
        isCorrect: false,
        score: 10,
        feedback: 'Sai! Dữ liệu hành trình VMS là chứng cứ pháp lý điện tử độc lập để xử phạt nguội khi tàu về cảng Việt Nam.'
      }
    ],
    modelAnswer: {
      coreIssue: 'Tàu cá khai thác hải sản vượt ranh giới cho phép trên biển hoặc vi phạm vùng biển nước ngoài.',
      legalBasis: 'Điều 60 Luật Thủy sản 2017; Điểm b Khoản 4 Điều 22 Nghị định 38/2024/NĐ-CP; Nghị quyết 04/2024/NQ-HĐTP của Hội đồng Thẩm phán TANDTC.',
      procedure: '1. Trung tâm giám sát phát thông báo khẩn cấp tới Bộ Tư lệnh Vùng Cảnh sát biển, Bộ đội Biên phòng và Chi cục Kiểm ngư địa phương.\n2. Liên lạc với chủ tàu trên đất liền yêu cầu liên lạc khẩn cấp bằng mọi cách buộc thuyền trưởng quay đầu về vùng biển Việt Nam ngay lập tức.\n3. Khi tàu về cảng: Lực lượng chức năng phối hợp công an điều tra, lập hồ sơ xử lý hành chính hoặc chuyển cơ quan điều tra hình sự nếu có dấu hiệu tổ chức đưa tàu xuất cảnh trái phép.',
      penaltyOrCompliance: 'Xử phạt hành chính: Phạt tiền từ 800.000.000 đồng đến 1.000.000.000 đồng; tịch thu toàn bộ thủy sản khai thác; tước quyền sử dụng chứng chỉ thuyền trưởng từ 06 đến 12 tháng.\nTrách nhiệm hình sự: Khởi tố theo Điều 347, 348 Bộ luật Hình sự (phạt tù từ 01 năm đến 15 năm).',
      fullExplanation: 'Hành vi vi phạm vùng biển nước ngoài là nguyên nhân chủ yếu khiến EC duy trì Thẻ vàng đối với thủy sản Việt Nam. Hiện nay Chính phủ và cơ quan tư pháp áp dụng biện pháp mạnh nhất, xử lý hình sự đối với các đối tượng cầm đầu, môi giới.',
      practicalAdvice: 'Luôn kiểm tra hải đồ tọa độ ranh giới trên máy định vị, tuyệt đối không nghe theo lời xúi giục của các đầu nậu hứa bao bọc vùng biển nước ngoài.'
    },
    rubric: {
      issueScore: 20,
      basisScore: 30,
      actionScore: 30,
      procedureScore: 20
    }
  },
  {
    id: 'sc-06-expired-inspection',
    title: 'Tàu cá hết hạn Giấy chứng nhận an toàn kỹ thuật (Sổ đăng kiểm) nhưng vẫn ra khơi',
    topic: 'Đăng kiểm & An toàn kỹ thuật tàu cá',
    difficulty: 'Cơ bản',
    description: 'Tàu cá KH-92345-TS (chiều dài 15.5m) có Sổ đăng kiểm an toàn kỹ thuật hết hạn vào ngày 10/08/2024. Đến ngày 05/09/2024 (quá hạn gần 1 tháng), do chuẩn bị vào vụ cá nục, chủ tàu chưa đưa tàu lên đà kiểm tra mà giao tàu cho thuyền trưởng chở 10 bạn thuyền ra khơi đánh bắt.',
    vesselContext: {
      vesselCode: 'KH-92345-TS',
      lengthMeters: 15.5,
      engineHp: 400,
      activityArea: 'Vùng biển Khánh Hòa',
      crewCount: 10,
      equipmentStatus: 'Sổ kiểm định kỹ thuật quá hạn 26 ngày'
    },
    options: [
      {
        id: 'opt-6a',
        text: 'Tàu vẫn an toàn nếu máy nổ êm và thân vỏ không bị rò rỉ nước, chủ tàu tự chịu trách nhiệm nếu xảy ra sự cố.',
        isCorrect: false,
        score: 0,
        feedback: 'Sai hoàn toàn! Đăng kiểm là điều kiện an toàn sinh mạng bắt buộc được pháp luật quy định, không thể cảm tính tự chịu trách nhiệm.'
      },
      {
        id: 'opt-6b',
        text: 'Hành vi sử dụng tàu cá có Giấy chứng nhận an toàn kỹ thuật hết hạn dưới 01 tháng bị phạt từ 5.000.000đ - 10.000.000đ; Trạm Kiểm soát Biên phòng kiên quyết không cấp phép xuất bến.',
        isCorrect: true,
        score: 100,
        feedback: 'Chính xác! Căn cứ Điều 36 Nghị định 38/2024/NĐ-CP và quy chế kiểm soát xuất nhập bến tàu cá.'
      },
      {
        id: 'opt-6c',
        text: 'Chỉ cần đóng phí phạt trễ hạn 200.000đ tại trạm biên phòng là được cho đi ngay.',
        isCorrect: false,
        score: 10,
        feedback: 'Sai! Biên phòng không có chức năng thu phí trễ hạn và bắt buộc phải tạm giữ phương tiện ở lại cảng.'
      }
    ],
    modelAnswer: {
      coreIssue: 'Đưa tàu cá vào hoạt động khi Giấy chứng nhận an toàn kỹ thuật tàu cá (đăng kiểm) đã hết hiệu lực.',
      legalBasis: 'Điều 68 Luật Thủy sản 2017; Khoản 1 Điều 36 Nghị định số 38/2024/NĐ-CP; Thông tư 23/2018/TT-BNNPTNT.',
      procedure: '1. Trạm Kiểm soát Biên phòng và Ban Quản lý Cảng cá từ chối giải quyết thủ tục xuất bến đối với tàu cá.\n2. Yêu cầu chủ tàu liên hệ cơ sở đăng kiểm tàu cá được công nhận để tiến hành kiểm tra trên đà và cấp gia hạn hoặc cấp mới Giấy chứng nhận an toàn kỹ thuật.\n3. Lập biên bản xử phạt vi phạm hành chính nếu tàu đã tự ý di chuyển hoạt động ngoài khơi trước đó.',
      penaltyOrCompliance: 'Phạt tiền từ 5.000.000 đồng đến 10.000.000 đồng (hết hạn dưới 01 tháng); Phạt tiền từ 15.000.000 đồng đến 25.000.000 đồng (hết hạn từ 01 tháng trở lên đối với tàu từ 15 mét trở lên).',
      fullExplanation: 'Đăng kiểm kỹ thuật đảm bảo vỏ tàu, trang thiết bị cứu sinh, cứu hỏa, hệ thống liên lạc và động lực đủ khả năng chịu đựng sóng gió trên biển, bảo vệ sinh mạng thuyền viên.',
      practicalAdvice: 'Chủ tàu nên chủ động liên hệ Trung tâm Đăng kiểm trước khi hết hạn sổ 15-30 ngày để sắp xếp lịch lên đà bảo dưỡng thân tàu và kiểm tra máy chính.'
    },
    rubric: {
      issueScore: 20,
      basisScore: 30,
      actionScore: 30,
      procedureScore: 20
    }
  },
  {
    id: 'sc-07-unqualified-crew',
    title: 'Chủ tàu sử dụng thuyền viên không có tên trong Sổ danh bạ và thiếu chứng chỉ an toàn',
    topic: 'Thuyền viên & Lao động trên tàu cá',
    difficulty: 'Trung bình',
    description: 'Chủ tàu cá ĐNa-92881-TS chuẩn bị xuất bến đi đánh cá. Do 3 thuyền viên cũ nghỉ ốm, chủ tàu vội vàng thuê 3 lao động thời vụ mới từ trên bờ xuống, chưa từng đi biển, không có chứng chỉ chuyên môn an toàn kỹ thuật và không có tên trong Sổ danh bạ thuyền viên của tàu.',
    vesselContext: {
      vesselCode: 'ĐNa-92881-TS',
      lengthMeters: 18.2,
      engineHp: 520,
      activityArea: 'Vùng biển Đà Nẵng - Hoàng Sa',
      crewCount: 12,
      equipmentStatus: '3/12 người không có giấy tờ chứng chỉ'
    },
    options: [
      {
        id: 'opt-7a',
        text: 'Có thể đi biển vì người lao động tự nguyện đi kiếm sống, chỉ cần chủ tàu trả lương đầy đủ.',
        isCorrect: false,
        score: 0,
        feedback: 'Sai! Pháp luật quy định điều kiện an toàn lao động đặc biệt nghiêm ngặt đối với nghề đi biển.'
      },
      {
        id: 'opt-7b',
        text: 'Chủ tàu bị xử phạt tiền theo Điều 37 NĐ 38/2024/NĐ-CP do bố trí người không đủ điều kiện làm việc trên tàu; Trạm Biên phòng sẽ đình chỉ xuất bến cho đến khi bổ sung đúng thuyền viên hợp lệ.',
        isCorrect: true,
        score: 100,
        feedback: 'Chính xác! Điều 71 Luật Thủy sản và Điều 37 NĐ 38/2024/NĐ-CP.'
      },
      {
        id: 'opt-7c',
        text: 'Thuyền trưởng chỉ cần viết giấy cam kết bảo lãnh là được đi.',
        isCorrect: false,
        score: 15,
        feedback: 'Sai! Cam kết cá nhân không có giá trị pháp lý thay thế chứng chỉ chuyên môn và danh bạ thuyền viên.'
      }
    ],
    modelAnswer: {
      coreIssue: 'Sử dụng thuyền viên làm việc trên tàu cá không đáp ứng điều kiện chuyên môn và không có tên trong Sổ danh bạ thuyền viên.',
      legalBasis: 'Điều 71 Luật Thủy sản 2017; Điều 37 Nghị định số 38/2024/NĐ-CP.',
      procedure: '1. Thuyền trưởng phải kê khai bổ sung danh sách thuyền viên lên Trạm kiểm soát Biên phòng và Chi cục Thủy sản để xác nhận vào Sổ danh bạ.\n2. Những người chưa có chứng chỉ an toàn kỹ thuật bắt buộc phải tham gia khóa tập huấn ngắn hạn để được cấp chứng chỉ trước khi đi biển.\n3. Đăng ký mua bảo hiểm tai nạn thuyền viên theo quy định.',
      penaltyOrCompliance: 'Phạt tiền từ 2.000.000 đồng đến 5.000.000 đồng đối với hành vi sử dụng thuyền viên không có tên trong sổ danh bạ hoặc không có chứng chỉ chuyên môn.',
      fullExplanation: 'Nghề cá là ngành nghề nặng nhọc, nguy hiểm cao. Thuyền viên chưa được đào tạo kỹ năng cứu sinh, cứu hỏa dễ gặp tai nạn lao động thương vong khi gặp bão gió hoặc rơi xuống biển.',
      practicalAdvice: 'Chủ tàu nên ký hợp đồng lao động và đăng ký làm thẻ thuyền viên chính thức tại Chi cục Thủy sản địa phương.'
    },
    rubric: {
      issueScore: 20,
      basisScore: 30,
      actionScore: 30,
      procedureScore: 20
    }
  },
  {
    id: 'sc-08-inspection-procedure',
    title: 'Xử lý tình huống kiểm tra trên biển khi phát hiện kích thước mắt lưới nhỏ hơn quy định',
    topic: 'Kiểm soát trên biển & Lập biên bản vi phạm',
    difficulty: 'Nâng cao',
    description: 'Tàu Kiểm ngư KN-412 tiến hành áp mạn kiểm tra đột xuất tàu cá BT-99123-TS đang hành nghề lưới kéo (cào) tại vùng biển Đông Nam Bộ. Qua đo đạc bằng thước kẹp chuyên dụng, Đội Kiểm ngư phát hiện kích thước mắt lưới ở đọt lưới (túi lưới) chỉ đạt 20mm (trong khi quy định tối thiểu của nghề cào khơi là 28mm theo Quy chuẩn kỹ thuật). Thuyền trưởng phân bua là lưới bị co lại do ngâm nước biển lâu ngày.',
    vesselContext: {
      vesselCode: 'BT-99123-TS',
      lengthMeters: 22.5,
      engineHp: 750,
      activityArea: 'Vùng biển Đông Nam Bộ',
      crewCount: 15,
      equipmentStatus: 'Mắt lưới túi cào đo được 20mm (dưới chuẩn 28mm)'
    },
    options: [
      {
        id: 'opt-8a',
        text: 'Kiểm ngư lập biên bản vi phạm hành chính, niêm phong tạm giữ ngư cụ vi phạm, giải thích rõ quy định pháp luật và buộc cắt bỏ phần túi lưới không đúng kích thước, xử phạt theo quy định.',
        isCorrect: true,
        score: 100,
        feedback: 'Rất chính xác! Trình tự lập biên bản, tạm giữ tang vật và xử lý đúng thẩm quyền lực lượng Kiểm ngư.'
      },
      {
        id: 'opt-8b',
        text: 'Kiểm ngư bỏ qua vì lý do lưới co lại do nước biển là hợp lý.',
        isCorrect: false,
        score: 0,
        feedback: 'Sai! Quy chuẩn đo đạc kích thước mắt lưới tính theo trạng thái ướt quy định trong tiêu chuẩn quốc gia.'
      },
      {
        id: 'opt-8c',
        text: 'Thuyền trưởng có quyền chống đối không ký biên bản để biên bản mất hiệu lực.',
        isCorrect: false,
        score: 10,
        feedback: 'Sai! Thuyền trưởng từ chối ký thì có chữ ký của người chứng kiến hoặc ghi rõ lý do, biên bản vẫn có đầy đủ giá trị pháp lý thi hành.'
      }
    ],
    modelAnswer: {
      coreIssue: 'Sử dụng ngư cụ khai thác thủy sản có kích thước mắt lưới nhỏ hơn quy định tại Quy chuẩn kỹ thuật quốc gia.',
      legalBasis: 'Điều 6, Điều 60 Luật Thủy sản 2017; Nghị định 26/2019/NĐ-CP (sửa đổi bởi NĐ 37/2024/NĐ-CP); Điều 27 Nghị định 38/2024/NĐ-CP.',
      procedure: '1. Cán bộ Kiểm ngư/Thanh tra thực hiện kiểm tra tối thiểu 20 mắt lưới ngẫu nhiên tại phần đọt lưới theo phương pháp đo tiêu chuẩn.\n2. Lập Biên bản kiểm tra an toàn kỹ thuật và Biên bản vi phạm hành chính có chữ ký của thuyền trưởng và các bên chứng kiến.\n3. Tạm giữ tang vật (ngư cụ vi phạm).\n4. Yêu cầu thuyền trưởng chấm dứt hành vi vi phạm, áp dụng biện pháp khắc phục hậu quả (thay thế túi lưới đúng quy chuẩn).',
      penaltyOrCompliance: 'Phạt tiền từ 10.000.000 đồng đến 20.000.000 đồng đối với tàu dưới 15m; Phạt từ 20.000.000 đồng đến 40.000.000 đồng đối với tàu từ 15m trở lên. Tịch thu phần ngư cụ vi phạm.',
      fullExplanation: 'Mắt lưới quá nhỏ sẽ tận diệt cá con, tôm non, làm suy kiệt trầm trọng nguồn lợi thủy sản tầng đáy và làm suy thoái đa dạng sinh học biển.',
      practicalAdvice: 'Chủ cơ sở may lưới và thuyền trưởng phải dùng thước đo mắt lưới trước khi mua và lắp vào tàu cá theo đúng quy chuẩn quy định.'
    },
    rubric: {
      issueScore: 20,
      basisScore: 30,
      actionScore: 30,
      procedureScore: 20
    }
  }
];
