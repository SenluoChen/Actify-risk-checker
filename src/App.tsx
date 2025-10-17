import React, { useMemo, useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Stethoscope,
  CreditCard,
  Landmark,
  Shield,
  Globe,
  Scale,
  ArrowLeft,
  ArrowRight,
  CircleSlash,
  Brain,
  Building2,
  Earth,
  FileText,
  Settings,
  UserCheck,
  Download,
  Save
} from "lucide-react";
import Intro from "./components/Intro";
import "./styles/theme.css";

type RiskLevel = "Minimal" | "Limited" | "High" | "Unacceptable";
export type Role = 'provider'|'deployer'|'importer'|'distributor'|'manufacturer'|'other';

type Question = {
  id: string;
  title: string;
  example?: React.ReactNode;
  options: { label: React.ReactNode; value: string }[];
  multi?: boolean;
};

// Icon + 文字水平置中的小工具
const Inline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>{children}</span>
);

/** —— 精簡且專業的問卷（已依你的要求更新） —— */
const QUESTIONS: Question[] = [
  // Q1 — 新增：Role question
  {
    id: "role",
    title: "What is your main activity with AI systems?",
    options: [
      {
        label: (
          <Inline>
            <Brain size={18} />
            We create or develop AI systems.
          </Inline>
        ),
        value: "provider"
      },
      {
        label: (
          <Inline>
            <Building2 size={18} />
            We use AI systems in our work.
          </Inline>
        ),
        value: "deployer"
      },
      {
        label: (
          <Inline>
            <Earth size={18} />
            We bring AI systems into the EU.
          </Inline>
        ),
        value: "importer"
      },
      {
        label: (
          <Inline>
            <FileText size={18} />
            We sell or distribute AI systems.
          </Inline>
        ),
        value: "distributor"
      },
      {
        label: (
          <Inline>
            <Settings size={18} />
            We build products that include AI.
          </Inline>
        ),
        value: "manufacturer"
      },
      {
        label: (
          <Inline>
            <UserCheck size={18} />
            We study or advise on AI.
          </Inline>
        ),
        value: "other"
      }
    ]
  },

  // Q2 — 保留且置頂：Regulated domains（原樣不改）
  {
    id: "opportunity",
    title: "Which regulated domains does your AI impact?",
    example: <div style={{ marginBottom: "20px" }}></div>,
    multi: true,
    options: [
      {
        label: (
          <div style={{ display: "grid", justifyItems: "start" }}>
            <Inline>
              <GraduationCap size={18} />
              Education / exams
            </Inline>
            <span
              style={{ fontSize: "13px", color: "var(--muted)", marginTop: 2, marginLeft: 29 }}
            >
              (admissions, grading, proctoring)
            </span>
          </div>
        ),
        value: "edu"
      },
      {
        label: (
          <div style={{ display: "grid", justifyItems: "start" }}>
            <Inline>
              <Briefcase size={18} />
              Employment & HR
            </Inline>
            <span
              style={{ fontSize: "13px", color: "var(--muted)", marginTop: 2, marginLeft: 29 }}
            >
              (screening, promotion, dismissal)
            </span>
          </div>
        ),
        value: "job"
      },
      {
        label: (
          <div style={{ display: "grid", justifyItems: "start" }}>
            <Inline>
              <Stethoscope size={18} />
              Medical diagnosis / treatment
            </Inline>
            <span
              style={{ fontSize: "13px", color: "var(--muted)", marginTop: 2, marginLeft: 29 }}
            >
              (triage, diagnosis, treatment)
            </span>
          </div>
        ),
        value: "health"
      },
      {
        label: (
          <div style={{ display: "grid", justifyItems: "start" }}>
            <Inline>
              <CreditCard size={18} />
              Credit & financial services
            </Inline>
            <span
              style={{ fontSize: "13px", color: "var(--muted)", marginTop: 2, marginLeft: 29 }}
            >
              (credit scoring, loans, fraud)
            </span>
          </div>
        ),
        value: "finance"
      },
      {
        label: (
          <div style={{ display: "grid", justifyItems: "start" }}>
            <Inline>
              <Landmark size={18} />
              Social benefits / eligibility
            </Inline>
            <span
              style={{ fontSize: "13px", color: "var(--muted)", marginTop: 2, marginLeft: 29 }}
            >
              (eligibility, prioritisation)
            </span>
          </div>
        ),
        value: "welfare"
      },
      {
        label: (
          <div style={{ display: "grid", justifyItems: "start" }}>
            <Inline>
              <Shield size={18} />
              Law enforcement
            </Inline>
            <span
              style={{ fontSize: "13px", color: "var(--muted)", marginTop: 2, marginLeft: 29 }}
            >
              (risk assessment, predictive policing)
            </span>
          </div>
        ),
        value: "law"
      },
      {
        label: (
          <div style={{ display: "grid", justifyItems: "start" }}>
            <Inline>
              <Globe size={18} />
              Immigration / borders
            </Inline>
            <span
              style={{ fontSize: "13px", color: "var(--muted)", marginTop: 2, marginLeft: 29 }}
            >
              (visa, checks)
            </span>
          </div>
        ),
        value: "border"
      },
      {
        label: (
          <div style={{ display: "grid", justifyItems: "start" }}>
            <Inline>
              <Scale size={18} />
              Courts / legal decisions
            </Inline>
            <span
              style={{ fontSize: "13px", color: "var(--muted)", marginTop: 2, marginLeft: 29 }}
            >
              (case analysis, decisions)
            </span>
          </div>
        ),
        value: "justice"
      },
      {
  label: (
    <div style={{ display: "grid", justifyItems: "start" }}>
      <Inline>
        <CircleSlash size={18} />
        None of the above
      </Inline>
    </div>
  ),
  value: "none"
}
      
    ]
  },

  // Q2 — Biometric data (Yes/No)
  {
    id: "biometric_data",
    title: "Does your AI use biometric data to identify or classify people?",
    example: (
      <div className="muted">Exemple : face, fingerprint, voice, iris, DNA</div>
    ),
    options: [
      { label: "Yes", value: "yes_biometric_data" },
      { label: "No", value: "no_biometric_data" }
    ]
  },

  // Q3 — Real-time face recognition in public (Yes/No)
  {
    id: "public_realtime_face",
    title: "Does it run real-time face recognition in public places?",
    example: (
      <div className="muted">Exemple : airports, train stations, streets, malls</div>
    ),
    options: [
      { label: "Yes", value: "yes_public_realtime_face" },
      { label: "No", value: "no_public_realtime_face" }
    ]
  },

  // Q4 — Sensitive traits classification (Yes/No)
  {
    id: "sensitive_traits",
    title: "Does it classify people by sensitive traits?",
    example: (
      <div className="muted">Exemple : race, religion, sexual orientation, politics</div>
    ),
    options: [
      { label: "Yes", value: "yes_sensitive_traits" },
      { label: "No", value: "no_sensitive_traits" }
    ]
  },

  // Q5 — Scoring that impacts rights (Yes/No)
  {
    id: "rights_scoring",
    title: "Does it give people a score that impacts their rights?",
    example: (
      <div className="muted">
        Exemple : social credit, trust score, access to loans/jobs/services
      </div>
    ),
    options: [
      { label: "Yes", value: "yes_rights_scoring" },
      { label: "No", value: "no_rights_scoring" }
    ]
  },

  // Q6 — Influence without awareness (Yes/No)
  {
    id: "hidden_influence",
    title: "Does it influence behaviour without awareness?",
    example: (
      <div className="muted">
        Exemple : hidden persuasion, nudging children, psychological manipulation
      </div>
    ),
    options: [
      { label: "Yes", value: "yes_hidden_influence" },
      { label: "No", value: "no_hidden_influence" }
    ]
  },

  // Q7 — Large facial database (Yes/No)
  {
    id: "large_face_db",
    title: "Does it build or use a large facial image database?",
    example: (
      <div className="muted">Exemple : web scraping, CCTV, social media images</div>
    ),
    options: [
      { label: "Yes", value: "yes_large_face_db" },
      { label: "No", value: "no_large_face_db" }
    ]
  },

  // Q8 — Safety component (Yes/No)
  {
    id: "safety_component",
    title: "Is it a safety component of a regulated product?",
    example: (
      <div className="muted">Exemple : self-driving, medical devices, aviation, robots</div>
    ),
    options: [
      { label: "Yes", value: "yes_safety" },
      { label: "No", value: "no_safety" }
    ]
  },

  // Q9 — Interacts directly with users (Yes/No)
  {
    id: "user_interaction",
    title: "Does it interact directly with users?",
    example: (
      <div className="muted">Exemple : chatbots, voice assistants, AI interviewers</div>
    ),
    options: [
      { label: "Yes", value: "yes_user_interaction" },
      { label: "No", value: "no_user_interaction" }
    ]
  },

  // Q10 — Generates or modifies content (Yes/No)
  {
    id: "gen_or_modify_content",
    title: "Does it generate or modify content?",
    example: (
      <div className="muted">Exemple : text, images, video, audio, deepfakes</div>
    ),
    options: [
      { label: "Yes", value: "yes_gen_or_modify_content" },
      { label: "No", value: "no_gen_or_modify_content" }
    ]
  }
];

