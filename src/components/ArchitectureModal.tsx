import React from 'react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#43271a]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#fcf9f8] rounded-2xl max-w-4xl w-full p-6 md:p-8 shadow-2xl border border-[#d4c3bc] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e2e1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5c3d2e] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
            <div>
              <h3 className="font-headline-sm font-serif text-xl font-bold text-[#43271a]">
                Kiến Trúc Kỹ Thuật Đề Tài &amp; Thiết Kế Service
              </h3>
              <p className="text-xs text-[#50443f] font-mono">
                Đề tài I01 (PH60600) · Định hướng tích hợp Spring Boot Backend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#f0eded] hover:bg-[#e5e2e1] text-[#50443f] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm text-[#1c1b1b]">
          {/* Tech Stack Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#f6f3f2] border border-[#e5e2e1] space-y-2">
              <div className="flex items-center gap-2 text-[#43271a] font-bold">
                <span className="material-symbols-outlined text-[#7f5600] text-[20px]">web</span>
                <span>Tầng Frontend (Hiện tại &amp; Hoàn chỉnh)</span>
              </div>
              <ul className="space-y-1 text-xs text-[#50443f] font-mono">
                <li>• <strong>Framework:</strong> React JS, JSX, HTML5, CSS3, Tailwind CSS</li>
                <li>• <strong>State &amp; Services:</strong> Service-Oriented Architecture (src/services/heritageService.ts)</li>
                <li>• <strong>Tư liệu &amp; Mock Data:</strong> 15 Hồ sơ Dublin Core, 6 Nhóm Di sản, 14 Tọa độ GIS</li>
                <li>• <strong>Giao diện:</strong> Thiết kế chuẩn bảo tàng số (Editorial Museum Archive)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#f6f3f2] border border-[#e5e2e1] space-y-2">
              <div className="flex items-center gap-2 text-[#43271a] font-bold">
                <span className="material-symbols-outlined text-[#13332b] text-[20px]">dns</span>
                <span>Tầng Backend &amp; Cơ sở dữ liệu (Định hướng Spring Boot)</span>
              </div>
              <ul className="space-y-1 text-xs text-[#50443f] font-mono">
                <li>• <strong>Backend:</strong> Java, Spring Boot 3, Hibernate ORM</li>
                <li>• <strong>Cơ sở dữ liệu:</strong> MySQL RDBMS (InnoDB, UTF8mb4)</li>
                <li>• <strong>Bảo mật:</strong> Spring Security, JWT (JSON Web Token), HTTPS/SSL/TLS</li>
                <li>• <strong>Công cụ:</strong> VS Code, IntelliJ IDEA, Google AI Studio, Git/GitHub</li>
              </ul>
            </div>
          </div>

          {/* Service Architecture Design */}
          <div className="p-4 rounded-xl bg-[#f0eded] border border-[#d4c3bc] space-y-3">
            <h4 className="font-bold text-[#43271a] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7f5600] text-[18px]">account_tree</span>
              <span>Kiến trúc Service sẵn sàng chuyển đổi RESTful API</span>
            </h4>
            <p className="text-xs text-[#50443f] leading-relaxed">
              Mã nguồn Frontend đã phân tách hoàn toàn tầng Components và tầng Service. Hiện tại, <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#5c3d2e]">heritageService.ts</code> quản lý truy xuất mock data. Khi kết nối Backend Spring Boot, chỉ cần thay đổi implementation bên trong Service bằng <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#5c3d2e]">axios.get('/api/v1/...')</code> với Bearer JWT Header.
            </p>

            <div className="bg-[#1c1b1b] text-[#fcf9f8] p-3 rounded-lg font-mono text-xs overflow-x-auto space-y-1">
              <div className="text-emerald-400">// Spring Boot REST API Endpoints Map:</div>
              <div>GET  /api/v1/heritage-items           <span className="text-gray-400">→ Danh mục 6 di sản trọng tâm</span></div>
              <div>GET  /api/v1/heritage-items/{'{id}'}       <span className="text-gray-400">→ Chi tiết Mo Mường, Cồng Chiêng...</span></div>
              <div>GET  /api/v1/archival-records          <span className="text-gray-400">→ 15 Bản ghi I01-DS / HD / PV</span></div>
              <div>GET  /api/v1/cultural-locations        <span className="text-gray-400">→ Tọa độ không gian văn hóa GIS</span></div>
              <div>GET  /api/v1/verification-sources      <span className="text-gray-400">→ 8 Nguồn kiểm chứng NG-01 → NG-08</span></div>
              <div>POST /api/v1/contributions             <span className="text-gray-400">→ Tiếp nhận tư liệu cộng đồng</span></div>
              <div>POST /api/v1/auth/login                <span className="text-gray-400">→ Spring Security JWT Token</span></div>
            </div>
          </div>

          {/* Database Schema Map */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#43271a]">Bảng ánh xạ Thực thể Hibernate / MySQL</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-white border border-[#e5e2e1]">
                <strong className="block text-[#5c3d2e]">HeritageItem.java</strong>
                <span className="text-gray-500">Table: heritage_items</span>
              </div>
              <div className="p-2.5 rounded bg-white border border-[#e5e2e1]">
                <strong className="block text-[#5c3d2e]">ArchivalRecord.java</strong>
                <span className="text-gray-500">Table: archival_records</span>
              </div>
              <div className="p-2.5 rounded bg-white border border-[#e5e2e1]">
                <strong className="block text-[#5c3d2e]">Location.java</strong>
                <span className="text-gray-500">Table: cultural_locations</span>
              </div>
              <div className="p-2.5 rounded bg-white border border-[#e5e2e1]">
                <strong className="block text-[#5c3d2e]">Contribution.java</strong>
                <span className="text-gray-500">Table: contributions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#e5e2e1] flex items-center justify-between">
          <span className="text-xs text-[#50443f]">
            Trạng thái hiện tại: <strong>Mock Data hoạt động độc lập 100%</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#5c3d2e] text-white rounded-lg text-sm font-medium hover:bg-[#43271a] transition-colors"
          >
            Đóng bảng kiến trúc
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureModal;

