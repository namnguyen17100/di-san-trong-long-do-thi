import React, { useEffect, useState } from 'react';
import { NavTab } from '../components/Header';
import { MuongDivider } from '../components/MuongDivider';
import { HeritageItem } from '../types/heritage';
import heritageService from '../services/heritageService';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
  onSelectHeritage?: (item: HeritageItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectHeritage }) => {
  const [featuredItems, setFeaturedItems] = useState<HeritageItem[]>([]);

  useEffect(() => {
    heritageService.getHeritageItems().then((items) => {
      // Pick first 4 featured
      setFeaturedItems(items.slice(0, 4));
    });
  }, []);

  const handleHeritageClick = (item: HeritageItem) => {
    if (onSelectHeritage) onSelectHeritage(item);
    onNavigate('chi-tiet-di-san');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#fcf9f8] py-12 lg:py-20 -mt-4">
        {/* Ambient Heritage Watermark & Subtle Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#fec25f]/20 blur-3xl"></div>
          <div className="absolute -left-20 top-1/2 w-80 h-80 rounded-full bg-[#5c3d2e]/10 blur-3xl"></div>
          <svg className="absolute inset-0 w-full h-full text-[#d4c3bc]/30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="48" id="muong-grid" patternUnits="userSpaceOnUse" width="48">
                <path d="M 24,0 L 48,24 L 24,48 L 0,24 Z" fill="none" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.75"></path>
                <circle cx="24" cy="24" fill="currentColor" opacity="0.4" r="1.5"></circle>
              </pattern>
            </defs>
            <rect fill="url(#muong-grid)" height="100%" width="100%"></rect>
          </svg>
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 flex flex-col gap-10">
          {/* Top Heritage Identity Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#fec25f]/30 text-[#754f00] font-label-archive font-mono text-xs tracking-wider uppercase shadow-sm">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              Đề án nghiên cứu số hóa I01 · Hồ sơ văn hóa Mường tại Hà Nội
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#f0eded] font-label-meta text-xs text-[#50443f]">
              <span className="w-2 h-2 rounded-full bg-[#13332b]"></span>
              Đang vận hành cơ sở dữ liệu số
            </span>
          </div>

          {/* Hero Main Spread: Asymmetrical 8/4 grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <h1 className="font-headline-lg lg:font-display-hero font-serif text-3xl md:text-5xl lg:text-[56px] text-[#43271a] tracking-tight leading-tight">
                Hành trình gìn giữ bản sắc — <br className="hidden sm:inline" />
                <span className="text-[#5c3d2e] italic font-normal">Di sản trong lòng đô thị</span>
              </h1>
              <p className="font-quote-editorial font-serif text-lg md:text-xl text-[#50443f] max-w-2xl leading-relaxed pt-1">
                “Khi con người rời quê hương, những giá trị văn hóa vẫn tiếp tục được gìn giữ, thích nghi và trao truyền giữa nhịp sống Hà Nội.”
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => onNavigate('kham-pha-di-san')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5c3d2e] hover:bg-[#43271a] text-white font-medium shadow-md transition-all group"
                >
                  <span>Khám phá di sản</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <button
                  onClick={() => onNavigate('kho-tu-lieu-so')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-[#f0eded] text-[#43271a] font-medium shadow-sm transition-colors border border-[#d4c3bc]/60"
                >
                  <span className="material-symbols-outlined text-[18px]">folder_special</span>
                  <span>Kho tư liệu số</span>
                </button>
              </div>
            </div>

            {/* Hero Archival Visual / Vignette Frame */}
            <div className="lg:col-span-4 relative">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl bg-[#eae7e7]">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Cạp váy và bộ chiêng Mường" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKaA5qnbtWaQbp1jA90hDXJaKi7Q13AT9x8_HuRITIJ2UczC2rI1neKv5o5p2vZy8C1BTKhhYqaUipV6vXZiye11AG4daNL0WleRZbIWS4VI8C1WS3Ka-SwyBT3O-wO0m_VvI4GBQ5tT04T-tBwYFvi8nInkRkO6YED1Fxh8Zr1imbEibcy6xHfOa_3QqSu4f61TepCADHVTN8Zr7f25bBCzVrYwzqYI8ZJG9ucUzD" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#43271a]/90 via-[#43271a]/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1 text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-label-archive font-mono text-xs uppercase tracking-widest text-[#ffddae]">Hiện vật trưng bày</span>
                    <span className="font-label-meta text-[11px] px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">Tài liệu sơ cấp</span>
                  </div>
                  <p className="font-headline-sm font-serif text-lg font-semibold">Cạp váy &amp; Bộ chiêng Mường</p>
                  <p className="text-xs text-[#e5e2e1]/90 line-clamp-2">Khảo sát mẫu thức đồ họa và âm luật diễn xướng trong cộng đồng Mường tại Ba Vì, Hà Nội.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Statistics Dashboard Strip */}
          <div className="w-full bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#e5e2e1]">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7f5600] text-[20px]">analytics</span>
                <span className="font-label-archive font-mono text-xs text-[#43271a] uppercase font-bold tracking-wider">
                  Chỉ số hồ sơ đã kiểm chứng
                </span>
              </div>
              <span className="font-label-meta text-xs text-[#50443f]">
                Cập nhật theo chu kỳ thẩm định đề tài I01
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col p-3 rounded-lg bg-[#f6f3f2]">
                <span className="font-headline-lg font-serif text-2xl lg:text-3xl text-[#43271a] font-bold">15</span>
                <span className="text-xs md:text-sm text-[#50443f]">Bản ghi hồ sơ văn hóa</span>
                <span className="font-label-meta text-[11px] text-[#7f5600] mt-1 flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span> Phân loại Dublin Core
                </span>
              </div>
              <div className="flex flex-col p-3 rounded-lg bg-[#f6f3f2]">
                <span className="font-headline-lg font-serif text-2xl lg:text-3xl text-[#43271a] font-bold">08</span>
                <span className="text-xs md:text-sm text-[#50443f]">Nguồn kiểm chứng chính thức</span>
                <span className="font-label-meta text-[11px] text-[#7f5600] mt-1 flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-[13px]">menu_book</span> Viện Văn hóa &amp; Điền dã
                </span>
              </div>
              <div className="flex flex-col p-3 rounded-lg bg-[#f6f3f2]">
                <span className="font-headline-lg font-serif text-2xl lg:text-3xl text-[#43271a] font-bold">06</span>
                <span className="text-xs md:text-sm text-[#50443f]">Chủ đề di sản khảo sát</span>
                <span className="font-label-meta text-[11px] text-[#7f5600] mt-1 flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-[13px]">category</span> Mo, Chiêng, Trang phục,...
                </span>
              </div>
              <div className="flex flex-col p-3 rounded-lg bg-[#f6f3f2]">
                <span className="font-headline-lg font-serif text-2xl lg:text-3xl text-[#13332b] font-bold">100%</span>
                <span className="text-xs md:text-sm text-[#50443f]">Dữ liệu có trích dẫn khoa học</span>
                <span className="font-label-meta text-[11px] text-[#2a4a41] mt-1 flex items-center gap-1 font-mono">
                  <span className="material-symbols-outlined text-[13px]">verified_user</span> Minh bạch học thuật
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MƯỜNG MOTIF GEOMETRIC DIVIDER */}
      <MuongDivider />

      {/* SECTION 2: GIỚI THIỆU ĐỀ TÀI TỔNG QUAN */}
      <section className="w-full bg-[#f6f3f2] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Academic Thesis Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#7f5600] font-label-archive font-mono text-xs uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined text-[18px]">history_edu</span>
                <span>Khung lý thuyết &amp; Thuyết minh nghiên cứu</span>
              </div>
              <h2 className="font-headline-lg font-serif text-2xl lg:text-3xl text-[#43271a] tracking-tight">
                Tiếp biến &amp; Thích ứng văn hóa của cộng đồng Mường tại thủ đô
              </h2>
              <div className="space-y-3 text-sm md:text-base text-[#50443f] leading-relaxed">
                <p>
                  Từ những vùng quê nguồn cội trù phú thuộc bốn mường cổ — <em>Mường Bi, Mường Vang, Mường Thàng, Mường Động</em> (Hòa Bình) cùng các dải đất ven sông Đà của Phú Thọ và Thanh Hóa, nhiều thế hệ đồng bào Mường đã di chuyển về Hà Nội để học tập, lập nghiệp và an cư lâu dài.
                </p>
                <p>
                  Đối mặt với tốc độ đô thị hóa nhanh và sự biến đổi trong cấu trúc lối sống hiện đại, người Mường tại Hà Nội không hề để dòng chảy văn hóa bị đứt gãy. Trái lại, họ hình thành nên những phương thức thích nghi tinh tế: tổ chức ngày hội cồng chiêng vào các dịp lễ tết ở khu đô thị ngoại thành, gìn giữ tiếng Mường qua lời hát ru bên mâm cơm gia đình, và tái hiện phong tục “cỗ lá” như một ký ức kết nối cộng đồng bền bỉ.
                </p>
              </div>

              {/* Academic Seal / Metadata Box */}
              <div className="mt-2 p-4 rounded-xl bg-white shadow-sm border border-[#e5e2e1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#5c3d2e] text-white flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px]">school</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-[#43271a] text-sm">Nghiên cứu sinh: Bùi Trung Nam</span>
                    <span className="text-xs text-[#50443f]">
                      Mã số hồ sơ nghiên cứu: <strong className="text-[#43271a]">PH60600</strong> · Khóa đề tài I01
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('gioi-thieu')}
                  className="inline-flex items-center gap-1 font-label-archive font-mono text-xs uppercase text-[#7f5600] hover:text-[#43271a] transition-colors font-semibold"
                >
                  <span>Đọc toàn văn thuyết minh</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Visual Context Spread */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden bg-[#f0eded] shadow-md border border-[#e5e2e1]">
                <div className="aspect-[16/10] w-full relative">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Tư liệu điền dã đô thị" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuApDhmzqJfgkR4nfLgIxj75K9yrf6_XyxYTDndYJR5d41lOtVEl__0OEOqZqkGnb3oe9pSkVRW_ORqrwdMpbOv40_wQl8UYlSN7A1uuoXox-SnlSCg3j0TVJhfsPFzXkvEAkDrzhymBeaNz5GBSIwA2qKTAegKu3Ae7-qiISI7-yEBvSxplg5uuggAg1CzOA4hKkhwBD-7z2CjkBPCceEivqyzs2Uu0B8wfWtm7jA5A" 
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-white/90 backdrop-blur text-[#43271a] font-label-archive font-mono text-xs font-bold">
                    TƯ LIỆU ĐIỀN DÃ ĐÔ THỊ
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <span className="font-label-meta text-xs text-[#7f5600] font-semibold">Không gian khảo cứu thực địa</span>
                  <p className="font-headline-sm font-serif text-lg font-bold text-[#43271a]">
                    Ba Vì, Thạch Thất, Cầu Giấy &amp; Hà Đông
                  </p>
                  <p className="text-xs text-[#50443f]">
                    Địa bàn kết hợp giữa các xóm Mường truyền thống sáp nhập về thủ đô và các cụm dân cư tri thức, công nhân viên chức di cư mới.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: NHÓM DI SẢN NỔI BẬT (FEATURED HERITAGE CARDS) */}
      <section className="w-full bg-[#fcf9f8] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-xl">
              <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] font-semibold">Bộ sưu tập chủ đề</span>
              <h2 className="font-headline-lg font-serif text-2xl lg:text-3xl text-[#43271a] tracking-tight">
                Nhóm di sản trọng tâm được khảo sát
              </h2>
              <p className="text-xs md:text-sm text-[#50443f]">Mỗi nhóm di sản đều gắn liền với mã định danh hồ sơ, tình trạng kiểm chứng và cơ sở dữ liệu thực địa.</p>
            </div>
            <button
              onClick={() => onNavigate('kham-pha-di-san')}
              className="inline-flex items-center gap-1 text-sm text-[#43271a] hover:text-[#5c3d2e] font-semibold transition-colors self-start md:self-auto"
            >
              <span>Xem danh mục toàn diện</span>
              <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
            </button>
          </div>

          {/* 4 Heritage Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleHeritageClick(item)}
                className="group flex flex-col rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e5e2e1] cursor-pointer"
              >
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#eae7e7]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#c6eadd] text-[#002019] font-label-archive font-mono text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[13px]">verified</span>
                    {item.statusLabel}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-label-archive font-mono text-xs text-[#7f5600] font-semibold">
                      {item.code}
                    </span>
                    <h3 className="font-headline-sm font-serif text-lg font-bold text-[#43271a] group-hover:text-[#5c3d2e] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#50443f] line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#e5e2e1] flex items-center justify-between text-[#50443f] text-xs">
                    <span>{item.categoryLabel}</span>
                    <span className="font-semibold text-[#43271a] group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Chi tiết →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: HÀNH TRÌNH TỪ QUÊ GỐC ĐẾN ĐÔ THỊ */}
      <section className="w-full bg-[#eae7e7] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 flex flex-col gap-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-2">
            <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] font-semibold">Con đường di chuyển &amp; Thích ứng</span>
            <h2 className="font-headline-lg font-serif text-2xl lg:text-3xl text-[#43271a] tracking-tight">
              Hành trình từ xứ Mường cội nguồn đến Thủ đô
            </h2>
            <p className="text-xs md:text-sm text-[#50443f]">
              Lược đồ ghi nhận các mốc chuyển dịch địa lý và không gian xã hội của cộng đồng qua 4 chặng then chốt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative flex flex-col rounded-xl bg-white p-5 shadow-sm border border-[#d4c3bc]">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#43271a] text-white font-mono text-xs font-bold flex items-center justify-center">01</span>
                <span className="text-xs text-[#7f5600] font-semibold">Cội nguồn</span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#43271a] mb-2">Quê gốc 4 Mường lớn</h3>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Mường Bi, Mường Vang, Mường Thàng, Mường Động cùng các xóm bản tại Thanh Sơn (Phú Thọ), Thạch Thành (Thanh Hóa) — chiếc nôi của thần thoại Đẻ đất Đẻ nước.
              </p>
              <div className="mt-4 pt-2 border-t border-[#f0eded] flex items-center gap-1 font-mono text-[11px] text-[#82746e]">
                <span className="material-symbols-outlined text-[15px]">terrain</span>
                Không gian Mường bản địa
              </div>
            </div>

            <div className="relative flex flex-col rounded-xl bg-white p-5 shadow-sm border border-[#d4c3bc]">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#5c3d2e] text-white font-mono text-xs font-bold flex items-center justify-center">02</span>
                <span className="text-xs text-[#7f5600] font-semibold">Chuyển dịch</span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#43271a] mb-2">Làn sóng di cư &amp; An cư</h3>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Những đợt dịch chuyển vì học tập, công tác và mở rộng địa giới hành chính thủ đô (Hà Tây sáp nhập năm 2008), đưa nhiều xóm Mường truyền thống hòa vào dòng chảy Hà Nội.
              </p>
              <div className="mt-4 pt-2 border-t border-[#f0eded] flex items-center gap-1 font-mono text-[11px] text-[#82746e]">
                <span className="material-symbols-outlined text-[15px]">commute</span>
                Giao thoa lối sống đô thị
              </div>
            </div>

            <div className="relative flex flex-col rounded-xl bg-white p-5 shadow-sm border border-[#d4c3bc]">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#7f5600] text-white font-mono text-xs font-bold flex items-center justify-center">03</span>
                <span className="text-xs text-[#7f5600] font-semibold">Tái hiện</span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#43271a] mb-2">Hội đồng hương &amp; Không gian văn hóa</h3>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Tổ chức các câu lạc bộ văn hóa Mường, phục dựng đội cồng chiêng phụ nữ, ngày hội ẩm thực cỗ lá tại Làng Văn hóa - Du lịch các dân tộc Việt Nam (Đồng Mô).
              </p>
              <div className="mt-4 pt-2 border-t border-[#f0eded] flex items-center gap-1 font-mono text-[11px] text-[#82746e]">
                <span className="material-symbols-outlined text-[15px]">groups</span>
                Sinh hoạt cộng đồng gắn kết
              </div>
            </div>

            <div className="relative flex flex-col rounded-xl bg-white p-5 shadow-sm border border-[#d4c3bc]">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#13332b] text-white font-mono text-xs font-bold flex items-center justify-center">04</span>
                <span className="text-xs text-[#7f5600] font-semibold">Tương lai</span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#43271a] mb-2">Thế hệ trẻ &amp; Số hóa di sản</h3>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Các bạn trẻ gốc Mường ứng dụng công nghệ, lưu trữ các bài mo cổ dưới định dạng âm thanh số, thiết kế đồ họa hoa văn cạp váy đưa vào sản phẩm ứng dụng đương đại.
              </p>
              <div className="mt-4 pt-2 border-t border-[#f0eded] flex items-center gap-1 font-mono text-[11px] text-[#82746e]">
                <span className="material-symbols-outlined text-[15px]">devices</span>
                Bảo tồn số &amp; Trao truyền
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TƯ LIỆU MỚI CẬP NHẬT */}
      <section className="w-full bg-[#fcf9f8] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] font-semibold">Hồ sơ lưu trữ thực tế</span>
              <h2 className="font-headline-lg font-serif text-2xl lg:text-3xl text-[#43271a] tracking-tight">
                Tư liệu mới cập nhật vào cơ sở dữ liệu
              </h2>
              <p className="text-xs md:text-sm text-[#50443f]">Bản kiểm tra các mục sơ cấp theo mã định danh khoa học I01.</p>
            </div>
            <button
              onClick={() => onNavigate('kho-tu-lieu-so')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f0eded] hover:bg-[#eae7e7] text-[#43271a] text-sm font-semibold transition-colors self-start md:self-auto"
            >
              <span>Tra cứu toàn bộ kho tư liệu số</span>
              <span className="material-symbols-outlined text-[18px]">database</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#f6f3f2] p-5 flex flex-col justify-between gap-4 shadow-sm border border-[#e5e2e1]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#5c3d2e] text-white font-mono text-xs">I01-DS-01</span>
                  <span className="text-xs text-[#50443f]">Hồ sơ văn bản</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#43271a]">
                  Văn bản phân bố cộng đồng Mường tại Hà Nội
                </h3>
                <p className="text-xs text-[#50443f] line-clamp-3">
                  Tổng hợp số liệu địa bàn cư trú tại các xã miền núi Ba Vì (Yên Bài, Vân Hòa, Ba Trại), huyện Thạch Thất (Tiến Xuân, Yên Bình) và cư dân nội đô.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#e5e2e1] text-xs text-[#50443f]">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">source</span> 3 nguồn đối chiếu</span>
                <span className="font-semibold text-[#7f5600]">Đã lập chỉ mục</span>
              </div>
            </div>

            <div className="rounded-xl bg-[#f6f3f2] p-5 flex flex-col justify-between gap-4 shadow-sm border border-[#e5e2e1]">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#5c3d2e] text-white font-mono text-xs">I01-DS-02</span>
                <span className="text-xs text-[#50443f]">Bản đồ thực địa</span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#43271a]">
                Địa bàn thực hành Mo Mường đương đại
              </h3>
              <p className="text-xs text-[#50443f] line-clamp-3">
                Khảo sát các thầy Mo thực hành nghi lễ tang ma và cầu an cho đồng bào di cư; cách thích ứng quy mô bài mo phù hợp với chung cư và phố thị.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#e5e2e1] text-xs text-[#50443f]">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">graphic_eq</span> 2 file ghi âm</span>
                <span className="font-semibold text-[#7f5600]">Đã lập chỉ mục</span>
              </div>
            </div>

            <div className="rounded-xl bg-[#f6f3f2] p-5 flex flex-col justify-between gap-4 shadow-sm border border-[#e5e2e1]">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#5c3d2e] text-white font-mono text-xs">I01-HD-04</span>
                <span className="text-xs text-[#50443f]">Hồ sơ tín ngưỡng</span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#43271a]">
                Tín ngưỡng Mo Mường: Bản ghi âm &amp; Chuyển ngữ
              </h3>
              <p className="text-xs text-[#50443f] line-clamp-3">
                Trích đoạn mo "Đẻ đất Đẻ nước" và lời dặn tổ tiên được số hóa từ băng từ điền dã, kèm chú giải ngữ âm tiếng Mường cổ đối chiếu tiếng phổ thông.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#e5e2e1] text-xs text-[#50443f]">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">menu_book</span> Ký âm IPA</span>
                <span className="font-semibold text-[#7f5600]">Đã lập chỉ mục</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CÂU CHUYỆN CỘNG ĐỒNG */}
      <section className="w-full bg-[#fcf9f8] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="rounded-2xl bg-[#f6f3f2] p-6 lg:p-10 shadow-sm border border-[#e5e2e1]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="material-symbols-outlined text-[#7f5600] text-[22px]">record_voice_over</span>
                  <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] font-semibold tracking-wider">
                    Tiếng nói cộng đồng thực địa
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#fec25f]/40 text-[#754f00] font-mono text-xs">
                    Đang thu thập câu chuyện thực địa
                  </span>
                </div>
                <blockquote className="font-serif italic text-lg md:text-2xl text-[#43271a] leading-snug">
                  “Dù đi làm công sở ở Cầu Giấy hay Hà Đông, bữa cơm cuối tuần của gia đình vẫn phải có đĩa rau đồ và bát canh loóng quê nhà... Đó là cách chúng tôi nhắc các con nhớ mình là người Mường.”
                </blockquote>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5c3d2e] text-white flex items-center justify-center font-bold">
                      NM
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#43271a]">Người con xứ Mường tại Hà Nội</span>
                      <span className="text-xs text-[#50443f]">Khảo sát điền dã nhóm nghiên cứu I01 · Ghi nhận tại Hà Đông</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#50443f] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">mic</span>
                    Bản ghi phỏng vấn: #AUDIO-REC-07
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="p-5 rounded-xl bg-white shadow-md max-w-sm w-full flex flex-col gap-3 border border-[#e5e2e1]">
                  <div className="flex items-center gap-2 text-[#43271a] font-serif font-bold text-base">
                    <span className="material-symbols-outlined text-[#7f5600]">psychology_alt</span>
                    Tính minh bạch nghiên cứu
                  </div>
                  <p className="text-xs text-[#50443f] leading-relaxed">
                    Mọi trích đoạn phỏng vấn đều được mã hóa ẩn danh theo tiêu chuẩn bảo vệ đối tượng khảo sát khoa học xã hội và có sự đồng thuận từ nghệ nhân.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-[#13332b] text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px]">security</span>
                    Đã thẩm định chuẩn đạo đức đề tài
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: KÊU GỌI ĐÓNG GÓP TƯ LIỆU & CAM KẾT ĐẠO ĐỨC SỐ HÓA */}
      <section className="w-full bg-[#fcf9f8] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 flex flex-col justify-between p-6 lg:p-10 rounded-2xl bg-[#5c3d2e] text-white shadow-lg">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#ffddae]">
                  <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                  <span className="font-label-archive font-mono text-xs uppercase tracking-wider font-semibold">
                    Đóng góp cho cổng lưu trữ
                  </span>
                </div>
                <h2 className="font-headline-lg font-serif text-2xl lg:text-3xl tracking-tight leading-tight">
                  Bạn đang lưu giữ ký ức, hiện vật hay làn điệu Mường tại Hà Nội?
                </h2>
                <p className="text-sm text-[#d3a895] leading-relaxed">
                  Mỗi bức ảnh gia đình, cuốn sổ ghi lời mo cổ, bộ váy áo thổ cẩm hay thước phim ngày hội của bạn đều là mảnh ghép vô giá giúp bức tranh di sản Mường trong lòng thủ đô thêm trọn vẹn và sống động.
                </p>
              </div>
              <div className="pt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('dong-gop-tu-lieu')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#fec25f] hover:bg-[#ffddae] text-[#754f00] font-semibold text-sm shadow-md transition-colors"
                >
                  <span>Gửi tư liệu của bạn</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => onNavigate('nguon-va-kiem-chung')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
                >
                  <span>Quy trình tiếp nhận tư liệu</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between p-6 lg:p-10 rounded-2xl bg-[#eae7e7] shadow-sm border border-[#d4c3bc]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#13332b]">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                  <span className="font-label-archive font-mono text-xs uppercase tracking-wider font-semibold">
                    Nguyên tắc học thuật
                  </span>
                </div>
                <h2 className="font-headline-lg font-serif text-2xl lg:text-3xl text-[#43271a] tracking-tight leading-tight">
                  Cam kết đạo đức số hóa &amp; Tôn trọng chủ thể di sản
                </h2>
                <div className="flex flex-col gap-3 text-xs md:text-sm text-[#50443f] leading-relaxed">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#7f5600] text-[20px] flex-shrink-0 mt-0.5">check</span>
                    <span><strong>Bảo tồn trung thực:</strong> Không hư cấu hay thương mại hóa các yếu tố tín ngưỡng linh thiêng như Mo Mường.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#7f5600] text-[20px] flex-shrink-0 mt-0.5">check</span>
                    <span><strong>Ghi danh nghệ nhân:</strong> Toàn bộ câu chuyện, điệu hát, bài mo đều được trích dẫn xuất xứ rõ ràng từ các bậc cao niên và nghệ nhân nắm giữ di sản.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#7f5600] text-[20px] flex-shrink-0 mt-0.5">check</span>
                    <span><strong>Phi lợi nhuận &amp; Tiếp cận mở:</strong> Dữ liệu được phục vụ mục đích nghiên cứu, giáo dục văn hóa đô thị và lưu trữ cho các thế hệ mai sau.</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex items-center justify-between text-[#50443f] text-xs">
                <span>Chủ nhiệm: Bùi Trung Nam (PH60600)</span>
                <span className="font-mono text-[#43271a] uppercase font-bold">Chuẩn CIDOC CRM · I01</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;

