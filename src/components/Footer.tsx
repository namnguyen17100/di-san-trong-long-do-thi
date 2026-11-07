import React from 'react';
import { NavTab } from './Header';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onOpenArchitectureModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenArchitectureModal }) => {
  const handleNav = (tab: NavTab) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#f6f3f2] border-t border-[#e5e2e1] shadow-[0_-8px_24px_-4px_rgba(61,38,28,0.03)]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand & Academic Research Identification */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                alt="Logo Di Sản Trong Lòng Đô Thị" 
                className="h-9 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiinmrZ0XsZEKBbLhCKjgKn_cJTF3-H76dTlO1pQWTkkYxw-FSTJAaNSBLqMP2kqwxWjW2_m6QlBHS6wnLsC5E24luJwHZH0b7vKTRvDTM7trGu0mb8aJ7MPIHH2vnKIBt8UWK2IxIWj9zyN9CMBKEr-l5YMEXTdtVSnyOPGwU1vdPGhhX4uRi1tvFeSDn6JNjjfycNZR_ZH8rG4RmHHEZlrOLOR4kv7_QMaEK1Yh1" 
              />
              <span className="font-headline-sm font-serif text-xl font-bold text-[#43271a]">
                Di Sản Trong Lòng Đô Thị
              </span>
            </div>
            <p className="font-quote-editorial font-serif text-[#50443f] italic max-w-lg leading-relaxed text-sm">
              “Mang bản sắc quê hương giữa nhịp sống Hà Nội — Kết nối ký ức cồng chiêng, sắc váy hoa văn và sử thi Mo Mường vào không gian văn hóa thủ đô đương đại.”
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded bg-[#f0eded] font-label-archive font-mono text-xs text-[#50443f] uppercase font-semibold">
                Đề tài nghiên cứu khoa học: I01
              </span>
              <span className="px-3 py-1 rounded bg-[#f0eded] font-label-archive font-mono text-xs text-[#50443f] uppercase font-semibold">
                Mã hồ sơ: PH60600
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] font-bold tracking-wider mb-1">
              Phân hệ tra cứu số
            </span>
            <nav className="flex flex-col gap-2 text-sm">
              <button 
                onClick={() => handleNav('kham-pha-di-san')} 
                className="text-left text-[#50443f] hover:text-[#43271a] hover:underline transition-colors"
              >
                Mục lục hiện vật &amp; phong tục
              </button>
              <button 
                onClick={() => handleNav('kho-tu-lieu-so')} 
                className="text-left text-[#50443f] hover:text-[#43271a] hover:underline transition-colors"
              >
                Băng ghi âm điền dã &amp; Mo Mường
              </button>
              <button 
                onClick={() => handleNav('ban-do-van-hoa')} 
                className="text-left text-[#50443f] hover:text-[#43271a] hover:underline transition-colors"
              >
                Không gian văn hóa Ba Vì &amp; Thạch Thất
              </button>
              <button 
                onClick={() => handleNav('nguon-va-kiem-chung')} 
                className="text-left text-[#50443f] hover:text-[#43271a] hover:underline transition-colors"
              >
                Ma trận đối chiếu tài liệu sơ cấp
              </button>
              <button 
                onClick={() => handleNav('dong-gop-tu-lieu')} 
                className="text-left text-[#50443f] hover:text-[#43271a] hover:underline transition-colors"
              >
                Tiếp nhận tư liệu từ nghệ nhân
              </button>
            </nav>
          </div>

          {/* Col 3: Academic & Technology Methodology */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-label-archive font-mono text-xs uppercase text-[#7f5600] font-bold tracking-wider mb-1">
              Kiến trúc kỹ thuật &amp; Phương pháp luận
            </span>
            <p className="text-xs text-[#50443f] leading-relaxed">
              Tất cả các bản ghi âm Mo Mường, ký họa cạp váy và hồi ức nghệ nhân được khảo cứu trực tiếp tại các cộng đồng người Mường định cư tại Hà Nội, đối chiếu chéo cùng Viện Nghiên cứu Văn hóa và các nghệ nhân dân gian ưu tú.
            </p>
            <div className="flex flex-col gap-1 pt-1 text-xs text-[#50443f] font-mono">
              <span>• Chủ nhiệm đề tài: Bùi Trung Nam (PH60600)</span>
              <span>• Frontend: React JS, JSX, HTML5, CSS3, Tailwind CSS</span>
              <span>• Backend định hướng: Java, Spring Boot, Hibernate, MySQL, JWT</span>
              <span>• Chuẩn siêu dữ liệu: Dublin Core &amp; CIDOC CRM Heritage Model</span>
            </div>
            {onOpenArchitectureModal && (
              <button
                onClick={onOpenArchitectureModal}
                className="self-start text-xs text-[#7f5600] hover:text-[#43271a] font-semibold underline mt-1 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">account_tree</span>
                <span>Xem mô hình kiến trúc Spring Boot Service</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Version */}
        <div className="pt-8 border-t border-[#e5e2e1] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#50443f]">
          <p>© 2024 Đề tài Nghiên cứu I01 · Bùi Trung Nam · Bảo tồn bản sắc văn hóa dân tộc Mường giữa nhịp sống Hà Nội. Mọi quyền lưu trữ bảo lưu.</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNav('nguon-va-kiem-chung')} 
              className="hover:text-[#1c1b1b] transition-colors"
            >
              Quy chuẩn kiểm chứng
            </button>
            <span className="text-[#d4c3bc]">•</span>
            <button 
              onClick={() => handleNav('gioi-thieu')} 
              className="hover:text-[#1c1b1b] transition-colors"
            >
              Thuyết minh đề tài
            </button>
            <span className="text-[#d4c3bc]">•</span>
            <span className="font-label-archive font-mono text-xs text-[#7f5600] font-bold">
              PHIÊN BẢN HỌC THUẬT 1.0 (SERVICE ARCHITECTURE)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

