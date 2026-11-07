import React from 'react';
import { NavTab } from '../components/Header';
import { MuongDivider } from '../components/MuongDivider';

interface AboutViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Editorial Dossier Header */}
      <section className="w-full bg-[#f6f3f2] py-12 lg:py-20 px-4 md:px-10 lg:px-20 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6 relative z-10">
          {/* Archival Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#e5e2e1]/60">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#f0eded] font-label-archive font-mono text-xs text-[#7f5600] font-semibold uppercase tracking-wider">
                Đề Tài Nghiên Cứu I01
              </span>
              <span className="px-3 py-1 rounded bg-[#f0eded] font-label-archive font-mono text-xs text-[#50443f] uppercase">
                Mã Hồ Sơ: PH60600
              </span>
              <span className="px-3 py-1 rounded bg-[#2a4a41] text-[#96b9ad] font-label-archive font-mono text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Khảo Cứu Dân Tộc Học Đô Thị
              </span>
            </div>
            <div className="text-[#50443f] text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#7f5600]">history_edu</span>
              <span>Cập nhật mục lục: Quý IV/2024</span>
            </div>
          </div>

          {/* Main Title & Academic Epigraph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] tracking-widest font-semibold">
                Bảo tồn bản sắc · Đô thị hóa · Kho lưu trữ số
              </span>
              <h1 className="font-display-hero font-serif text-3xl md:text-5xl text-[#43271a] tracking-tight leading-tight">
                Hành trình văn hóa của cộng đồng người Mường giữa lòng Hà Nội
              </h1>
              <div className="w-24 h-1 bg-[#fec25f] rounded-full"></div>
            </div>

            <div className="lg:col-span-4 bg-[#f0eded] p-6 rounded-xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between gap-4">
              <div className="flex items-center gap-2 text-[#7f5600]">
                <span className="material-symbols-outlined text-[20px]">format_quote</span>
                <span className="font-label-archive font-mono text-xs uppercase tracking-wider font-semibold">Tôn chỉ khảo sát</span>
              </div>
              <p className="font-quote-editorial font-serif text-xs md:text-sm text-[#50443f] italic leading-relaxed">
                “Di cư không chỉ là sự thay đổi nơi cư trú mà còn mở ra quá trình giao lưu và thích nghi văn hóa. Đối với người Mường đến sinh sống, học tập và làm việc tại Hà Nội, những ký ức về quê hương, tiếng nói, phong tục và sinh hoạt gia đình là các khía cạnh cần được tìm hiểu để nhận diện sự tiếp nối và biến đổi bản sắc trong môi trường đô thị.”
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#d4c3bc]/60 text-xs text-[#50443f]">
                <span>Trích Đề cương Đề tài I01</span>
                <span className="font-mono text-[#43271a] font-bold">Bùi Trung Nam</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Counter Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e5e2e1] flex flex-col">
              <span className="font-mono text-xs uppercase text-[#50443f]">Không gian khảo sát</span>
              <span className="font-serif text-2xl md:text-3xl text-[#43271a] font-bold mt-1">07</span>
              <span className="text-xs text-[#50443f]">Địa bàn quận &amp; huyện</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e5e2e1] flex flex-col">
              <span className="font-mono text-xs uppercase text-[#50443f]">Nhóm hiện vật &amp; diễn xướng</span>
              <span className="font-serif text-2xl md:text-3xl text-[#43271a] font-bold mt-1">06</span>
              <span className="text-xs text-[#50443f]">Trụ cột di sản phi vật thể</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e5e2e1] flex flex-col">
              <span className="font-mono text-xs uppercase text-[#50443f]">Mẫu phỏng vấn điền dã</span>
              <span className="font-serif text-2xl md:text-3xl text-[#43271a] font-bold mt-1">42+</span>
              <span className="text-xs text-[#50443f]">Nghệ nhân, di dân, sinh viên</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e5e2e1] flex flex-col">
              <span className="font-mono text-xs uppercase text-[#50443f]">Quy chuẩn dữ liệu</span>
              <span className="font-serif text-2xl md:text-3xl text-[#43271a] font-bold mt-1">100%</span>
              <span className="text-xs text-[#50443f]">Đối chiếu chéo &amp; kiểm chứng</span>
            </div>
          </div>
        </div>
      </section>

      {/* Khối 1: Tổng quan đề tài & Mục tiêu số hóa */}
      <section className="w-full py-16 px-4 md:px-10 lg:px-20 bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] tracking-widest font-semibold">
                Khối 01 · Định Hướng Học Thuật
              </span>
              <h2 className="font-headline-lg font-serif text-2xl md:text-3xl text-[#43271a]">
                Tổng quan đề tài &amp; Mục tiêu số hóa
              </h2>
              <p className="text-sm text-[#50443f] leading-relaxed">
                Phương pháp kết hợp giữa Dân tộc học nhân văn (Ethnography) và Khoa học Nhân văn Số (Digital Humanities) nhằm bảo tồn và tái sinh không gian văn hóa Mường giữa nhịp sống đô thị hoá thần tốc.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-[#f0eded] font-mono text-xs text-[#50443f] border border-[#d4c3bc]">
              CIDOC-CRM ARCHITECTURE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#fcf9f8] p-6 rounded-xl flex flex-col justify-between gap-6 border border-[#e5e2e1] shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#5c3d2e] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Mục tiêu 01</span>
                  <h3 className="font-serif text-lg font-bold text-[#43271a]">
                    Kho lưu trữ số tương tác &amp; Kiểm chứng học thuật
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-[#50443f] leading-relaxed">
                  Xây dựng kho dữ liệu mở có đối chiếu chéo (cross-reference) về cả di sản vật thể (trang phục, công cụ, kiến trúc nhà sàn) và phi vật thể (sử thi Mo Mường, làn điệu Rang/Đang, phong tục cúng vía). Toàn bộ dữ liệu được gán mã danh mục chuẩn học thuật Dublin Core.
                </p>
              </div>
              <div className="bg-[#f0eded] p-2.5 rounded-lg flex items-center justify-between text-xs text-[#50443f]">
                <span>Tiêu chuẩn metadata</span>
                <span className="font-mono text-[#43271a] font-bold">I01-DS-CATALOG</span>
              </div>
            </div>

            <div className="bg-[#fcf9f8] p-6 rounded-xl flex flex-col justify-between gap-6 border border-[#e5e2e1] shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#2a4a41] text-[#96b9ad] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">published_with_changes</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Mục tiêu 02</span>
                  <h3 className="font-serif text-lg font-bold text-[#43271a]">
                    Nhận diện biến đổi &amp; Tiếp biến văn hóa
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-[#50443f] leading-relaxed">
                  Phân tích các cơ chế thích nghi văn hóa của người Mường tại Hà Nội: Sự thu hẹp không gian âm thanh cồng chiêng trong ngõ phố đô thị; sự biến đổi từ mâm cỗ lá đại gia đình sang bữa ăn thích ứng nhịp sống công nghiệp; và nỗ lực bảo lưu tiếng Mường giữa thế hệ trẻ.
                </p>
              </div>
              <div className="bg-[#f0eded] p-2.5 rounded-lg flex items-center justify-between text-xs text-[#50443f]">
                <span>Góc nhìn tiếp cận</span>
                <span className="font-mono text-[#7f5600] font-bold">Urban Transculturation</span>
              </div>
            </div>

            <div className="bg-[#fcf9f8] p-6 rounded-xl flex flex-col justify-between gap-6 border border-[#e5e2e1] shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#fec25f] text-[#754f00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">diversity_3</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Mục tiêu 03</span>
                  <h3 className="font-serif text-lg font-bold text-[#43271a]">
                    Cầu nối số hóa cho thế hệ di dân đương đại
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-[#50443f] leading-relaxed">
                  Thiết lập giao diện tương tác số thân thiện cho sinh viên, công nhân và trí thức Mường đang sống tại Hà Nội, giúp kết nối mạng lưới hội đồng hương, tìm lại cội nguồn dòng họ, và đóng góp trực tiếp hồi ức gia đình vào cơ sở dữ liệu chung.
                </p>
              </div>
              <div className="bg-[#f0eded] p-2.5 rounded-lg flex items-center justify-between text-xs text-[#50443f]">
                <span>Tương tác mở</span>
                <span className="font-mono text-[#43271a] font-bold">Community Sourced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Khối 2: Cộng đồng nghiên cứu và phạm vi địa bàn */}
      <section className="w-full py-16 px-4 md:px-10 lg:px-20 bg-[#f6f3f2]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] tracking-widest font-semibold">
              Khối 02 · Không Gian Địa Văn Hóa
            </span>
            <h2 className="font-headline-lg font-serif text-2xl md:text-3xl text-[#43271a]">
              Cộng đồng nghiên cứu &amp; Phạm vi địa bàn khảo sát
            </h2>
            <p className="text-sm text-[#50443f] max-w-3xl leading-relaxed">
              Đề tài thiết lập một trục đối sánh hai đầu: Giữa các vùng cội nguồn (nơi phát tích phong tục, âm nhạc và tri thức nguyên bản) và các không gian cư trú, làm việc tại Hà Nội (nơi tiếp nhận, dung nạp và tái sinh ký ức).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Tọa độ gốc di cư</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#f0eded] font-mono text-xs text-[#50443f]">TƯ LIỆU NỀN TẢNG</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#43271a]">
                  Vùng cội nguồn (Tứ Động Mường &amp; Vùng phụ cận)
                </h3>
                <p className="text-xs text-[#50443f] leading-relaxed">
                  Điểm xuất cư của các dòng họ người Mường được khảo cứu đối chiếu về gia phả, nghệ thuật diễn xướng Mo và hệ thống hoa văn dệt cạp váy:
                </p>

                <div className="flex flex-col gap-3">
                  <div className="bg-[#f6f3f2] p-3 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-[#43271a] flex-shrink-0 mt-0.5">landscape</span>
                    <div className="flex flex-col">
                      <span className="font-serif text-sm font-bold text-[#43271a]">Tứ Đại Mường (Hòa Bình)</span>
                      <span className="text-xs text-[#50443f]">Mường Bi (Tân Lạc), Mường Vang (Lạc Sơn), Mường Thàng (Cao Phong), Mường Động (Kim Bôi).</span>
                    </div>
                  </div>
                  <div className="bg-[#f6f3f2] p-3 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-[#43271a] flex-shrink-0 mt-0.5">signpost</span>
                    <div className="flex flex-col">
                      <span className="font-serif text-sm font-bold text-[#43271a]">Khu vực Thanh Hóa &amp; Phú Thọ</span>
                      <span className="text-xs text-[#50443f]">Vùng Mường Thạch Thành, Cẩm Thủy, Bá Thước (Thanh Hóa) và Thanh Sơn, Tân Sơn (Phú Thọ) mang sắc thái ngữ âm bản địa đặc thù.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#f0eded] flex items-center gap-3 text-xs text-[#50443f]">
                <span className="material-symbols-outlined text-[#7f5600] text-[22px]">menu_book</span>
                <span>Tài liệu điền dã từ các vùng cội nguồn được dùng làm hệ quy chiếu chuẩn đối sánh với tập quán tại Hà Nội.</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 rounded-xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Tọa độ tiếp nhận khảo sát</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#f0eded] font-mono text-xs text-[#50443f]">ĐỊA BÀN HÀ NỘI HIỆN TẠI</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#43271a]">
                  Không gian cộng đồng Mường tại thủ đô
                </h3>
                <p className="text-xs text-[#50443f] leading-relaxed">
                  Khảo sát phân tầng theo hai hình thái sinh sống: Vùng cộng đồng định cư truyền thống nông nghiệp - bán đô thị và Mạng lưới di dân thế hệ mới tại lõi trung tâm.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f6f3f2] p-4 rounded-lg flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[#43271a] font-semibold">
                      <span className="material-symbols-outlined text-[18px] text-[#7f5600]">cabin</span>
                      <span className="text-sm font-bold">Cư trú truyền thống lâu đời</span>
                    </div>
                    <span className="font-mono text-xs text-[#7f5600]">Ba Vì · Thạch Thất · Quốc Oai</span>
                    <p className="text-xs text-[#50443f] pt-1 leading-relaxed">
                      Các xã vùng đệm chân núi Ba Vì (Ba Trại, Vân Hòa, Yên Bài) và Tiến Xuân, Yên Bình, Đông Xuân. Nơi vẫn duy trì đội cồng chiêng nữ, lễ hội cơm mới và sinh hoạt Mo tang ma.
                    </p>
                  </div>

                  <div className="bg-[#f6f3f2] p-4 rounded-lg flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[#43271a] font-semibold">
                      <span className="material-symbols-outlined text-[18px] text-[#7f5600]">apartment</span>
                      <span className="text-sm font-bold">Di cư đô thị đương đại</span>
                    </div>
                    <span className="font-mono text-xs text-[#7f5600]">Cầu Giấy · Nam Từ Liêm · Hà Đông · Hoàng Mai</span>
                    <p className="text-xs text-[#50443f] pt-1 leading-relaxed">
                      Cụm sinh viên đại học, công nhân tại khu chế xuất và viên chức. Văn hóa thể hiện qua các quán ẩm thực cỗ lá, câu lạc bộ thanh niên Mường và nhóm trực tuyến đồng hương.
                    </p>
                  </div>
                </div>

                <div className="w-full bg-[#f0eded] p-3 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[#50443f]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7f5600]"></span>
                    <span>Tuyến đường hành lang văn hóa: QL6 &amp; Đại lộ Thăng Long</span>
                  </div>
                  <span className="font-mono text-[#43271a] font-bold">KẾT NỐI VĂN HÓA ĐÔ THỊ - NÔNG THÔN</span>
                </div>
              </div>

              <div className="w-full h-44 rounded-lg overflow-hidden relative shadow-sm border border-[#e5e2e1]">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Khu vực cư trú Mường tại chân núi Ba Vì" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT_Ge4TfCe5zy3AwRIzi5_GlUFN37An469WdXrBmvQ4Q8pJBDZ1BLAEwsO9BGGh0eAsiS64kYsmrIsZpF1gwbP0rqnbP-hePXJgnc1CcnsAh3KuMRKM5-xui7OW0TUF5YOZ591bdAjgi2VuboXZpEbwdbiQrXw0qCe1PMCUGCThSL1StoHVCDXivHIcv70QAdS8LeviOVScr4M36VkTqtVSiaFbHHte24AfCFtcHaL" 
                />
                <div className="absolute inset-0 bg-[#43271a]/20 backdrop-blur-[1px] flex items-end p-3">
                  <span className="bg-white/95 text-[#43271a] px-3 py-1 rounded font-mono text-xs font-semibold">
                    Bản đồ thực địa: Khu vực cư trú Mường tại chân núi Ba Vì &amp; Thạch Thất
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Khối 4: Quy trình thu thập, kiểm chứng và lưu trữ tư liệu */}
      <section className="w-full py-16 px-4 md:px-10 lg:px-20 bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] tracking-widest font-semibold">
              Khối 04 · Phương Pháp Luận Khoa Học
            </span>
            <h2 className="font-headline-lg font-serif text-2xl md:text-3xl text-[#43271a]">
              Quy trình thu thập, kiểm chứng &amp; Lưu trữ tư liệu
            </h2>
            <p className="text-sm text-[#50443f]">
              Đảm bảo tính chân xác, minh bạch nguồn gốc và tuân thủ tuyệt đối chuẩn mực đạo đức nghiên cứu dân tộc học trước khi tích hợp vào cơ sở dữ liệu quốc gia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#fcf9f8] p-6 rounded-xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-lg bg-[#f0eded] text-[#43271a] font-mono text-xs font-bold flex items-center justify-center">
                    01
                  </span>
                  <span className="material-symbols-outlined text-[#7f5600] text-[24px]">travel_explore</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Thu thập đa nguồn</span>
                  <h3 className="font-serif text-base font-bold text-[#43271a]">
                    Nguồn sơ cấp &amp; Điền dã thực địa
                  </h3>
                </div>
                <p className="text-xs text-[#50443f] leading-relaxed">
                  Ghi âm phỏng vấn sâu bán cấu trúc, quay phim diễn xướng lễ hội, chụp macro hiện vật và thu thập tài liệu chép tay Mo Mường từ gia đình các thầy Mo uy tín.
                </p>
              </div>
              <div className="bg-[#f0eded] p-2 rounded text-[11px] text-[#50443f] font-mono">
                Đầu ra: File thô RAW/WAV/FLAC
              </div>
            </div>

            <div className="bg-[#fcf9f8] p-6 rounded-xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-lg bg-[#f0eded] text-[#43271a] font-mono text-xs font-bold flex items-center justify-center">
                    02
                  </span>
                  <span className="material-symbols-outlined text-[#7f5600] text-[24px]">fact_check</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Kiểm duyệt chéo</span>
                  <h3 className="font-serif text-base font-bold text-[#43271a]">
                    Kiểm chứng tính chính thống &amp; Bản quyền
                  </h3>
                </div>
                <p className="text-xs text-[#50443f] leading-relaxed">
                  Hội đồng cố vấn gồm các Nghệ nhân Dân gian và chuyên gia Viện Nghiên cứu Văn hóa thẩm định nội dung, tránh xuyên tạc hoặc sai lệch dị bản tâm linh.
                </p>
              </div>
              <div className="bg-[#f0eded] p-2 rounded text-[11px] text-[#50443f] font-mono">
                Đầu ra: Biên bản thẩm định học thuật
              </div>
            </div>

            <div className="bg-[#fcf9f8] p-6 rounded-xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-lg bg-[#f0eded] text-[#43271a] font-mono text-xs font-bold flex items-center justify-center">
                    03
                  </span>
                  <span className="material-symbols-outlined text-[#7f5600] text-[24px]">qr_code_2</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Chuẩn hóa số</span>
                  <h3 className="font-serif text-base font-bold text-[#43271a]">
                    Mã hóa hồ sơ (I01-DS / HD / PV)
                  </h3>
                </div>
                <p className="text-xs text-[#50443f] leading-relaxed">
                  Gán định danh duy nhất (Unique Identifiers) theo phân loại: Di sản (DS), Hồi ức di dân (HD), và Phỏng vấn nghệ nhân (PV). Gắn thẻ tọa độ địa lý GIS và từ khóa.
                </p>
              </div>
              <div className="bg-[#f0eded] p-2 rounded text-[11px] text-[#50443f] font-mono">
                Đầu ra: Schema Dublin Core / JSON-LD
              </div>
            </div>

            <div className="bg-[#fcf9f8] p-6 rounded-xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-lg bg-[#f0eded] text-[#43271a] font-mono text-xs font-bold flex items-center justify-center">
                    04
                  </span>
                  <span className="material-symbols-outlined text-[#7f5600] text-[24px]">lock_open</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Công bố có kiểm soát</span>
                  <h3 className="font-serif text-base font-bold text-[#43271a]">
                    Phân quyền &amp; Đạo đức dữ liệu
                  </h3>
                </div>
                <p className="text-xs text-[#50443f] leading-relaxed">
                  Phát hành công khai cho cộng đồng và sinh viên tra cứu. Áp dụng giới hạn truy cập đối với các bài cúng tang lễ mang tính kiêng kỵ theo nguyện vọng của nghệ nhân.
                </p>
              </div>
              <div className="bg-[#f0eded] p-2 rounded text-[11px] text-[#50443f] font-mono">
                Đầu ra: Cổng tra cứu số hóa bảo mật
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Khối 5: Thông tin người thực hiện & Đề tài học thuật */}
      <section className="w-full py-16 px-4 md:px-10 lg:px-20 bg-[#f6f3f2]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Card 1: Hồ sơ chủ nhiệm đề tài */}
            <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-[#e5e2e1] flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#e5e2e1]">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">
                    Hồ Sơ Nghiên Cứu Học Thuật
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#f0eded] text-[#43271a] font-mono text-xs">
                    I01 · PH60600
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-[#e5e2e1] flex-shrink-0 shadow-sm border border-[#d4c3bc]">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Chân dung chủ nhiệm đề tài Bùi Trung Nam" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQpixZ4AfGHu03KnZf6Sqy5WKaa6oEEUNLmrcKks7ciSHK_XAAn_NqzlBew_uX-BflXTkwkiD3O6LI4vZuh-slu40EUpNc2D28_P0jKsvW-EcsXMoJHywy8u9IVgQo5BzhAAqiMiBLjy7G2dPyu5PuJh6pRQyTN51uKCjU9xqI02-MmCAZaG6LPRj_AmPCKnnjFyCLacUhGsx1EklJ1d2UCkf9GYPm2o0fGODLGcIf" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase">Chủ nhiệm đề tài</span>
                    <h3 className="font-serif text-2xl font-bold text-[#43271a]">Bùi Trung Nam</h3>
                    <span className="text-xs text-[#50443f]">Mã số nghiên cứu sinh / học viên: PH60600</span>
                    <span className="text-xs text-[#50443f] mt-1">Chuyên ngành: Văn hóa học &amp; Nhân học Đô thị</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#f6f3f2] p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-mono text-[11px] text-[#50443f] uppercase">Đơn vị triển khai</span>
                    <span className="text-xs text-[#43271a] font-semibold">Bộ môn Nhân học Văn hóa &amp; Khoa học Di sản</span>
                  </div>
                  <div className="bg-[#f6f3f2] p-3 rounded-lg flex flex-col gap-1">
                    <span className="font-mono text-[11px] text-[#50443f] uppercase">Giáo viên hướng dẫn</span>
                    <span className="text-xs text-[#43271a] font-semibold">PGS. TS. Cố vấn Di sản Dân tộc học</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e2e1] flex flex-wrap items-center justify-between gap-2 text-xs text-[#50443f]">
                <span>Thời gian nghiên cứu: 2024 – 2025</span>
                <span className="font-mono text-[#43271a] font-bold">KẾT QUẢ ĐÃ NGHIỆM THU GIAI ĐOẠN 1</span>
              </div>
            </div>

            {/* Card 2: Cam kết đạo đức & Bản quyền văn hóa Mường */}
            <div className="lg:col-span-6 bg-[#13332b] text-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#ffddae]">
                  <span className="material-symbols-outlined text-[22px]">gavel</span>
                  <span className="font-mono text-xs uppercase tracking-widest font-semibold">Cam kết học thuật</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
                  Tôn trọng tuyệt đối quyền sở hữu văn hóa cộng đồng
                </h3>
                <p className="text-xs md:text-sm text-[#96b9ad] leading-relaxed">
                  Đề tài khẳng định tri thức bản địa, sử thi Mo Mường và các hoa văn dệt thuộc về chủ quyền tinh thần của cộng đồng người Mường. Mọi dữ liệu thu thập được phục vụ mục đích phi thương mại, bảo tồn học thuật và giáo dục công chúng.
                </p>

                <div className="flex flex-col gap-2 pt-2 text-xs text-[#96b9ad]">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#ffddae] text-[18px] flex-shrink-0 mt-0.5">check_circle</span>
                    <span>Được sự đồng thuận tự nguyện dựa trên thông tin đầy đủ (FPIC - Free, Prior and Informed Consent) từ các nghệ nhân tham gia điền dã.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#ffddae] text-[18px] flex-shrink-0 mt-0.5">check_circle</span>
                    <span>Tôn trọng trọn vẹn sự thiêng liêng của các bài cúng tâm linh, không thương mại hóa nghi lễ tang ma cổ truyền.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#ffddae] text-[18px] flex-shrink-0 mt-0.5">check_circle</span>
                    <span>Chia sẻ miễn phí kết quả số hóa ngược lại cho con em người Mường tại các khu vực khảo sát tại Hà Nội.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#2a4a41] text-xs text-[#96b9ad] font-mono">
                <span>BẢO TỒN VÌ CỘNG ĐỒNG NGUYÊN BẢN</span>
                <span className="text-[#ffddae] font-bold">HERITAGE ETHICS CERTIFIED</span>
              </div>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-[#e5e2e1] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-xl">
              <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold">Tương tác dữ liệu</span>
              <h3 className="font-serif text-lg font-bold text-[#43271a]">Sẵn sàng tra cứu các phân hệ tiếp theo?</h3>
              <p className="text-xs text-[#50443f]">
                Khám phá mục lục hiện vật, nghe các băng ghi âm điền dã trực tiếp hoặc tra cứu bản đồ địa lý các xóm Mường cổ tại Ba Vì và Thạch Thất.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('kham-pha-di-san')}
                className="px-5 py-2.5 rounded bg-[#5c3d2e] text-white text-xs font-semibold hover:bg-[#43271a] transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Khám phá 06 mục lục di sản</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => onNavigate('ban-do-van-hoa')}
                className="px-5 py-2.5 rounded bg-[#f0eded] text-[#43271a] text-xs font-semibold hover:bg-[#eae7e7] transition-colors flex items-center gap-2 border border-[#d4c3bc]"
              >
                <span className="material-symbols-outlined text-[18px]">map</span>
                <span>Xem bản đồ văn hóa</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutView;

