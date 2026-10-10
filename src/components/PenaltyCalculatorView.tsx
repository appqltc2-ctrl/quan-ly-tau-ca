import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Scale, ArrowRight, CheckCircle2, Search, Filter, AlertOctagon } from 'lucide-react';
import { PenaltyItem } from '../types';
import { PENALTY_CATALOG } from '../data/penaltiesData';

interface PenaltyCalculatorViewProps {
  onSelectLawCode?: (code: string) => void;
}

export const PenaltyCalculatorView: React.FC<PenaltyCalculatorViewProps> = ({ onSelectLawCode }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [targetType, setTargetType] = useState<'personal' | 'organization'>('personal');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [vesselLengthFilter, setVesselLengthFilter] = useState<string>('all');

  const groups = Array.from(new Set(PENALTY_CATALOG.map(p => p.behaviorGroup)));

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const filteredPenalties = PENALTY_CATALOG.filter(item => {
    const matchGroup = selectedGroup === 'all' || item.behaviorGroup === selectedGroup;
    const matchSearch = searchFilter.trim() === '' ||
      item.behavior.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.article.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.contextConditions.toLowerCase().includes(searchFilter.toLowerCase());
    
    const matchLength = vesselLengthFilter === 'all' ||
      item.contextConditions.toLowerCase().includes(vesselLengthFilter.toLowerCase());

    return matchGroup && matchSearch && matchLength;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-700/50 rounded-2xl p-5 mb-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Scale className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Bảng Tra cứu Mức Xử phạt Vi phạm Hành chính Thủy sản
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Cập nhật mới nhất theo <strong>Nghị định số 38/2024/NĐ-CP</strong> (có hiệu lực từ 20/05/2024, thay thế hoàn toàn Nghị định 42/2019/NĐ-CP)
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-amber-800/40 text-xs text-amber-300">
            <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Mức phạt Tổ chức = <strong>2 lần</strong> Cá nhân (Điều 5 NĐ 38/2024)</span>
          </div>
        </div>
      </div>

      {/* Control & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-6 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Tìm theo hành vi (mất kết nối VMS, gửi thiết bị, vùng lộng, nhật ký cá, quá hạn đăng kiểm)..."
            className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 outline-none"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Target type switcher */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Đối tượng áp dụng xử phạt
            </label>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setTargetType('personal')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  targetType === 'personal'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cá nhân (Thuyền trưởng/Chủ tàu)
              </button>
              <button
                onClick={() => setTargetType('organization')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  targetType === 'organization'
                    ? 'bg-rose-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tổ chức / Hợp tác xã (x2)
              </button>
            </div>
          </div>

          {/* Group filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Nhóm hành vi vi phạm
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-xs sm:text-sm text-amber-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400"
            >
              <option value="all">Tất cả nhóm hành vi</option>
              {groups.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Vessel length filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Phân loại chiều dài tàu
            </label>
            <select
              value={vesselLengthFilter}
              onChange={(e) => setVesselLengthFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-xs sm:text-sm text-amber-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400"
            >
              <option value="all">Tất cả chiều dài</option>
              <option value="15 mét">Tàu từ 15 mét trở lên (Vùng khơi)</option>
              <option value="24 mét">Tàu từ 24 mét trở lên (Tàu lớn)</option>
              <option value="dưới 15">Tàu dưới 15 mét (Ven bờ & lộng)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Penalties Cards Grid */}
      <div className="space-y-3">
        <div className="text-xs text-slate-400 px-1 flex items-center justify-between">
          <span>Tìm thấy <strong>{filteredPenalties.length}</strong> hành vi vi phạm có khung chế tài:</span>
          <span className="text-amber-400 font-medium">Đang xem: {targetType === 'personal' ? 'Khung phạt Cá nhân' : 'Khung phạt Tổ chức (nhân đôi)'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPenalties.map((item) => {
            const minFine = targetType === 'personal' ? item.finePersonalMin : item.fineOrgMin;
            const maxFine = targetType === 'personal' ? item.finePersonalMax : item.fineOrgMax;
            const avgFine = (minFine + maxFine) / 2;

            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-600/50 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Group & Severity */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      {item.behaviorGroup}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.severityLevel.includes('IUU')
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                        : item.severityLevel === 'Nghiêm trọng'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    }`}>
                      {item.severityLevel}
                    </span>
                  </div>

                  {/* Behavior text */}
                  <h3 className="font-bold text-sm sm:text-base text-white leading-snug mb-2">
                    {item.behavior}
                  </h3>

                  {/* Conditions & Context */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    <span className="text-slate-400">Điều kiện áp dụng: </span>
                    {item.contextConditions}
                  </p>

                  {/* Penalty Numbers Grid */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Khung phạt tiền:</span>
                      <span className="font-extrabold text-amber-400 text-sm sm:text-base font-mono">
                        {formatVND(minFine)} - {formatVND(maxFine)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-850">
                      <span>Mức phạt trung bình (không tăng nặng/giảm nhẹ):</span>
                      <strong className="text-white font-mono">{formatVND(avgFine)}</strong>
                    </div>
                  </div>

                  {/* Extra sanctions */}
                  {item.extraSanctions && item.extraSanctions.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-800/40 text-xs text-rose-200 mb-2">
                      <strong className="text-rose-300 block text-[11px] uppercase mb-1">
                        Hình thức phạt bổ sung:
                      </strong>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {item.extraSanctions.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Remedial measures */}
                  {item.remedialMeasures && item.remedialMeasures.length > 0 && (
                    <div className="p-2 rounded-lg bg-slate-950 text-[11px] text-slate-300 border border-slate-800 mb-2">
                      <strong className="text-slate-400 block mb-0.5">Biện pháp khắc phục hậu quả:</strong>
                      <p>{item.remedialMeasures.join(', ')}</p>
                    </div>
                  )}
                </div>

                {/* Card Footer: Article reference */}
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-bold">
                    <span>{item.lawRef}</span>
                    <span className="text-slate-400 font-normal">({item.article})</span>
                  </div>

                  {onSelectLawCode && (
                    <button
                      onClick={() => onSelectLawCode('38/2024/NĐ-CP')}
                      className="text-cyan-400 hover:text-cyan-200 text-xs font-semibold flex items-center gap-1"
                    >
                      <span>Xem điều luật</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
