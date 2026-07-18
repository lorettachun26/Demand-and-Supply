import { useState } from "react";
import {
  mcqQuestions,
  shiftingChallenges,
  shortAnswerQuestions
} from "../data/economicsContent";
import InteractiveGraph from "./InteractiveGraph";
import { AIReviewResult, MCQQuestion, ShiftingChallenge, ShortAnswerQuestion } from "../types";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Send,
  Loader2,
  Check,
  Flame,
  User,
  Star,
  Book
} from "lucide-react";

export default function DsePractices() {
  const [activeSubTab, setActiveSubTab] = useState<"shifting" | "mcq" | "ai_grader">("shifting");

  // --- Shifting Challenge States ---
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [userDShift, setUserDShift] = useState<"constant" | "increase" | "decrease">("constant");
  const [userSShift, setUserSShift] = useState<"constant" | "increase" | "decrease">("constant");
  const [challengeChecked, setChallengeChecked] = useState(false);
  const [challengeCorrect, setChallengeCorrect] = useState(false);

  const activeChallenge = shiftingChallenges[challengeIdx];

  const handleVerifyShift = () => {
    const isCorrectD = userDShift === activeChallenge.correctDemandShift;
    const isCorrectS = userSShift === activeChallenge.correctSupplyShift;

    setChallengeCorrect(isCorrectD && isCorrectS);
    setChallengeChecked(true);
  };

  const handleNextChallenge = () => {
    setChallengeIdx((prev) => (prev + 1) % shiftingChallenges.length);
    setUserDShift("constant");
    setUserSShift("constant");
    setChallengeChecked(false);
  };

  // --- MCQ Quiz States ---
  const [mcqIdx, setMcqIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [mcqSubmitted, setMcqSubmitted] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const activeMcq = mcqQuestions[mcqIdx];

  const handleSelectOption = (opt: "A" | "B" | "C" | "D") => {
    if (mcqSubmitted[activeMcq.id]) return;
    setSelectedOption(opt);
  };

  const handleSubmitMcq = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === activeMcq.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setMcqAnswers((prev) => ({ ...prev, [activeMcq.id]: selectedOption }));
    setMcqSubmitted((prev) => ({ ...prev, [activeMcq.id]: true }));
  };

  const handleNextMcq = () => {
    setSelectedOption(null);
    if (mcqIdx < mcqQuestions.length - 1) {
      setMcqIdx((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setMcqIdx(0);
    setSelectedOption(null);
    setMcqAnswers({});
    setMcqSubmitted({});
    setScore(0);
    setQuizCompleted(false);
  };

  // --- AI Grader States ---
  const [saIdx, setSaIdx] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState(shortAnswerQuestions[0].initialValue || "");
  const [isGrading, setIsGrading] = useState(false);
  const [gradingError, setGradingError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AIReviewResult | null>(null);

  const activeSa = shortAnswerQuestions[saIdx];

  const handleSelectSaQuestion = (idx: number) => {
    setSaIdx(idx);
    setStudentAnswer(shortAnswerQuestions[idx].initialValue || "");
    setAiResult(null);
    setGradingError(null);
  };

  const handleCallAiExaminer = async () => {
    setIsGrading(true);
    setGradingError(null);
    setAiResult(null);

    try {
      const response = await fetch("/api/grade-short-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: activeSa.id,
          studentAnswer: studentAnswer,
          dseReference: activeSa.dseReference,
          questionText: activeSa.questionText,
          maxMarks: activeSa.maxMarks,
          modelAnswerKeywords: activeSa.modelAnswerKeywords
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to grade answer.");
      }

      setAiResult(data);
    } catch (err: any) {
      setGradingError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGrading(false);
    }
  };

  // Convert shift text to offsets
  const getGraphOffsets = (dShift: string, sShift: string) => {
    const dOffset = dShift === "increase" ? 20 : dShift === "decrease" ? -20 : 0;
    const sOffset = sShift === "increase" ? 20 : sShift === "decrease" ? -20 : 0;
    return { dOffset, sOffset };
  };

  const challengeOffsets = getGraphOffsets(userDShift, userSShift);

  return (
    <div className="space-y-6">
      {/* Sub-tabs for practicing */}
      <div className="flex border-b border-gray-100 bg-gray-50/50 p-1 rounded-2xl max-w-xl">
        <button
          onClick={() => setActiveSubTab("shifting")}
          className={`flex-1 py-2.5 text-xs font-display font-extrabold rounded-xl transition-all duration-200 ${
            activeSubTab === "shifting"
              ? "bg-white text-blue-700 shadow-sm border border-gray-100"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          1. Graphical Challenge
        </button>
        <button
          onClick={() => setActiveSubTab("mcq")}
          className={`flex-1 py-2.5 text-xs font-display font-extrabold rounded-xl transition-all duration-200 ${
            activeSubTab === "mcq"
              ? "bg-white text-blue-700 shadow-sm border border-gray-100"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          2. Multiple Choice
        </button>
        <button
          onClick={() => setActiveSubTab("ai_grader")}
          className={`flex-1 py-2.5 text-xs font-display font-extrabold rounded-xl transition-all duration-200 ${
            activeSubTab === "ai_grader"
              ? "bg-white text-blue-700 shadow-sm border border-gray-100"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          3. AI Structured Marker
        </button>
      </div>

      {/* SUBTAB 1: GRAPHICAL CHALLENGE */}
      {activeSubTab === "shifting" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-bold border border-blue-100">
                  {activeChallenge.dseReference}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  Challenge {challengeIdx + 1} of {shiftingChallenges.length}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-gray-900 leading-snug">
                  {activeChallenge.scenario}
                </h4>
                <p className="text-xs text-gray-500">
                  Target Market: <strong className="text-gray-700">{activeChallenge.market}</strong>
                </p>
              </div>

              {/* User Selection Controls */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="text-xs font-display font-bold text-gray-500 block mb-2">
                    Shift Demand Curve to:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["decrease", "constant", "increase"] as const).map((shift) => (
                      <button
                        key={shift}
                        disabled={challengeChecked}
                        onClick={() => setUserDShift(shift)}
                        className={`py-2 text-xs font-display font-semibold rounded-xl border capitalize transition-all duration-200 ${
                          userDShift === shift
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {shift}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-display font-bold text-gray-500 block mb-2">
                    Shift Supply Curve to:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["decrease", "constant", "increase"] as const).map((shift) => (
                      <button
                        key={shift}
                        disabled={challengeChecked}
                        onClick={() => setUserSShift(shift)}
                        className={`py-2 text-xs font-display font-semibold rounded-xl border capitalize transition-all duration-200 ${
                          userSShift === shift
                            ? "bg-red-600 text-white border-red-600 shadow-xs"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {shift}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex gap-3">
                {!challengeChecked ? (
                  <button
                    onClick={handleVerifyShift}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-sm font-display font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Verify Shift Combination
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-2xl text-sm font-display font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Next Challenge
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Answer Feedback Banner */}
            {challengeChecked && (
              <div
                className={`p-5 rounded-3xl border animate-fadeIn space-y-3 ${
                  challengeCorrect
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
              >
                <div className="flex items-center gap-2 font-display font-bold text-sm">
                  {challengeCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Correct Answer!
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      Incorrect Configuration. Try again!
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-gray-700">
                  {challengeCorrect ? activeChallenge.successMessage : "Review the market details and try shifting again."}
                </p>
                <div className="text-xs border-t border-gray-200/50 pt-2.5 text-gray-600">
                  <span className="font-bold text-gray-800">DSE Rationale:</span> {activeChallenge.explanation}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col items-center">
            <InteractiveGraph
              demandShift={challengeOffsets.dOffset}
              supplyShift={challengeOffsets.sOffset}
              labelD2="Your D"
              labelS2="Your S"
            />
          </div>
        </div>
      )}

      {/* SUBTAB 2: MULTIPLE CHOICE QUESTIONS */}
      {activeSubTab === "mcq" && (
        <div className="max-w-3xl mx-auto">
          {!quizCompleted ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-mono font-bold text-gray-500">
                    HKDSE {activeMcq.year} Paper 1 Q{activeMcq.questionNo}
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  Question {mcqIdx + 1} of {mcqQuestions.length}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-base font-display font-bold text-gray-900 whitespace-pre-line leading-relaxed">
                {activeMcq.text}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {Object.entries(activeMcq.options).map(([key, text]) => {
                  const opt = key as "A" | "B" | "C" | "D";
                  const isSelected = selectedOption === opt;
                  const isSubmitted = mcqSubmitted[activeMcq.id];
                  const isAnswer = activeMcq.answer === opt;
                  const userAns = mcqAnswers[activeMcq.id];

                  let btnStyle = "border-gray-200 hover:bg-gray-50 text-gray-700 bg-white";
                  if (isSelected && !isSubmitted) {
                    btnStyle = "bg-blue-50 border-blue-400 text-blue-900";
                  } else if (isSubmitted) {
                    if (isAnswer) {
                      btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold";
                    } else if (userAns === opt) {
                      btnStyle = "bg-rose-50 border-rose-300 text-rose-900 line-through";
                    } else {
                      btnStyle = "opacity-50 border-gray-200 text-gray-400 bg-white";
                    }
                  }

                  return (
                    <button
                      key={key}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm font-sans transition-all duration-200 flex items-start gap-3.5 ${btnStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 ${
                        isSelected && !isSubmitted
                          ? "bg-blue-600 text-white border-blue-600"
                          : isSubmitted && isAnswer
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : isSubmitted && userAns === opt
                          ? "bg-rose-600 text-white border-rose-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {key}
                      </span>
                      <span className="leading-relaxed mt-0.5">{text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Submit / Next Button */}
              <div className="pt-4 flex justify-end">
                {!mcqSubmitted[activeMcq.id] ? (
                  <button
                    disabled={!selectedOption}
                    onClick={handleSubmitMcq}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-display font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextMcq}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-2xl font-display font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5"
                  >
                    {mcqIdx === mcqQuestions.length - 1 ? "Finish Exam" : "Next Question"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Post-submission feedback */}
              {mcqSubmitted[activeMcq.id] && (
                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/60 animate-fadeIn space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-blue-800 font-display font-bold uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    HKDSE Official Explanation:
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {activeMcq.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* MCQ Quiz Complete Screen */
            <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-xs space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-xl text-gray-900">
                  Multiple Choice Practice Completed!
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  You scored <strong className="text-gray-900">{score}</strong> out of{" "}
                  <strong>{mcqQuestions.length}</strong> questions correctly. Let's see how that compares to DSE boundaries.
                </p>
              </div>

              <div className="max-w-xs mx-auto p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <span className="text-xs font-semibold text-gray-400 block uppercase">DSE Predicted Level</span>
                <span className="text-2xl font-display font-extrabold text-blue-600">
                  {score === mcqQuestions.length
                    ? "Level 5**"
                    : score >= 6
                    ? "Level 5"
                    : score >= 4
                    ? "Level 4"
                    : "Level 3"}
                </span>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-display font-bold transition-all duration-200 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: AI STRUCTURED MARKER */}
      {activeSubTab === "ai_grader" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Question List Left Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-display font-bold text-gray-400 uppercase tracking-wider block px-1">
              Select DSE Exam Question
            </span>
            <div className="space-y-2">
              {shortAnswerQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectSaQuestion(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 space-y-1.5 ${
                    saIdx === idx
                      ? "bg-blue-50/50 border-blue-200 shadow-xs"
                      : "bg-white border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-blue-600">
                      {q.dseReference}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {q.maxMarks} Marks
                    </span>
                  </div>
                  <p className="text-xs font-display font-bold text-gray-800 line-clamp-2">
                    {q.questionText}
                  </p>
                </button>
              ))}
            </div>

            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/50 space-y-2 text-xs text-amber-800 leading-relaxed">
              <div className="flex items-center gap-1.5 font-display font-bold text-amber-900">
                <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
                Examiner Guidelines
              </div>
              <p>
                DSE Paper 2 evaluates your analytical precision. Ensure you identify whether goods are 
                substitutes or complements, mention the direction of demand/supply shifts, and explicitly state 
                the resulting changes in price and quantity.
              </p>
            </div>
          </div>

          {/* Answer Area Right Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
              {/* Question Context */}
              <div className="space-y-3 bg-gray-50/60 p-4 rounded-2xl border border-gray-100 text-xs">
                {activeSa.scenarioText && (
                  <p className="text-gray-600">
                    <strong className="text-gray-800 font-display">Scenario:</strong> {activeSa.scenarioText}
                  </p>
                )}
                <p className="text-sm font-display font-bold text-gray-900 leading-relaxed">
                  <strong className="text-blue-600 font-mono text-xs">{activeSa.dseReference}:</strong>{" "}
                  {activeSa.questionText}
                </p>
              </div>

              {/* Student Text Input */}
              <div className="space-y-2">
                <label className="text-xs font-display font-bold text-gray-500 flex justify-between items-center">
                  <span>Write Your Explanation Answer</span>
                  <span className="text-gray-400">Total Marks: {activeSa.maxMarks}</span>
                </label>
                <textarea
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Structure your economic logic chain clearly here..."
                  rows={6}
                  className="w-full rounded-2xl border border-gray-200 p-4 text-sm font-sans focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Call to action */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setStudentAnswer("")}
                  className="text-xs font-display font-bold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Clear Answer
                </button>

                <button
                  disabled={isGrading || studentAnswer.trim().length === 0}
                  onClick={handleCallAiExaminer}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-display font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                >
                  {isGrading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      AI Grading in Progress...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit to AI Examiner
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ERROR DISPLAY */}
            {gradingError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{gradingError}</span>
              </div>
            )}

            {/* AI MARKING RESULTS DISPLAY */}
            {aiResult && (
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6 animate-fadeIn">
                {/* Result Header - score */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                      AI Marking Slip Approved
                    </span>
                    <h4 className="font-display font-extrabold text-lg text-gray-900">
                      Examiner's Grading Report
                    </h4>
                  </div>

                  {/* Marks Circular Progress */}
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <div className="text-center">
                      <p className="text-[9px] font-display font-bold text-gray-400 uppercase tracking-wider">Score</p>
                      <span className="text-xl font-display font-extrabold text-gray-900">{aiResult.score}</span>
                      <span className="text-xs text-gray-400"> / {aiResult.maxMarks}</span>
                    </div>
                  </div>
                </div>

                {/* Core Commentary */}
                <div className="space-y-2">
                  <span className="text-xs font-display font-bold text-gray-400 uppercase tracking-wider block">
                    Examiner's Comments
                  </span>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50 text-xs text-gray-700 leading-relaxed font-sans italic">
                    "{aiResult.comments}"
                  </div>
                </div>

                {/* Keyword Match Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-display font-bold text-emerald-600 uppercase tracking-wider block">
                      ✔ Keywords Integrated
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {aiResult.matchedKeywords.length > 0 ? (
                        aiResult.matchedKeywords.map((word) => (
                          <span
                            key={word}
                            className="bg-emerald-50 text-emerald-700 text-[10px] font-mono font-semibold px-2 py-1 rounded-md border border-emerald-100/60"
                          >
                            {word}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">None detected.</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-display font-bold text-rose-500 uppercase tracking-wider block">
                      ✘ Missing Core Concepts
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {aiResult.missingKeywords.length > 0 ? (
                        aiResult.missingKeywords.map((word) => (
                          <span
                            key={word}
                            className="bg-rose-50 text-rose-700 text-[10px] font-mono font-semibold px-2 py-1 rounded-md border border-rose-100/60"
                          >
                            {word}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          Perfect! Full marks syllabus covered.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actionable Suggestions */}
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <span className="text-xs font-display font-bold text-blue-600 uppercase tracking-wider block">
                    Level 5** Actionable DSE Advice
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-sans">
                    {aiResult.suggestions}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
