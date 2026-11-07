import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Download, Copy, Check, MapPin, Play, Pause, Volume2, 
  ExternalLink, FileText, Box, Music, Video, ShieldCheck, BookOpen, 
  ChevronRight, Calendar, Users, Database, Sparkles, AlertCircle
} from 'lucide-react';
import { HeritageItem } from '../types/heritage';
import { heritageService } from '../services/heritageService';
import MuongDivider from '../components/MuongDivider';
import { NavTab } from '../components/Header';

interface HeritageDetailViewProps {
  itemId?: string;
  onNavigateTab: (tab: NavTab) => void;
  onSelectHeritage?: (id: string) => void;
}

export default function HeritageDetailView({ 
  itemId = 'mo-muong', 
  onNavigateTab 
}: HeritageDetailViewProps) {
  const [item, setItem] = useState<HeritageItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(38); // 38%
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [activeSection, setActiveSection] = useState('tong-quan');
  const [show3DModal, setShow3DModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    heritageService.getHeritageItemById(itemId).then(res => {
      if (res) {
        setItem(res);
      } else {
        // Fallback to Mo Muong default
        heritageService.getHeritageItemById('101-MM-01').then(m => setItem(m || null));
      }
    });
  }, [itemId]);

  // Audio timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlayProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleCopyCitation = () => {
    const citation = `Bùi Trung Nam (2024). Hồ sơ số hóa di sản: Mo Mường trong không gian văn hóa Hà Nội (Mã định danh I01-DS-02 / Dublin Core & CIDOC-CRM E28). Đề tài nghiên cứu khoa học I01 - PH60600. Lưu trữ tại Cổng số hóa Di Sản Trong Lòng Đô Thị.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const navSections = [
    { id: 'tong-quan', label: '1. Tổng quan & Nguồn gốc' },
    { id: 'chu-the', label: '2. Chủ thể & Không gian' },
    { id: 'cau-truc', label: '3. Nghi lễ & Cấu trúc áng mo' },
    { id: 'tiep-bien', label: '4. Tiếp biến tại Hà Nội' },
    { id: 'kho-tu-lieu', label: '5. Thư viện tư liệu số hóa' },
    { id: 'doi-chieu', label: '6. Đối chiếu & Đạo đức nghiên cứu' }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-[#fcf9f8] text-[#1c1b1b] min-h-screen">
      {/* Top Breadcrumb & Metadata Path */}
      <div className="w-full bg-[#f6f3f2]/80 border-b border-[#e5e2e1] py-3 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20 flex flex-wrap items-center justify-between gap-3 text-sm">
          <nav aria-label="Đường dẫn tra cứu" className="flex items-center gap-2 text-[#50443f] flex-wrap">
            <button 
              onClick={() => onNavigateTab('trang-chu')}
              className="hover:text-[#43271a] transition-colors flex items-center gap-1"
            >
              Trang chủ
            </button>
            <span className="text-[#82746e]/50 font-mono text-xs">/</span>
            <button 
              onClick={() => onNavigateTab('kham-pha-di-san')}
              className="hover:text-[#43271a] transition-colors flex items-center gap-1"
            >
              Khám phá di sản
            </button>
            <span className="text-[#82746e]/50 font-mono text-xs">/</span>
            <span className="text-[#50443f]">Tín ngưỡng & Nghi lễ</span>
            <span className="text-[#82746e]/50 font-mono text-xs">/</span>
            <span className="text-[#43271a] font-semibold">{item?.title || 'Mo Mường'}</span>
          </nav>
          
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-[#e5e2e1] text-[#43271a] font-semibold">
              MÃ: {item?.code || 'I01-DS-02'}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#fec25f]/30 text-[#754f00] font-semibold">
              TẬP: I01-HD-04
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header & Academic Dossier Intro */}
      <section className="w-full bg-[#fcf9f8] pt-10 pb-8 lg:pt-14 lg:pb-12 border-b border-[#e5e2e1]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
          <div className="flex flex-col gap-6">
            
            {/* Status Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#EBF2EE] text-[#13332b] font-mono text-xs font-semibold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  Có nguồn công khai (NG-02)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#ffddae] text-[#604000] font-mono text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Đã thẩm định học thuật (NG-03)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#f0eded] text-[#50443f] font-mono text-xs">
                  CIDOC-CRM E28 Conceptual Object
                </span>
              </div>
              <span className="font-mono text-xs text-[#50443f]">
                Hồ sơ đệ trình UNESCO · Danh mục QG 2020
              </span>
            </div>

            {/* Title & Epigraph */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 flex flex-col gap-3">
                <h1 className="font-serif text-3xl lg:text-5xl font-semibold text-[#43271a] leading-tight tracking-tight">
                  Mo Mường – Di sản trong đời sống tín ngưỡng & không gian ký ức đô thị
                </h1>
                <p className="font-serif text-lg lg:text-xl text-[#50443f] italic leading-relaxed pt-1">
                  “Mo Mường là bộ bách khoa toàn thư dân gian truyền khẩu, chở che linh hồn và luân chuyển vũ trụ quan Mường từ cội nguồn thần thoại đến nhịp sống đương đại giữa lòng thủ đô.”
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 items-start lg:items-end justify-end pt-2">
                <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                  <button 
                    onClick={() => {
                      alert('Đang tạo và tải bản sao hồ sơ lưu trữ khoa học PDF (Mã I01-DS-02, chuẩn ISO 16363)...');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded bg-[#43271a] text-white text-sm font-medium hover:bg-[#5c3d2e] transition-colors shadow-sm flex-1 lg:flex-none"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải hồ sơ số (PDF)</span>
                  </button>
                  <button 
                    onClick={handleCopyCitation}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded bg-[#f0eded] hover:bg-[#e5e2e1] text-[#1c1b1b] text-sm font-medium transition-colors border border-[#d4c3bc]"
                  >
                    {copiedCitation ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span className="text-emerald-800 font-semibold">Đã trích dẫn!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Trích dẫn Dublin Core</span>
                      </>
                    )}
                  </button>
                </div>
                <button 
                  onClick={() => onNavigateTab('ban-do-van-hoa')}
                  className="inline-flex items-center gap-1.5 text-[#7f5600] font-mono text-xs hover:underline font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Xem 8 điểm khảo cứu trên Bản đồ GIS</span>
                </button>
              </div>
            </div>

            {/* Academic Metadata Grid Bar */}
            <div className="w-full bg-[#f6f3f2] rounded-xl p-5 border border-[#e5e2e1] shadow-xs">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Loại hình di sản</span>
                  <span className="font-medium text-[#43271a]">Tập quán xã hội & Tín ngưỡng dân gian</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Cộng đồng chủ thể</span>
                  <span className="font-medium text-[#1c1b1b]">Dân tộc Mường (Thầy Mo, gia đình Mường)</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Địa bàn khảo cứu</span>
                  <span className="font-medium text-[#1c1b1b]">Ba Vì, Thạch Thất (HN) & Hòa Bình</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Thời gian thực địa</span>
                  <span className="font-medium text-[#1c1b1b]">2018 – 2024 (7 đợt điền dã)</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Dung lượng số hóa</span>
                  <span className="font-medium text-[#1c1b1b]">34 bài mo · 12 làn điệu</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Tiêu chuẩn lưu trữ</span>
                  <span className="font-medium text-[#13332b] font-mono font-semibold">WAV 96kHz/24bit · METS/MODS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Multimedia Showcase & Interactive Archival Player */}
      <section className="w-full bg-[#f0eded] py-10 border-b border-[#e5e2e1]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Field Record Photo with Caption */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="relative w-full h-[380px] lg:h-[460px] rounded-xl overflow-hidden shadow-md bg-[#43271a] group">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80" 
                  alt="Nghi thức cúng Mo Khót cầu an đầu năm tại xóm Hợp Nhất, Ba Vì"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#43271a]/95 via-[#43271a]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="font-mono text-xs text-[#fec25f] uppercase tracking-wider mb-1 font-semibold">
                    Tư liệu hiện trường · Hồ sơ số I01-REC-089
                  </span>
                  <h3 className="font-serif text-xl lg:text-2xl font-semibold leading-snug">
                    Nghi thức cúng Mo Khót cầu an đầu năm tại xóm Hợp Nhất, xã Ba Vì, Hà Nội
                  </h3>
                  <p className="text-xs lg:text-sm text-white/80 mt-1 line-clamp-2">
                    Thầy Mo Bùi Văn C. (78 tuổi) thực hành áng Mo Đẻ Đất Đẻ Nước trước bàn phụng sự gia tộc. Ảnh điền dã tháng 02/2023.
                  </p>
                </div>
              </div>
            </div>

            {/* Audio Player Card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-xl p-6 lg:p-7 shadow-md border border-[#e5e2e1]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-[#13332b]/10 text-[#13332b] font-mono text-xs uppercase font-semibold">
                    Bản ghi âm nguyên bản · Field Recording
                  </span>
                  <span className="font-mono text-xs text-[#50443f]">FLAC 24-bit / 96kHz</span>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#43271a]">
                    Áng Mo: "Đẻ Đất Đẻ Nước"
                  </h2>
                  <p className="text-sm text-[#50443f] mt-0.5">
                    Trích đoạn mở đầu: Khót Mo & Gọi thần linh tứ phương (04:25)
                  </p>
                </div>

                {/* Waveform Player */}
                <div className="w-full bg-[#f6f3f2] rounded-xl p-4 border border-[#e5e2e1] flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-xs text-[#50443f]">
                    <span>01:42</span>
                    <span className="text-[#7f5600] font-semibold">Làn điệu: Mo Râm (Ngâm nga trang trọng)</span>
                    <span>04:25</span>
                  </div>

                  {/* Visual Waveform Bar Simulation */}
                  <div className="flex items-end gap-1 h-16 w-full pt-2 px-1">
                    {[
                      20, 35, 60, 80, 45, 95, 75, 30, 55, 100, 70, 40, 20, 55, 85, 95, 
                      50, 75, 35, 15, 65, 85, 95, 50, 30, 65, 90, 75, 40, 60, 80, 50,
                      30, 70, 90, 60, 45, 85, 95, 65, 40, 75, 85, 50, 30, 20
                    ].map((height, idx) => {
                      const isActive = (idx / 46) * 100 <= playProgress;
                      return (
                        <div
                          key={idx}
                          style={{ height: `${height}%` }}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            isActive ? 'bg-[#7f5600]' : 'bg-[#d4c3bc]'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Progress scrub bar */}
                  <div 
                    className="w-full bg-[#d4c3bc] h-1.5 rounded-full overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newProg = Math.round((clickX / rect.width) * 100);
                      setPlayProgress(newProg);
                    }}
                  >
                    <div 
                      className="bg-[#7f5600] h-full transition-all"
                      style={{ width: `${playProgress}%` }}
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#43271a] text-white text-sm font-semibold hover:bg-[#5c3d2e] transition-colors shadow-sm"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>Tạm dừng</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-white" />
                          <span>Nghe trích đoạn</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-3 text-xs text-[#50443f]">
                      <span className="flex items-center gap-1 font-mono">
                        <Volume2 className="w-4 h-4 text-[#7f5600]" />
                        100%
                      </span>
                      <button 
                        onClick={() => alert('Đang chuẩn bị file bản ký âm PDF 12 làn điệu mo để tải...')}
                        className="hover:text-[#43271a] underline font-mono"
                      >
                        Tải bản ký âm
                      </button>
                    </div>
                  </div>
                </div>

                {/* Excerpt Lyrics Card */}
                <div className="bg-[#fcf9f8] p-3.5 rounded-lg border border-[#e5e2e1] text-xs space-y-1.5">
                  <span className="font-mono text-[#7f5600] font-semibold block uppercase">
                    Trích đoạn lời Mo (Ký âm ngữ âm Mường Ba Vì):
                  </span>
                  <p className="font-serif italic text-[#1c1b1b] leading-relaxed">
                    “Dắt đuột trabo, sất maún xau / Đẻ nả oẹ bay năm trăm năm hoót / Đẻ cay xâu cho đàng pửa ô mường trài...”
                  </p>
                  <p className="text-[#50443f] text-[11px]">
                    (Bản dịch khảo cứu: Đất trời hình thành, sinh ra cây chu đồng nghìn cành, mở ra mường người từ thuở hồng hoang...)
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e2e1] flex items-center justify-between text-xs text-[#50443f]">
                <span>Nghệ nhân diễn xướng: <strong>Bùi Văn C.</strong></span>
                <span className="font-mono">Mã bản ghi: #AUDIO-REC-07</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sticky Section Anchor Navigation */}
      <div className="w-full bg-[#fcf9f8] border-b border-[#e5e2e1] sticky top-[132px] z-20 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20 overflow-x-auto no-scrollbar py-3">
          <div className="flex items-center gap-2 whitespace-nowrap">
            {navSections.map(sec => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeSection === sec.id
                    ? 'bg-[#43271a] text-white shadow-xs'
                    : 'bg-[#f0eded] text-[#50443f] hover:bg-[#e5e2e1] hover:text-[#1c1b1b]'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body Content Sections */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-20 py-12 space-y-16">
        
        {/* Section 1: Tổng quan & Nguồn gốc */}
        <section id="tong-quan" className="scroll-mt-48 space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase tracking-wider">
              Phần 01 · Khởi nguyên di sản & Thần thoại khởi nguyên
            </span>
            <div className="h-px bg-[#e5e2e1] flex-1" />
          </div>

          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a]">
            Bách khoa thư sử thi truyền miệng của người Mường
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-base text-[#1c1b1b] leading-relaxed">
              <p>
                Mo Mường là thể loại diễn xướng dân gian mang tính nghi lễ thiêng liêng cao nhất của đồng tộc Mường. Không đơn thuần là nghi thức cúng bái, Mo Mường là một di sản đồ sộ chứa đựng lịch sử hình thành vũ trụ, triết lý nhân sinh, phong tục tập quán, luật tục cộng đồng và quan niệm về thế giới ba tầng bốn thế giới: Mường Trời, Mường Đất, Mường Dưới nước và Mường Ma.
              </p>
              <p>
                Xuyên suốt pho sử thi <em>“Đẻ đất đẻ nước”</em> (Te tấc te đác) dài hàng chục vạn câu ca dao biền ngẫu, người Mường gửi gắm toàn bộ nhận thức sơ khai về tự nhiên: từ lúc trời đất còn tối tăm mịt mù, cây Chu Đồng khổng lồ đổ xuống hoá sinh muôn loài, chim Tăng Chơm bồi đắp duyên sinh ra nòi giống khổng lồ đẻ ra con người xứ Mường.
              </p>

              <div className="p-4 rounded-xl bg-[#f6f3f2] border-l-4 border-[#7f5600] space-y-1">
                <span className="font-mono text-xs font-semibold text-[#7f5600] uppercase block">
                  Tính liên kết văn hóa tại vùng đất Thăng Long – Xứ Đoài
                </span>
                <p className="text-sm text-[#50443f]">
                  Tại các vùng ven đô Hà Nội như Ba Vì (các xã Ba Vì, Yên Bài, Vân Hòa) và Thạch Thất (Tiến Xuân, Yên Bình, Yên Trung), Mo Mường vẫn giữ vai trò mạch ngầm duy trì tính cố kết cộng đồng, kết nối ký ức nơi tận cùng thớ vỏ con người cổ xưa vào hơi thở mây trắng.
                </p>
              </div>
            </div>

            {/* Khot Mo Box Card */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#e5e2e1] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-[#43271a] flex items-center gap-2">
                  <Box className="w-5 h-5 text-[#7f5600]" />
                  Túi Khót Mo
                </h3>
                <span className="font-mono text-xs text-[#7f5600] bg-[#fec25f]/20 px-2 py-0.5 rounded font-semibold">
                  Hiện vật cốt lõi
                </span>
              </div>

              <div className="relative h-48 rounded-lg overflow-hidden bg-[#f0eded]">
                <img 
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" 
                  alt="Túi Khót Mo" 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setShow3DModal(true)}
                  className="absolute bottom-2 right-2 px-3 py-1.5 rounded bg-black/70 hover:bg-black/90 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Box className="w-3.5 h-3.5" />
                  Mô hình 3D scan
                </button>
              </div>

              <p className="text-xs text-[#50443f] leading-relaxed">
                <strong>Túi Khót (Klót Mo):</strong> Là báu vật thiêng liêng nhất của mỗi Thầy Mo, đại diện cho "vía", quyền năng siêu nhiên và lời tôn tạo truyền giáo qua nhiều thế hệ.
              </p>
              <ul className="text-xs text-[#50443f] space-y-1.5 list-disc list-inside">
                <li><strong>Di cốt sấm sét:</strong> Hóa thạch, đá thiên thạch hay rìu đá thời tiền sử được xem là báu vật trời ban.</li>
                <li><strong>Răng nanh thú:</strong> Biểu tượng trấn yểm tà ma, bảo vệ linh hồn người cúng tế.</li>
                <li><strong>Cổ vật đồng thau:</strong> Các mẩu đồng thau đúc cổ từ thời trống đồng Đông Sơn.</li>
              </ul>
              <span className="text-[11px] font-mono text-[#82746e] block pt-1 border-t border-[#e5e2e1]">
                * Nguyên tắc bảo tồn: Tuyệt đối không chạm tay vào túi Khót khi chưa làm lễ xin phép.
              </span>
            </div>
          </div>
        </section>

        <MuongDivider />

        {/* Section 2: Chủ thể & Không gian diễn xướng */}
        <section id="chu-the" className="scroll-mt-48 space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase tracking-wider">
              Phần 02 · Nhân vật trung tâm & Môi trường thực hành
            </span>
            <div className="h-px bg-[#e5e2e1] flex-1" />
          </div>

          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a]">
            Thầy Mo và Không gian Diễn xướng Tôn kính
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e2e1] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#43271a]/10 flex items-center justify-center text-[#43271a]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#43271a]">
                Thầy Mo – "Cột trụ Tri thức"
              </h3>
              <p className="text-sm text-[#50443f] leading-relaxed">
                Không truyền dạy qua sách vở ghi chép, Thầy Mo phải có trí nhớ phi thường để lưu giữ từ 20.000 đến gần 50.000 câu thơ sử thi. Thầy Mo là người giải thích căn nguyên đời người, là thầy thuốc chữa bệnh bằng tâm lý liệu pháp dân gian và là cầu nối duy nhất giữa trần gian và cõi mường trời.
              </p>
              <div className="pt-2 border-t border-[#e5e2e1] text-xs font-mono text-[#7f5600]">
                Truyền khẩu: Trực tiếp qua phương pháp "Ha Mo" & lễ khao thụ phong.
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e2e1] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#7f5600]/10 flex items-center justify-center text-[#7f5600]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#43271a]">
                Cấp bậc & Đạo đức Thông
              </h3>
              <p className="text-sm text-[#50443f] leading-relaxed">
                Thầy Mo được phân bậc theo năng lực tâm linh và tuổi nghề: <strong>Mo Nhứt</strong> (dẫn trọn bộ sử thi, làm lễ lớn), <strong>Mo Nhì</strong>, và <strong>Mo Ba</strong>. Đạo đức khót Mo của người Mo đòi hỏi sự thanh tịnh, cấm tuyệt đối trục lợi tài chính, luôn đặt sự yên bình của chòm xóm lên hàng đầu.
              </p>
              <div className="pt-2 border-t border-[#e5e2e1] text-xs font-mono text-[#7f5600]">
                Lời thề Mo: "Mo vì người sống, đưa đường cho người khuất, giữ tâm trong như nước suối nguồn."
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e2e1] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#13332b]/10 flex items-center justify-center text-[#13332b]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#43271a]">
                Không gian Văn hóa Bếp Lửa
              </h3>
              <p className="text-sm text-[#50443f] leading-relaxed">
                Không gian trường của Mo là nhà sàn gỗ truyền thống bên ánh lửa bếp bập bùng thâu đêm. Trong tiếng rỉ rầm của người con cúi đầu quan sát, trong lễ cúng mụ, cúng vía cầu an, Thầy Mo ngồi bên mâm chuối lá rừng, tiếng Trượng Mo vang lên trong tiếng suối, tiếng chiêng đồng vọng từ vách đồi Ba Vì.
              </p>
              <div className="pt-2 border-t border-[#e5e2e1] text-xs font-mono text-[#13332b]">
                Tính không gian bản địa: Gắn chặt với kiến trúc nhà sàn 3 mái cổ truyền Mường.
              </div>
            </div>
          </div>
        </section>

        <MuongDivider />

        {/* Section 3: Nghi lễ & Cấu trúc áng mo */}
        <section id="cau-truc" className="scroll-mt-48 space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase tracking-wider">
              Phần 03 · Phân loại hệ thống văn bản diễn xướng
            </span>
            <div className="h-px bg-[#e5e2e1] flex-1" />
          </div>

          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a]">
            Cấu trúc 3 Trục Nghi Lễ và Các Áng Mo Trọng Yếu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f6f3f2] rounded-xl p-6 border border-[#e5e2e1] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#43271a] bg-white px-2.5 py-1 rounded">
                  HỆ 01 · TANG LỄ
                </span>
                <span className="font-mono text-xs text-[#50443f]">23 - 28 Đêm Mo</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#43271a]">
                Mo Tang Lễ (Đưa đường linh hồn)
              </h3>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Nghi thức tiễn biệt người đã khuất, hướng dẫn linh hồn (linh hồn) vượt sông biển, qua các ải nguy hiểm để về cội mường trời quê cha đất tổ.
              </p>
              <div className="text-xs text-[#1c1b1b] space-y-1.5 pt-2">
                <p>• <strong>Mo Khót:</strong> Thỉnh gỗ trinh tiết và tái cảm thầy Mo về trợ sức.</p>
                <p>• <strong>Mo Đồn Đường:</strong> Chỉ lối qua Mường Ma, tránh cho linh hồn bị lạc lối.</p>
                <p>• <strong>Mo Chúc Cơm:</strong> Phân phát trâu, lúa, chiêng ché cho người âm an nghỉ.</p>
              </div>
            </div>

            <div className="bg-[#fff9ed] rounded-xl p-6 border border-[#fec25f]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#7f5600] bg-white px-2.5 py-1 rounded">
                  HỆ 02 · SỬ THI KHỞI NGUYÊN
                </span>
                <span className="font-mono text-xs text-[#754f00]">Bộ Sử thi Bách khoa</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#7f5600]">
                Đẻ Đất Đẻ Nước (Te tấc te đác)
              </h3>
              <p className="text-xs text-[#754f00] leading-relaxed">
                Đỉnh cao văn học truyền khẩu Mường, được đọc trong các lễ tang người thọ nhằm nhắc nhở con cháu về nguồn gốc muôn loài và giống nòi.
              </p>
              <div className="text-xs text-[#604000] space-y-1.5 pt-2">
                <p>• <strong>Chương Cây Chu Đồng:</strong> Cây thiêng đổ xẻ sinh ra sông ngòi và nông cụ lao động.</p>
                <p>• <strong>Chương Chim Tăng Tút:</strong> Bồ cào trứng khổng lồ hóa thành loài người và vua Mường.</p>
                <p>• <strong>Chương Làm Nhà Sàn:</strong> Rùa vàng mách bảo hình dáng làm nhà tránh thú dữ.</p>
              </div>
            </div>

            <div className="bg-[#f0f7f4] rounded-xl p-6 border border-[#13332b]/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#13332b] bg-white px-2.5 py-1 rounded">
                  HỆ 03 · CẦU AN & SINH HOẠT
                </span>
                <span className="font-mono text-xs text-[#13332b]">Hộ Thân Bản Mệnh</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#13332b]">
                Mo Vía, Giải Hạn & Cầu An
              </h3>
              <p className="text-xs text-[#2a4a41] leading-relaxed">
                Diễn xướng trong các dịp đời sống hàng ngày: trẻ sơ sinh đầy tháng (cúng mụ), người ốm yếu cầu hồi phục sức khỏe, dựng nhà mới, mừng thọ cụ già.
              </p>
              <div className="text-xs text-[#13332b] space-y-1.5 pt-2">
                <p>• <strong>Mo Mát Nhà:</strong> Rửa sạch xui xẻo, cầu gia đình hòa thuận, mùa màng tươi tốt.</p>
                <p>• <strong>Mo Gắn Vía:</strong> Gọi 9 vía của người phiêu bạt trở về thân thể lành lặn.</p>
                <p>• <strong>Mo Mừng Cơm Mới:</strong> Tạ ơn tổ đãi cho mùa màng tươi tốt bên ché rượu cần.</p>
              </div>
            </div>
          </div>
        </section>

        <MuongDivider />

        {/* Section 4: Tiếp biến tại Hà Nội */}
        <section id="tiep-bien" className="scroll-mt-48 space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase tracking-wider">
              Phần 04 · Khảo sát thực địa I01 – Chủ nhiệm: Bùi Trung Nam (PH60600)
            </span>
            <div className="h-px bg-[#e5e2e1] flex-1" />
          </div>

          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a]">
            Tiếp Biến & Sự Thích Nghi của Mo Mường Giữa Đô Thị Hà Nội
          </h2>
          <p className="text-sm text-[#50443f]">
            Nghiên cứu về phương thức thực hành tín ngưỡng cổ xưa trong không gian xã hội hiện đại của Thủ đô; từ vùng ven đô Ba Vì, Thạch Thất đến cộng đồng di cư nội thành.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              
              <div className="p-5 rounded-xl bg-white border border-[#e5e2e1] space-y-3 shadow-xs">
                <h4 className="font-serif text-base font-semibold text-[#43271a] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#7f5600]" />
                  Rút gọn nghi thức nhưng gìn giữ "Lời Thiêng"
                </h4>
                <p className="text-sm text-[#50443f] leading-relaxed">
                  Theo kết quả điền dã của nhóm nghiên cứu I01 tại các xã Mường cổ (Ba Vì, Thạch Thất), nếu trước đây một nghi lễ tang ma Mường diễn ra kéo dài 3 đến 5 ngày đêm với đầy đủ tuần rầm lễ bái tốn kém, thì nay đã được <strong>rút gọn văn minh chỉ còn 24 đến 36 giờ</strong>.
                </p>
                <p className="text-sm text-[#50443f] leading-relaxed">
                  Tuy nhiên, các áng Mo cốt lõi như Khót Mo, Đòn Tiền, Tạ ơn Cha Mẹ tuyệt đối không bị cắt bỏ. Thầy Mo chủ động lược bớt các phần nhại phụ reo rò, chắt lọc các bài mo giàu giá trị giáo dục đạo đức hiếu nghĩa để diễn xướng, đáp ứng quy định đời sống văn hóa đô thị hiện đại.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#e5e2e1] space-y-3 shadow-xs">
                <h4 className="font-serif text-base font-semibold text-[#43271a] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#7f5600]" />
                  Gia đình Mường tại các khu dân cư nội thành (Cầu Giấy, Nam Từ Liêm, Hà Đông)
                </h4>
                <p className="text-sm text-[#50443f] leading-relaxed">
                  Đối với thế hệ người Mường di cư sinh sống tại các chung cư và nhà phố nội đô, việc mời thầy Mo làm lễ tại chỗ gặp nhiều giới hạn về không gian và khói hương. Các gia đình đã thích ứng thông minh:
                </p>
                <ul className="text-xs text-[#50443f] space-y-1.5 list-disc list-inside">
                  <li><strong>Kết nối hồi hướng tâm linh:</strong> Khi gia đình có việc tang ma hay mừng thọ đại lễ, con cháu đứng ra đón thầy Mo hoặc trở về quê nhà Hòa Bình để làm trọn vẹn nghi thức.</li>
                  <li><strong>Lắng nghe bản ghi số:</strong> Vào các dịp Tết cơm mới, nhiều người trẻ Mường tại Hà Nội mở nghe các trích đoạn Mo cầu an đã được số hóa trên nền tảng số rồi tải về để gắn kết với nguồn cội.</li>
                </ul>
              </div>

            </div>

            {/* Field Interview Quote & Survey Metrics */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 rounded-xl bg-[#43271a] text-white space-y-4 shadow-md">
                <span className="font-serif text-4xl text-[#fec25f] block leading-none font-bold">“</span>
                <p className="font-serif text-base lg:text-lg italic leading-relaxed text-[#fcf9f8]">
                  “Người Mường mình ở Hà Nội giờ đi làm công sở, con cháu nói tiếng Kinh sỏi hơn tiếng Mường. Tôi chỉ sợ mai này khi thế hệ chúng tôi nằm xuống, tiếng Mo không còn ai hiểu nữa thì hồn Mường sẽ lạc lõng giữa phố phường. Nhờ đề tài I01 ghi âm, chép lại từng câu thơ mo, tôi mừng vì biết chữ Mo sẽ còn mãi trên mạng internet cho đời sau.”
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/20">
                  <div className="w-10 h-10 rounded-full bg-[#fec25f] text-[#43271a] flex items-center justify-center font-bold font-serif">
                    HC
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">Nghệ nhân Đinh Công H.</h5>
                    <span className="text-xs text-white/70">76 tuổi · Xã Yên Bài, Ba Vì, Hà Nội</span>
                  </div>
                </div>
              </div>

              {/* Research Statistics Callout */}
              <div className="p-5 rounded-xl bg-[#f6f3f2] border border-[#e5e2e1] space-y-4">
                <span className="font-mono text-xs font-semibold text-[#7f5600] uppercase block">
                  Khảo sát xã hội học I01 (N=320 mẫu tại Hà Nội)
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-3xl font-bold text-[#43271a]">89.4%</span>
                    <p className="text-xs text-[#50443f]">Người Mường mong muốn số hóa Mo Mường</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-3xl font-bold text-[#7f5600]">72.1%</span>
                    <p className="text-xs text-[#50443f]">Lo ngại mai một nghi thức trong đô thị</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <MuongDivider />

        {/* Section 5: Kho tư liệu số hóa liên quan */}
        <section id="kho-tu-lieu" className="scroll-mt-48 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase tracking-wider">
                Phần 05 · Tài nguyên bảo tàng số
              </span>
              <div className="h-px bg-[#e5e2e1] w-24 hidden sm:block" />
            </div>
            <button 
              onClick={() => onNavigateTab('kho-tu-lieu-so')}
              className="text-xs font-mono text-[#7f5600] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Xem toàn bộ hồ sơ lưu trữ Mo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a]">
            Kho Bản Ghi & Hiện Vật Số Hóa Liên Quan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Túi Khót 3D */}
            <div className="bg-white rounded-xl border border-[#e5e2e1] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-44 bg-[#f0eded]">
                  <img 
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80" 
                    alt="Scan Túi Khót Mo" 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                    3D SCAN · OBJ/GLTF
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <span className="font-mono text-[11px] text-[#50443f]">HIỆN VẬT: I01-DS-01A</span>
                  <h4 className="font-serif text-sm font-semibold text-[#43271a]">
                    Túi Khót Mo cổ 5 đời
                  </h4>
                  <p className="text-xs text-[#50443f] line-clamp-2">
                    Bộ mẫu vật của dòng họ Thầy Mo tại Ba Vì, gồm 72 viên đá hóa thạch và 3 dao cùn.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button 
                  onClick={() => setShow3DModal(true)}
                  className="w-full py-2 rounded bg-[#f6f3f2] hover:bg-[#e5e2e1] text-[#43271a] font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Box className="w-3.5 h-3.5" />
                  Mở bản xem 3D
                </button>
              </div>
            </div>

            {/* Card 2: Ký âm PDF */}
            <div className="bg-white rounded-xl border border-[#e5e2e1] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-44 bg-[#f0eded] flex items-center justify-center p-4">
                  <div className="w-full h-full border border-dashed border-[#d4c3bc] rounded bg-white p-3 flex flex-col justify-between">
                    <span className="font-mono text-[10px] text-[#7f5600]">TỔNG PHỔ KÝ ÂM</span>
                    <div className="space-y-1">
                      <div className="h-1 bg-[#43271a]/20 rounded w-3/4" />
                      <div className="h-1 bg-[#43271a]/20 rounded w-full" />
                      <div className="h-1 bg-[#43271a]/20 rounded w-1/2" />
                    </div>
                    <span className="font-serif italic text-xs text-[#50443f]">Làn điệu Mo Dường...</span>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#43271a] text-white font-mono text-[10px]">
                    PDF BẢN NHẠC
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <span className="font-mono text-[11px] text-[#50443f]">BẢN KÝ ÂM: I01-MUS-02</span>
                  <h4 className="font-serif text-sm font-semibold text-[#43271a]">
                    Ký âm 12 làn điệu Mo
                  </h4>
                  <p className="text-xs text-[#50443f] line-clamp-2">
                    Hệ thống nốt nhạc truyền thống thể hiện các tiết tấu Mo Râm, Mo Khót...
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button 
                  onClick={() => alert('Đang mở file tài liệu ký âm 12 làn điệu Mo Mường...')}
                  className="w-full py-2 rounded bg-[#f6f3f2] hover:bg-[#e5e2e1] text-[#43271a] font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Music className="w-3.5 h-3.5" />
                  Đọc tài liệu PDF
                </button>
              </div>
            </div>

            {/* Card 3: Chuyên khảo Sách */}
            <div className="bg-white rounded-xl border border-[#e5e2e1] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-44 bg-[#f0eded]">
                  <img 
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80" 
                    alt="Sách Mo Mường" 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#7f5600] text-white font-mono text-[10px]">
                    CHUYÊN KHẢO VĂN BẢN
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <span className="font-mono text-[11px] text-[#50443f]">SÁCH: ISBN 978-604-913</span>
                  <h4 className="font-serif text-sm font-semibold text-[#43271a]">
                    Sử thi Mo Mường (3 tập)
                  </h4>
                  <p className="text-xs text-[#50443f] line-clamp-2">
                    Công trình sưu tầm đồ sộ của GS. Đặng Nghiêm Vạn, NXB KHXH.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button 
                  onClick={() => onNavigateTab('nguon-va-kiem-chung')}
                  className="w-full py-2 rounded bg-[#f6f3f2] hover:bg-[#e5e2e1] text-[#43271a] font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Đối chiếu nguồn 3 tập
                </button>
              </div>
            </div>

            {/* Card 4: Video Phim tư liệu 4K */}
            <div className="bg-white rounded-xl border border-[#e5e2e1] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-44 bg-[#f0eded]">
                  <img 
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" 
                    alt="Video tư liệu điền dã" 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#13332b] text-white font-mono text-[10px]">
                    VIDEO 4K · 18:24
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-[#43271a]">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <span className="font-mono text-[11px] text-[#50443f]">PHÓNG SỰ: I01-VID-005</span>
                  <h4 className="font-serif text-sm font-semibold text-[#43271a]">
                    Điền dã Mo Mường Ba Vì
                  </h4>
                  <p className="text-xs text-[#50443f] line-clamp-2">
                    Ghi lại trọn vẹn Lễ đón vía giải hạn của cộng đồng người Mường tại xóm Hợp Nhất.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button 
                  onClick={() => alert('Đang tải bản trình chiếu video chất lượng 4K...')}
                  className="w-full py-2 rounded bg-[#f6f3f2] hover:bg-[#e5e2e1] text-[#43271a] font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  Xem trực tuyến
                </button>
              </div>
            </div>

          </div>
        </section>

        <MuongDivider />

        {/* Section 6: Đối chiếu nguồn & Cam kết đạo đức */}
        <section id="doi-chieu" className="scroll-mt-48 space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase tracking-wider">
              Phần 06 · Tiêu chuẩn nghiên cứu – Minh bạch học thuật & Tuân thủ di sản
            </span>
            <div className="h-px bg-[#e5e2e1] flex-1" />
          </div>

          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a]">
            Ma Trận Đối Chiếu Nguồn Sơ Cấp & Cam Kết Đạo Đức
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* References Table Box */}
            <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#e5e2e1] space-y-4 shadow-xs">
              <h3 className="font-serif text-lg font-semibold text-[#43271a]">
                Tài liệu tham chiếu đã xác minh
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#7f5600]">NG-02</span>
                    <span className="text-[#50443f]">Hồ sơ khoa học Di sản văn hóa phi vật thể Quốc gia Mo Mường (2020)</span>
                  </div>
                  <p className="text-[#50443f]">
                    Bộ Văn hóa, Thể thao và Du lịch - Cục Di sản Văn hóa Việt Nam - Quyết định công bố số 1953/QĐ-BVHTTDL.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#7f5600]">NG-03</span>
                    <span className="text-[#50443f]">Tuyển tập Mo Mường toàn tập & Kho tàng Folk-lore</span>
                  </div>
                  <p className="text-[#50443f]">
                    Chủ biên: GS. Đặng Nghiêm Vạn, Viện Nghiên cứu Văn hóa Dân gian & NXB Văn hóa Dân tộc Hà Nội (1995 – 2005).
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#7f5600]">I01-08</span>
                    <span className="text-[#50443f]">Tư liệu điền dã dân tộc học xóm đồng bào Mường Ba Vì, Hà Nội</span>
                  </div>
                  <p className="text-[#50443f]">
                    Báo cáo tổng kết đợt khảo sát 08 - Đề tài nghiên cứu khoa học sinh viên (Bùi Trung Nam, PH60600 - Tháng 11/2023).
                  </p>
                </div>
              </div>
            </div>

            {/* Ethics & Cultural Sovereignty Protocol */}
            <div className="lg:col-span-6 bg-[#f0f7f4] p-6 rounded-xl border border-[#13332b]/20 space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#13332b] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#13332b]" />
                Nguyên tắc Đạo đức Bảo tồn
              </h3>
              <p className="text-xs text-[#2a4a41] leading-relaxed">
                Dự án Di Sản Trong Lòng Đô Thị cam kết tuân thủ nghiêm ngặt <strong>Công ước UNESCO 2003</strong> về bảo vệ di sản văn hóa phi vật thể:
              </p>
              <ul className="text-xs text-[#13332b] space-y-2">
                <li>
                  <strong>• Nguyên tắc FPIC:</strong> Thu thập tư liệu có sự đồng thuận tự nguyện, báo trước và được cung cấp đầy đủ thông tin của các nghệ nhân Mo Mường.
                </li>
                <li>
                  <strong>• Phi thương mại hóa:</strong> Toàn bộ dữ liệu số chỉ phục vụ mục đích nghiên cứu khoa học, giảng dạy và bảo tồn cộng đồng, không khai thác thương mại vì lợi nhuận.
                </li>
                <li>
                  <strong>• Tôn trọng điều kiêng kỵ:</strong> Không công khai các đoạn mo huyền bí gia đình thầy Mo yêu cầu bảo mật, tôn vinh đức tin cốt lõi người Mường.
                </li>
              </ul>
              <div className="pt-2 border-t border-[#13332b]/20 flex items-center justify-between font-mono text-[11px] text-[#13332b]">
                <span>Định danh: CIDOC-CRM v7.1.1</span>
                <span>Dublin Core Schema v1.1</span>
              </div>
            </div>

          </div>
        </section>

        {/* Bottom Navigation Switcher */}
        <div className="pt-10 border-t border-[#e5e2e1] flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => onNavigateTab('kham-pha-di-san')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#d4c3bc] bg-white hover:bg-[#f6f3f2] text-sm font-medium text-[#43271a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Thư mục Di sản</span>
          </button>

          <button
            onClick={() => {
              onNavigateTab('kham-pha-di-san');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#43271a] hover:bg-[#5c3d2e] text-white text-sm font-medium transition-colors"
          >
            <span>Di sản liên đới trong không gian Mường: <strong>Cồng Chiêng & Diễn Xướng</strong></span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 3D Model Modal Simulation */}
      {show3DModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-[#e5e2e1]">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e2e1]">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-[#7f5600]" />
                <h3 className="font-serif text-lg font-bold text-[#43271a]">
                  Bản xem không gian 3D: Túi Khót Mo Ba Vì
                </h3>
              </div>
              <button 
                onClick={() => setShow3DModal(false)}
                className="w-8 h-8 rounded-full bg-[#f6f3f2] hover:bg-[#e5e2e1] text-[#50443f] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="h-80 bg-neutral-900 rounded-xl relative overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" 
                alt="3D Mesh"
                className="w-full h-full object-cover opacity-60 filter contrast-125"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full border-2 border-[#fec25f] border-t-transparent animate-spin flex items-center justify-center">
                  <Box className="w-8 h-8 text-[#fec25f]" />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-sm font-semibold">Tương tác xoay 360° · Điểm đám mây LiDAR 0.2mm</p>
                  <p className="text-xs text-neutral-300">Quét số học chuẩn bảo tàng tại xóm Hợp Nhất, Ba Vì, Hà Nội</p>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded text-white font-mono text-[11px]">
                Vertex: 148,290 | Faces: 296,580
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#50443f]">
              <span>Định dạng xuất: <strong>glTF / USDZ / OBJ</strong></span>
              <button 
                onClick={() => {
                  alert('Đang chuẩn bị gói mô hình 3D nén .ZIP...');
                  setShow3DModal(false);
                }}
                className="px-4 py-2 rounded bg-[#43271a] text-white font-medium hover:bg-[#5c3d2e]"
              >
                Tải file 3D Model
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
