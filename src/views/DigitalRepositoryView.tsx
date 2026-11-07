import React, { useState, useMemo } from 'react';
import { 
  Search, Download, Eye, Check, Copy, ExternalLink, Filter, 
  FileText, ShieldCheck, Database, Info, RefreshCw, X, Code2
} from 'lucide-react';
import { ArchivalRecord } from '../types/heritage';
import { ARCHIVAL_RECORDS } from '../data/mockHeritageData';
import MuongDivider from '../components/MuongDivider';
import { NavTab } from '../components/Header';

interface DigitalRepositoryViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onSelectRecord?: (code: string) => void;
}

export default function DigitalRepositoryView({ 
  onNavigateTab 
}: DigitalRepositoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRecordCode, setSelectedRecordCode] = useState<string>('I01-DS-02');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);

  // Active records filtered
  const filteredRecords = useMemo(() => {
    return ARCHIVAL_RECORDS.filter((rec: ArchivalRecord) => {
      const matchQuery = 
        rec.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = 
        selectedCategory === 'all' || 
        rec.type.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchStatus = 
        selectedStatus === 'all' || 
        rec.status.toLowerCase().includes(selectedStatus.toLowerCase());

      return matchQuery && matchCategory && matchStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  // Selected Record for Inspector
  const selectedRecord = useMemo(() => {
    return ARCHIVAL_RECORDS.find((r: ArchivalRecord) => r.code === selectedRecordCode) || ARCHIVAL_RECORDS[1];
  }, [selectedRecordCode]);

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['Mã hồ sơ', 'Loại hình', 'Tiêu đề', 'Địa bàn khảo cứu', 'Thời gian', 'Trạng thái', 'Nguồn tham chiếu', 'Cộng đồng chủ thể'];
    const rows = filteredRecords.map((r: ArchivalRecord) => [
      `"${r.code}"`,
      `"${r.type}"`,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.location}"`,
      `"${r.date}"`,
      `"${r.status}"`,
      `"${r.source}"`,
      `"${r.community || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `disan-muong-archive-export-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyCitation = () => {
    if (!selectedRecord) return;
    const citation = selectedRecord.citation || `Bùi Trung Nam (2024). "${selectedRecord.title}". Mã lưu trữ số: ${selectedRecord.code}. Hồ sơ đề tài I01 - PH60600. Cổng số hóa Di Sản Trong Lòng Đô Thị, Hà Nội.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="w-full bg-[#fcf9f8] text-[#1c1b1b] min-h-screen">
      {/* Top Archival Metric Strip */}
      <section className="w-full bg-[#f6f3f2] border-b border-[#e5e2e1]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20 py-2.5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#50443f]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#7f5600] animate-pulse" />
            <span className="font-mono text-[#7f5600] font-bold uppercase">CỔNG LƯU TRỮ HỌC THUẬT PH60600</span>
            <span className="text-[#82746e]/40">|</span>
            <span className="text-[#1c1b1b]">Đề tài I01: Chuẩn hóa siêu dữ liệu Dublin Core & CIDOC-CRM</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>XÁC THỰC LẦN CUỐI: 24/05/2024</span>
            <span className="text-[#82746e]/40">•</span>
            <span className="text-[#43271a] font-semibold">ĐỒNG BỘ: KHO DỮ LIỆU MỞ HÀ NỘI</span>
          </div>
        </div>
      </section>

      {/* Header Banner */}
      <section className="w-full bg-[#fcf9f8] py-10 lg:py-14 border-b border-[#e5e2e1] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded bg-[#f0eded] font-mono text-xs uppercase text-[#7f5600] font-semibold">
                <Database className="w-3.5 h-3.5" />
                Hệ thống mục lục hồ sơ di sản Mường
              </div>
              <h1 className="font-serif text-3xl lg:text-5xl font-semibold text-[#43271a] leading-tight tracking-tight">
                Kho tư liệu số & Lưu trữ hồ sơ di sản Mường
              </h1>
              <p className="text-base lg:text-lg text-[#50443f] max-w-3xl leading-relaxed">
                Bản xem trước hệ thống hóa danh mục hồ sơ đề tài I01. Dữ liệu chuẩn mực khoa học với mã định danh độc bản và nguồn đối chiếu minh bạch, phục vụ bảo tồn và nghiên cứu cộng đồng Mường tại thủ đô Hà Nội.
              </p>
            </div>

            {/* Metric Panel */}
            <div className="lg:col-span-4 bg-[#f6f3f2] rounded-xl p-5 border border-[#e5e2e1] shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#e5e2e1]">
                <span className="font-mono text-xs text-[#7f5600] font-bold uppercase">THỐNG KÊ THỜI GIAN THỰC</span>
                <ShieldCheck className="w-4 h-4 text-[#7f5600]" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="font-mono text-3xl font-bold text-[#43271a]">15</span>
                  <span className="font-mono text-[10px] uppercase text-[#50443f] block mt-0.5">Bản ghi số hóa</span>
                </div>
                <div className="border-x border-[#e5e2e1]">
                  <span className="font-mono text-3xl font-bold text-[#7f5600]">08</span>
                  <span className="font-mono text-[10px] uppercase text-[#50443f] block mt-0.5">Nguồn kiểm chứng</span>
                </div>
                <div>
                  <span className="font-mono text-3xl font-bold text-[#13332b]">04</span>
                  <span className="font-mono text-[10px] uppercase text-[#50443f] block mt-0.5">Loại hình lưu trữ</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#50443f] pt-1 border-t border-[#e5e2e1]">
                <span>Tiến độ số hóa đợt 1</span>
                <span className="font-semibold text-[#43271a] font-mono">100% Khảo sát nền</span>
              </div>
              <div className="w-full h-1.5 bg-[#e5e2e1] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#43271a]" style={{ width: '80%' }} title="Nguồn công khai (12/15)" />
                <div className="h-full bg-[#fec25f]" style={{ width: '20%' }} title="Chờ điền dã (3/15)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Motif */}
      <div className="py-2 bg-[#fcf9f8]">
        <MuongDivider />
      </div>

      {/* Main Filter & Data Section */}
      <section className="w-full bg-[#f6f3f2] py-8 lg:py-12 border-t border-[#e5e2e1]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20 flex flex-col gap-6">
          
          {/* Interactive Toolbar */}
          <div className="bg-white rounded-xl p-5 border border-[#e5e2e1] shadow-xs flex flex-col gap-4">
            
            {/* Search + Action Buttons */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#82746e]" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập mã bản ghi (vd: I01-DS-01, I01-PV-13) hoặc từ khóa nghiên cứu..."
                  className="w-full pl-10 pr-10 py-2.5 bg-[#fcf9f8] border border-[#e5e2e1] rounded-lg text-sm text-[#1c1b1b] placeholder:text-[#82746e] focus:outline-none focus:ring-1 focus:ring-[#43271a]"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#82746e] hover:text-[#1c1b1b]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleExportCsv}
                  className="px-4 py-2.5 rounded-lg bg-[#f0eded] hover:bg-[#e5e2e1] text-[#1c1b1b] text-xs font-mono uppercase font-semibold flex items-center gap-1.5 transition-colors border border-[#d4c3bc]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất tệp CSV</span>
                </button>
                <button
                  onClick={() => setSelectedRecordCode('I01-DS-02')}
                  className="px-4 py-2.5 rounded-lg bg-[#43271a] hover:bg-[#5c3d2e] text-white text-xs font-mono uppercase font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Khảo sát hồ sơ I01-DS-02</span>
                </button>
              </div>
            </div>

            {/* Filter Strips */}
            <div className="flex flex-col gap-3 pt-2 border-t border-[#e5e2e1]">
              {/* Type Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase text-[#50443f] min-w-[120px] font-semibold">
                  Loại tư liệu:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'Tất cả (15)' },
                    { id: 'Văn bản', label: 'Văn bản & Pháp quy (3)' },
                    { id: 'Di sản', label: 'Di sản phi vật thể (9)' },
                    { id: 'Phỏng vấn', label: 'Phỏng vấn thực địa & Âm thanh (3)' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`px-3 py-1 rounded text-xs font-mono uppercase font-semibold transition-colors ${
                        selectedCategory === tab.id
                          ? 'bg-[#43271a] text-white'
                          : 'bg-[#f0eded] text-[#50443f] hover:bg-[#e5e2e1]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase text-[#50443f] min-w-[120px] font-semibold">
                  Xác minh:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'Tất cả trạng thái', dot: null },
                    { id: 'Nguồn công khai', label: 'Nguồn công khai đã duyệt (12)', dot: 'bg-emerald-600' },
                    { id: 'Chờ khảo sát', label: 'Chờ khảo sát thực địa (3)', dot: 'bg-amber-500' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedStatus(tab.id)}
                      className={`px-3 py-1 rounded text-xs font-mono uppercase font-semibold flex items-center gap-1.5 transition-colors ${
                        selectedStatus === tab.id
                          ? 'bg-[#7f5600] text-white'
                          : 'bg-[#f0eded] text-[#50443f] hover:bg-[#e5e2e1]'
                      }`}
                    >
                      {tab.dot && <span className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} />}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Grid Layout: Table (8 cols) + Inspector Drawer (4 cols) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left: 15 Archival Records Table */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#7f5600] font-bold uppercase">DANH MỤC HỒ SƠ LƯU TRỮ CHÍNH THỨC</span>
                  <span className="text-xs text-[#50443f]">
                    (Hiển thị {filteredRecords.length} / {ARCHIVAL_RECORDS.length} hồ sơ)
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#82746e]">CHUẨN MÃ: I01-ISO-2788</span>
              </div>

              <div className="bg-white rounded-xl border border-[#e5e2e1] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs lg:text-sm">
                    <thead>
                      <tr className="bg-[#f0eded] text-[#50443f] font-mono text-xs uppercase border-b border-[#e5e2e1]">
                        <th className="py-3 px-4">Mã hồ sơ</th>
                        <th className="py-3 px-4">Loại hình</th>
                        <th className="py-3 px-4">Tiêu đề hồ sơ nghiên cứu</th>
                        <th className="py-3 px-4">Địa bàn</th>
                        <th className="py-3 px-4">Trạng thái</th>
                        <th className="py-3 px-4">Nguồn gốc</th>
                        <th className="py-3 px-4 text-right">Xem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e2e1]">
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center">
                            <div className="flex flex-col items-center justify-center gap-2 text-[#82746e]">
                              <Search className="w-8 h-8 opacity-50" />
                              <p className="font-serif text-base text-[#43271a] font-medium">Không tìm thấy bản ghi tương ứng</p>
                              <p className="text-xs text-[#50443f]">Vui lòng kiểm tra lại mã định danh (vd: I01-DS-01) hoặc đặt lại bộ lọc.</p>
                              <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStatus('all'); }}
                                className="mt-2 px-3 py-1.5 rounded bg-[#f0eded] text-xs font-mono uppercase font-semibold text-[#7f5600] hover:bg-[#e5e2e1]"
                              >
                                Đặt lại bộ lọc
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((rec: ArchivalRecord) => {
                          const isSelected = rec.code === selectedRecordCode;
                          return (
                            <tr
                              key={rec.code}
                              onClick={() => setSelectedRecordCode(rec.code)}
                              className={`cursor-pointer transition-colors ${
                                isSelected 
                                  ? 'bg-[#ffddae]/30 font-medium' 
                                  : 'hover:bg-[#fcf9f8]'
                              }`}
                            >
                              <td className="py-3 px-4 font-mono font-bold text-[#43271a]">
                                {rec.code}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                                  rec.type === 'Văn bản'
                                    ? 'bg-blue-50 text-blue-800'
                                    : rec.type === 'Phỏng vấn'
                                    ? 'bg-amber-50 text-amber-800'
                                    : 'bg-emerald-50 text-emerald-800'
                                }`}>
                                  {rec.type}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[#1c1b1b] font-medium max-w-[240px] truncate" title={rec.title}>
                                {rec.title}
                              </td>
                              <td className="py-3 px-4 text-[#50443f] text-xs">
                                {rec.location}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center gap-1 text-[11px] font-mono ${
                                  rec.status.includes('Chờ') ? 'text-amber-700' : 'text-emerald-700'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    rec.status.includes('Chờ') ? 'bg-amber-600' : 'bg-emerald-600'
                                  }`} />
                                  {rec.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono text-xs text-[#7f5600] font-semibold">
                                {rec.source}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRecordCode(rec.code);
                                  }}
                                  className="p-1 rounded hover:bg-[#e5e2e1] text-[#43271a]"
                                  title="Soi hồ sơ chi tiết"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Source Guide Mini Cross Table */}
              <div className="bg-white rounded-xl p-5 border border-[#e5e2e1] shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#e5e2e1]">
                  <span className="font-mono text-xs text-[#7f5600] font-bold uppercase">BẢNG KÊ NGUỒN ĐỐI CHIẾU SƠ CẤP & THỨ CẤP</span>
                  <button 
                    onClick={() => onNavigateTab('nguon-va-kiem-chung')}
                    className="font-mono text-xs text-[#7f5600] hover:underline"
                  >
                    NG-01 → NG-08 Xem chi tiết &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded bg-[#f6f3f2]">
                    <span className="font-mono font-bold text-[#43271a] block">NG-01</span>
                    <span className="text-[11px] text-[#50443f]">Viện Dân tộc học (Viện Hàn lâm KHXH)</span>
                  </div>
                  <div className="p-2 rounded bg-[#f6f3f2]">
                    <span className="font-mono font-bold text-[#43271a] block">NG-02</span>
                    <span className="text-[11px] text-[#50443f]">Cục Di sản văn hóa - Bộ VHTTDL</span>
                  </div>
                  <div className="p-2 rounded bg-[#f6f3f2]">
                    <span className="font-mono font-bold text-[#43271a] block">NG-03</span>
                    <span className="text-[11px] text-[#50443f]">PGS.TS Đặng Văn Lung (Nghiên cứu Mo)</span>
                  </div>
                  <div className="p-2 rounded bg-[#f6f3f2]">
                    <span className="font-mono font-bold text-[#43271a] block">NG-04</span>
                    <span className="text-[11px] text-[#50443f]">NNƯT Bùi Thị Bích & CLB Cồng Chiêng</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Record Inspector Drawer */}
            <div className="xl:col-span-4 sticky top-24 space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-[#e5e2e1] space-y-4 relative overflow-hidden">
                
                {/* Header of Inspector */}
                <div className="flex items-center justify-between pb-3 border-b border-[#e5e2e1]">
                  <div className="flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#43271a]" />
                    <span className="font-mono text-xs text-[#7f5600] font-bold uppercase">
                      KHUNG SOI HỒ SƠ KHOA HỌC
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#f0eded] text-[#43271a] font-mono text-[11px] font-semibold">
                    {selectedRecord.type}
                  </span>
                </div>

                {/* Record Code + Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xl font-bold text-[#43271a]">
                      {selectedRecord.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                      selectedRecord.status.includes('Chờ') 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {selectedRecord.status}
                    </span>
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-[#1c1b1b] leading-snug">
                    {selectedRecord.title}
                  </h2>
                </div>

                {/* Image Preview */}
                <div className="relative h-44 rounded-lg overflow-hidden bg-[#43271a]">
                  <img 
                    src={selectedRecord.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"} 
                    alt={selectedRecord.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white font-mono text-[10px]">
                    <span className="truncate">{selectedRecord.imgCaption || selectedRecord.location}</span>
                    <span>Scan số chuẩn lưu trữ</span>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#f6f3f2] p-3 rounded-lg border border-[#e5e2e1]">
                  <div>
                    <span className="font-mono text-[10px] text-[#82746e] uppercase block">Địa bàn ghi nhận</span>
                    <span className="font-medium text-[#1c1b1b]">{selectedRecord.location}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#82746e] uppercase block">Cộng đồng chủ thể</span>
                    <span className="font-medium text-[#1c1b1b]">{selectedRecord.community || 'Cộng đồng Mường Hà Nội'}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#82746e] uppercase block">Thời gian khảo tả</span>
                    <span className="font-medium text-[#1c1b1b]">{selectedRecord.date}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#82746e] uppercase block">Mã đối chiếu gốc</span>
                    <span className="font-medium text-[#7f5600] font-mono">{selectedRecord.source}</span>
                  </div>
                </div>

                {/* Abstract Text */}
                <div className="space-y-1">
                  <span className="font-mono text-xs uppercase text-[#7f5600] font-semibold block">
                    Tóm tắt nội dung học thuật:
                  </span>
                  <p className="text-xs text-[#50443f] leading-relaxed">
                    {selectedRecord.summary}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-[#82746e] pt-1">
                  Giấy phép: CC BY-NC-ND 4.0 (Đề tài NCKH I01 - PH60600)
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-[#e5e2e1]">
                  <button
                    onClick={handleCopyCitation}
                    className="w-full py-2.5 rounded bg-[#43271a] hover:bg-[#5c3d2e] text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    {copiedCitation ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>ĐÃ SAO CHÉP TRÍCH DẪN</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>SAO CHÉP MÃ TRÍCH DẪN HỌC THUẬT</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onNavigateTab('nguon-va-kiem-chung')}
                      className="py-2 rounded bg-[#f0eded] hover:bg-[#e5e2e1] text-[#1c1b1b] text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-[#7f5600]" />
                      <span>Xem nguồn {selectedRecord.source}</span>
                    </button>
                    <button
                      onClick={() => setShowJsonModal(true)}
                      className="py-2 rounded bg-[#f0eded] hover:bg-[#e5e2e1] text-[#1c1b1b] text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <Code2 className="w-3 h-3 text-[#13332b]" />
                      <span>Trích lục JSON</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* 3 Core Ethical Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-white p-5 rounded-xl border border-[#e5e2e1] space-y-2 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#43271a]/10 flex items-center justify-center text-[#43271a]">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-semibold text-[#43271a]">Mã định danh bất biến</h4>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Tất cả 15 hồ sơ được phân nhóm tiền tố chuẩn mực: I01-DS (Di sản văn hóa), I01-HD (Hành động bảo tồn) và I01-PV (Phỏng vấn thực địa đô thị).
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#e5e2e1] space-y-2 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#7f5600]/10 flex items-center justify-center text-[#7f5600]">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-semibold text-[#43271a]">Kiểm chứng nguồn cấp 1</h4>
              <p className="text-xs text-[#50443f] leading-relaxed">
                8 cơ quan chuyên môn và nghệ nhân được mã hóa từ NG-01 đến NG-08 nhằm loại bỏ thông tin dị bản không qua giám định học thuật.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#e5e2e1] space-y-2 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-[#13332b]/10 flex items-center justify-center text-[#13332b]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-semibold text-[#43271a]">Đạo đức điền dã</h4>
              <p className="text-xs text-[#50443f] leading-relaxed">
                Các bản ghi phỏng vấn cá nhân (I01-PV-13 tới PV-15) tuân thủ quy chuẩn bảo mật danh tính, tôn trọng quyền sở hữu tri thức dân gian của cộng đồng Mường.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* JSON Schema Preview Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-[#e5e2e1]">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e2e1]">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#13332b]" />
                <h3 className="font-serif text-base font-bold text-[#43271a]">
                  Trích lục siêu dữ liệu JSON-LD (Dublin Core / CIDOC-CRM)
                </h3>
              </div>
              <button 
                onClick={() => setShowJsonModal(false)}
                className="w-7 h-7 rounded-full bg-[#f6f3f2] hover:bg-[#e5e2e1] text-[#50443f] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <pre className="bg-[#1c1b1b] text-emerald-400 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-80">
{JSON.stringify({
  "@context": "https://dublincore.org/specifications/dublin-core/dcmi-terms/",
  "@type": "CulturalHeritageArtifact",
  "identifier": selectedRecord.code,
  "title": selectedRecord.title,
  "subject": selectedRecord.community,
  "spatialCoverage": selectedRecord.location,
  "temporalCoverage": selectedRecord.date,
  "rights": "CC BY-NC-ND 4.0",
  "creator": "Bùi Trung Nam (PH60600) - Đề tài I01",
  "provenance": selectedRecord.source,
  "verificationStatus": selectedRecord.status
}, null, 2)}
            </pre>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#50443f]">Chuẩn mã hóa: UTF-8 JSON</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(selectedRecord, null, 2));
                  alert('Đã chép đối tượng JSON vào Clipboard!');
                  setShowJsonModal(false);
                }}
                className="px-4 py-2 rounded bg-[#43271a] text-white font-medium hover:bg-[#5c3d2e]"
              >
                Sao chép mã JSON
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
