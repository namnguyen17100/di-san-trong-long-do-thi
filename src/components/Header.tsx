import React, { useState } from 'react';

export type NavTab = 
  | 'trang-chu' 
  | 'gioi-thieu' 
  | 'kham-pha-di-san' 
  | 'chi-tiet-di-san' 
  | 'kho-tu-lieu-so' 
  | 'ban-do-van-hoa' 
  | 'nguon-va-kiem-chung' 
  | 'dong-gop-tu-lieu'
  | 'kien-truc-he-thong';

interface HeaderProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onOpenSearch?: () => void;
  onOpenArchitectureModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentTab, 
  onNavigate, 
  onOpenSearch,
  onOpenArchitectureModal 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { key: NavTab; label: string }[] = [
    { key: 'trang-chu', label: 'Trang chủ' },
    { key: 'gioi-thieu', label: 'Giới thiệu đề tài' },
    { key: 'kham-pha-di-san', label: 'Khám phá di sản' },
    { key: 'kho-tu-lieu-so', label: 'Kho tư liệu số' },
    { key: 'ban-do-van-hoa', label: 'Bản đồ văn hóa' },
    { key: 'nguon-va-kiem-chung', label: 'Nguồn & kiểm chứng' },
    { key: 'dong-gop-tu-lieu', label: 'Đóng góp tư liệu' },
  ];

  const handleNavClick = (key: NavTab) => {
    onNavigate(key);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcf9f8]/90 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(61,38,28,0.06),0_2px_6px_-1px_rgba(61,38,28,0.03)] border-b border-[#e5e2e1]/60">
      <div className="h-20 max-w-[1440px] mx-auto px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand logo & Title */}
        <div 
          className="flex items-center gap-3 flex-shrink-0 cursor-pointer" 
          onClick={() => handleNavClick('trang-chu')}
        >
          <img 
            alt="Logo Di Sản Trong Lòng Đô Thị" 
            className="h-8 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiinmrZ0XsZEKBbLhCKjgKn_cJTF3-H76dTlO1pQWTkkYxw-FSTJAaNSBLqMP2kqwxWjW2_m6QlBHS6wnLsC5E24luJwHZH0b7vKTRvDTM7trGu0mb8aJ7MPIHH2vnKIBt8UWK2IxIWj9zyN9CMBKEr-l5YMEXTdtVSnyOPGwU1vdPGhhX4uRi1tvFeSDn6JNjjfycNZR_ZH8rG4RmHHEZlrOLOR4kv7_QMaEK1Yh1" 
          />
          <div className="flex flex-col">
            <span className="font-headline-sm font-serif text-lg font-bold text-[#43271a] leading-tight tracking-tight hover:text-[#5c3d2e] transition-colors">
              Di Sản Trong Lòng Đô Thị
            </span>
            <span className="font-label-archive font-mono text-[11px] uppercase tracking-wider text-[#50443f]">
              Bảo tồn văn hóa Mường tại Hà Nội
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = currentTab === item.key || (item.key === 'kham-pha-di-san' && currentTab === 'chi-tiet-di-san');
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-[#5c3d2e] text-white font-medium shadow-sm'
                    : 'text-[#50443f] hover:text-[#1c1b1b] hover:bg-[#f0eded]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Tech Stack Indicator Badge */}
          <button
            onClick={onOpenArchitectureModal}
            title="Kiến trúc công nghệ: Spring Boot + React + Hibernate + MySQL"
            className="hidden md:flex items-center bg-[#f0eded] hover:bg-[#e5e2e1] px-2.5 py-1.5 rounded-lg border border-[#d4c3bc]/60 transition-colors gap-1.5"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#13332b]"></span>
            <span className="font-label-archive font-mono text-xs text-[#7f5600] font-semibold">
              I01 · PH60600
            </span>
            <span className="text-[10px] bg-[#5c3d2e]/10 text-[#43271a] px-1.5 py-0.5 rounded font-mono font-medium">
              Spring Boot + React
            </span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch || (() => handleNavClick('kho-tu-lieu-so'))}
            aria-label="Tra cứu nhanh mục lục số"
            className="w-9 h-9 rounded-lg bg-[#f6f3f2] hover:bg-[#f0eded] text-[#50443f] hover:text-[#1c1b1b] flex items-center justify-center transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Verification Audit Button */}
          <button
            onClick={() => handleNavClick('nguon-va-kiem-chung')}
            aria-label="Bộ lọc trạng thái xác minh"
            className="w-9 h-9 rounded-lg bg-[#f6f3f2] hover:bg-[#f0eded] text-[#50443f] hover:text-[#1c1b1b] flex items-center justify-center transition-colors"
            title="Kiểm chứng nguồn"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">verified</span>
          </button>

          {/* User/Lead Profile indicator */}
          <div 
            onClick={() => handleNavClick('gioi-thieu')}
            className="w-8 h-8 rounded-full bg-[#43271a] flex items-center justify-center flex-shrink-0 cursor-pointer shadow-sm"
            title="Chủ nhiệm đề tài: Bùi Trung Nam (PH60600)"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </div>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-lg bg-[#f6f3f2] hover:bg-[#f0eded] text-[#50443f] flex items-center justify-center transition-colors"
            aria-label="Mở menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fcf9f8] border-b border-[#d4c3bc] px-4 py-4 shadow-xl flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
          {navLinks.map((item) => {
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#5c3d2e] text-white'
                    : 'text-[#50443f] hover:bg-[#f0eded]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#e5e2e1] mt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenArchitectureModal) onOpenArchitectureModal();
              }}
              className="text-left px-4 py-2 rounded-lg text-xs bg-[#f0eded] text-[#7f5600] font-mono flex items-center justify-between"
            >
              <span>Kiến trúc Spring Boot &amp; Service Layer</span>
              <span className="material-symbols-outlined text-[16px]">terminal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

