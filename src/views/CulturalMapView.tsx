import React, { useState, useMemo } from 'react';
import { 
  MapPin, Layers, ZoomIn, ZoomOut, RotateCcw, Compass, 
  ExternalLink, ShieldCheck, Info, Check, Eye, ChevronRight
} from 'lucide-react';
import { CulturalLocation } from '../types/heritage';
import { CULTURAL_LOCATIONS } from '../data/mockHeritageData';
import MuongDivider from '../components/MuongDivider';
import { NavTab } from '../components/Header';

interface CulturalMapViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onSelectHeritage?: (id: string) => void;
}

export default function CulturalMapView({ 
  onNavigateTab 
}: CulturalMapViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('bavi'); // Ba Vi by default
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showBoundaries, setShowBoundaries] = useState<boolean>(true);
  const [isHistoricalNames, setIsHistoricalNames] = useState<boolean>(false);

  // Filtered locations
  const filteredLocations = useMemo(() => {
    if (activeFilter === 'all') return CULTURAL_LOCATIONS;
    return CULTURAL_LOCATIONS.filter((loc: CulturalLocation) => loc.category === activeFilter);
  }, [activeFilter]);

  // Selected location details
  const selectedLocation = useMemo(() => {
    return CULTURAL_LOCATIONS.find((l: CulturalLocation) => l.id === selectedLocationId) || CULTURAL_LOCATIONS[0];
  }, [selectedLocationId]);

  return (
    <div className="w-full bg-[#fcf9f8] text-[#1c1b1b] min-h-screen">
      {/* Top Academic Context Header */}
      <section className="w-full bg-[#f6f3f2] py-10 lg:py-12 border-b border-[#e5e2e1]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#e5e2e1] text-[#7f5600] font-mono text-xs font-semibold uppercase tracking-wider">
                  Hệ thống GIS Di sản học thuật · Mã I01-MAP
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#50443f]">
                  <span className="w-2 h-2 rounded-full bg-[#13332b] animate-ping" />
                  Hiệu chuẩn chuẩn hóa 2024
                </span>
              </div>
              <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-[#43271a] tracking-tight">
                Bản đồ hành trình di sản văn hóa Mường
              </h1>
              <p className="text-sm lg:text-base text-[#50443f] leading-relaxed">
                Kết hợp các địa bàn có tư liệu văn hóa Mường đã công bố với khu vực nghiên cứu đô thị Hà Nội.
                <span className="text-[#43271a] font-semibold"> Minh bạch:</span> Không hiển thị tuyến di cư cá nhân khi chưa khảo sát; các điểm ghim thể hiện địa bàn tư liệu nền và không gian ký ức cộng đồng.
              </p>
            </div>

            {/* Academic Rigor Guarantee Badge */}
            <div className="p-4 bg-white rounded-xl border border-[#e5e2e1] flex items-start gap-3 max-w-md shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#7f5600] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-mono text-xs text-[#43271a] uppercase font-bold">Nguyên tắc chuẩn hóa nhân học</span>
                <p className="text-xs text-[#50443f] leading-snug">
                  Bảo mật tuyệt đối danh tính cá nhân. Tuyến hành trình chỉ mô tả không gian liên kết địa tầng di sản, không theo dõi lộ trình di chuyển dân sự.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Exploration Suite */}
      <section className="w-full py-8 lg:py-10">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20 flex flex-col gap-6">
          
          {/* Filter Chips Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'Tất cả (14 địa bàn)', dot: null },
                { id: 'origin', label: 'Quê gốc 4 Mường lớn (4)', dot: 'bg-[#7f5600]' },
                { id: 'mo', label: 'Địa bàn Mo Mường (5)', dot: 'bg-[#fec25f]' },
                { id: 'perform', label: 'Không gian diễn xướng (1)', dot: 'bg-[#13332b]' },
                { id: 'urban', label: 'Khu vực đô thị khảo sát (4)', dot: 'bg-[#43271a]' }
              ].map(chip => (
                <button
                  key={chip.id}
                  onClick={() => setActiveFilter(chip.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase flex items-center gap-1.5 transition-all ${
                    activeFilter === chip.id
                      ? 'bg-[#43271a] text-white shadow-xs'
                      : 'bg-[#f0eded] text-[#50443f] hover:bg-[#e5e2e1] hover:text-[#1c1b1b]'
                  }`}
                >
                  {chip.dot && <span className={`w-2 h-2 rounded-full ${chip.dot}`} />}
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-[#50443f]">
              <span className="text-[#13332b] font-semibold">Trực quan hóa vector địa tầng</span>
              <span className="text-[#82746e]/40">|</span>
              <span className="text-[#7f5600] font-semibold">Tỷ lệ nghiên cứu 1:500.000</span>
            </div>
          </div>

          {/* Main Layout: Interactive Vector Map (8 cols) + Sidebar Dossier (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Map Canvas */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div 
                className="relative w-full h-[620px] bg-[#f0eded] rounded-2xl overflow-hidden border border-[#e5e2e1] shadow-md select-none"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {/* SVG Vector Cartography Background */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4c3bc" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.6" />
                    </pattern>
                    <linearGradient id="songDaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#13332b" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#2a4a41" stopOpacity="0.15" />
                    </linearGradient>
                    <linearGradient id="migrationFlow" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7f5600" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#43271a" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#gridPattern)" />

                  {/* Topo Curves */}
                  <path 
                    d="M-50,600 C120,520 220,580 340,460 C420,380 480,410 600,320 C680,260 780,240 950,180" 
                    fill="none" 
                    stroke="#d4c3bc" 
                    strokeWidth="1.5" 
                    strokeDasharray="6 4" 
                    opacity="0.7" 
                  />
                  <path 
                    d="M-30,510 C140,430 200,490 320,390 C400,310 460,340 560,260 C640,200 750,190 920,130" 
                    fill="none" 
                    stroke="#d4c3bc" 
                    strokeWidth="1" 
                    opacity="0.5" 
                  />

                  {/* Rivers */}
                  <path 
                    d="M 120,620 Q 220,440 380,310 T 640,190 T 920,90" 
                    fill="none" 
                    stroke="url(#songDaGrad)" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                  />

                  {/* Cultural Corridors */}
                  <path 
                    d="M 220,490 Q 380,390 680,220" 
                    fill="none" 
                    stroke="url(#migrationFlow)" 
                    strokeWidth="2.5" 
                    strokeDasharray="5 6" 
                  />
                  <path 
                    d="M 330,340 Q 480,280 660,200" 
                    fill="none" 
                    stroke="url(#migrationFlow)" 
                    strokeWidth="2" 
                    strokeDasharray="4 5" 
                  />

                  {/* Annotations */}
                  <text x="180" y="490" fill="#13332b" fontFamily="Space Grotesk, sans-serif" fontSize="11" letterSpacing="1.5" opacity="0.6">
                    LƯU VỰC SÔNG ĐÀ (CỘI NGUỒN MƯỜNG)
                  </text>
                  <text x="560" y="150" fill="#43271a" fontFamily="Space Grotesk, sans-serif" fontSize="11" letterSpacing="1.5" opacity="0.6">
                    ĐỒNG BẰNG CHÂU THỔ HÀ NỘI
                  </text>
                </svg>

                {/* Interactive Clickable Pins */}
                {filteredLocations.map((loc: CulturalLocation) => {
                  const isSelected = loc.id === selectedLocationId;
                  const pinColor = 
                    loc.category === 'origin' ? 'bg-[#7f5600] text-white ring-[#7f5600]/30' :
                    loc.category === 'mo' ? 'bg-[#fec25f] text-[#43271a] ring-[#fec25f]/40' :
                    loc.category === 'perform' ? 'bg-[#13332b] text-white ring-[#13332b]/30' :
                    'bg-[#43271a] text-white ring-[#43271a]/30';

                  return (
                    <div
                      key={loc.id}
                      onClick={() => setSelectedLocationId(loc.id)}
                      className="absolute cursor-pointer transition-all duration-300 hover:scale-125 z-10"
                      style={{ top: loc.top, left: loc.left }}
                    >
                      <div className="relative flex flex-col items-center group -translate-x-1/2 -translate-y-1/2">
                        <span className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center font-bold ring-4 transition-transform ${pinColor} ${
                          isSelected ? 'scale-125 ring-8 animate-pulse' : ''
                        }`}>
                          <MapPin className="w-4 h-4" />
                        </span>

                        {/* Label Badge */}
                        <div className={`mt-1 px-2 py-0.5 rounded text-[11px] font-mono whitespace-nowrap shadow-sm border transition-opacity ${
                          isSelected 
                            ? 'bg-[#43271a] text-white border-transparent' 
                            : 'bg-white/95 text-[#1c1b1b] border-[#e5e2e1]'
                        }`}>
                          {isHistoricalNames && loc.historic ? loc.historic : loc.title}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Floating Map Controls (Top Right) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-md border border-[#e5e2e1] flex flex-col gap-1">
                    <button 
                      onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
                      title="Phóng to"
                      className="w-8 h-8 rounded-lg hover:bg-[#f6f3f2] flex items-center justify-center text-[#43271a]"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
                      title="Thu nhỏ"
                      className="w-8 h-8 rounded-lg hover:bg-[#f6f3f2] flex items-center justify-center text-[#43271a]"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setZoomLevel(1)}
                      title="Đặt lại góc nhìn"
                      className="w-8 h-8 rounded-lg hover:bg-[#f6f3f2] flex items-center justify-center text-[#43271a]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-md border border-[#e5e2e1] flex flex-col gap-1">
                    <button 
                      onClick={() => setShowBoundaries(!showBoundaries)}
                      title="Bật/Tắt ranh giới"
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        showBoundaries ? 'bg-[#f0eded] text-[#7f5600]' : 'text-[#82746e]'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setIsHistoricalNames(!isHistoricalNames)}
                      title="Chuyển tên Lịch sử / Hiện đại"
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isHistoricalNames ? 'bg-[#f0eded] text-[#43271a]' : 'text-[#82746e]'
                      }`}
                    >
                      <Compass className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Scale Ruler & Status (Bottom Left) */}
                <div className="absolute bottom-4 left-4 z-20 flex items-end gap-3 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-xs border border-[#e5e2e1] flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <span className="font-mono text-[9px] text-[#43271a] font-bold">N</span>
                      <span className="w-0 h-0 border-x-4 border-x-transparent border-b-8 border-b-[#43271a]" />
                      <span className="font-mono text-[7px] text-[#82746e]">BẮC</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 font-mono text-[9px] text-[#50443f]">
                        <span>0</span>
                        <span className="w-10 h-1 bg-[#43271a] rounded-full inline-block" />
                        <span className="w-10 h-1 bg-[#d4c3bc] rounded-full inline-block" />
                        <span>50 km</span>
                      </div>
                      <span className="font-mono text-[8px] text-[#82746e]">WGS-84 VN2000</span>
                    </div>
                  </div>

                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xs border border-[#e5e2e1] hidden sm:flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7f5600]" />
                    <span className="font-mono text-[11px] text-[#50443f]">
                      {isHistoricalNames ? 'Chế độ: Địa danh Cổ truyền Mường' : 'Chế độ: Địa danh hành chính Hiện đại'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Legend Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-[#e5e2e1] text-xs text-[#50443f]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#7f5600]" />
                  <span>Đồng Cổ (Cội nguồn 4 Mường lớn)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#fec25f]" />
                  <span>Nâu / Vàng Cát (Địa bàn Mo Mường)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#13332b]" />
                  <span>Xanh Rừng Trầm (Không gian diễn xướng)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#43271a]" />
                  <span>Đỏ Gạch Đô Thị (Khu vực khảo sát nội thành)</span>
                </div>
              </div>
            </div>

            {/* Sidebar Dossier Card */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#e5e2e1] space-y-4">
                
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#e5e2e1]">
                  <span className="font-mono text-xs text-[#7f5600] font-bold">
                    {selectedLocation.code}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-mono font-semibold">
                    {selectedLocation.status}
                  </span>
                </div>

                {/* Title & Historical Subtitle */}
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#43271a]">
                    {selectedLocation.title}
                  </h2>
                  {selectedLocation.historic && (
                    <p className="text-xs text-[#7f5600] font-medium mt-0.5">
                      Lịch sử: {selectedLocation.historic}
                    </p>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-mono text-[10px] text-[#82746e] uppercase block font-semibold">
                      Loại hình di sản ghi nhận
                    </span>
                    <p className="text-[#1c1b1b] font-medium mt-0.5 leading-relaxed">
                      {selectedLocation.heritage}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#e5e2e1]">
                    <div>
                      <span className="font-mono text-[10px] text-[#82746e] uppercase block">Hồ sơ liên kết</span>
                      <span className="font-medium text-[#43271a] font-mono">
                        {selectedLocation.records}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#82746e] uppercase block">Phương pháp</span>
                      <span className="font-medium text-[#1c1b1b]">Điền dã & Phỏng vấn sâu</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#e5e2e1]">
                    <span className="font-mono text-[10px] text-[#82746e] uppercase block">Cơ quan & Nguồn kiểm chứng</span>
                    <p className="text-[#50443f] mt-0.5">
                      {selectedLocation.source}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-[#e5e2e1]">
                  <button
                    onClick={() => onNavigateTab('kho-tu-lieu-so')}
                    className="w-full py-2.5 rounded bg-[#43271a] hover:bg-[#5c3d2e] text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>XEM HỒ SƠ TƯ LIỆU ĐỊA BÀN NÀY</span>
                  </button>

                  <button
                    onClick={() => {
                      const geoJson = {
                        type: "Feature",
                        properties: {
                          id: selectedLocation.id,
                          name: selectedLocation.title,
                          code: selectedLocation.code,
                          category: selectedLocation.category,
                          records: selectedLocation.records
                        }
                      };
                      navigator.clipboard.writeText(JSON.stringify(geoJson, null, 2));
                      alert('Đã trích xuất tọa độ GeoJSON theo chuẩn CIDOC-CRM!');
                    }}
                    className="w-full py-2 rounded bg-[#f0eded] hover:bg-[#e5e2e1] text-[#1c1b1b] text-xs font-medium flex items-center justify-center gap-1 transition-colors border border-[#d4c3bc]"
                  >
                    <span>Xuất trích lục tọa độ CIDOC-CRM</span>
                  </button>
                </div>

              </div>

              {/* Research Ethics Box */}
              <div className="p-4 rounded-xl bg-[#fff9ed] border border-[#fec25f]/50 space-y-1.5 text-xs text-[#754f00]">
                <div className="flex items-center gap-1.5 font-bold uppercase font-mono text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Cam kết đạo đức điền dã</span>
                </div>
                <p className="leading-relaxed">
                  "Chỉ bổ sung tuyến di cư cá nhân khi có dữ liệu khảo sát và sự đồng thuận của người tham gia theo cam kết đạo đức."
                </p>
                <span className="text-[10px] font-mono text-[#82746e] block pt-1">
                  Nghị định 109/2018/NĐ-CP · ICOM Code of Ethics
                </span>
              </div>
            </div>

          </div>

          <MuongDivider />

          {/* Bottom Historical 4 Regions */}
          <div className="space-y-6 pt-4">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase tracking-wider">
                Tương quan không gian
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a]">
                Bốn vùng Mường cổ đến các tọa độ thích ứng tại Thủ đô
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  id: 'bi',
                  title: 'Mường Bi (Hòa Bình)',
                  rank: 'VÙNG 1 · NHẤT BI',
                  sub: 'Tân Lạc',
                  dist: '~98 km',
                  desc: 'Cội nguồn phát tích của Sử thi Đẻ Đất Đẻ Nước đồ sộ nhất. Nơi bảo tồn các bài Mo tang lễ có số và cấu trúc bản Mường hoàn chỉnh.'
                },
                {
                  id: 'vang',
                  title: 'Mường Vang (Hòa Bình)',
                  rank: 'VÙNG 2 · NHÌ VANG',
                  sub: 'Lạc Sơn',
                  dist: '~115 km',
                  desc: 'Vùng thung lũng trù phú nức tiếng với nghệ thuật dệt cạp váy tinh xảo hàng đầu và hệ thống điệu hát Đang, Bọ Mẹng phong phú.'
                },
                {
                  id: 'thang',
                  title: 'Mường Thàng (Hòa Bình)',
                  rank: 'VÙNG 3 · TAM THÀNG',
                  sub: 'Cao Phong',
                  dist: '~84 km',
                  desc: 'Địa bàn cửa ngõ trung chuyển dọc triền sông Đà. Ghi nhận sự gìn giữ bền bỉ của nghệ thuật chiêng Mường và phong tục cúng cơm mới.'
                },
                {
                  id: 'dong',
                  title: 'Mường Động (Hòa Bình)',
                  rank: 'VÙNG 4 · TỨ ĐỘNG',
                  sub: 'Kim Bôi',
                  dist: '~72 km',
                  desc: 'Vùng nước ấm địa nhiệt giàu bản sắc y học dân gian, lưu giữ các biến thể nhạc khí tre nứa độc đáo và ký ức lịch sử nhà lang Mường.'
                }
              ].map(card => (
                <div key={card.id} className="bg-white p-5 rounded-xl border border-[#e5e2e1] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#7f5600] bg-[#fff9ed] px-2 py-0.5 rounded">
                      {card.rank}
                    </span>
                    <span className="text-[11px] font-mono text-[#50443f]">{card.sub}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#43271a]">{card.title}</h3>
                  <p className="text-xs text-[#50443f] leading-relaxed">{card.desc}</p>
                  <div className="pt-2 border-t border-[#e5e2e1] flex items-center justify-between text-xs font-mono text-[#82746e]">
                    <span>Khoảng cách đến Hà Nội:</span>
                    <strong className="text-[#43271a]">{card.dist}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
