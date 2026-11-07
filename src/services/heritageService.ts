/**
 * HeritageService
 * 
 * Kiến trúc Service Interface cho Frontend:
 * - Giai đoạn hiện tại: Sử dụng Mock Data lưu trữ in-memory/localStorage
 * - Thiết kế theo kiến trúc Service chuẩn RESTful:
 *   Sẵn sàng tích hợp với Backend Java, Spring Boot, Hibernate, MySQL, Spring Security & JWT sau này
 *   mà không cần thay đổi code của tầng giao diện (Components).
 */

import { ArchivalRecord, HeritageItem, CulturalLocation, VerificationSource, ContributionSubmission } from '../types/heritage';
import { ARCHIVAL_RECORDS, HERITAGE_ITEMS, CULTURAL_LOCATIONS, VERIFICATION_SOURCES } from '../data/mockHeritageData';

const STORAGE_KEY_CONTRIBUTIONS = 'heritage_contributions_v1';

class HeritageService {
  private archivalRecords: ArchivalRecord[] = [...ARCHIVAL_RECORDS];
  private heritageItems: HeritageItem[] = [...HERITAGE_ITEMS];
  private culturalLocations: CulturalLocation[] = [...CULTURAL_LOCATIONS];
  private verificationSources: VerificationSource[] = [...VERIFICATION_SOURCES];

  /**
   * Lấy danh sách hồ sơ di sản (tương ứng GET /api/v1/heritage-items trong Spring Boot)
   */
  async getHeritageItems(): Promise<HeritageItem[]> {
    return Promise.resolve([...this.heritageItems]);
  }

  /**
   * Lấy chi tiết hồ sơ di sản theo id (tương ứng GET /api/v1/heritage-items/{id})
   */
  async getHeritageItemById(id: string): Promise<HeritageItem | undefined> {
    return Promise.resolve(this.heritageItems.find(item => item.id === id || item.code === id));
  }

  /**
   * Lấy kho tư liệu số (15 bản ghi I01-DS / HD / PV) (tương ứng GET /api/v1/archival-records)
   */
  async getArchivalRecords(): Promise<ArchivalRecord[]> {
    return Promise.resolve([...this.archivalRecords]);
  }

  /**
   * Lấy chi tiết bản ghi theo mã code (tương ứng GET /api/v1/archival-records/{code})
   */
  async getArchivalRecordByCode(code: string): Promise<ArchivalRecord | undefined> {
    return Promise.resolve(this.archivalRecords.find(record => record.code === code));
  }

  /**
   * Lấy dữ liệu bản đồ không gian văn hóa (tương ứng GET /api/v1/cultural-locations)
   */
  async getCulturalLocations(): Promise<CulturalLocation[]> {
    return Promise.resolve([...this.culturalLocations]);
  }

  /**
   * Lấy danh sách nguồn kiểm chứng (tương ứng GET /api/v1/verification-sources)
   */
  async getVerificationSources(): Promise<VerificationSource[]> {
    return Promise.resolve([...this.verificationSources]);
  }

  /**
   * Gửi hồ sơ đóng góp tư liệu (tương ứng POST /api/v1/contributions trong Spring Boot)
   */
  async submitContribution(data: Omit<ContributionSubmission, 'id' | 'submittedAt'>): Promise<ContributionSubmission> {
    const newSubmission: ContributionSubmission = {
      ...data,
      id: `SUB-${Date.now().toString(36).toUpperCase()}`,
      submittedAt: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEY_CONTRIBUTIONS);
      const list: ContributionSubmission[] = stored ? JSON.parse(stored) : [];
      list.unshift(newSubmission);
      localStorage.setItem(STORAGE_KEY_CONTRIBUTIONS, JSON.stringify(list));
    } catch {
      // Fallback in-memory
    }

    return Promise.resolve(newSubmission);
  }

  /**
   * Lấy danh sách đóng góp đã lưu
   */
  async getContributions(): Promise<ContributionSubmission[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CONTRIBUTIONS);
      return Promise.resolve(stored ? JSON.parse(stored) : []);
    } catch {
      return Promise.resolve([]);
    }
  }
}

export const heritageService = new HeritageService();
export default heritageService;
