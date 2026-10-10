import React, { useState } from 'react';
import { 
  FileText, CheckSquare, Clock, Building, Download, 
  HelpCircle, AlertCircle, ArrowRight, CheckCircle2, ChevronDown, ChevronUp
} from 'lucide-react';
import { ProcedureItem } from '../types';
import { PROCEDURE_CATALOG } from '../data/proceduresData';

export const ProcedureGuideView: React.FC = () => {
  const [selectedProcId, setSelectedProcId] = useState<string>(PROCEDURE_CATALOG[0].id);
  const [checkedDossiers, setCheckedDossiers] = useState<{ [key: string]: boolean }>({});
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const activeProcedure = PROCEDURE_CATALOG.find(p => p.id === selectedProcId) || PROCEDURE_CATALOG[0];

  const handleToggleCheck = (dossierText: string) => {
    setCheckedDossiers(prev => ({
      ...prev,
      [dossierText]: !prev[dossierText]
    }));
  };

  const handleDownloadForm = (formName?: string) => {
    const name = formName || 'Bieu_mau_thu_tuc_tau_ca.docx';
    setDownloadNotice(`Đã tải xuống biểu mẫu chuẩn: ${name}`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-700/50 rounded-2xl p-5 mb-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                <FileText className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Hướng dẫn Thủ tục Hành chính Tàu cá Việt Nam
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Tra cứu trình tự các bước, thành phần hồ sơ, thời hạn giải quyết và cơ quan thẩm quyền theo tiêu chuẩn Dịch vụ công Quốc gia
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-indigo-800/40 text-xs text-indigo-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Nộp trực tiếp tại Bộ phận Một cửa hoặc Cổng DVC Quốc gia</span>
          </div>
        </div>
      </div>

      {downloadNotice && (
        <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs rounded-xl flex items-center justify-between animate-fadeIn">
          <span>{downloadNotice}</span>
          <button onClick={() => setDownloadNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Procedures */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Danh mục Thủ tục Thường gặp:
          </div>

          <div className="space-y-2">
            {PROCEDURE_CATALOG.map((proc, index) => {
              const isSelected = proc.id === activeProcedure.id;

              return (
                <div
                  key={proc.id}
                  onClick={() => setSelectedProcId(proc.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-850 border-indigo-400 ring-2 ring-indigo-500/20 shadow-md'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-mono font-bold text-cyan-400">Thủ tục #{index + 1}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700 font-medium">
                      {proc.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-white leading-snug">
                    {proc.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {proc.totalTime}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Procedure Details Workspace */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
          {/* Procedure Header */}
          <div className="pb-4 border-b border-slate-800">
            <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold mb-2 inline-block">
              {activeProcedure.category}
            </span>
            <h2 className="text-base sm:text-xl font-bold text-white leading-snug">
              {activeProcedure.title}
            </h2>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Cơ quan thẩm quyền:</span>
                <span className="text-white font-medium">{activeProcedure.competentAuthority}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Thời gian xử lý:</span>
                <span className="text-emerald-400 font-bold">{activeProcedure.totalTime}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Lệ phí nhà nước:</span>
                <span className="text-amber-400 font-medium">{activeProcedure.fee}</span>
              </div>
            </div>
          </div>

          {/* Interactive Dossier Checklist */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-cyan-400" />
                Thành phần hồ sơ cần chuẩn bị (Tích để kiểm tra):
              </h4>
              <span className="text-xs text-slate-400">
                {activeProcedure.requiredDocuments.filter(d => checkedDossiers[d]).length} / {activeProcedure.requiredDocuments.length} giấy tờ
              </span>
            </div>

            <div className="space-y-2">
              {activeProcedure.requiredDocuments.map((doc, idx) => {
                const isChecked = !!checkedDossiers[doc];

                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleCheck(doc)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-600/50 text-slate-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                      {doc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Template Download Button */}
            {activeProcedure.formTemplateName && (
              <div className="mt-3 pt-3 border-t border-slate-850 flex items-center justify-between text-xs">
                <span className="text-slate-400">Biểu mẫu chuẩn kèm theo:</span>
                <button
                  onClick={() => handleDownloadForm(activeProcedure.formTemplateName)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải {activeProcedure.formTemplateName}</span>
                </button>
              </div>
            )}
          </div>

          {/* Step-by-Step Procedure Flow */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-400" />
              Trình tự các bước thực hiện:
            </h4>

            <div className="space-y-2.5">
              {activeProcedure.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-900/80 text-indigo-300 text-xs font-extrabold flex items-center justify-center shrink-0 border border-indigo-500/40 mt-0.5">
                    {st.stepNumber}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs sm:text-sm text-cyan-300">
                        {st.stepTitle}
                      </h5>
                      <span className="text-[11px] text-emerald-400 font-mono">
                        {st.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {st.detail}
                    </p>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                      <Building className="w-3 h-3" />
                      <span>Thực hiện: {st.responsibleAgency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          {activeProcedure.importantNotes && activeProcedure.importantNotes.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 space-y-1">
              <strong className="text-amber-300 flex items-center gap-1.5 uppercase font-bold text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Lưu ý quan trọng từ cơ quan Thủy sản:
              </strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-300">
                {activeProcedure.importantNotes.map((note, nIdx) => (
                  <li key={nIdx}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal Basis Footer */}
          <div className="text-xs text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span>Căn cứ pháp lý: <strong>{activeProcedure.legalBasis}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
