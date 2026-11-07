import React, { useState } from 'react';
import { 
  Send, Upload, CheckCircle2, ShieldCheck, HeartHandshake, 
  FileAudio, Image as ImageIcon, BookOpen, AlertCircle, Sparkles, UserCheck
} from 'lucide-react';
import { ContributionSubmission } from '../types/heritage';
import { heritageService } from '../services/heritageService';
import MuongDivider from '../components/MuongDivider';
import { NavTab } from '../components/Header';

interface ContributionViewProps {
  onNavigateTab: (tab: NavTab) => void;
}

export default function ContributionView({ onNavigateTab }: ContributionViewProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: 'Mường Bi (Hòa Bình) - Cư trú Cầu Giấy, Hà Nội',
    heritageCategory: 'Hiện vật gia đình & Thổ cẩm',
    artifactName: '',
    estimatedAge: 'Khoảng 50 năm',
    description: '',
    agreedToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedItem, setSubmittedItem] = useState<ContributionSubmission | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.artifactName || !formData.description) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }
    if (!formData.agreedToTerms) {
      alert('Vui lòng xác nhận đồng thuận đạo đức nghiên cứu nhân học (FPIC).');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await heritageService.submitContribution({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        heritageCategory: formData.heritageCategory,
        artifactName: formData.artifactName,
        estimatedAge: formData.estimatedAge,
        description: formData.description,
        agreedToTerms: formData.agreedToTerms
      });
      setSubmittedItem(result);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        location: 'Mường Bi (Hòa Bình) - Cư trú Cầu Giấy, Hà Nội',
        heritageCategory: 'Hiện vật gia đình & Thổ cẩm',
        artifactName: '',
        estimatedAge: 'Khoảng 50 năm',
        description: '',
        agreedToTerms: false
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#fcf9f8] text-[#1c1b1b] min-h-screen">
      {/* Header Banner */}
      <section className="w-full bg-[#f6f3f2] py-10 lg:py-14 border-b border-[#e5e2e1]">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e5e2e1] text-[#7f5600] font-mono text-xs font-semibold uppercase">
              <HeartHandshake className="w-3.5 h-3.5" />
              Cộng đồng số hóa di sản mở · Đề tài I01
            </div>
            <h1 className="font-serif text-3xl lg:text-5xl font-semibold text-[#43271a] leading-tight tracking-tight">
              Đóng góp ký ức & Tư liệu Mường tại Hà Nội
            </h1>
            <p className="text-base lg:text-lg text-[#50443f] leading-relaxed">
              Mỗi gia đình Mường tại Hà Nội là một pho sử sống. Bản ghi âm giọng nói của ông bà, bức ảnh chiếc váy cạp xưa hay câu chuyện về bữa cơm quê nhà giữa phố phường đều là mảnh ghép vô giá làm giàu kho tư liệu cộng đồng.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Form & Promises */}
      <section className="w-full py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 lg:p-8 rounded-2xl border border-[#e5e2e1] shadow-sm space-y-6">
              
              {submittedItem ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-bold text-emerald-900">
                      Tiếp nhận hồ sơ đóng góp thành công!
                    </h3>
                    <p className="text-xs text-emerald-800">
                      Mã số tiếp nhận: <strong className="font-mono text-sm">{submittedItem.id}</strong>
                    </p>
                  </div>
                  <p className="text-xs text-[#50443f] max-w-md mx-auto leading-relaxed">
                    Nhóm nghiên cứu đề tài I01 (Chủ nhiệm: Bùi Trung Nam) xin chân thành tri ân tấm lòng gìn giữ di sản của bác/anh/chị. Ban biên tập sẽ liên hệ lại qua số điện thoại để hỗ trợ số hóa và gửi tặng bản lưu trữ chuẩn chất lượng cao.
                  </p>
                  <button
                    onClick={() => setSubmittedItem(null)}
                    className="px-5 py-2.5 rounded-lg bg-[#43271a] text-white text-xs font-mono uppercase font-semibold hover:bg-[#5c3d2e] transition-colors"
                  >
                    Đóng góp thêm tư liệu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                  
                  <div className="border-b border-[#e5e2e1] pb-3">
                    <h2 className="font-serif text-lg font-semibold text-[#43271a]">
                      1. Thông tin người cung cấp tư liệu
                    </h2>
                    <span className="text-xs text-[#50443f]">
                      (Hỗ trợ bảo mật danh tính theo quy định đạo đức nghiên cứu nhân học nếu có yêu cầu)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-[#50443f] block mb-1">
                        Họ và tên của bạn <span className="text-red-500">*</span>:
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="vd: Bùi Văn Minh / Đinh Thị Lan"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-[#1c1b1b] focus:ring-1 focus:ring-[#43271a]"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#50443f] block mb-1">
                        Số điện thoại / Zalo:
                      </label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="vd: 0912 345 678"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-[#1c1b1b] focus:ring-1 focus:ring-[#43271a]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-[#50443f] block mb-1">
                        Địa bàn sinh sống & quê gốc:
                      </label>
                      <input 
                        type="text"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        placeholder="vd: Gốc Mường Bi, hiện ở Cầu Giấy"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-[#1c1b1b] focus:ring-1 focus:ring-[#43271a]"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#50443f] block mb-1">
                        Địa chỉ Email liên hệ:
                      </label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-[#1c1b1b] focus:ring-1 focus:ring-[#43271a]"
                      />
                    </div>
                  </div>

                  <div className="border-b border-[#e5e2e1] pt-3 pb-3">
                    <h2 className="font-serif text-lg font-semibold text-[#43271a]">
                      2. Nội dung tư liệu hoặc ký ức đóng góp
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-[#50443f] block mb-1">
                        Loại hình tư liệu:
                      </label>
                      <select 
                        value={formData.heritageCategory}
                        onChange={e => setFormData({ ...formData, heritageCategory: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-[#1c1b1b]"
                      >
                        <option value="Hiện vật gia đình & Thổ cẩm">Hiện vật gia đình (váy áo, chiêng, đĩa cúng)</option>
                        <option value="Bản ghi âm & Điệu hát/Mo">Bản ghi âm tiếng mẹ đẻ, điệu hát Đang, áng Mo cổ</option>
                        <option value="Ký ức & Phong tục ẩm thực">Ký ức chuyển cư, mâm cỗ lá, phong tục tập quán xưa</option>
                        <option value="Tài liệu & Sách cũ">Gia phả, hương ước, sách chữ Mường cũ</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#50443f] block mb-1">
                        Tiêu đề / Tên hiện vật <span className="text-red-500">*</span>:
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.artifactName}
                        onChange={e => setFormData({ ...formData, artifactName: e.target.value })}
                        placeholder="vd: Cạp váy dệt hoa văn rồng của bà ngoại lưu truyền từ 1968"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-[#1c1b1b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#50443f] block mb-1">
                      Ước tính niên đại hiện vật:
                    </label>
                    <input 
                      type="text"
                      value={formData.estimatedAge}
                      onChange={e => setFormData({ ...formData, estimatedAge: e.target.value })}
                      placeholder="vd: Khoảng 50 năm / thời kỳ kháng chiến"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-[#1c1b1b]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#50443f] block mb-1">
                      Mô tả chi tiết / Lời kể câu chuyện <span className="text-red-500">*</span>:
                    </label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Chia sẻ về nguồn gốc hiện vật, người để lại, ý nghĩa và hoàn cảnh gia đình lưu giữ khi về sinh sống ở Hà Nội..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f8] border border-[#e5e2e1] text-[#1c1b1b]"
                    />
                  </div>

                  {/* File Upload Simulation */}
                  <div className="p-4 rounded-xl border border-dashed border-[#d4c3bc] bg-[#fcf9f8] flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-[#f6f3f2] transition-colors">
                    <Upload className="w-8 h-8 text-[#7f5600]" />
                    <div className="space-y-0.5">
                      <p className="font-medium text-xs text-[#43271a]">
                        Nhấp hoặc kéo thả hình ảnh / file âm thanh của bạn vào đây
                      </p>
                      <p className="text-[11px] text-[#50443f]">
                        Hỗ trợ JPG, PNG, MP3, WAV, PDF (tối đa 25MB)
                      </p>
                    </div>
                  </div>

                  {/* Ethics & FPIC check */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-[#50443f] cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={e => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                        className="mt-0.5 rounded text-[#43271a] focus:ring-[#43271a]"
                      />
                      <span>
                        Tôi đồng thuận cung cấp thông tin cho Đề tài Nghiên cứu khoa học I01 (Chủ nhiệm: Bùi Trung Nam) theo nguyên tắc Đồng thuận tự nguyện có thông báo trước (FPIC), nhằm mục đích bảo tồn và nghiên cứu phi thương mại. <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-[#43271a] hover:bg-[#5c3d2e] text-white font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'ĐANG TIẾP NHẬN...' : 'GỬI TƯ LIỆU ĐÓNG GÓP'}</span>
                  </button>

                </form>
              )}

            </div>

            {/* Right Information & Support Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-[#e5e2e1] shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#7f5600]" />
                  <h3 className="font-serif text-base font-semibold text-[#43271a]">
                    Quyền lợi & Cam kết của nhóm nghiên cứu
                  </h3>
                </div>

                <ul className="text-xs text-[#50443f] space-y-3">
                  <li className="flex items-start gap-2">
                    <UserCheck className="w-4 h-4 text-[#13332b] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Bảo mật danh tính & bản quyền:</strong> Thông tin cá nhân được bảo vệ nghiêm ngặt. Bản quyền hiện vật thuộc về gia đình vĩnh viễn.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-[#7f5600] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Được ghi danh trong kỷ yếu học thuật:</strong> Người cung cấp được ghi nhận trân trọng trong phụ lục báo cáo đề tài I01 và cổng số hóa.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#43271a] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Hỗ trợ số hóa miễn phí:</strong> Nhóm nghiên cứu hỗ trợ scan ảnh cũ độ phân giải cao và chuyển đổi băng cassette sang file âm thanh số gửi tặng lại gia đình.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Research Contact Card */}
              <div className="bg-[#43271a] text-white p-6 rounded-2xl space-y-3 shadow-md">
                <span className="font-mono text-xs uppercase text-[#fec25f] font-bold">
                  Kênh tiếp nhận trực tiếp
                </span>
                <h4 className="font-serif text-lg font-semibold">
                  Ban Thư ký Đề tài I01 · PH60600
                </h4>
                <div className="text-xs text-white/80 space-y-1">
                  <p>• Chủ nhiệm đề tài: <strong>Bùi Trung Nam</strong></p>
                  <p>• Địa bàn tiếp nhận: Hà Nội, Ba Vì, Thạch Thất</p>
                  <p>• Email học thuật: <code>disan.muong.hanoi@gmail.com</code></p>
                </div>
                <div className="pt-2 border-t border-white/20 text-[11px] font-mono text-[#fec25f]">
                  Thời gian tiếp nhận đợt 1: 2024 – 2025
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
      
      <div className="pb-12">
        <MuongDivider label="KẾT NỐI CỘNG ĐỒNG XỨ MƯỜNG" />
      </div>
    </div>
  );
}
