import React from 'react';
import { Compass, Ship, BookOpen, ShieldAlert, FileText, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';
import { AppUserRole } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: AppUserRole;
  setUserRole: (role: AppUserRole) => void;
  savedCount: number;
  openSavedModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  savedCount,
  openSavedModal
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-cyan-800/50 shadow-lg backdrop-blur-md">
      {/* Top Banner: Emergency IUU Hotline & Government Notice */}
      <div className="bg-gradient-to-r from-blue-900 via-cyan-900 to-indigo-950 px-4 py-1.5 text-xs text-cyan-100 flex flex-wrap items-center justify-between border-b border-cyan-800/40">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider animate-pulse">
            Chống IUU
          </span>
          <span className="font-medium text-slate-200 hidden sm:inline">
            Cơ sở dữ liệu Quốc gia về Quản lý tàu cá & Pháp luật Thủy sản Việt Nam
          </span>
          <span className="text-cyan-300 font-semibold sm:hidden">
            Hỗ trợ Pháp luật Tàu cá Việt Nam
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Đường dây nóng Kiểm ngư: <strong className="text-white">1800 1770</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Áp dụng NĐ 38/2024/NĐ-CP mới nhất</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div 
            onClick={() => setCurrentTab('chat')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform border border-cyan-300/30">
              <Ship className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg text-white tracking-tight flex items-center gap-1">
                  TRỢ LÝ TÀU CÁ VIỆT NAM
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-cyan-300/80 hidden sm:block font-medium">
                Tra cứu pháp luật • Thủ tục tàu cá • Chấm điểm tình huống thực tế
              </p>
            </div>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('chat')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'chat'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Hỏi đáp AI</span>
            </button>

            <button
              onClick={() => setCurrentTab('laws')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'laws'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Văn bản pháp luật</span>
            </button>

            <button
              onClick={() => setCurrentTab('scenarios')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'scenarios'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Tình huống & Chấm điểm</span>
            </button>

            <button
              onClick={() => setCurrentTab('penalties')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'penalties'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Bảng mức xử phạt</span>
            </button>

            <button
              onClick={() => setCurrentTab('procedures')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'procedures'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Thủ tục tàu cá</span>
            </button>

            <button
              onClick={() => setCurrentTab('admin')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentTab === 'admin'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <UserCheck className="w-4 h-4 text-rose-400" />
              <span>Quản trị & Nhật ký</span>
            </button>
          </nav>

          {/* User Role Switcher & Bookmarks */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved answers button */}
            <button
              onClick={openSavedModal}
              title="Văn bản & câu trả lời đã lưu"
              className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Role dropdown selector */}
            <div className="relative flex items-center bg-slate-800 border border-cyan-800/60 rounded-lg p-1">
              <span className="text-[11px] text-slate-400 px-2 font-medium hidden sm:inline">
                Vai trò:
              </span>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as AppUserRole)}
                className="bg-slate-900 text-cyan-200 text-xs font-semibold rounded px-2.5 py-1 outline-none border border-cyan-700/50 focus:border-cyan-400 cursor-pointer"
              >
                <option value="ngu_dan">🐟 Ngư dân / Chủ tàu / Thuyền trưởng</option>
                <option value="can_bo">⚓ Cán bộ Kiểm ngư / Thủy sản</option>
                <option value="admin">🛡️ Quản trị viên hệ thống</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2 gap-1.5 border-t border-slate-800 scrollbar-none text-xs">
          <button
            onClick={() => setCurrentTab('chat')}
            className={`px-2.5 py-1.5 whitespace-nowrap rounded-md font-medium ${
              currentTab === 'chat' ? 'bg-cyan-600 text-white' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            Hỏi đáp AI
          </button>
          <button
            onClick={() => setCurrentTab('laws')}
            className={`px-2.5 py-1.5 whitespace-nowrap rounded-md font-medium ${
              currentTab === 'laws' ? 'bg-cyan-600 text-white' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            Văn bản pháp luật
          </button>
          <button
            onClick={() => setCurrentTab('scenarios')}
            className={`px-2.5 py-1.5 whitespace-nowrap rounded-md font-medium ${
              currentTab === 'scenarios' ? 'bg-cyan-600 text-white' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            Tình huống thực tế
          </button>
          <button
            onClick={() => setCurrentTab('penalties')}
            className={`px-2.5 py-1.5 whitespace-nowrap rounded-md font-medium ${
              currentTab === 'penalties' ? 'bg-cyan-600 text-white' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            Mức xử phạt
          </button>
          <button
            onClick={() => setCurrentTab('procedures')}
            className={`px-2.5 py-1.5 whitespace-nowrap rounded-md font-medium ${
              currentTab === 'procedures' ? 'bg-cyan-600 text-white' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            Thủ tục tàu cá
          </button>
          <button
            onClick={() => setCurrentTab('admin')}
            className={`px-2.5 py-1.5 whitespace-nowrap rounded-md font-medium ${
              currentTab === 'admin' ? 'bg-cyan-600 text-white' : 'text-slate-300 bg-slate-800/60'
            }`}
          >
            Quản trị & Nhật ký
          </button>
        </div>
      </div>
    </header>
  );
};
