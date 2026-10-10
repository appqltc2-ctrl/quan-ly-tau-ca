import React, { useState, useEffect } from 'react';
import { 
  UserCheck, Plus, CheckCircle, AlertTriangle, ShieldCheck, 
  History, FileText, Database, Lock, RefreshCw, Eye, Edit3
} from 'lucide-react';
import { LawDocument, Scenario, AuditLog, AppUserRole } from '../types';

interface AdminPortalViewProps {
  userRole: AppUserRole;
  laws: LawDocument[];
  onAddLaw: (law: LawDocument) => void;
  onUpdateLawStatus: (id: string, status: string, statusLabel: string, replacementNote?: string) => void;
  scenarios: Scenario[];
  onAddScenario: (scenario: Scenario) => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  userRole,
  laws,
  onAddLaw,
  onUpdateLawStatus,
  scenarios,
  onAddScenario
}) => {
  const [activeTab, setActiveTab] = useState<'laws_mgmt' | 'scenarios_mgmt' | 'audit_logs' | 'ai_review'>('laws_mgmt');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  // Form for Adding New Law
  const [newLawCode, setNewLawCode] = useState('');
  const [newLawTitle, setNewLawTitle] = useState('');
  const [newLawDocType, setNewLawDocType] = useState('Nghị định');
  const [newLawAgency, setNewLawAgency] = useState('Chính phủ');
  const [newLawIssueDate, setNewLawIssueDate] = useState('2024-05-15');
  const [newLawEffectiveDate, setNewLawEffectiveDate] = useState('2024-07-01');
  const [newLawSummary, setNewLawSummary] = useState('');
  const [newLawSourceUrl, setNewLawSourceUrl] = useState('https://vanban.chinhphu.vn');
  const [newLawArticleTitle, setNewLawArticleTitle] = useState('Điều 1');
  const [newLawArticleContent, setNewLawArticleContent] = useState('');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Fetch audit logs
  const fetchAuditLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch('/api/audit-logs');
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data.data || []);
      }
    } catch (err) {
      console.error('Lỗi tải audit logs:', err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [activeTab]);

  const handleCreateLaw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLawCode || !newLawTitle) return;

    const newDoc: LawDocument = {
      id: `law-admin-${Date.now()}`,
      code: newLawCode.trim(),
      title: newLawTitle.trim(),
      docType: newLawDocType as any,
      issuingAgency: newLawAgency.trim(),
      issueDate: newLawIssueDate,
      effectiveDate: newLawEffectiveDate,
      status: 'con_hieu_luc',
      statusLabel: 'Còn hiệu lực',
      summary: newLawSummary.trim() || 'Văn bản quy phạm pháp luật được phê duyệt bởi Quản trị viên.',
      topics: ['Quản lý tàu cá', 'Quy chuẩn kỹ thuật'],
      sourceUrl: newLawSourceUrl.trim(),
      isVerified: true,
      articles: [
        {
          id: `art-${Date.now()}`,
          articleNumber: newLawArticleTitle.trim(),
          title: 'Quy định chi tiết',
          content: newLawArticleContent.trim() || 'Nội dung điều khoản đã được kiểm duyệt và đồng bộ vào kho dữ liệu.'
        }
      ]
    };

    onAddLaw(newDoc);
    setSuccessNotice(`Đã thêm mới văn bản: ${newDoc.code} và ghi nhận nhật ký kiểm toán.`);
    setNewLawCode('');
    setNewLawTitle('');
    setNewLawSummary('');
    setNewLawArticleContent('');
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-rose-800/40 rounded-2xl p-5 mb-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40">
                <UserCheck className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Cổng Quản trị Dữ liệu & Kiểm duyệt Pháp luật Tàu cá
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Kiểm soát quy trình cập nhật văn bản, phê duyệt kịch bản đào tạo và theo dõi nhật ký kiểm toán hệ thống AI
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs bg-slate-900 px-3 py-2 rounded-xl border border-rose-800/40 text-rose-300">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Phân quyền: <strong className="text-white">{userRole === 'admin' ? 'Quản trị viên tối cao' : 'Cán bộ kiểm ngư chuyên môn'}</strong></span>
          </div>
        </div>
      </div>

      {successNotice && (
        <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs rounded-xl flex items-center justify-between animate-fadeIn">
          <span>{successNotice}</span>
          <button onClick={() => setSuccessNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('laws_mgmt')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'laws_mgmt'
              ? 'bg-rose-600 text-white shadow'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Quản lý Kho Văn bản ({laws.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('scenarios_mgmt')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'scenarios_mgmt'
              ? 'bg-rose-600 text-white shadow'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Quản lý Tình huống ({scenarios.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit_logs')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'audit_logs'
              ? 'bg-rose-600 text-white shadow'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Nhật ký Thẩm định & Kiểm toán ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ai_review')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'ai_review'
              ? 'bg-rose-600 text-white shadow'
              : 'text-slate-300 hover:text-white bg-slate-900 border border-slate-800'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Rà soát Trích dẫn AI</span>
        </button>
      </div>

      {/* TAB 1: LAWS MANAGEMENT */}
      {activeTab === 'laws_mgmt' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Add New Law Form */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Plus className="w-4 h-4 text-rose-400" />
              <h3 className="font-bold text-white text-sm">
                Thêm Văn bản Quy phạm Pháp luật mới
              </h3>
            </div>

            <form onSubmit={handleCreateLaw} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Số hiệu văn bản (bắt buộc):</label>
                <input
                  type="text"
                  required
                  value={newLawCode}
                  onChange={(e) => setNewLawCode(e.target.value)}
                  placeholder="Ví dụ: 06/2024/TT-BNNPTNT"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-rose-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tên văn bản:</label>
                <input
                  type="text"
                  required
                  value={newLawTitle}
                  onChange={(e) => setNewLawTitle(e.target.value)}
                  placeholder="Ví dụ: Thông tư sửa đổi quy chuẩn đăng ký tàu cá..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Loại văn bản:</label>
                  <select
                    value={newLawDocType}
                    onChange={(e) => setNewLawDocType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-cyan-200 outline-none"
                  >
                    <option value="Luật">Luật</option>
                    <option value="Nghị định">Nghị định</option>
                    <option value="Thông tư">Thông tư</option>
                    <option value="Nghị quyết">Nghị quyết</option>
                    <option value="Chỉ thị">Chỉ thị</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Cơ quan ban hành:</label>
                  <input
                    type="text"
                    value={newLawAgency}
                    onChange={(e) => setNewLawAgency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Ngày ban hành:</label>
                  <input
                    type="date"
                    value={newLawIssueDate}
                    onChange={(e) => setNewLawIssueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Ngày có hiệu lực:</label>
                  <input
                    type="date"
                    value={newLawEffectiveDate}
                    onChange={(e) => setNewLawEffectiveDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tóm tắt nội dung chính:</label>
                <textarea
                  rows={2}
                  value={newLawSummary}
                  onChange={(e) => setNewLawSummary(e.target.value)}
                  placeholder="Quy định trọng tâm..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Điều khoản cốt lõi (Số điều):</label>
                <input
                  type="text"
                  value={newLawArticleTitle}
                  onChange={(e) => setNewLawArticleTitle(e.target.value)}
                  placeholder="Điều 1..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-cyan-300 outline-none mb-1 font-semibold"
                />
                <textarea
                  rows={3}
                  value={newLawArticleContent}
                  onChange={(e) => setNewLawArticleContent(e.target.value)}
                  placeholder="Nội dung điều luật..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-md transition-all mt-2"
              >
                Phê duyệt & Lưu vào Cơ sở dữ liệu
              </button>
            </form>
          </div>

          {/* Existing Laws Status Control */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Danh sách Văn bản đã phê duyệt & Cập nhật tình trạng hiệu lực:
            </div>

            <div className="space-y-2.5">
              {laws.map((l) => (
                <div
                  key={l.id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-cyan-300">{l.code}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                        {l.docType}
                      </span>
                    </div>

                    {/* Quick status change buttons */}
                    <div className="flex items-center gap-1 text-[11px]">
                      <button
                        onClick={() => onUpdateLawStatus(l.id, 'con_hieu_luc', 'Còn hiệu lực')}
                        className={`px-2 py-0.5 rounded border transition-colors ${
                          l.status === 'con_hieu_luc'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        Còn HL
                      </button>

                      <button
                        onClick={() => onUpdateLawStatus(l.id, 'het_hieu_luc_mot_phan', 'Còn hiệu lực một phần (Sửa đổi)')}
                        className={`px-2 py-0.5 rounded border transition-colors ${
                          l.status === 'het_hieu_luc_mot_phan'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        Sửa đổi
                      </button>

                      <button
                        onClick={() => onUpdateLawStatus(l.id, 'het_hieu_luc', 'Hết hiệu lực (Đã bị thay thế)', 'Văn bản đã bị thay thế.')}
                        className={`px-2 py-0.5 rounded border transition-colors ${
                          l.status === 'het_hieu_luc'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        Hết HL
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-white font-medium leading-snug">{l.title}</p>
                  
                  {l.replacementNote && (
                    <p className="text-[11px] text-rose-300 bg-rose-950/40 p-1.5 rounded border border-rose-800/40">
                      ⚠️ {l.replacementNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT LOGS */}
      {activeTab === 'audit_logs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <History className="w-4 h-4 text-rose-400" />
              Nhật ký Kiểm toán Hoạt động Hệ thống (Audit Logs)
            </h3>
            <button
              onClick={fetchAuditLogs}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Làm mới</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Hành động</th>
                  <th className="p-3">Đối tượng</th>
                  <th className="p-3">Người thực hiện</th>
                  <th className="p-3">Chi tiết thay đổi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-850">
                    <td className="p-3 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString('vi-VN')}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.action === 'CREATE'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : log.action === 'STATUS_CHANGE'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-white max-w-xs truncate">
                      {log.targetTitle}
                    </td>
                    <td className="p-3 text-cyan-300 whitespace-nowrap">
                      {log.performedBy} ({log.userRole})
                    </td>
                    <td className="p-3 text-slate-300">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SCENARIOS MGMT */}
      {activeTab === 'scenarios_mgmt' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">
              Bộ Ngân hàng {scenarios.length} Tình huống Đào tạo Nghiệp vụ đã thẩm định
            </h3>
          </div>

          <div className="space-y-3">
            {scenarios.map((sc, i) => (
              <div key={sc.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400 text-xs font-mono">#{i + 1} • {sc.topic}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Barem chuẩn: 100đ
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">{sc.title}</h4>
                <p className="text-xs text-slate-300">{sc.description}</p>
                <div className="text-[11px] text-amber-300 bg-slate-900 p-2 rounded border border-slate-850">
                  <strong>Căn cứ chuyên môn:</strong> {sc.modelAnswer.legalBasis}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AI CITATION AUDIT */}
      {activeTab === 'ai_review' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-sm">
            Cơ chế Kiểm soát & Phát hiện Trích dẫn sai của AI
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Hệ thống áp dụng bộ lọc RAG (Retrieval-Augmented Generation) nghiêm ngặt kết hợp kiểm tra chéo hai chiều (Dual-Pass Cross Verification):
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">1. Kiểm định Văn bản hết hiệu lực</span>
              <p className="text-slate-300">
                Tự động chặn mọi mức phạt trích từ Nghị định 42/2019/NĐ-CP và thay thế bằng Nghị định 38/2024/NĐ-CP mới nhất.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block">2. Khóa Cấu trúc 6 Phần</span>
              <p className="text-slate-300">
                Mọi phản hồi AI bắt buộc tuân theo Schema có Căn cứ pháp lý, Tình trạng hiệu lực, Quy trình, Mức phạt và Link văn bản gốc.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block">3. Trách nhiệm Hình sự (IUU)</span>
              <p className="text-slate-300">
                Cảnh báo nguy cơ xử lý hình sự theo Nghị quyết 04/2024/NQ-HĐTP của TANDTC đối với hành vi xuất cảnh trái phép hoặc tháo/gửi thiết bị VMS.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
