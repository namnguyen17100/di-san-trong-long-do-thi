export interface ArchivalRecord {
  code: string;
  type: 'Văn bản' | 'Di sản' | 'Phỏng vấn';
  title: string;
  location: string;
  status: 'Nguồn công khai' | 'Chờ khảo sát';
  source: string;
  sourceName: string;
  community: string;
  date: string;
  summary: string;
  imgCaption: string;
  citation: string;
  image?: string;
}

export interface HeritageItem {
  id: string;
  code: string;
  title: string;
  category: 'tin-nguong' | 'am-thuc' | 'ngon-ngu' | 'trang-phuc' | 'am-nhac' | 'sinh-hoat-cong-dong';
  categoryLabel: string;
  location: string;
  status: 'verified' | 'under-survey' | 'needs-verification';
  statusLabel: string;
  keywords: string;
  excerpt: string;
  recordsCount: string;
  image: string;
  alt: string;
}

export interface CulturalLocation {
  id: string;
  code: string;
  category: 'origin' | 'mo' | 'perform' | 'urban';
  title: string;
  historic: string;
  heritage: string;
  records: string;
  source: string;
  status: string;
  statusClass: string;
  alt: string;
  top: string;
  left: string;
  distanceKm?: string;
}

export interface VerificationSource {
  id: string;
  title: string;
  author: string;
  year: number;
  type: string;
  typeCategory: 'Công trình khoa học' | 'Văn bản quản lý' | 'Hiện vật & Địa phương' | 'Ấn phẩm chuyên khảo' | 'Bài báo nghiên cứu';
  linkedRecords: string[];
  status: string;
  url?: string;
  details?: string;
}

export interface ContributionSubmission {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  heritageCategory: string;
  artifactName: string;
  estimatedAge: string;
  description: string;
  agreedToTerms: boolean;
  submittedAt: string;
}
