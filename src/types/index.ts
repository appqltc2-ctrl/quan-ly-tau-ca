export type LawStatus = 'con_hieu_luc' | 'het_hieu_luc' | 'het_hieu_luc_mot_phan' | 'bi_thay_the';

export type LawDocType = 'Luật' | 'Nghị định' | 'Thông tư' | 'Nghị quyết' | 'Chỉ thị' | 'Quyết định' | 'Quy chuẩn kỹ thuật';

export interface LawArticle {
  id: string;
  articleNumber: string; // e.g. "Điều 20"
  title: string;
  content: string;
  keyPoints?: string[];
}

export interface LawDocument {
  id: string;
  code: string; // e.g. "38/2024/NĐ-CP"
  title: string;
  docType: LawDocType;
  issuingAgency: string; // e.g. "Chính phủ"
  issueDate: string; // "05/04/2024"
  effectiveDate: string; // "20/05/2024"
  status: LawStatus;
  statusLabel: string; // "Còn hiệu lực", "Hết hiệu lực", v.v.
  replacedBy?: string; // Số hiệu văn bản thay thế
  replacementNote?: string;
  summary: string;
  topics: string[];
  sourceUrl: string; // https://vbpl.vn/...
  articles: LawArticle[];
  isVerified: boolean;
}

export interface StructuredAIResponse {
  directAnswer: string;
  legalBasis: {
    docName: string;
    docCode: string;
    article: string;
    clausePoint?: string;
    effectiveStatus: string;
    updatedDate: string;
  }[];
  procedures?: string[];
  penalties?: {
    behavior: string;
    fineRangePersonal: string;
    fineRangeOrg: string;
    extraSanctions: string[];
    remedialMeasures?: string[];
    target: string;
    conditions: string;
  };
  practicalNotes: string[];
  officialSourceUrl: string;
  officialSourceLabel: string;
  warningNote?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  structuredResponse?: StructuredAIResponse;
  timestamp: string;
  category?: string;
  isLoading?: boolean;
}

export interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  score: number; // 0 to 100
  feedback: string;
}

export interface Scenario {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao';
  description: string;
  vesselContext: {
    vesselCode?: string;
    lengthMeters?: number;
    engineHp?: number;
    activityArea?: string;
    crewCount?: number;
    equipmentStatus?: string;
    coordinates?: string;
  };
  options: ScenarioOption[];
  modelAnswer: {
    coreIssue: string;
    legalBasis: string;
    procedure: string;
    penaltyOrCompliance: string;
    fullExplanation: string;
    practicalAdvice: string;
  };
  rubric: {
    issueScore: number;     // 20
    basisScore: number;     // 30
    actionScore: number;    // 30
    procedureScore: number; // 20
  };
}

export interface ScenarioSubmission {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  mode: 'choice' | 'freeform';
  selectedOptionId?: string;
  userFreeformText?: string;
  totalScore: number;
  scoreBreakdown: {
    issue: number;
    basis: number;
    action: number;
    procedure: number;
  };
  feedback: string;
  correctAnswerText: string;
  createdAt: string;
}

export interface PenaltyItem {
  id: string;
  behaviorGroup: string; // "VMS", "Vùng biển", "Giấy phép & Đăng ký", "Nhật ký khai thác", "Thuyền viên", "Ngư cụ & Mắt lưới"
  behavior: string;
  lawRef: string;
  article: string;
  finePersonalMin: number; // in VNĐ
  finePersonalMax: number;
  fineOrgMin: number;
  fineOrgMax: number;
  extraSanctions: string[];
  remedialMeasures: string[];
  targetGroup: string;
  contextConditions: string;
  severityLevel: 'Nhẹ' | 'Nghiêm trọng' | 'Đặc biệt nghiêm trọng (IUU)';
}

export interface ProcedureStep {
  stepNumber: number;
  stepTitle: string;
  detail: string;
  responsibleAgency: string;
  duration: string;
}

export interface ProcedureItem {
  id: string;
  title: string;
  category: string;
  targetGroup: string;
  competentAuthority: string;
  totalTime: string;
  fee: string;
  legalBasis: string;
  requiredDocuments: string[];
  steps: ProcedureStep[];
  importantNotes: string[];
  formTemplateName?: string;
}

export interface AuditLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'VERIFY' | 'STATUS_CHANGE' | 'AI_CORRECTION';
  targetType: 'DOCUMENT' | 'SCENARIO' | 'PENALTY' | 'AI_PROMPT';
  targetTitle: string;
  performedBy: string;
  userRole: 'Cán bộ kiểm ngư' | 'Thanh tra thủy sản' | 'Quản trị viên';
  timestamp: string;
  details: string;
}

export type AppUserRole = 'ngu_dan' | 'can_bo' | 'admin';
