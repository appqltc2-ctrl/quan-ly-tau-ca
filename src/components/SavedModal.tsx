import React from 'react';
import { Bookmark, Trash2, X, ExternalLink, FileText, MessageSquare } from 'lucide-react';
import { ChatMessage, LawDocument } from '../types';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedMessages: ChatMessage[];
  bookmarkedLaws: LawDocument[];
  onRemoveMessage: (id: string) => void;
  onRemoveLaw: (id: string) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedMessages,
  bookmarkedLaws,
  onRemoveMessage,
  onRemoveLaw
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-5 max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">
              Văn bản & Câu hỏi Đã lưu ({savedMessages.length + bookmarkedLaws.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1 scrollbar-thin">
          {savedMessages.length === 0 && bookmarkedLaws.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">
              Chưa có mục nào được lưu. Bạn có thể nhấn biểu tượng Đánh dấu ở mục Hỏi đáp hoặc Văn bản để lưu xem lại khi đi biển.
            </p>
          ) : (
            <>
              {/* Saved laws */}
              {bookmarkedLaws.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Văn bản pháp luật đã lưu ({bookmarkedLaws.length}):
                  </span>
                  {bookmarkedLaws.map((law) => (
                    <div key={law.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-cyan-300 font-bold text-xs">{law.code}</span>
                          <span className="text-[10px] text-slate-400">({law.docType})</span>
                        </div>
                        <h4 className="text-xs text-white font-medium mt-0.5 line-clamp-1">{law.title}</h4>
                      </div>
                      <button
                        onClick={() => onRemoveLaw(law.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5"
                        title="Xóa khỏi danh sách lưu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Saved chat messages */}
              {savedMessages.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Câu trả lời AI đã lưu ({savedMessages.length}):
                  </span>
                  {savedMessages.map((msg) => (
                    <div key={msg.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-cyan-400 font-bold flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          Trợ lý AI • {msg.timestamp}
                        </span>
                        <button
                          onClick={() => onRemoveMessage(msg.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 line-clamp-3">
                        {msg.structuredResponse?.directAnswer || msg.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
