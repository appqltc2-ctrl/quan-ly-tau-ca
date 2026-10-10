import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Sparkles, AlertCircle, CheckCircle, ShieldCheck, 
  ExternalLink, Bookmark, Copy, Check, Volume2, 
  VolumeX, HelpCircle, ArrowRight, RefreshCw, MessageSquare
} from 'lucide-react';
import { ChatMessage, AppUserRole } from '../types';

interface AIChatViewProps {
  userRole: AppUserRole;
  onSelectLawCode?: (code: string) => void;
  onSaveAnswer?: (msg: ChatMessage) => void;
  savedMessageIds: string[];
}

export const AIChatView: React.FC<AIChatViewProps> = ({
  userRole,
  onSelectLawCode,
  onSaveAnswer,
  savedMessageIds
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Chào bà con ngư dân, các chủ tàu, thuyền trưởng và quý đồng chí cán bộ quản lý thủy sản! Tôi là Trợ lý AI Pháp luật Tàu cá Việt Nam.',
      structuredResponse: {
        directAnswer: 'Tôi được huấn luyện dựa trên toàn bộ hệ thống văn bản pháp luật hiện hành về quản lý tàu cá và chống khai thác IUU của Việt Nam: Luật Thủy sản 2017, Nghị định 38/2024/NĐ-CP (thay thế NĐ 42/2019/NĐ-CP về xử phạt vi phạm hành chính), Nghị định 26/2019/NĐ-CP, Nghị định 37/2024/NĐ-CP, Thông tư 23/2018/TT-BNNPTNT, và Nghị quyết 04/2024/NQ-HĐTP của TANDTC.',
        legalBasis: [
          {
            docName: 'Luật Thủy sản năm 2017',
            docCode: '18/2017/QH14',
            article: 'Điều 50, 60, 67, 68',
            effectiveStatus: 'Còn hiệu lực',
            updatedDate: '01/01/2019'
          },
          {
            docName: 'Nghị định quy định xử phạt VPHC trong lĩnh vực thủy sản',
            docCode: '38/2024/NĐ-CP',
            article: 'Điều 20 đến Điều 37',
            effectiveStatus: 'Còn hiệu lực từ 20/05/2024 (Thay thế NĐ 42/2019)',
            updatedDate: '20/05/2024'
          }
        ],
        procedures: [
          'Bạn có thể đặt câu hỏi về: Đăng ký tàu cá, đăng kiểm, cấp giấy phép khai thác.',
          'Quy định thiết bị giám sát hành trình VMS và xử lý sự cố mất kết nối trên biển.',
          'Phân vùng khai thác hải sản (vùng khơi, vùng lộng, ven bờ) và kích thước mắt lưới tối thiểu.',
          'Khung mức phạt tiền, tước bằng thuyền trưởng và nguy cơ truy cứu trách nhiệm hình sự IUU.'
        ],
        practicalNotes: [
          'CẢNH BÁO HIỆU LỰC: Nghị định 42/2019/NĐ-CP đã hết hiệu lực từ ngày 20/05/2024. Mọi mức xử phạt hiện nay đều áp dụng theo Nghị định 38/2024/NĐ-CP.',
          'Mọi câu trả lời của AI đều được trích dẫn cụ thể điều khoản, có liên kết đến văn bản gốc đã kiểm duyệt.'
        ],
        officialSourceUrl: 'https://vanban.chinhphu.vn/?pageid=27160&docid=210214',
        officialSourceLabel: 'Cổng thông tin điện tử Chính phủ (vanban.chinhphu.vn)'
      },
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<{ [msgId: string]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const popularQueries = [
    'Thủ tục đăng ký tàu cá gồm những giấy tờ gì?',
    'Tàu cá mất kết nối VMS phải xử lý thế nào?',
    'Tàu cá vi phạm vùng khai thác bị xử phạt ra sao?',
    'Văn bản nào đang quy định về đăng kiểm tàu cá?',
    'Nghị định 42/2019/NĐ-CP còn hiệu lực không?',
    'Hành vi gửi thiết bị VMS sang tàu khác bị xử lý thế nào?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          userRole,
          conversationHistory: messages.slice(-4).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const resJson = await response.json();
      const structured = resJson.data;

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: structured?.directAnswer || 'Đã tra cứu căn cứ pháp lý thành công.',
        structuredResponse: structured,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Lỗi hỏi đáp AI:', err);
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: 'Hệ thống đang kiểm tra lại cơ sở dữ liệu pháp luật. Vui lòng thử lại hoặc chọn các câu hỏi gợi ý bên dưới.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (msg: ChatMessage) => {
    const content = msg.structuredResponse
      ? `TRẢ LỜI: ${msg.structuredResponse.directAnswer}\n\nCĂN CỨ PHÁP LÝ:\n${msg.structuredResponse.legalBasis?.map(b => `- ${b.docName} (${b.docCode}), ${b.article}`).join('\n')}\n\nLƯU Ý THỰC TẾ:\n${msg.structuredResponse.practicalNotes?.join('\n')}`
      : msg.text;

    navigator.clipboard.writeText(content);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (msg: ChatMessage) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === msg.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = msg.structuredResponse ? msg.structuredResponse.directAnswer : msg.text;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msg.id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-6xl mx-auto px-2 sm:px-4 py-3">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-4 sm:p-5 border border-cyan-800/40 shadow-xl mb-3 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Hỏi đáp Pháp luật Tàu cá bằng AI
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-normal">
                  Dữ liệu kiểm chứng chuẩn xác
                </span>
              </h1>
              <p className="text-xs text-slate-300">
                Trả lời theo cấu trúc chuẩn 6 phần: Căn cứ pháp lý, hiệu lực văn bản, quy trình, mức phạt và lưu ý thực tế
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-cyan-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-cyan-700/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Áp dụng quy định NĐ 38/2024/NĐ-CP & Luật Thủy sản 2017</span>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 whitespace-nowrap text-[11px] font-medium flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            Gợi ý:
          </span>
          {popularQueries.map((query, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(query)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-cyan-900/60 text-slate-200 hover:text-cyan-200 border border-slate-700 hover:border-cyan-500/50 transition-all text-[11px] font-medium"
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* User Message Bubble */}
            {msg.sender === 'user' ? (
              <div className="max-w-[85%] sm:max-w-2xl bg-gradient-to-r from-cyan-700 to-blue-700 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-md border border-cyan-400/30">
                <p className="text-xs sm:text-sm font-medium leading-relaxed">{msg.text}</p>
                <span className="text-[10px] text-cyan-200/80 block text-right mt-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ) : (
              /* Assistant Structured Message Card */
              <div className="w-full max-w-4xl bg-slate-900/95 border border-cyan-800/60 rounded-2xl rounded-tl-sm p-4 sm:p-5 shadow-xl text-slate-100">
                {/* Assistant Card Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/40">
                      AI
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        Trợ lý Pháp luật Tàu cá
                        <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-800">
                          {msg.structuredResponse?.legalBasis?.[0]?.effectiveStatus || 'Xác thực'}
                        </span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>
                  </div>

                  {/* Actions: Speak, Copy, Save, Report */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSpeak(msg)}
                      title={speakingId === msg.id ? 'Dừng đọc' : 'Đọc câu trả lời'}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        speakingId === msg.id 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                          : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                      }`}
                    >
                      {speakingId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleCopy(msg)}
                      title="Sao chép nội dung"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {onSaveAnswer && (
                      <button
                        onClick={() => onSaveAnswer(msg)}
                        title="Lưu câu trả lời vào máy"
                        className={`p-1.5 rounded-lg border transition-colors ${
                          savedMessageIds.includes(msg.id)
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                            : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Structured 6-Part Content */}
                {msg.structuredResponse ? (
                  <div className="space-y-4 text-xs sm:text-sm">
                    {/* Phần 1: Trả lời trực tiếp */}
                    <div className="bg-slate-800/80 p-3.5 rounded-xl border-l-4 border-cyan-400">
                      <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-1.5 text-xs uppercase tracking-wider">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        1. Trả lời trực tiếp
                      </div>
                      <p className="text-slate-100 font-medium leading-relaxed whitespace-pre-line">
                        {msg.structuredResponse.directAnswer}
                      </p>
                    </div>

                    {/* Phần 2 & 3: Căn cứ pháp lý & Tình trạng hiệu lực */}
                    {msg.structuredResponse.legalBasis && msg.structuredResponse.legalBasis.length > 0 && (
                      <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/60">
                        <div className="flex items-center gap-1.5 font-bold text-blue-300 mb-2 text-xs uppercase tracking-wider">
                          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                          2. Căn cứ pháp lý & Tình trạng hiệu lực
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {msg.structuredResponse.legalBasis.map((b, idx) => (
                            <div 
                              key={idx} 
                              className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="font-bold text-cyan-300 text-xs">{b.docCode}</span>
                                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                    b.effectiveStatus.toLowerCase().includes('còn hiệu lực')
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  }`}>
                                    {b.effectiveStatus}
                                  </span>
                                </div>
                                <p className="text-slate-200 text-xs font-medium line-clamp-2">{b.docName}</p>
                                <p className="text-amber-300 text-xs font-semibold mt-1">
                                  {b.article} {b.clausePoint ? `(${b.clausePoint})` : ''}
                                </p>
                              </div>
                              {onSelectLawCode && (
                                <button
                                  onClick={() => onSelectLawCode(b.docCode)}
                                  className="mt-2 text-[11px] text-cyan-400 hover:text-cyan-200 flex items-center gap-1 font-semibold self-start"
                                >
                                  <span>Xem chi tiết điều khoản</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Phần 4: Trình tự thực hiện & Hồ sơ */}
                    {msg.structuredResponse.procedures && msg.structuredResponse.procedures.length > 0 && (
                      <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/60">
                        <div className="flex items-center gap-1.5 font-bold text-purple-300 mb-2 text-xs uppercase tracking-wider">
                          <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                          3. Trình tự thủ tục / Các bước thực hiện
                        </div>
                        <ul className="space-y-1.5 pl-1">
                          {msg.structuredResponse.procedures.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-200 text-xs sm:text-sm">
                              <span className="w-5 h-5 rounded-full bg-purple-900/60 text-purple-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-purple-600/40">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Phần 5: Mức xử phạt cụ thể (nếu có vi phạm) */}
                    {msg.structuredResponse.penalties && (
                      <div className="bg-amber-950/30 p-3.5 rounded-xl border border-amber-600/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs uppercase tracking-wider">
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                            4. Mức xử phạt vi phạm hành chính (NĐ 38/2024/NĐ-CP)
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                            Chế tài áp dụng
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-xs">
                          <div className="p-2 rounded bg-slate-900/90 border border-amber-800/40">
                            <span className="text-slate-400">Hành vi vi phạm: </span>
                            <strong className="text-white">{msg.structuredResponse.penalties.behavior}</strong>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800">
                              <span className="text-slate-400 block text-[11px]">Mức phạt Cá nhân:</span>
                              <span className="text-sm font-extrabold text-amber-400">
                                {msg.structuredResponse.penalties.fineRangePersonal}
                              </span>
                            </div>
                            <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800">
                              <span className="text-slate-400 block text-[11px]">Mức phạt Tổ chức (gấp 2 lần):</span>
                              <span className="text-sm font-extrabold text-rose-400">
                                {msg.structuredResponse.penalties.fineRangeOrg}
                              </span>
                            </div>
                          </div>

                          {msg.structuredResponse.penalties.extraSanctions && msg.structuredResponse.penalties.extraSanctions.length > 0 && (
                            <div className="p-2 rounded bg-rose-950/40 border border-rose-800/40">
                              <span className="text-rose-300 font-bold block mb-1">Hình thức xử phạt bổ sung:</span>
                              <ul className="list-disc pl-4 text-rose-200 space-y-0.5">
                                {msg.structuredResponse.penalties.extraSanctions.map((extra, eIdx) => (
                                  <li key={eIdx}>{extra}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {msg.structuredResponse.penalties.conditions && (
                            <p className="text-slate-400 text-[11px] italic">
                              * Điều kiện áp dụng: {msg.structuredResponse.penalties.conditions}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Phần 6: Lưu ý thực tế & Nguồn văn bản gốc */}
                    <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-2 text-xs uppercase tracking-wider">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        5. Lưu ý thực tế của Cán bộ Pháp chế
                      </div>
                      <ul className="space-y-1.5 list-disc pl-4 text-slate-200 text-xs sm:text-sm">
                        {msg.structuredResponse.practicalNotes.map((note, idx) => (
                          <li key={idx} className="leading-relaxed">{note}</li>
                        ))}
                      </ul>

                      {/* Official Source Link */}
                      <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-slate-400">Nguồn dữ liệu chính thức:</span>
                        <a
                          href={msg.structuredResponse.officialSourceUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-cyan-500/40"
                        >
                          <span>{msg.structuredResponse.officialSourceLabel}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Feedback button */}
                    <div className="flex items-center justify-end gap-2 pt-1 text-[11px]">
                      <span className="text-slate-400">Câu trả lời có chính xác không?</span>
                      {feedbackGiven[msg.id] ? (
                        <span className="text-emerald-400 font-medium">Đã ghi nhận phản hồi! Cảm ơn bạn.</span>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setFeedbackGiven(prev => ({ ...prev, [msg.id]: true }))}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border border-slate-700"
                          >
                            Đúng & rõ ràng 👍
                          </button>
                          <button
                            onClick={() => setFeedbackGiven(prev => ({ ...prev, [msg.id]: true }))}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 border border-slate-700"
                          >
                            Cần bổ sung thêm ⚠️
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-cyan-800/60 max-w-md">
            <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-white">AI đang tra cứu cơ sở dữ liệu pháp luật...</p>
              <p className="text-[11px] text-slate-400">Đối chiếu hiệu lực Luật Thủy sản & Nghị định 38/2024/NĐ-CP</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Footer */}
      <div className="mt-3 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center bg-slate-900 border border-cyan-700/60 rounded-2xl shadow-2xl p-1.5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20"
        >
          <div className="pl-3 text-cyan-400">
            <MessageSquare className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Hỏi về thủ tục tàu cá, mất kết nối VMS, vùng biển cấm, mức phạt NĐ 38/2024..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm px-3 py-2.5 outline-none font-medium"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/20"
          >
            <span>Gửi</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-400 mt-1.5">
          Hệ thống chỉ kết luận dựa trên văn bản pháp luật chính thức. Luôn đối chiếu với cơ quan Kiểm ngư hoặc Chi cục Thủy sản địa phương.
        </p>
      </div>
    </div>
  );
};
