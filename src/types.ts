export interface ConceptItem {
  id: string;
  title: string;
  category: "demand" | "supply" | "equilibrium";
  summary: string;
  definition: string;
  details: string[];
  keyPoints: string[];
}

export interface MCQQuestion {
  id: string;
  year: string;
  questionNo: string;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface ShiftingChallenge {
  id: string;
  scenario: string;
  market: string;
  initialEquilibrium: { p: number; q: number };
  correctDemandShift: "increase" | "decrease" | "constant";
  correctSupplyShift: "increase" | "decrease" | "constant";
  explanation: string;
  successMessage: string;
  dseReference: string;
}

export interface ShortAnswerQuestion {
  id: string;
  scenarioText?: string;
  questionText: string;
  maxMarks: number;
  modelAnswerKeywords: string[];
  dseReference: string;
  initialValue?: string;
}

export interface AIReviewResult {
  score: number;
  maxMarks: number;
  comments: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string;
}
