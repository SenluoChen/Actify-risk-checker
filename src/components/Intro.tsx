import React from "react";
import { ArrowRight } from "lucide-react";

type IntroProps = {
  onStart: () => void;
};

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="card intro-container">
      <div className="intro-header">
        <img 
          src="/actpilot logo (Black)22.png" 
          alt="ActPilot Logo" 
          className="intro-logo"
        />
      </div>
      <h1 className="title intro-title">AI Risk Checker</h1>
      <p className="muted intro-description">
        Answer a few clear questions to estimate your AI's risk category under the EU AI Act.
      </p>

      <div className="intro-button-container">
        <button
          className="btn btn--primary"
          style={{ 
            padding: "12px 24px", 
            height: "48px",
            fontSize: "16px", 
            fontWeight: "600"
          }}
          onClick={onStart}
        >
          Start free check
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Intro;
