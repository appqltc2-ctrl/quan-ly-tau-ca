/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AIChatView } from './components/AIChatView';
import { LawLookupView } from './components/LawLookupView';
import { ScenariosView } from './components/ScenariosView';
import { PenaltyCalculatorView } from './components/PenaltyCalculatorView';
import { ProcedureGuideView } from './components/ProcedureGuideView';
import { AdminPortalView } from './components/AdminPortalView';
import { SavedModal } from './components/SavedModal';
import { INITIAL_LAWS } from './data/lawsData';
import { PRACTICAL_SCENARIOS } from './data/scenariosData';
import { LawDocument, Scenario, ScenarioSubmission, ChatMessage, AppUserRole } from './types';
import { ShieldCheck, Anchor, Heart, ExternalLink, AlertTriangle } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('chat');
  const [userRole, setUserRole] = useState<AppUserRole>('ngu_dan');
  const [laws, setLaws] = useState<LawDocument[]>(INITIAL_LAWS);
  const [scenarios, setScenarios] = useState<Scenario[]>(PRACTICAL_SCENARIOS);
  const [selectedLawCode, setSelectedLawCode] = useState<string | null>(null);

  // Saved items state
  const [savedMessages, setSavedMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem('vietnam_fishery_saved_answers');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedLaws, setBookmarkedLaws] = useState<LawDocument[]>(() => {
    try {
      const stored = localStorage.getItem('vietnam_fishery_saved_laws');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [submissions, setSubmissions] = useState<ScenarioSubmission[]>(() => {
    try {
      const stored = localStorage.getItem('vietnam_fishery_submissions');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('vietnam_fishery_saved_answers', JSON.stringify(savedMessages));
  }, [savedMessages]);

  useEffect(() => {
    localStorage.setItem('vietnam_fishery_saved_laws', JSON.stringify(bookmarkedLaws));
  }, [bookmarkedLaws]);

  useEffect(() => {
    localStorage.setItem('vietnam_fishery_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Handlers
  const handleSelectLawCode = (code: string) => {
    setSelectedLawCode(code);
    setCurrentTab('laws');
  };

  const handleSaveAnswer = (msg: ChatMessage) => {
    setSavedMessages(prev => {
      if (prev.some(m => m.id === msg.id)) {
        return prev.filter(m => m.id !== msg.id);
      }
      return [msg, ...prev];
    });
  };

  const handleBookmarkLaw = (law: LawDocument) => {
    setBookmarkedLaws(prev => {
      if (prev.some(l => l.id === law.id)) {
        return prev.filter(l => l.id !== law.id);
      }
      return [law, ...prev];
    });
  };

  const handleSaveSubmission = (newSub: ScenarioSubmission) => {
    setSubmissions(prev => [newSub, ...prev]);
  };

  const handleClearHistory = () => {
    setSubmissions([]);
    localStorage.removeItem('vietnam_fishery_submissions');
  };

  const handleAddLaw = (newLaw: LawDocument) => {
    setLaws(prev => [newLaw, ...prev]);
  };

  const handleUpdateLawStatus = (id: string, status: string, statusLabel: string, replacementNote?: string) => {
    setLaws(prev => prev.map(l => {
      if (l.id === id) {
        return {
          ...l,
          status: status as any,
          statusLabel,
          replacementNote: replacementNote || l.replacementNote
        };
      }
      return l;
    }));
  };

  const handleAddScenario = (newScenario: Scenario) => {
    setScenarios(prev => [newScenario, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navbar with Role Selection & Saved Counter */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'laws') setSelectedLawCode(null);
        }}
        userRole={userRole}
        setUserRole={setUserRole}
        savedCount={savedMessages.length + bookmarkedLaws.length}
        openSavedModal={() => setIsSavedModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {currentTab === 'chat' && (
          <AIChatView
            userRole={userRole}
            onSelectLawCode={handleSelectLawCode}
            onSaveAnswer={handleSaveAnswer}
            savedMessageIds={savedMessages.map(m => m.id)}
          />
        )}

        {currentTab === 'laws' && (
          <LawLookupView
            laws={laws}
            selectedCode={selectedLawCode}
            onClearSelectedCode={() => setSelectedLawCode(null)}
            onBookmarkLaw={handleBookmarkLaw}
            bookmarkedLawIds={bookmarkedLaws.map(l => l.id)}
          />
        )}

        {currentTab === 'scenarios' && (
          <ScenariosView
            scenarios={scenarios}
            submissions={submissions}
            onSaveSubmission={handleSaveSubmission}
            onClearHistory={handleClearHistory}
          />
        )}

        {currentTab === 'penalties' && (
          <PenaltyCalculatorView
            onSelectLawCode={handleSelectLawCode}
          />
        )}

        {currentTab === 'procedures' && (
          <ProcedureGuideView />
        )}

        {currentTab === 'admin' && (
          <AdminPortalView
            userRole={userRole}
            laws={laws}
            onAddLaw={handleAddLaw}
            onUpdateLawStatus={handleUpdateLawStatus}
            scenarios={scenarios}
            onAddScenario={handleAddScenario}
          />
        )}
      </main>

      {/* Saved Items Modal */}
      <SavedModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedMessages={savedMessages}
        bookmarkedLaws={bookmarkedLaws}
        onRemoveMessage={(id) => setSavedMessages(prev => prev.filter(m => m.id !== id))}
        onRemoveLaw={(id) => setBookmarkedLaws(prev => prev.filter(l => l.id !== id))}
      />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-cyan-900/60 mt-10 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
              <Anchor className="w-4 h-4 text-cyan-400" />
              <span>TRỢ LÝ PHÁP LUẬT TÀU CÁ VIỆT NAM – AI</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              Ứng dụng thông minh hỗ trợ ngư dân, chủ tàu cá, thuyền trưởng và cán bộ quản lý thủy sản tra cứu pháp luật, bảo đảm an toàn trên biển và thực thi nghiêm túc các quy định chống khai thác hải sản bất hợp pháp (IUU).
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
              Nguồn Cơ sở Dữ liệu Pháp luật:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <a
                  href="https://vbpl.vn"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-cyan-300 inline-flex items-center gap-1"
                >
                  <span>Cơ sở dữ liệu quốc gia về văn bản pháp luật (vbpl.vn)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://vanban.chinhphu.vn"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-cyan-300 inline-flex items-center gap-1"
                >
                  <span>Cổng thông tin điện tử Chính phủ (vanban.chinhphu.vn)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://cucthuysan.gov.vn"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-cyan-300 inline-flex items-center gap-1"
                >
                  <span>Cục Thủy sản - Bộ Nông nghiệp & Phát triển nông thôn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
              Lưu ý Trách nhiệm Pháp lý:
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Dữ liệu được cập nhật đối chiếu theo Nghị định 38/2024/NĐ-CP (thay thế NĐ 42/2019/NĐ-CP). Khi giải quyết thủ tục hoặc tình huống vi phạm thực tế, người dùng luôn liên hệ Chi cục Thủy sản tỉnh hoặc Đồn Biên phòng gần nhất để được hướng dẫn chính thức.
            </p>
            <div className="mt-2 text-amber-300 font-semibold text-xs">
              Đường dây nóng hỗ trợ Kiểm ngư: 1800 1770
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>
            © 2024 - 2026 Hệ thống Trợ lý Pháp luật Tàu cá Việt Nam. Phát triển vì sự phát triển bền vững của nghề cá Việt Nam.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Đồng hành cùng ngư dân vươn khơi bám biển</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
