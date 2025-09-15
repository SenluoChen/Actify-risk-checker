import React from "react";
import { ArrowRight } from "lucide-react";

type IntroProps = {
  onStart: () => void;
};

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="card">
      <h2 className="title">AI Risk Check</h2>
      <p className="muted" style={{ marginTop: 6 }}>
        Answer a few clear questions to estimate your AI’s risk category under the EU AI Act.
      </p>

      <div style={{ marginTop: 25, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          className="pill-btn start-btn"
          style={{ paddingBlock: 18, minHeight: 45, fontSize: 15, borderRadius: 20 }}
          onClick={onStart}
        >
          <span>Start free check</span>
          {/* 同 Back 的箭頭風格：同系列、同線條粗細 */}
          <ArrowRight size={22} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default Intro;
