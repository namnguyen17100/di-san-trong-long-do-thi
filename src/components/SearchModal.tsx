import React, { useState, useMemo } from 'react';
import { Search, X, MapPin, Database, BookOpen, ChevronRight } from 'lucide-react';
import { ARCHIVAL_RECORDS, HERITAGE_ITEMS, CULTURAL_LOCATIONS } from '../data/mockHeritageData';
import { HeritageItem, ArchivalRecord, CulturalLocation } from '../types/heritage';
import { NavTab } from './Header';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavTab) => void;
  onSelectHeritage?: (id: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectHeritage
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const matchedHeritages: HeritageItem[] = HERITAGE_ITEMS.filter((h: HeritageItem) => 
      h.title.toLowerCase().includes(q) || 
      h.code.toLowerCase().includes(q) ||
      h.categoryLabel.toLowerCase().includes(q) ||
      h.keywords.toLowerCase().includes(q)
    );

    const matchedRecords: ArchivalRecord[] = ARCHIVAL_RECORDS.filter((r: ArchivalRecord) => 
      r.title.toLowerCase().includes(q) || 
      r.code.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q)
    );

    const matchedLocations: CulturalLocation[] = CULTURAL_LOCATIONS.filter((l: CulturalLocation) => 
      l.title.toLowerCase().includes(q) || 
      l.code.toLowerCase().includes(q) ||
      l.historic.toLowerCase().includes(q) ||
      l.heritage.toLowerCase().includes(q)
    );

    return {
      heritages: matchedHeritages,
      records: matchedRecords,
      locations: matchedLocations,
      total: matchedHeritages.length + matchedRecords.length + matchedLocations.length
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#e5e2e1] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#e5e2e1] flex items-center gap-3 bg-[#fcf9f8]">
          <Search className="w-5 h-5 text-[#7f5600]" />
          <input 
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tra cứu nhanh mã hồ sơ (vd: I01-DS-01), Mo Mường, cồng chiêng, Ba Vì..."
            className="flex-1 bg-transparent text-sm lg:text-base text-[#1c1b1b] placeholder:text-[#82746e] focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#82746e] hover:text-[#1c1b1b]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2.5 py-1 rounded bg-[#f0eded] text-xs font-mono text-[#50443f] hover:bg-[#e5e2e1]"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-5 text-xs divide-y divide-[#e5e2e1]">
          {!searchResults ? (
            <div className="py-8 text-center text-[#82746e] space-y-2">
              <p className="font-serif text-sm text-[#43271a] font-medium">Nhập từ khóa hoặc mã định danh để tra cứu</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {['I01-DS-02', 'Mo Mường', 'Cồng chiêng', 'Ba Vì', 'Cạp váy', 'Cỗ lá'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded bg-[#f0eded] hover:bg-[#e5e2e1] text-[#7f5600] font-mono text-[11px]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.total === 0 ? (
            <div className="py-8 text-center text-[#82746e] space-y-1">
              <p className="font-serif text-sm text-[#43271a]">Không tìm thấy kết quả phù hợp</p>
              <p className="text-[11px]">Vui lòng thử tìm với từ khóa tổng quát hơn hoặc kiểm tra mã hồ sơ.</p>
            </div>
          ) : (
            <>
              {/* Heritage Items */}
              {searchResults.heritages.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[11px] text-[#7f5600] uppercase font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Trụ cột di sản ({searchResults.heritages.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.heritages.map((item: HeritageItem) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          onSelectHeritage?.(item.id);
                          onNavigateTab('chi-tiet-di-san');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg hover:bg-[#f6f3f2] cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#43271a]">{item.code}</span>
                            <span className="font-medium text-[#1c1b1b]">{item.title}</span>
                          </div>
                          <p className="text-[11px] text-[#50443f] line-clamp-1">{item.excerpt}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#82746e] group-hover:text-[#43271a]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Archival Records */}
              {searchResults.records.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="font-mono text-[11px] text-[#43271a] uppercase font-bold flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    Bản ghi lưu trữ số ({searchResults.records.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.records.map((rec: ArchivalRecord) => (
                      <div 
                        key={rec.code}
                        onClick={() => {
                          onNavigateTab('kho-tu-lieu-so');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg hover:bg-[#f6f3f2] cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#43271a]">{rec.code}</span>
                            <span className="font-medium text-[#1c1b1b]">{rec.title}</span>
                          </div>
                          <span className="text-[11px] text-[#82746e] font-mono">{rec.location} · {rec.type}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#82746e] group-hover:text-[#43271a]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cultural Locations */}
              {searchResults.locations.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="font-mono text-[11px] text-[#13332b] uppercase font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Địa bàn văn hóa GIS ({searchResults.locations.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.locations.map((loc: CulturalLocation) => (
                      <div 
                        key={loc.id}
                        onClick={() => {
                          onNavigateTab('ban-do-van-hoa');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg hover:bg-[#f6f3f2] cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#13332b]">{loc.code}</span>
                            <span className="font-medium text-[#1c1b1b]">{loc.title}</span>
                          </div>
                          <p className="text-[11px] text-[#50443f] line-clamp-1">{loc.historic}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#82746e] group-hover:text-[#43271a]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#f6f3f2] border-t border-[#e5e2e1] flex items-center justify-between text-[11px] text-[#50443f] font-mono">
          <span>Chuẩn tìm kiếm: Dublin Core & Kho dữ liệu mở I01</span>
          <span>Nhấn ESC để đóng</span>
        </div>
      </div>
    </div>
  );
}
