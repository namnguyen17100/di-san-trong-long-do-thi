import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, Download, Copy, Check, ExternalLink, 
  BookOpen, Building2, Award, Info, Lock, ChevronRight, Mail, AlertTriangle
} from 'lucide-react';
import { VerificationSource } from '../types/heritage';
import { VERIFICATION_SOURCES } from '../data/mockHeritageData';
import MuongDivider from '../components/MuongDivider';
import { NavTab } from '../components/Header';

interface SourcesVerificationViewProps {
  onNavigateTab: (tab: NavTab) => void;
}

export default function SourcesVerificationView({ 
  onNavigateTab 
}: SourcesVerificationViewProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // Filter sources
  const filteredSources = VERIFICATION_SOURCES.filter((src: VerificationSource) => {
    if (selectedTag === 'all') return true;
    return src.typeCategory.toLowerCase().includes(selectedTag.toLowerCase()) || src.type.toLowerCase().includes(selectedTag.toLowerCase());
  });

  const handleCopyCitation = () => {
    const apaCitation = `Bùi Trung Nam (2024). Di Sản Trong Lòng Đô Thị: Nghiên cứu bảo tồn bản sắc văn hóa dân tộc Mường giữa nhịp sống Hà Nội (Đề tài NCKH I01, Mã số sinh viên PH60600). Viện Văn hóa Dân gian & Cổng thông tin lưu trữ số hóa, Hà Nội.`;
    navigator.clipboard.writeText(apaCitation);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(VERIFICATION_SOURCES, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "disan-sources.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail || !inquiryContent) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setShowInquiryModal(false);
      setInquiryEmail('');
      setInquiryContent('');
      alert('Yêu cầu đối chiếu của bạn đã được gửi tới Hội đồng Thẩm định Học thuật đề tài I01.');
    }, 1500);
  };

  return (
    <div className="w-full bg-[#fcf9f8] text-[#1c1b1b] min-h-screen">
      {/* Hero Banner & Scholarly Assurance Metadata */}
      <section className="relative w-full bg-[#f6f3f2] py-10 lg:py-14 border-b border-[#e5e2e1]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
          
          {/* Top Identifier */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#50443f]">
              <span className="text-[#7f5600] font-bold">I01 · PH60600</span>
              <span>/</span>
              <span>TRUNG TÂM THẨM ĐỊNH HỌC THUẬT</span>
              <span>/</span>
              <span className="text-[#43271a] font-bold">NGUỒN & KIỂM CHỨNG</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13332b]/10 text-[#13332b] font-mono text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% NGUỒN CÓ MÃ ĐỐI CHIẾU SƠ CẤP</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#7f5600]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#7f5600] font-bold">
                  Khung chuẩn kiểm định CIDOC CRM & Dublin Core
                </span>
              </div>
              <h1 className="font-serif text-3xl lg:text-5xl font-semibold text-[#43271a] tracking-tight leading-tight">
                Nguồn tư liệu & Hệ thống kiểm chứng khoa học
              </h1>
              <p className="text-base lg:text-lg text-[#50443f] leading-relaxed max-w-3xl">
                Đảm bảo tính trung thực, chuẩn xác và đạo đức nghiên cứu học thuật của đề tài <strong>I01</strong> (Chủ nhiệm: <strong>Bùi Trung Nam – PH60600</strong>). Mọi bản ghi trong hệ thống đều được liên kết trực tiếp với cơ quan ban hành, ấn phẩm khoa học hoặc nguồn tư liệu công khai.
              </p>
            </div>

            {/* Academic Export Actions Toolbar */}
            <div className="lg:col-span-4 flex flex-col gap-2 w-full">
              <button 
                onClick={handleCopyCitation}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#43271a] text-white hover:bg-[#5c3d2e] transition-colors shadow-xs group"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  {copiedBibtex ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedBibtex ? 'Đã sao chép APA 7th!' : 'Sao chép trích dẫn (BibTeX / APA)'}</span>
                </span>
                <span className="font-mono text-xs text-[#d3a895] group-hover:text-white">APA 7th</span>
              </button>

              <button 
                onClick={() => alert('Đang khởi tạo tài liệu PDF chuẩn học thuật A4 chứa 8 nguồn Master...')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-[#e5e2e1] text-[#1c1b1b] hover:bg-[#f6f3f2] transition-colors shadow-xs"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4 text-[#7f5600]" />
                  <span>Xuất danh mục nguồn PDF</span>
                </span>
                <span className="font-mono text-xs text-[#50443f]">A4 Document</span>
              </button>

              <button 
                onClick={handleDownloadJson}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#f0eded] text-[#1c1b1b] hover:bg-[#e5e2e1] transition-colors border border-[#d4c3bc]"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Download className="w-4 h-4 text-[#13332b]" />
                  <span>Tải tệp disan-sources.json</span>
                </span>
                <span className="font-mono text-xs text-[#50443f]">24.8 KB</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#e5e2e1]">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Tổng số nguồn kiểm chứng</span>
              <span className="font-serif text-2xl font-bold text-[#43271a]">08 Nguồn Master</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Bản ghi di sản đối ứng</span>
              <span className="font-serif text-2xl font-bold text-[#7f5600]">12 Hồ sơ (I01-DS / HD)</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Cơ quan thẩm định uy tín</span>
              <span className="font-serif text-2xl font-bold text-[#13332b]">06 Đơn vị VAST/VHTTDL</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#50443f] uppercase font-semibold">Độ tin cậy chuẩn đối chiếu</span>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold text-[#43271a]">100%</span>
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Master Verification Table */}
      <section className="w-full py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#7f5600] font-bold">
                <span>Danh mục lưu trữ chính thức</span>
                <span>•</span>
                <span>Mã hồ sơ: I01-REF-2024</span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a] tracking-tight mt-1">
                Bảng Đối Chiếu Nguồn Tư Liệu Chuẩn Mực
              </h2>
              <p className="text-sm text-[#50443f] mt-1 max-w-2xl">
                Tất cả 8 công trình tư liệu nền tảng làm điểm tựa khoa học cho việc phân loại, phục dựng số hóa và mô tả các diễn xướng, tập quán Mường tại Ba Vì, Thạch Thất và Quốc Oai.
              </p>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'Tất cả (8)' },
                { id: 'Công trình khoa học', label: 'Công trình khoa học' },
                { id: 'Văn bản', label: 'Văn bản quản lý' },
                { id: 'Hiện vật', label: 'Hiện vật & Địa phương' }
              ].map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-semibold uppercase transition-colors ${
                    selectedTag === tag.id
                      ? 'bg-[#43271a] text-white'
                      : 'bg-[#f0eded] text-[#50443f] hover:bg-[#e5e2e1]'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto shadow-sm rounded-xl border border-[#e5e2e1] bg-white">
            <table className="w-full text-left border-collapse min-w-[1020px] text-xs lg:text-sm">
              <thead>
                <tr className="bg-[#f0eded] font-mono text-xs text-[#50443f] uppercase border-b border-[#e5e2e1]">
                  <th className="py-3 px-4 w-24">Mã nguồn</th>
                  <th className="py-3 px-4 w-80">Tên tài liệu / Ấn phẩm</th>
                  <th className="py-3 px-4 w-64">Tác giả / Cơ quan xuất bản</th>
                  <th className="py-3 px-4 w-20">Năm</th>
                  <th className="py-3 px-4 w-44">Phân loại học thuật</th>
                  <th className="py-3 px-4 w-36">Bản ghi liên kết</th>
                  <th className="py-3 px-4 w-36">Trạng thái</th>
                  <th className="py-3 px-4 text-right w-24">Đối chiếu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e2e1]">
                {filteredSources.map((src: VerificationSource) => (
                  <tr key={src.id} className="hover:bg-[#fcf9f8] transition-colors">
                    <td className="py-4 px-4 align-top">
                      <span className="font-mono text-xs font-bold text-[#43271a] px-2 py-0.5 rounded bg-[#f0eded]">
                        {src.id}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="font-serif font-semibold text-[#43271a] text-sm">
                        {src.title}
                      </div>
                      <div className="text-[11px] text-[#50443f] mt-1">
                        {src.details || src.type}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top text-[#50443f]">
                      <span className="font-medium text-[#1c1b1b] block">{src.author}</span>
                    </td>

                    <td className="py-4 px-4 align-top font-mono text-xs text-[#50443f]">
                      {src.year}
                    </td>

                    <td className="py-4 px-4 align-top">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[11px] font-semibold ${
                        src.typeCategory.includes('Văn bản') 
                          ? 'bg-amber-50 text-amber-900' 
                          : src.typeCategory.includes('Hiện vật')
                          ? 'bg-purple-50 text-purple-900'
                          : 'bg-emerald-50 text-emerald-900'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {src.typeCategory}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                        {src.linkedRecords.map((recCode: string) => (
                          <button
                            key={recCode}
                            onClick={() => onNavigateTab('kho-tu-lieu-so')}
                            className="px-1.5 py-0.5 rounded bg-[#f0eded] text-[#43271a] hover:bg-[#ffddae] font-medium transition-colors"
                          >
                            {recCode}
                          </button>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                        {src.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-top text-right">
                      {src.url ? (
                        <a 
                          href={src.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-1.5 rounded hover:bg-[#e5e2e1] text-[#43271a] transition-colors"
                          title="Mở cổng tra cứu ngoài"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-[#82746e] text-xs font-mono">Bản in</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#50443f]">
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#7f5600]" />
              <span>Ký hiệu mã: <strong className="text-[#1c1b1b]">I01-DS</strong>: Di sản phi vật thể · <strong className="text-[#1c1b1b]">I01-HD</strong>: Hiện vật / Địa bàn khảo sát điền dã.</span>
            </div>
            <div className="font-mono text-[11px]">Cập nhật đối soát gần nhất: Tháng 11/2024</div>
          </div>

        </div>
      </section>

      {/* Dual-Column Deep Verification Procedures & Visual Proof Vitrine */}
      <section className="w-full py-12 lg:py-16 bg-[#f6f3f2] border-t border-[#e5e2e1]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Methodology Procedure */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-mono text-xs uppercase text-[#7f5600] font-bold">
                Quy trình thẩm tra 4 bước
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a] tracking-tight">
                Từ Hiện Trường Điền Dã Đến Bản Ghi Số Thẩm Định
              </h2>
              <p className="text-sm text-[#50443f] leading-relaxed">
                Nhóm nghiên cứu I01 thiết lập cơ chế kiểm chứng chéo 3 bên nhằm loại trừ hoàn toàn các biến dạng thông tin hay giả mạo văn hóa dân gian trong quá trình đô thị hóa:
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#e5e2e1] shadow-xs">
                  <div className="w-8 h-8 rounded bg-[#43271a] text-white font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#43271a]">
                      Ghi âm & Phỏng vấn gốc (Primary Oral Source)
                    </h4>
                    <p className="text-xs text-[#50443f] mt-0.5 leading-relaxed">
                      Thu thanh trực tiếp từ thầy Mo, nghệ nhân cồng chiêng cao tuổi tại Ba Vì và Thạch Thất với sự đồng thuận tự nguyện qua biên bản ghi nhớ (FPIC).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#e5e2e1] shadow-xs">
                  <div className="w-8 h-8 rounded bg-[#7f5600] text-white font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#43271a]">
                      Đối chiếu văn bản học (Textual Cross-reference)
                    </h4>
                    <p className="text-xs text-[#50443f] mt-0.5 leading-relaxed">
                      So sánh từng bài cúng Mo, hoa văn cạp váy dệt tay với kho tài liệu của Viện Hàn lâm KHXH và hồ sơ đệ trình UNESCO của Cục Di sản Văn hóa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#e5e2e1] shadow-xs">
                  <div className="w-8 h-8 rounded bg-[#13332b] text-white font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#43271a]">
                      Định danh số & Gắn nhãn trạng thái (Metadata Tagging)
                    </h4>
                    <p className="text-xs text-[#50443f] mt-0.5 leading-relaxed">
                      Cấp mã ID bất biến, lưu trữ siêu dữ liệu theo chuẩn Dublin Core và mở công khai mã nguồn kiểm tra trên hệ thống.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Proof Showcase */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col rounded-xl overflow-hidden bg-white border border-[#e5e2e1] shadow-xs">
                <div className="relative h-56 w-full overflow-hidden bg-[#43271a]">
                  <img 
                    src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80" 
                    alt="Mẫu đồ họa cạp váy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#43271a] text-white font-mono text-[10px]">
                    Mã mẫu vật: MV-2021-09
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <span className="font-mono text-xs text-[#7f5600] font-semibold">Tài liệu ấn phẩm khảo chứng</span>
                  <h3 className="font-serif text-sm font-semibold text-[#43271a]">Mẫu đồ họa cạp váy Mường</h3>
                  <p className="text-xs text-[#50443f] leading-relaxed">
                    Đối chiếu trực tiếp với mẫu hiện vật lưu giữ tại Bảo tàng Dân tộc học Việt Nam (Hà Nội).
                  </p>
                </div>
              </div>

              <div className="flex flex-col rounded-xl overflow-hidden bg-white border border-[#e5e2e1] shadow-xs">
                <div className="relative h-56 w-full overflow-hidden bg-[#13332b]">
                  <img 
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" 
                    alt="Nhật ký phỏng vấn thực địa"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#13332b] text-white font-mono text-[10px]">
                    Điền dã: Ba Vì 2023
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <span className="font-mono text-xs text-[#13332b] font-semibold">Nhật ký phỏng vấn thực địa</span>
                  <h3 className="font-serif text-sm font-semibold text-[#43271a]">Lời kể nghệ nhân dân gian</h3>
                  <p className="text-xs text-[#50443f] leading-relaxed">
                    Băng ghi âm lời tự thuật diễn xướng cồng chiêng Mường cổ tại xã Ba Trại, huyện Ba Vì.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Quy Tắc Bất Di Bất Dịch Trong Sử Dụng Tư Liệu */}
      <section className="w-full py-12 lg:py-16 bg-[#fcf9f8]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="font-mono text-xs uppercase text-[#7f5600] font-bold">
              Nguyên tắc học thuật & Đạo đức nghiên cứu
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#43271a]">
              3 Quy Tắc Bất Di Bất Dịch Trong Sử Dụng Tư Liệu
            </h2>
            <p className="text-sm text-[#50443f]">
              Cam kết danh dự của nhóm nghiên cứu đề tài I01 nhằm bảo vệ di sản văn hóa sống của đồng bào Mường và tuân thủ các công ước sở hữu trí tuệ học thuật quốc tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e2e1] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#43271a]/10 flex items-center justify-center text-[#43271a]">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase block">
                NGUYÊN TẮC 01 · BẢN QUYỀN GỐC
              </span>
              <h3 className="font-serif text-base font-semibold text-[#43271a]">
                Tôn trọng bản quyền tác giả và nguồn gốc bản địa
              </h3>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Mọi bài cúng Mo Mường, làn điệu dân ca và tri thức dệt thổ cẩm đều thuộc sở hữu văn hóa tinh thần của cộng đồng người Mường. Mọi hình thức tái bản hoặc trích dẫn bắt buộc phải ghi rõ tên làng bản, người nắm giữ và nguồn tham chiếu.
              </p>
              <div className="pt-2 border-t border-[#e5e2e1] text-[11px] font-mono text-[#82746e]">
                Tuân thủ Công ước UNESCO 2003 về Di sản Phi vật thể
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e2e1] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#7f5600]/10 flex items-center justify-center text-[#7f5600]">
                <Lock className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-[#7f5600] font-semibold uppercase block">
                NGUYÊN TẮC 02 · PHÂN ĐỊNH NGUỒN
              </span>
              <h3 className="font-serif text-base font-semibold text-[#43271a]">
                Phân định rõ tư liệu công khai với tư liệu có bản quyền riêng
              </h3>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Hệ thống phân tách rạch ròi giữa tư liệu thuộc phạm vi công cộng (văn bản quy phạm, kỷ yếu nhà nước) với hình ảnh, file âm thanh độc quyền tự bảo tàng hoặc nghệ nhân cá nhân. Các tài nguyên giới hạn truy cập được khóa bảo mật bản quyền.
              </p>
              <div className="pt-2 border-t border-[#e5e2e1] text-[11px] font-mono text-[#82746e]">
                Áp dụng giấy phép Creative Commons CC BY-NC-ND 4.0
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e5e2e1] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#13332b]/10 flex items-center justify-center text-[#13332b]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-[#13332b] font-semibold uppercase block">
                NGUYÊN TẮC 03 · TRUNG THỰC ĐẠO ĐỨC
              </span>
              <h3 className="font-serif text-base font-semibold text-[#43271a]">
                Không tự ý dựng lời kể hay thông tin chưa đồng thuận
              </h3>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Nghiêm cấm hành vi biên tập bóp méo, thêm thắt các yếu tố hư cấu vào hồi ức nghệ nhân hoặc diễn xướng tâm linh Mo Mường. Mọi trích đoạn xuất bản trên nền tảng đều có bản cam kết có chữ ký của người trả lời phỏng vấn hoặc đại diện gia tộc.
              </p>
              <div className="pt-2 border-t border-[#e5e2e1] text-[11px] font-mono text-[#82746e]">
                Quy chuẩn đạo đức nhân học AAA Code of Ethics
              </div>
            </div>
          </div>

          {/* Verification Inquiry CTA */}
          <div className="mt-10 p-6 rounded-2xl bg-[#43271a] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif text-lg font-semibold">
                Cam kết thẩm định độc lập & Tiếp nhận khiếu nại bản quyền
              </h3>
              <p className="text-xs text-white/80 max-w-2xl">
                Nếu quý cơ quan hoặc nghệ nhân phát hiện bất kỳ sự bất tương đồng hoặc đề xuất bổ sung nguồn kiểm chứng, xin vui lòng gửi yêu cầu thẩm định.
              </p>
            </div>
            <button
              onClick={() => setShowInquiryModal(true)}
              className="px-5 py-2.5 rounded-lg bg-[#fec25f] text-[#43271a] font-mono text-xs font-bold uppercase hover:bg-[#ffddae] transition-colors whitespace-nowrap shadow-xs"
            >
              Gửi yêu cầu đối chiếu nguồn
            </button>
          </div>

        </div>
      </section>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#e5e2e1]">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e2e1]">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#7f5600]" />
                <h3 className="font-serif text-base font-bold text-[#43271a]">
                  Gửi yêu cầu đối chiếu hoặc đính chính nguồn
                </h3>
              </div>
              <button 
                onClick={() => setShowInquiryModal(false)}
                className="w-7 h-7 rounded-full bg-[#f6f3f2] hover:bg-[#e5e2e1] text-[#50443f] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitInquiry} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[#50443f] block mb-1">Email liên hệ của quý vị:</label>
                <input 
                  type="email"
                  required
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 bg-[#fcf9f8] border border-[#e5e2e1] rounded-lg text-sm text-[#1c1b1b]"
                />
              </div>

              <div>
                <label className="font-mono text-[#50443f] block mb-1">Nội dung đối chiếu / Mã hồ sơ quan tâm (vd: NG-02, I01-DS-02):</label>
                <textarea 
                  required
                  rows={4}
                  value={inquiryContent}
                  onChange={(e) => setInquiryContent(e.target.value)}
                  placeholder="Mô tả cụ thể căn cứ học thuật, trích lục sách hoặc văn bản của quý vị..."
                  className="w-full px-3 py-2 bg-[#fcf9f8] border border-[#e5e2e1] rounded-lg text-sm text-[#1c1b1b]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInquiryModal(false)}
                  className="px-4 py-2 rounded bg-[#f0eded] text-[#50443f] hover:bg-[#e5e2e1]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={inquirySent}
                  className="px-4 py-2 rounded bg-[#43271a] text-white hover:bg-[#5c3d2e] font-medium"
                >
                  {inquirySent ? 'Đang gửi...' : 'Gửi yêu cầu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="pb-12">
        <MuongDivider label="MINH BẠCH HỌC THUẬT & TRÍCH DẪN" />
      </div>
    </div>
  );
}