/** —— Risk mapping by role —— */
export type RiskTier = 'minimal'|'low'|'medium'|'high';

export function riskFromRole(role?: Role): RiskTier {
  switch (role) {
    case 'provider':
    case 'importer':
    case 'manufacturer': return 'high';
    case 'deployer':     return 'medium';
    case 'distributor':  return 'low';
    default:             return 'minimal';
  }
}

/** —— 分類邏輯（依更新後問卷）——
 * 優先順序：Unacceptable > High > Limited > Minimal
 */
function classify(a: Record<string, string | string[] | Role>): RiskLevel {
  // Unacceptable risk（任何一項命中即為不可接受）
  if (
    a.public_realtime_face === "yes_public_realtime_face" ||
    a.sensitive_traits === "yes_sensitive_traits" ||
    a.rights_scoring === "yes_rights_scoring" ||
    a.hidden_influence === "yes_hidden_influence" ||
    a.large_face_db === "yes_large_face_db"
  ) {
    return "Unacceptable";
  }

  // High risk（Annex III 領域、一般生物辨識、或安全組件）
  let domainRisk: RiskLevel = "Minimal";
  if (Array.isArray(a.opportunity)) {
    const high = ["edu", "job", "health", "finance", "welfare", "law", "border", "justice"];
    if ((a.opportunity as string[]).some((v) => high.includes(v))) domainRisk = "High";
  }
  if (a.biometric_data === "yes_biometric_data") domainRisk = "High";
  if (a.safety_component === "yes_safety") domainRisk = "High";

  // Limited risk（互動或內容生成/修改 → 透明義務）
  if (domainRisk === "Minimal") {
    if (a.user_interaction === "yes_user_interaction") domainRisk = "Limited";
    if (a.gen_or_modify_content === "yes_gen_or_modify_content") domainRisk = "Limited";
  }

  // Get role-based risk and take the higher of the two
  const roleRisk = riskFromRole(a.role as Role);
  const roleToRiskLevel: Record<RiskTier, RiskLevel> = {
    'minimal': 'Minimal',
    'low': 'Minimal',
    'medium': 'Limited',
    'high': 'High'
  };
  
  const roleBasedRiskLevel = roleToRiskLevel[roleRisk];
  
  // Return the higher risk level
  const riskHierarchy: Record<RiskLevel, number> = {
    'Minimal': 0,
    'Limited': 1,
    'High': 2,
    'Unacceptable': 3
  };
  
  return riskHierarchy[domainRisk] >= riskHierarchy[roleBasedRiskLevel] ? domainRisk : roleBasedRiskLevel;
}

