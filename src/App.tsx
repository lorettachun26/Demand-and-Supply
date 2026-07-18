import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  TrendingUp,
  Award,
  HelpCircle,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { economicsConcepts, hongKongCases } from "./data/economicsContent";
import EquilibriumPlayground from "./components/EquilibriumPlayground";
import DsePractices from "./components/DsePractices";

type TabType = "concepts" | "playground" | "cases" | "practices";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("concepts");
  const [selectedConceptId, setSelectedConceptId] = useState(economicsConcepts[0].id);

  const selectedConcept = economicsConcepts.find((c) => c.id === selectedConceptId) || economicsConcepts[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-gray-800">
      {/* Global Brand Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-display font-extrabold text-lg shadow-md shadow-blue-500/10">
              $
            </div>
            <div>
              <h1 className="font-display font-black text-sm tracking-tight text-gray-900 leading-none">
                HKDSE Economics
              </h1>
              <p className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider mt-1">
                Demand &amp; Supply Interactive Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              S4-S6 Curriculum Aligned
            </span>
            <a
              href="http://www.hkeaa.edu.hk"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200"
            >
              HKEAA Official
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Welcome banner */}
      <section className="bg-gradient-to-r from-gray-900 to-slate-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-blue-300 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/5">
            <Sparkles className="w-3.5 h-3.5 fill-blue-300/20" />
            Empowering Level 5** Outcomes
          </div>
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight text-white leading-tight">
              Master Demand, Supply &amp; Market Equilibrium
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Explore dynamic economic forces, single/double shifting models, and authentic Hong Kong case studies. 
              Assess your skills with live MCQs and our advanced server-side AI essay marker.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 scrollbar-none overflow-x-auto gap-8">
          <button
            onClick={() => setActiveTab("concepts")}
            className={`pb-4 text-sm font-display font-extrabold tracking-wide uppercase border-b-2 transition-all duration-200 shrink-0 flex items-center gap-2 ${
              activeTab === "concepts"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Core Concepts
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={`pb-4 text-sm font-display font-extrabold tracking-wide uppercase border-b-2 transition-all duration-200 shrink-0 flex items-center gap-2 ${
              activeTab === "playground"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Activity className="w-4 h-4" />
            Double Shifting Lab
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`pb-4 text-sm font-display font-extrabold tracking-wide uppercase border-b-2 transition-all duration-200 shrink-0 flex items-center gap-2 ${
              activeTab === "cases"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            Hong Kong Cases
          </button>
          <button
            onClick={() => setActiveTab("practices")}
            className={`pb-4 text-sm font-display font-extrabold tracking-wide uppercase border-b-2 transition-all duration-200 shrink-0 flex items-center gap-2 ${
              activeTab === "practices"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Award className="w-4 h-4" />
            Practice &amp; AI Marker
          </button>
        </div>

        {/* Tab Contents with Framer Motion AnimatePresence */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "concepts" && (
              <motion.div
                key="concepts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8"
              >
                {/* Concepts Sidebar */}
                <div className="md:col-span-4 space-y-2">
                  <span className="text-[10px] font-display font-bold text-gray-400 uppercase tracking-wider block px-1">
                    Select Curriculum Unit
                  </span>
                  <div className="space-y-1">
                    {economicsConcepts.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedConceptId(c.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                          selectedConceptId === c.id
                            ? "bg-white border-blue-200 text-blue-700 shadow-xs"
                            : "bg-white/40 border-gray-100 hover:bg-white/80 text-gray-700"
                        }`}
                      >
                        <div className="space-y-1">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${
                            c.category === "demand"
                              ? "text-blue-600"
                              : c.category === "supply"
                              ? "text-red-600"
                              : "text-purple-600"
                          }`}>
                            {c.category}
                          </span>
                          <span className="text-sm font-display font-bold block">{c.title}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                          selectedConceptId === c.id ? "translate-x-1" : "text-gray-300"
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Concept Main Detail view */}
                <div className="md:col-span-8 bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
                  {/* Category Title */}
                  <div className="space-y-2 border-b border-gray-100 pb-4">
                    <span className="text-[10px] font-mono bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                      Syllabus Section: {selectedConcept.category}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-gray-900 tracking-tight">
                      {selectedConcept.title}
                    </h3>
                    <p className="text-sm text-gray-500 italic font-sans leading-relaxed">
                      "{selectedConcept.summary}"
                    </p>
                  </div>

                  {/* Core Definition card */}
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 space-y-2">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-blue-600 fill-blue-600/20" />
                      Core Economic Definition
                    </h4>
                    <p className="text-sm font-display font-bold text-blue-900 leading-relaxed">
                      {selectedConcept.definition}
                    </p>
                  </div>

                  {/* Key points layout */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-display font-bold uppercase text-gray-400 tracking-wider">
                      Key Exam Takeaways (DSE Focus)
                    </h4>
                    <ul className="space-y-3 list-none pl-0">
                      {selectedConcept.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed font-sans">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples panel */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-display font-bold uppercase text-gray-400 tracking-wider">
                      Illustrative Real-world Scenarios
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedConcept.details.map((detail, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-gray-600 leading-relaxed font-sans space-y-1">
                          <strong className="text-gray-800 font-display font-bold block mb-1">
                            Case Illustration {idx + 1}
                          </strong>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "playground" && (
              <motion.div
                key="playground"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <EquilibriumPlayground />
              </motion.div>
            )}

            {activeTab === "cases" && (
              <motion.div
                key="cases"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {hongKongCases.map((cs) => (
                  <div key={cs.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-gray-500">
                          {cs.dseRef}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${cs.badgeColor}`}>
                          DSE {cs.year}
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-lg text-gray-900 tracking-tight">
                        {cs.title}
                      </h3>

                      <p className="text-xs text-gray-400 italic font-sans leading-relaxed">
                        "{cs.description}"
                      </p>

                      <div className="pt-2 border-t border-gray-100 text-xs text-gray-700 leading-relaxed font-sans">
                        {cs.explanation}
                      </div>
                    </div>

                    {/* Associated concepts list */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {cs.economicConcepts.map((item, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "practices" && (
              <motion.div
                key="practices"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <DsePractices />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 font-sans mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-medium text-gray-500">
            HKDSE Economics: Interactive Demand &amp; Supply Studio
          </p>
          <p>
            Jointly prepared for Secondary 4 - 6 Economics students to master ceteris paribus, single shifts, and simultaneous double shifts.
          </p>
          <p className="text-[10px] text-gray-300 font-mono">
            Designed under Curriculum Development Council &amp; HKEAA guidelines. Powered by server-side AI evaluation.
          </p>
        </div>
      </footer>
    </div>
  );
}
