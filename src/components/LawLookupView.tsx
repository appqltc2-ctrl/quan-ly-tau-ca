import React, { useState } from 'react';
import { 
  Search, BookOpen, Filter, ExternalLink, AlertTriangle, 
  CheckCircle2, ArrowRight, ShieldAlert, Calendar, Building2,
  FileText, Bookmark, Share2, Eye
} from 'lucide-react';
import { LawDocument, LawStatus, LawDocType } from '../types';

interface LawLookupViewProps {
  laws: LawDocument[];
  selectedCode?: string | null;
  onClearSelectedCode?: () => void;
  onBookmarkLaw?: (law: LawDocument) => void;
  bookmarkedLawIds: string[];
}

export const LawLookupView: React.FC<LawLookupViewProps> = ({
  laws,
  selectedCode,
  onClearSelectedCode,
  onBookmarkLaw,
  bookmarkedLawIds
}) => {
  const [searchQuery, setSearchQuery] = useState(selectedCode || '');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDocType, setSelectedDocType] = useState<string>('all');
  const [activeLawDetail, setActiveLawDetail] = useState<LawDocument | null>(
    selectedCode ? laws.find(l => l.code.toLowerCase().includes(selectedCode.toLowerCase())) || null : null
  );
  const [articleFilter, setArticleFilter] = useState('');

  // Extract all unique topics
  const allTopics = Array.from(new Set(laws.flatMap(l => l.topics)));

  // Filtered laws
  const filteredLaws = laws.filter(l => {
    const matchesSearch = searchQuery.trim() === '' ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.articles.some(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.content.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTopic = selectedTopic === 'all' || l.topics.includes(selectedTopic);
    const matchesStatus = selectedStatus === 'all' || l.status === selectedStatus;
    const matchesDocType = selectedDocType === 'all' || l.docType === selectedDocType;

    return matchesSearch && matchesTopic && matchesStatus && matchesDocType;
  });

  const getStatusBadge = (status: LawStatus, label: string) => {
    switch (status) {
      case 'con_hieu_luc':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {label}
          </span>
        );
      case 'het_hieu_luc':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            {label}
          </span>
        );
      case 'het_hieu_luc_mot_phan':
      case 'bi_thay_the':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            {label}
          </span>
        );
      default:
        return <span className="text-xs text-slate-400">{label}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              Kho Văn bản Pháp luật Quản lý Tàu cá
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Hệ thống hóa văn bản quy phạm pháp luật thủy sản còn hiệu lực, cập nhật liên tục các văn bản sửa đổi và thay thế
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-cyan-800/40 text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
              <span>Đã kiểm duyệt:</span>
              <strong className="text-white">{laws.length} văn bản cốt lõi</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Search & Filter Toolbar */}
      <div className="bg-slate-900 border border-cyan-800/50 rounded-2xl p-4 sm:p-5 shadow-xl mb-6 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo số hiệu (38/2024, 18/2017), tên văn bản, từ khóa (VMS, vùng lộng, đăng kiểm, xử phạt)..."
            className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                if (onClearSelectedCode) onClearSelectedCode();
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
            >
              Xóa lọc
            </button>
          )}
        </div>

        {/* Multi-criteria dropdown filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Chủ đề quy định
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-xs sm:text-sm text-cyan-200 rounded-xl px-3 py-2 outline-none focus:border-cyan-400"
            >
              <option value="all">Tất cả chủ đề</option>
              {allTopics.map((topic, i) => (
                <option key={i} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Tình trạng hiệu lực
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-xs sm:text-sm text-cyan-200 rounded-xl px-3 py-2 outline-none focus:border-cyan-400"
            >
              <option value="all">Tất cả tình trạng</option>
              <option value="con_hieu_luc">🟢 Còn hiệu lực</option>
              <option value="het_hieu_luc_mot_phan">🟡 Còn hiệu lực một phần / Sửa đổi</option>
              <option value="het_hieu_luc">🔴 Hết hiệu lực / Bị thay thế</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Loại văn bản
            </label>
            <select
              value={selectedDocType}
              onChange={(e) => setSelectedDocType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-xs sm:text-sm text-cyan-200 rounded-xl px-3 py-2 outline-none focus:border-cyan-400"
            >
              <option value="all">Tất cả loại văn bản</option>
              <option value="Luật">Luật</option>
              <option value="Nghị định">Nghị định</option>
              <option value="Thông tư">Thông tư</option>
              <option value="Nghị quyết">Nghị quyết TANDTC</option>
              <option value="Chỉ thị">Chỉ thị</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: List & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Documents List */}
        <div className={`${activeLawDetail ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-3`}>
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Tìm thấy <strong>{filteredLaws.length}</strong> văn bản phù hợp</span>
            {activeLawDetail && (
              <button
                onClick={() => setActiveLawDetail(null)}
                className="text-cyan-400 hover:text-cyan-200 font-semibold"
              >
                Thu gọn chi tiết
              </button>
            )}
          </div>

          {filteredLaws.length === 0 ? (
            <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800">
              <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-white font-medium text-sm">Không tìm thấy văn bản phù hợp</p>
              <p className="text-xs text-slate-400 mt-1">Hãy thử xóa bộ lọc hoặc tìm với từ khóa chung hơn.</p>
            </div>
          ) : (
            filteredLaws.map((law) => {
              const isSelected = activeLawDetail?.id === law.id;
              const isBookmarked = bookmarkedLawIds.includes(law.id);

              return (
                <div
                  key={law.id}
                  onClick={() => setActiveLawDetail(law)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-cyan-800/40 hover:border-cyan-600'
                  }`}
                >
                  {/* Card Header: Code & Status */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs sm:text-sm text-cyan-300 font-mono">
                        {law.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {law.docType}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {getStatusBadge(law.status, law.statusLabel)}

                      {onBookmarkLaw && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookmarkLaw(law);
                          }}
                          className={`p-1 rounded hover:bg-slate-700 ${
                            isBookmarked ? 'text-cyan-300' : 'text-slate-400'
                          }`}
                          title="Lưu văn bản"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm sm:text-base text-white leading-snug mb-2">
                    {law.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                    {law.summary}
                  </p>

                  {/* Special Warning if Replaced or Expired */}
                  {law.replacementNote && (
                    <div className="p-2 mb-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-[11px] text-rose-300 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{law.replacementNote}</span>
                    </div>
                  )}

                  {/* Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      {law.issuingAgency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Hiệu lực: {law.effectiveDate}
                    </span>
                    <span className="text-cyan-400 font-medium ml-auto flex items-center gap-0.5">
                      <span>{law.articles.length} điều khoản</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Detailed Document Viewer Drawer */}
        {activeLawDetail && (
          <div className="lg:col-span-7 bg-slate-900 border border-cyan-800/60 rounded-2xl p-5 shadow-2xl flex flex-col max-h-[85vh] sticky top-24">
            {/* Drawer Header */}
            <div className="pb-4 border-b border-slate-800 shrink-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-cyan-300 font-mono">
                    {activeLawDetail.code}
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {activeLawDetail.docType}
                  </span>
                </div>
                {getStatusBadge(activeLawDetail.status, activeLawDetail.statusLabel)}
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {activeLawDetail.title}
              </h2>

              {/* Warning Banner if Replaced */}
              {activeLawDetail.replacementNote && (
                <div className="mt-3 p-3 rounded-xl bg-rose-950/60 border border-rose-700/60 text-xs text-rose-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">
                    {activeLawDetail.replacementNote}
                  </div>
                </div>
              )}

              {/* Key metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">Cơ quan ban hành:</span>
                  <span className="text-white font-medium">{activeLawDetail.issuingAgency}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Ngày ban hành:</span>
                  <span className="text-white font-medium">{activeLawDetail.issueDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Ngày có hiệu lực:</span>
                  <span className="text-emerald-400 font-medium">{activeLawDetail.effectiveDate}</span>
                </div>
              </div>

              {/* Official Source Link Button */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <a
                  href={activeLawDetail.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Xem văn bản gốc trên vbpl.vn / chinhphu.vn</span>
                </a>

                {/* Filter articles inside document */}
                <input
                  type="text"
                  value={articleFilter}
                  onChange={(e) => setArticleFilter(e.target.value)}
                  placeholder="Lọc điều khoản..."
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-400 outline-none w-36"
                />
              </div>
            </div>

            {/* Articles List (Scrollable) */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                Các điều khoản quan trọng về tàu cá ({activeLawDetail.articles.length} điều):
              </div>

              {activeLawDetail.articles
                .filter(a => 
                  articleFilter.trim() === '' ||
                  a.articleNumber.toLowerCase().includes(articleFilter.toLowerCase()) ||
                  a.title.toLowerCase().includes(articleFilter.toLowerCase()) ||
                  a.content.toLowerCase().includes(articleFilter.toLowerCase())
                )
                .map((art) => (
                  <div
                    key={art.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs sm:text-sm text-cyan-300">
                        {art.articleNumber}: {art.title}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                      {art.content}
                    </p>

                    {art.keyPoints && art.keyPoints.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-850">
                        <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                          Điểm cốt lõi cần nhớ:
                        </span>
                        <ul className="space-y-1 list-disc pl-4 text-xs text-slate-300">
                          {art.keyPoints.map((kp, kIdx) => (
                            <li key={kIdx}>{kp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
