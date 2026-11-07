import React, { useEffect, useState } from 'react';
import { NavTab } from '../components/Header';
import { HeritageItem } from '../types/heritage';
import heritageService from '../services/heritageService';

interface HeritageExplorerViewProps {
  onNavigate: (tab: NavTab) => void;
  onSelectHeritage: (item: HeritageItem) => void;
}

export const HeritageExplorerView: React.FC<HeritageExplorerViewProps> = ({ 
  onNavigate, 
  onSelectHeritage 
}) => {
  const [items, setItems] = useState<HeritageItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentStatus, setCurrentStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    heritageService.getHeritageItems().then(setItems);
  }, []);

  const categories = [
    { key: 'all', label: 'Tất cả (6)', icon: 'grid_view' },
    { key: 'tin-nguong', label: 'Tín ngưỡng', icon: 'auto_stories' },
    { key: 'am-thuc', label: 'Ẩm thực', icon: 'restaurant' },
    { key: 'ngon-ngu', label: 'Ngôn ngữ', icon: 'record_voice_over' },
    { key: 'trang-phuc', label: 'Trang phục', icon: 'styler' },
    { key: 'am-nhac', label: 'Âm nhạc', icon: 'music_note' },
    { key: 'sinh-hoat-cong-dong', label: 'Sinh hoạt cộng đồng', icon: 'groups' }
  ];

  const removeVietnameseTones = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd');
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchesStatus = currentStatus === 'all' || item.status === currentStatus;
    
    const normalizedQuery = removeVietnameseTones(searchQuery.trim());
    if (!normalizedQuery) return matchesCategory && matchesStatus;

    const searchable = removeVietnameseTones(`${item.title} ${item.keywords} ${item.location} ${item.categoryLabel} ${item.excerpt}`);
    return matchesCategory && matchesStatus && searchable.includes(normalizedQuery);
  });

  const handleCardClick = (item: HeritageItem) => {
    onSelectHeritage(item);
    onNavigate('chi-tiet-di-san');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setCurrentCategory('all');
    setCurrentStatus('all');
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col w-full">
      {/* ARCHIVAL HERO HEADER & TAXONOMY INTRO */}
      <section className="relative w-full bg-[#f6f3f2] overflow-hidden py-12 lg:py-16 px-4 md:px-10 lg:px-20 border-b border-[#e5e2e1]">
        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col gap-6">
          {/* Breadcrumb & Metadata tag */}
          <div className="flex flex-wrap items-center gap-2 text-[#50443f] font-mono text-xs">
            <button 
              onClick={() => onNavigate('trang-chu')} 
              className="hover:text-[#43271a] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">home</span> TRANG CHỦ
            </button>
            <span>/</span>
            <span className="text-[#7f5600] font-semibold">DANH MỤC DI SẢN MƯỜNG</span>
            <span className="hidden sm:inline text-[#d4c3bc]">•</span>
            <span className="hidden sm:inline bg-white px-2 py-0.5 rounded text-[#50443f] shadow-sm border border-[#e5e2e1]">
              MÃ PHÂN HỆ: CL-HERITAGE-2024
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-white rounded-full text-[#7f5600] font-mono text-xs shadow-sm border border-[#e5e2e1]">
                <span className="w-2 h-2 rounded-full bg-[#7f5600] animate-pulse"></span>
                HỒ SƠ KHẢO SÁT THỰC ĐỊA HÀ NỘI &amp; VÙNG PHỤ CẬN
              </div>
              <h1 className="font-display-hero font-serif text-3xl md:text-5xl text-[#43271a] tracking-tight">
                Thư mục khám phá di sản văn hóa Mường
              </h1>
              <p className="font-quote-editorial font-serif text-base md:text-lg text-[#50443f] max-w-3xl leading-relaxed">
                Hệ thống hóa các giá trị di sản vật thể và phi vật thể của người Mường được khảo sát, ghi nhận và đối chiếu trong bối cảnh đời sống đô thị hiện đại.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white rounded-xl p-4 shadow-md border border-[#e5e2e1] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#50443f] uppercase">Chỉ số hồ sơ số hóa</span>
                <span className="material-symbols-outlined text-[#7f5600] text-[20px]">dataset</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-[#f6f3f2] rounded-lg p-2">
                  <span className="block font-serif text-2xl text-[#43271a] font-bold">06</span>
                  <span className="text-[11px] text-[#50443f]">Trụ cột</span>
                </div>
                <div className="bg-[#f6f3f2] rounded-lg p-2">
                  <span className="block font-serif text-2xl text-[#13332b] font-bold">02</span>
                  <span className="text-[11px] text-[#50443f]">Xác thực</span>
                </div>
                <div className="bg-[#f6f3f2] rounded-lg p-2">
                  <span className="block font-serif text-2xl text-[#7f5600] font-bold">04</span>
                  <span className="text-[11px] text-[#50443f]">Điền dã</span>
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Search and Status Filter */}
          <div className="w-full bg-white rounded-xl p-4 shadow-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border border-[#e5e2e1]">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#50443f] text-[22px]">search</span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm: Mo Mường, Cồng chiêng, Cỗ lá, Ba Vì, Cạp váy..."
                className="w-full pl-11 pr-10 py-2.5 bg-[#f6f3f2] text-[#1c1b1b] rounded-lg text-sm placeholder:text-[#50443f]/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5c3d2e] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#50443f] hover:text-[#1c1b1b] p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 bg-[#f6f3f2] px-3 py-2 rounded-lg text-[#1c1b1b] border border-[#e5e2e1]">
                <span className="material-symbols-outlined text-[18px] text-[#7f5600]">verified_user</span>
                <label className="font-mono text-xs uppercase text-[#50443f] whitespace-nowrap" htmlFor="statusFilter">
                  Trạng thái:
                </label>
                <select
                  id="statusFilter"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="bg-transparent text-xs font-medium text-[#1c1b1b] focus:outline-none cursor-pointer"
                >
                  <option value="all">Tất cả hồ sơ</option>
                  <option value="verified">Có nguồn tư liệu / Đã xác minh</option>
                  <option value="needs-verification">Cần kiểm chứng địa bàn</option>
                  <option value="under-survey">Đang khảo sát thực địa</option>
                </select>
              </div>

              <button
                onClick={handleResetFilters}
                className="px-3 py-2 bg-[#f6f3f2] hover:bg-[#f0eded] text-[#50443f] hover:text-[#43271a] rounded-lg font-mono text-xs uppercase flex items-center gap-1 transition-colors border border-[#e5e2e1]"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                Đặt lại
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL FILTER TABS SECTION */}
      <section className="w-full bg-white px-4 md:px-10 lg:px-20 py-4 sticky top-20 z-30 shadow-sm border-b border-[#e5e2e1]/80 backdrop-blur-md bg-white/95">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 overflow-x-auto pb-1">
          <div className="flex items-center gap-2 flex-nowrap" role="tablist">
            {categories.map((cat) => {
              const isActive = currentCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setCurrentCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#43271a] text-white shadow-sm'
                      : 'bg-[#f6f3f2] hover:bg-[#f0eded] text-[#50443f] hover:text-[#1c1b1b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0 text-[#50443f] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#fec25f]"></span>
            <span>Hiển thị {filteredItems.length} di sản ({filteredItems.length}/6 hồ sơ)</span>
          </div>
        </div>
      </section>

      {/* MAIN CATALOG EXHIBIT GRID */}
      <section className="w-full bg-[#fcf9f8] px-4 md:px-10 lg:px-20 py-12">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
          {filteredItems.length === 0 ? (
            <div className="w-full py-16 bg-[#f6f3f2] rounded-xl text-center flex flex-col items-center justify-center gap-4 px-4 border border-[#e5e2e1]">
              <span className="material-symbols-outlined text-[#82746e] text-[48px]">search_off</span>
              <h3 className="font-serif text-xl font-bold text-[#43271a]">Không tìm thấy di sản phù hợp</h3>
              <p className="text-sm text-[#50443f] max-w-md">
                Không có kết quả nào khớp với từ khóa tìm kiếm hoặc điều kiện lọc hiện tại. Vui lòng thử từ khóa khác hoặc xóa bộ lọc.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2 bg-[#43271a] text-white rounded-lg font-mono text-xs uppercase hover:bg-[#5c3d2e] transition-colors shadow-sm"
              >
                Xóa toàn bộ bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => {
                let badgeClass = 'bg-[#c6eadd] text-[#002019]';
                if (item.status === 'under-survey') badgeClass = 'bg-[#ffddae] text-[#281800]';
                if (item.status === 'needs-verification') badgeClass = 'bg-[#ffdad6] text-[#93000a]';

                return (
                  <article
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-[#e5e2e1] cursor-pointer"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eae7e7]">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#43271a]/80 via-transparent to-transparent opacity-60"></div>
                      
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                        <span className={`px-2.5 py-0.5 rounded font-mono text-[11px] font-bold uppercase flex items-center gap-1 shadow-sm ${badgeClass}`}>
                          <span className="material-symbols-outlined text-[13px]">
                            {item.status === 'verified' ? 'verified' : item.status === 'under-survey' ? 'explore' : 'pending_actions'}
                          </span>
                          {item.statusLabel}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3">
                        <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-[#43271a] font-mono text-[11px] font-semibold">
                          DI SẢN #{item.code}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-[#50443f] font-mono text-xs uppercase">
                          <span className="text-[#7f5600] font-semibold flex items-center gap-1">
                            {item.categoryLabel}
                          </span>
                          <span className="flex items-center gap-1 text-[#50443f]">
                            <span className="material-symbols-outlined text-[15px]">location_on</span>
                            {item.location}
                          </span>
                        </div>
                        <h2 className="font-serif text-xl font-bold text-[#43271a] group-hover:text-[#5c3d2e] transition-colors">
                          {item.title}
                        </h2>
                        <p className="text-sm text-[#50443f] line-clamp-3 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#e5e2e1] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-[#50443f]">
                          <span className="material-symbols-outlined text-[16px] text-[#13332b]">inventory_2</span>
                          <span>{item.recordsCount}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#43271a] text-white group-hover:bg-[#5c3d2e] rounded-lg font-mono text-xs uppercase transition-colors shadow-sm">
                          <span>Chi tiết</span>
                          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* COLLABORATIVE CALLOUT BOX */}
      <section className="w-full bg-[#fcf9f8] px-4 md:px-10 lg:px-20 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-gradient-to-r from-[#13332b] to-[#43271a] rounded-2xl p-6 lg:p-12 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded bg-[#fec25f]/20 text-[#ffddae] font-mono text-xs uppercase font-semibold">
                <span className="material-symbols-outlined text-[16px]">handshake</span> MỞ RỘNG CỘNG ĐỒNG KHẢO SÁT
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold leading-tight">
                Bạn có thông tin, hiện vật hoặc ký ức gia đình về văn hóa Mường?
              </h2>
              <p className="text-sm md:text-base text-[#e5e2e1] leading-relaxed">
                Nhóm nghiên cứu trân trọng tiếp nhận mọi hình ảnh gia đình, băng thu âm người thân nói tiếng Mường, ký ức ẩm thực hay trang phục cũ để hỗ trợ hoàn thiện <strong>4 di sản đang ở trạng thái 'Cần khảo sát' và 'Cần kiểm chứng'</strong> tại Hà Nội.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#e5e2e1]">
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-lg backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[#ffddae] text-[18px]">verified</span>
                  <span>Bảo mật danh tính &amp; bản quyền</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-lg backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[#ffddae] text-[18px]">school</span>
                  <span>Được ghi danh trong kỷ yếu học thuật</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-lg backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[#ffddae] text-[18px]">sync</span>
                  <span>Hỗ trợ số hóa miễn phí ảnh &amp; băng từ</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate('dong-gop-tu-lieu')}
                  className="px-6 py-3 bg-[#fec25f] hover:bg-[#ffddae] text-[#754f00] rounded-lg font-mono text-xs uppercase font-bold flex items-center gap-2 transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  <span>Gửi tư liệu khảo sát ngay</span>
                </button>
                <button
                  onClick={() => onNavigate('nguon-va-kiem-chung')}
                  className="px-5 py-3 bg-transparent hover:bg-white/10 text-white rounded-lg font-mono text-xs uppercase flex items-center gap-2 transition-all border border-white/30"
                >
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                  <span>Quy trình thẩm định khoa học</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeritageExplorerView;

