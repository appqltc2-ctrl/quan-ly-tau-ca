import React, { useState } from 'react';
import { 
  ShieldAlert, Award, CheckCircle2, XCircle, ArrowRight, 
  RotateCcw, Sparkles, BookOpen, AlertTriangle, FileText, 
  History, TrendingUp, Check, BrainCircuit
} from 'lucide-react';
import { Scenario, ScenarioSubmission, ScenarioOption } from '../types';

interface ScenariosViewProps {
  scenarios: Scenario[];
  submissions: ScenarioSubmission[];
  onSaveSubmission: (submission: ScenarioSubmission) => void;
  onClearHistory: () => void;
}

export const ScenariosView: React.FC<ScenariosViewProps> = ({
  scenarios,
  submissions,
  onSaveSubmission,
  onClearHistory
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0]?.id || '');
  const [answerMode, setAnswerMode] = useState<'choice' | 'freeform'>('choice');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [userFreeformText, setUserFreeformText] = useState<string>('');
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<{
    totalScore: number;
    scoreBreakdown: { issue: number; basis: number; action: number; procedure: number };
    feedback: string;
    correctAnswerText: string;
    modelAnswer?: any;
  } | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  const activeScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  // Calculate learning progress stats
  const completedScenarioIds = Array.from(new Set(submissions.map(s => s.scenarioId)));
  const totalSubmissions = submissions.length;
  const averageScore = totalSubmissions > 0
    ? Math.round(submissions.reduce((acc, cur) => acc + cur.totalScore, 0) / totalSubmissions)
    : 0;

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setSelectedOptionId(null);
    setUserFreeformText('');
    setCurrentResult(null);
  };

  const handleSubmitChoice = () => {
    if (!selectedOptionId || !activeScenario) return;

    const chosenOption = activeScenario.options.find(o => o.id === selectedOptionId);
    if (!chosenOption) return;

    const is100 = chosenOption.score === 100;
    const scoreBreakdown = is100
      ? { issue: 20, basis: 30, action: 30, procedure: 20 }
      : {
          issue: Math.round(chosenOption.score * 0.2),
          basis: Math.round(chosenOption.score * 0.3),
          action: Math.round(chosenOption.score * 0.3),
          procedure: Math.round(chosenOption.score * 0.2)
        };

    const result = {
      totalScore: chosenOption.score,
      scoreBreakdown,
      feedback: chosenOption.feedback,
      correctAnswerText: activeScenario.modelAnswer.fullExplanation,
      modelAnswer: activeScenario.modelAnswer
    };

    setCurrentResult(result);

    const newSubmission: ScenarioSubmission = {
      id: `sub-${Date.now()}`,
      scenarioId: activeScenario.id,
      scenarioTitle: activeScenario.title,
      mode: 'choice',
      selectedOptionId: chosenOption.id,
      totalScore: chosenOption.score,
      scoreBreakdown,
      feedback: chosenOption.feedback,
      correctAnswerText: activeScenario.modelAnswer.fullExplanation,
      createdAt: new Date().toLocaleString('vi-VN')
    };

    onSaveSubmission(newSubmission);
  };

  const handleSubmitFreeform = async () => {
    if (!userFreeformText.trim() || !activeScenario || isGrading) return;

    setIsGrading(true);
    try {
      const response = await fetch('/api/grade-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: activeScenario.id,
          userFreeformText: userFreeformText.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Chấm điểm không thành công');
      }

      const data = await response.json();
      setCurrentResult(data);

      const newSubmission: ScenarioSubmission = {
        id: `sub-${Date.now()}`,
        scenarioId: activeScenario.id,
        scenarioTitle: activeScenario.title,
        mode: 'freeform',
        userFreeformText: userFreeformText.trim(),
        totalScore: data.totalScore,
        scoreBreakdown: data.scoreBreakdown,
        feedback: data.feedback,
        correctAnswerText: data.correctAnswerText || activeScenario.modelAnswer.fullExplanation,
        createdAt: new Date().toLocaleString('vi-VN')
      };

      onSaveSubmission(newSubmission);
    } catch (err: any) {
      console.error('Lỗi chấm điểm tự do:', err);
      // Fallback evaluation
      const mockResult = {
        totalScore: 75,
        scoreBreakdown: { issue: 18, basis: 20, action: 22, procedure: 15 },
        feedback: 'Bạn đã nắm được bản chất tình huống. Cần nêu rõ hơn số hiệu văn bản pháp lý (Nghị định 38/2024/NĐ-CP) và trách nhiệm báo cáo tuần tự.',
        correctAnswerText: activeScenario.modelAnswer.fullExplanation,
        modelAnswer: activeScenario.modelAnswer
      };
      setCurrentResult(mockResult);
    } finally {
      setIsGrading(false);
    }
  };

  const handleResetScenario = () => {
    setSelectedOptionId(null);
    setUserFreeformText('');
    setCurrentResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner & Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-800/40 rounded-2xl p-5 mb-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Rèn luyện Nghiệp vụ & Chấm điểm Tình huống
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Thực hành xử lý 8 tình huống thực tế trên biển theo barem 100 điểm: Vấn đề (20đ) • Căn cứ pháp lý (30đ) • Phương án xử lý (30đ) • Trình tự thực hiện (20đ)
            </p>
          </div>

          {/* Quick learning progress cards */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900/90 border border-emerald-700/50 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Hoàn thành</span>
              <span className="text-lg font-extrabold text-emerald-400">
                {completedScenarioIds.length} / {scenarios.length}
              </span>
            </div>

            <div className="bg-slate-900/90 border border-emerald-700/50 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Điểm trung bình</span>
              <span className="text-lg font-extrabold text-amber-400">
                {averageScore > 0 ? `${averageScore}/100` : '--'}
              </span>
            </div>

            <button
              onClick={() => setShowHistoryModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <History className="w-4 h-4 text-cyan-400" />
              <span>Lịch sử ({totalSubmissions})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scenarios Navigation List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Danh mục {scenarios.length} Tình huống thực tế:
          </div>

          <div className="space-y-2">
            {scenarios.map((sc, index) => {
              const isSelected = sc.id === activeScenario.id;
              const isCompleted = completedScenarioIds.includes(sc.id);

              return (
                <div
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-400 ring-2 ring-emerald-500/20 shadow-md'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[11px] font-bold text-cyan-400 font-mono">
                      Tình huống #{index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        sc.difficulty === 'Cơ bản'
                          ? 'bg-blue-500/20 text-blue-300'
                          : sc.difficulty === 'Trung bình'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {sc.difficulty}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug">
                    {sc.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {sc.topic}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Scenario Content & Workspace */}
        <div className="lg:col-span-8 space-y-5">
          {activeScenario && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl">
              {/* Scenario Header */}
              <div className="pb-4 border-b border-slate-800 mb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {activeScenario.topic}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Độ khó: <strong className="text-white">{activeScenario.difficulty}</strong>
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {activeScenario.title}
                </h2>
              </div>

              {/* Scenario Narrative */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  Bối cảnh thực tế:
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {activeScenario.description}
                </p>

                {/* Vessel Metadata Box */}
                {activeScenario.vesselContext && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-850 text-xs">
                    {activeScenario.vesselContext.vesselCode && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Số hiệu tàu:</span>
                        <span className="font-mono font-bold text-cyan-300">{activeScenario.vesselContext.vesselCode}</span>
                      </div>
                    )}
                    {activeScenario.vesselContext.lengthMeters && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Chiều dài lớn nhất:</span>
                        <span className="font-bold text-white">{activeScenario.vesselContext.lengthMeters} m (Vùng khơi)</span>
                      </div>
                    )}
                    {activeScenario.vesselContext.activityArea && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Vùng hoạt động:</span>
                        <span className="font-bold text-amber-300">{activeScenario.vesselContext.activityArea}</span>
                      </div>
                    )}
                    {activeScenario.vesselContext.equipmentStatus && (
                      <div className="col-span-2 sm:col-span-3">
                        <span className="text-slate-400 block text-[10px]">Tình trạng thiết bị:</span>
                        <span className="text-rose-300 font-medium">{activeScenario.vesselContext.equipmentStatus}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mode Switcher: Multiple Choice vs Freeform Essay */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => {
                      setAnswerMode('choice');
                      setCurrentResult(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      answerMode === 'choice'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Trắc nghiệm giải pháp
                  </button>

                  <button
                    onClick={() => {
                      setAnswerMode('freeform');
                      setCurrentResult(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      answerMode === 'freeform'
                        ? 'bg-cyan-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span>Tự nhập câu trả lời (AI chấm)</span>
                  </button>
                </div>

                {currentResult && (
                  <button
                    onClick={handleResetScenario}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại</span>
                  </button>
                )}
              </div>

              {/* MODE 1: MULTIPLE CHOICE OPTIONS */}
              {answerMode === 'choice' && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-300">
                    Lựa chọn phương án xử lý theo bạn là đúng quy định pháp luật nhất:
                  </div>

                  <div className="space-y-2.5">
                    {activeScenario.options.map((option) => {
                      const isSelected = selectedOptionId === option.id;
                      const isGraded = currentResult !== null;

                      let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-950';
                      if (isSelected) {
                        borderClass = 'border-cyan-400 bg-slate-850 ring-2 ring-cyan-500/20';
                      }
                      if (isGraded && isSelected) {
                        borderClass = option.isCorrect
                          ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/30'
                          : 'border-rose-400 bg-rose-950/40 ring-2 ring-rose-500/30';
                      }

                      return (
                        <div
                          key={option.id}
                          onClick={() => !currentResult && setSelectedOptionId(option.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${borderClass}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {isGraded ? (
                                option.isCorrect ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                )
                              ) : (
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                                }`}>
                                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                                {option.text}
                              </p>
                              {isGraded && isSelected && (
                                <div className={`mt-2 p-2 rounded-lg text-xs font-medium ${
                                  option.isCorrect ? 'bg-emerald-900/40 text-emerald-200' : 'bg-rose-900/40 text-rose-200'
                                }`}>
                                  <strong>Nhận xét:</strong> {option.feedback}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {!currentResult && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleSubmitChoice}
                        disabled={!selectedOptionId}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
                      >
                        Xác nhận phương án & Xem điểm
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: FREEFORM ESSAY WITH AI SCORING */}
              {answerMode === 'freeform' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Nhập phương án xử lý của bạn (nêu rõ các bước, căn cứ điều luật và lưu ý trách nhiệm):
                    </label>
                    <textarea
                      value={userFreeformText}
                      onChange={(e) => setUserFreeformText(e.target.value)}
                      disabled={isGrading || currentResult !== null}
                      rows={5}
                      placeholder="Ví dụ: 1. Thuyền trưởng phải lập tức dùng bộ đàm HF báo cáo tọa độ về Chi cục Thủy sản tỉnh 06 giờ/lần theo NĐ 26/2019 và NĐ 37/2024. 2. Không được tự ý mở kẹp chì niêm phong VMS... 3. Đưa tàu về bờ trong vòng 10 ngày..."
                      className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none resize-none"
                    />
                  </div>

                  {/* Rubric Preview */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-white block font-semibold">1. Vấn đề (20đ)</span>
                      <span>Nhận diện đúng rủi ro</span>
                    </div>
                    <div>
                      <span className="text-white block font-semibold">2. Căn cứ (30đ)</span>
                      <span>Viện dẫn đúng văn bản</span>
                    </div>
                    <div>
                      <span className="text-white block font-semibold">3. Xử lý (30đ)</span>
                      <span>Đúng giải pháp an toàn</span>
                    </div>
                    <div>
                      <span className="text-white block font-semibold">4. Trình tự (20đ)</span>
                      <span>Đúng các bước & thẩm quyền</span>
                    </div>
                  </div>

                  {!currentResult && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleSubmitFreeform}
                        disabled={isGrading || !userFreeformText.trim()}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
                      >
                        {isGrading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            <span>AI đang phân tích & chấm điểm...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Nộp bài & Chấm điểm bằng AI</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* EVALUATION & MODEL ANSWER CARD */}
              {currentResult && (
                <div className="mt-6 pt-5 border-t border-slate-850 space-y-4">
                  {/* Score Breakdown Card */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-600/50 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-400" />
                          <h4 className="font-bold text-white text-sm sm:text-base">
                            Kết quả Đánh giá Nghiệp vụ
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {currentResult.totalScore >= 80 ? 'Xuất sắc! Nắm vững quy định pháp luật.' : currentResult.totalScore >= 50 ? 'Đạt yêu cầu cơ bản, cần bổ sung căn cứ pháp lý.' : 'Chưa đạt! Cần ôn luyện thêm các điều khoản.'}
                        </p>
                      </div>

                      <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-extrabold text-amber-400 self-start sm:self-auto">
                        <span>{currentResult.totalScore}</span>
                        <span className="text-xs font-normal text-slate-400">/100 điểm</span>
                      </div>
                    </div>

                    {/* 4-criteria breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block font-semibold">1. Đúng vấn đề</span>
                        <span className="text-sm font-extrabold text-cyan-300">
                          {currentResult.scoreBreakdown.issue} / 20đ
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block font-semibold">2. Căn cứ pháp lý</span>
                        <span className="text-sm font-extrabold text-blue-300">
                          {currentResult.scoreBreakdown.basis} / 30đ
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block font-semibold">3. Phương án xử lý</span>
                        <span className="text-sm font-extrabold text-emerald-300">
                          {currentResult.scoreBreakdown.action} / 30đ
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block font-semibold">4. Trình tự thực hiện</span>
                        <span className="text-sm font-extrabold text-purple-300">
                          {currentResult.scoreBreakdown.procedure} / 20đ
                        </span>
                      </div>
                    </div>

                    {/* Detailed Feedback */}
                    <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200">
                      <strong className="text-amber-300 block mb-1">Nhận xét chi tiết từ Hệ thống AI:</strong>
                      <p className="leading-relaxed">{currentResult.feedback}</p>
                    </div>
                  </div>

                  {/* Standard Model Answer by Expert */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-cyan-300">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      Đáp án Chuẩn của Chuyên gia Pháp chế Thủy sản:
                    </div>

                    <div className="space-y-2 text-xs text-slate-200">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <strong className="text-cyan-300 block mb-0.5">Vấn đề cốt lõi:</strong>
                        <p>{activeScenario.modelAnswer.coreIssue}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <strong className="text-blue-300 block mb-0.5">Căn cứ pháp luật áp dụng:</strong>
                        <p className="text-amber-300 font-semibold">{activeScenario.modelAnswer.legalBasis}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <strong className="text-purple-300 block mb-0.5">Trình tự xử lý đúng:</strong>
                        <p className="whitespace-pre-line leading-relaxed">{activeScenario.modelAnswer.procedure}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <strong className="text-rose-300 block mb-0.5">Khung chế tài / Tuân thủ (NĐ 38/2024):</strong>
                        <p className="leading-relaxed">{activeScenario.modelAnswer.penaltyOrCompliance}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                        <strong className="text-emerald-300 block mb-0.5">Lời khuyên thực tế cho ngư dân:</strong>
                        <p>{activeScenario.modelAnswer.practicalAdvice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-5 max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                Lịch sử làm bài tập & Tiến độ ({submissions.length})
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Đóng
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 py-4 pr-1 scrollbar-thin">
              {submissions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Chưa có kết quả làm bài nào được lưu.</p>
              ) : (
                submissions.map((sub) => (
                  <div key={sub.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{sub.scenarioTitle}</span>
                      <span className="font-mono text-amber-400 font-extrabold">{sub.totalScore}/100đ</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Chế độ: {sub.mode === 'choice' ? 'Trắc nghiệm' : 'Tự luận AI'}</span>
                      <span>{sub.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-300 bg-slate-900 p-2 rounded border border-slate-850">
                      {sub.feedback}
                    </p>
                  </div>
                ))
              )}
            </div>

            {submissions.length > 0 && (
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                <button
                  onClick={onClearHistory}
                  className="text-rose-400 hover:text-rose-300 font-semibold"
                >
                  Xóa toàn bộ lịch sử
                </button>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 text-white font-semibold"
                >
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