/** —— UI: 進度條 —— */
const Progress: React.FC<{ step: number; total: number }> = ({ step, total }) => {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div style={{ marginBottom: "24px" }}>
      <div className="progress-label">
        Step {step + 1} of {total}
      </div>
      <div className="progress" aria-label="Progress">
        <div className="progress__bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

/** —— UI: 選項按鈕 —— */
const OptionButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }
> = ({ selected, children, ...props }) => (
  <button className={`option ${selected ? "option--selected" : ""}`} type="button" {...props}>
    {children}
  </button>
);

/** —— 結果卡（精簡專業版） —— */
const ResultCard: React.FC<{ result: RiskLevel; reasons: string[]; onReset: () => void }> = ({
  result,
  reasons,
  onReset
}) => {
  const riskText = {
    Minimal: "Minimal risk",
    Limited: "Limited risk",
    High: "High risk",
    Unacceptable: "Unacceptable risk"
  }[result];

  // 膠囊右邊顯示的內容 (原本 Meaning)
  const meaning = {
    Minimal: "No obligations under AI Act",
    Limited: "Transparency obligation (Art. 52)",
    High: "High-risk system (Annex III)",
    Unacceptable: "Prohibited (Art. 5)"
  }[result];

  // 下方顯示的必要義務
  const obligationsByLevel: Record<RiskLevel, string[]> = {
    Unacceptable: [
      "Stop immediately",
      "Not allowed on the EU market"
    ],
    High: [
      "Risk management system",
      "Annex IV technical documentation",
      "Human oversight",
      "Register in EU database"
    ],
    Limited: [
      "Inform users they are interacting with AI",
      "Label AI-generated or modified content"
    ],
    Minimal: ["No actions required"]
  };
  const obligations = obligationsByLevel[result];

  return (
    <>
      <h2 className="subtitle" style={{ marginBottom: 18 }}>Your AI risk classification</h2>

      {/* Capsule + meaning */}
      <div className="risk-desc" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
        <span className={`risk-capsule ${result.toLowerCase()}`}>{riskText}</span>
        <span className="muted" style={{ fontSize: 16, marginLeft: 8 }}>
          {meaning}
        </span>
      </div>

      {/* Obligations list */}
      {result !== "Minimal" && (
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, color: "var(--text)" }}>
            Obligations:
          </div>
          <ul className="muted" style={{ marginLeft: 16, marginTop: 0, lineHeight: 1.6 }}>
            {obligations.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="result-actions">
        <button
          type="button"
          className="btn"
          onClick={onReset}
        >
          <ArrowLeft size={18} /> Restart
        </button>
      </div>
    </>
  );
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | Role>>({});
  const [finished, setFinished] = useState(false);

  const total = QUESTIONS.length;
  const current = QUESTIONS[step];

  // 結果原因（專業但簡潔）
  const reasons: string[] = useMemo(() => {
    const out: string[] = [];

    // Role-based risk
    if (answers.role) {
      const roleRisk = riskFromRole(answers.role as Role);
      if (roleRisk === 'high') {
        const roleLabels = {
          'provider': 'AI system provider',
          'importer': 'AI system importer',
          'manufacturer': 'Product manufacturer with AI'
        };
        out.push(`Role: ${roleLabels[answers.role as keyof typeof roleLabels] || answers.role}`);
      } else if (roleRisk === 'medium') {
        out.push('Role: AI system deployer');
      }
    }

    // Annex III
    const picked = Array.isArray(answers.opportunity) ? (answers.opportunity as string[]) : [];
    if (picked.length && !(picked.length === 1 && picked[0] === "none")) {
      out.push("Regulated domain: " + picked.join(", "));
    }

    // Unacceptable
    if (answers.public_realtime_face === "yes_public_realtime_face") out.push("Public real-time face recognition");
    if (answers.sensitive_traits === "yes_sensitive_traits") out.push("Sensitive-trait classification");
    if (answers.rights_scoring === "yes_rights_scoring") out.push("Rights-impact scoring");
    if (answers.hidden_influence === "yes_hidden_influence") out.push("Hidden behavioural influence");
    if (answers.large_face_db === "yes_large_face_db") out.push("Large facial image database");

    // High (other)
    if (answers.biometric_data === "yes_biometric_data") out.push("Biometric identification/categorisation");
    if (answers.safety_component === "yes_safety") out.push("Safety component");

    // Limited (only if沒有更高級別原因)
    const hasHigher =
      out.some((r) =>
        [
          "Public real-time face recognition",
          "Sensitive-trait classification",
          "Rights-impact scoring",
          "Hidden behavioural influence",
          "Large facial image database",
          "Biometric identification/categorisation",
          "Safety component",
          "Regulated domain:",
          "Role:"
        ].some((k) => r.startsWith(k))
      );
    if (!hasHigher) {
      if (answers.user_interaction === "yes_user_interaction") out.push("User interaction → transparency");
      if (answers.gen_or_modify_content === "yes_gen_or_modify_content")
        out.push("Content generation/modification → transparency");
    }

    return out;
  }, [answers]);

  const result: RiskLevel | null = useMemo(() => {
    if (!finished) return null;
    return classify(answers);
  }, [finished, answers]);

  const goNext = () => {
    if (step === total - 1) setFinished(true);
    else setStep((s) => s + 1);
  };

  const goBack = () => {
    if (finished) {
      setFinished(false);
      return;
    }
    if (step > 0) setStep((s) => s - 1);
  };

  const onChoose = (q: Question, value: string) => {
    const next = { ...answers };
    if (q.multi) {
      const prev = (answers[q.id] as string[]) || [];
      next[q.id] = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      setAnswers(next);
      return; // 多選由 Next 前進
    } else {
      next[q.id] = value;
      setAnswers(next);
      goNext(); // 單選自動前進
    }
  };

  const nextFromMulti = () => goNext();

  const reset = () => {
    setStep(0);
    setAnswers({});
    setFinished(false);
    setStarted(false); // 回 Intro
  };

  return (
    <main className="page">
      <div className="container">
        {!started ? (
          <section id="intro" className="section">
            <Intro onStart={() => setStarted(true)} />
          </section>
        ) : (
          <>
            {/* Header */}
            <header className="header">
              <div className="header-left">
                <img 
                  src="/actpilot logo (Black)22.png" 
                  alt="ActPilot Logo" 
                  className="header-logo"
                />
                <h1 className="header-title">AI Risk Checker</h1>
              </div>
              <div className="header-actions">
                <button className="btn btn--ghost" onClick={() => {/* TODO: Export PDF */}}>
                  <Download size={18} />
                  Download as PDF
                </button>
                <button className="btn secondary" onClick={() => {/* TODO: Save Results */}}>
                  <Save size={18} />
                  Save Results
                </button>
              </div>
            </header>

            {/* Main content */}
            <section className="card">
              {!finished ? (
                <>
                  <Progress step={step} total={total} />

                  <h2 className="q-title">{current.title}</h2>
                  {current.example}

                  <div className="options">
                    {current.options.map((opt) => (
                      <OptionButton
                        key={String(opt.value)}
                        selected={
                          Array.isArray(answers[current.id])
                            ? (answers[current.id] as string[]).includes(opt.value)
                            : answers[current.id] === opt.value
                        }
                        onClick={() => onChoose(current, String(opt.value))}
                      >
                        {opt.label}
                      </OptionButton>
                    ))}
                  </div>

                  <div className="nav-row">
                    {step > 0 && (
                      <button type="button" className="nav-btn" onClick={goBack}>
                        <ArrowLeft size={18} /> Back
                      </button>
                    )}
                    {current.multi && (
                      <button
                        type="button"
                        className="nav-btn next-btn"
                        onClick={nextFromMulti}
                      >
                        Next <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <ResultCard result={result as RiskLevel} reasons={reasons} onReset={reset} />
              )}
            </section>
          </>
        )}

        <footer className="site-footer">
          <div className="footer-inner">
            <span>© {new Date().getFullYear()} — AI Act compliance Assistant</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
