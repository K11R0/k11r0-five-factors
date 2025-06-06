import React, { useState } from 'react';

// K11R0's Five Factors Game Rating App
// Built with React and Tailwind CSS
// This component provides a UI for rating a game using the 5 K11R0 Factors.

export default function GameRatingApp() {
  // Define initial sub-criteria state for each factor
  const initialH = {
    resonance: 0,
    narrative: 0,
    nostalgia: 0,
    range: 0
  };
  const initialB = {
    stability: 0,
    mechanics: 0,
    designFlow: 0,
    coreMode: 0,
    artAudio: 0,
    innovation: 0
  };
  const initialBo = {
    engagement: 0,
    accessibility: 0,
    difficulty: 0,
    physicalEase: 0
  };
  const initialR = {
    timeValue: 0,
    replayValue: 0,
    opportunityCost: 0,
    futureDurability: 0
  };
  const initialE_Replayable = {
    desireReturn: 0,
    completionDrive: 0,
    communityEngagement: 0,
    expansionPotential: 0
  };
  const initialE_OneShot = {
    emotionalLongevity: 0,
    recommendLikelihood: 0,
    culturalImpact: 0,
    revisitMood: 0
  };

  // State hooks
  const [experienceType, setExperienceType] = useState('replayable'); // 'replayable' or 'oneshot'
  const [H, setH] = useState(initialH);
  const [B, setB] = useState(initialB);
  const [Bo, setBo] = useState(initialBo);
  const [R, setR] = useState(initialR);
  const [E_Replayable, setE_Replayable] = useState(initialE_Replayable);
  const [E_OneShot, setE_OneShot] = useState(initialE_OneShot);
  const [finalScore, setFinalScore] = useState(null);

  // Weighted formulas
  const weightsH = { resonance: 0.30, narrative: 0.40, nostalgia: 0.10, range: 0.20 };
  const weightsB = { stability: 0.20, mechanics: 0.20, designFlow: 0.15, coreMode: 0.15, artAudio: 0.15, innovation: 0.15 };
  const weightsBo = { engagement: 0.35, accessibility: 0.25, difficulty: 0.20, physicalEase: 0.20 };
  const weightsR = { timeValue: 0.30, replayValue: 0.25, opportunityCost: 0.20, futureDurability: 0.25 };
  const weightsE_Replayable = { desireReturn: 0.30, completionDrive: 0.20, communityEngagement: 0.25, expansionPotential: 0.25 };
  const weightsE_OneShot = { emotionalLongevity: 0.35, recommendLikelihood: 0.25, culturalImpact: 0.20, revisitMood: 0.20 };

  // Helper to compute weighted sum
  const weightedSum = (values, weights) => {
    let sum = 0;
    for (const key in values) {
      sum += values[key] * weights[key];
    }
    return sum;
  };

  // Rounding function: nearest 0.5, then if decimal >=0.75 round up
  const roundScore = (raw) => {
    const half = Math.round(raw * 2) / 2;
    const decimal = half - Math.floor(half);
    if (decimal >= 0.75) return Math.ceil(half);
    return Math.round(half);
  };

  // Map score to category label + emoji
  const getCategoryLabel = (score) => {
    switch (score) {
      case 0:
        return '0/5 DOGSH%T 💩';
      case 1:
        return '1/5 Bad Game 😞';
      case 2:
        return '2/5 Mid Game 😐';
      case 3:
        return '3/5 Okay Game 🙂';
      case 4:
        return '4/5 Good Game 👍';
      case 5:
        return '5/5 Perfect Game 🏆';
      default:
        return `${score}/5`;
    }
  };

  // Calculate final score
  const calculateFinal = () => {
    const rawH = weightedSum(H, weightsH);
    const rawB = weightedSum(B, weightsB);
    const rawBo = weightedSum(Bo, weightsBo);
    const rawR = weightedSum(R, weightsR);
    let rawE = 0;
    if (experienceType === 'replayable') {
      rawE = weightedSum(E_Replayable, weightsE_Replayable);
    } else {
      rawE = weightedSum(E_OneShot, weightsE_OneShot);
    }
    const rawTotal = rawH + rawB + rawBo + rawR + rawE;
    const rounded = roundScore(rawTotal);
    setFinalScore({ rawH, rawB, rawBo, rawR, rawE, rawTotal, rounded });
  };

  // Render selectors for 0/0.25/0.5/0.75/1
  const renderSelector = (value, setter, field) => (
    <select
      value={value}
      onChange={(e) => setter(prev => ({ ...prev, [field]: parseFloat(e.target.value) }))}
      className="border rounded px-2 py-1"
    >
      <option value={0.00}>0.00</option>
      <option value={0.25}>0.25</option>
      <option value={0.50}>0.50</option>
      <option value={0.75}>0.75</option>
      <option value={1.00}>1.00</option>
    </select>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">K11R0's Five Factors</h1>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Experience Type:</label>
        <select
          value={experienceType}
          onChange={(e) => setExperienceType(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="replayable">Persistent/Replayable</option>
          <option value="oneshot">One-Shot/Narrative</option>
        </select>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Factor 1: The Heart Factor (H)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Immediate Resonance (0.30):</label>
            {renderSelector(H.resonance, setH, 'resonance')}
          </div>
          <div>
            <label>Narrative Resonance (0.40):</label>
            {renderSelector(H.narrative, setH, 'narrative')}
          </div>
          <div>
            <label>Spontaneous Recall (0.10):</label>
            {renderSelector(H.nostalgia, setH, 'nostalgia')}
          </div>
          <div>
            <label>Emotional Range (0.20):</label>
            {renderSelector(H.range, setH, 'range')}
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Factor 2: The Brain Factor (B)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Technical Stability (0.20):</label>
            {renderSelector(B.stability, setB, 'stability')}
          </div>
          <div>
            <label>Mechanics & Controls (0.20):</label>
            {renderSelector(B.mechanics, setB, 'mechanics')}
          </div>
          <div>
            <label>Level/Flow Design (0.15):</label>
            {renderSelector(B.designFlow, setB, 'designFlow')}
          </div>
          <div>
            <label>Core-Mode Suitability (0.15):</label>
            {renderSelector(B.coreMode, setB, 'coreMode')}
          </div>
          <div>
            <label>Art & Audio (0.15):</label>
            {renderSelector(B.artAudio, setB, 'artAudio')}
          </div>
          <div>
            <label>Innovation (0.15):</label>
            {renderSelector(B.innovation, setB, 'innovation')}
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Factor 3: The Body Factor (Bo)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Engagement & Flow (0.35):</label>
            {renderSelector(Bo.engagement, setBo, 'engagement')}
          </div>
          <div>
            <label>Comfort & Accessibility (0.25):</label>
            {renderSelector(Bo.accessibility, setBo, 'accessibility')}
          </div>
          <div>
            <label>Difficulty & Balance (0.20):</label>
            {renderSelector(Bo.difficulty, setBo, 'difficulty')}
          </div>
          <div>
            <label>Physical Ease (0.20):</label>
            {renderSelector(Bo.physicalEase, setBo, 'physicalEase')}
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Factor 4: The Reality Factor (R)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Time Value (0.30):</label>
            {renderSelector(R.timeValue, setR, 'timeValue')}
          </div>
          <div>
            <label>Replay Value (0.25):</label>
            {renderSelector(R.replayValue, setR, 'replayValue')}
          </div>
          <div>
            <label>Opportunity Cost (0.20):</label>
            {renderSelector(R.opportunityCost, setR, 'opportunityCost')}
          </div>
          <div>
            <label>Future Durability (0.25):</label>
            {renderSelector(R.futureDurability, setR, 'futureDurability')}
          </div>
        </div>
      </section>

      {experienceType === 'replayable' ? (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Factor 5: The Existence Factor (E - Replayable)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Desire to Return (0.30):</label>
              {renderSelector(E_Replayable.desireReturn, setE_Replayable, 'desireReturn')}
            </div>
            <div>
              <label>Completionist Drive (0.20):</label>
              {renderSelector(E_Replayable.completionDrive, setE_Replayable, 'completionDrive')}
            </div>
            <div>
              <label>Community Engagement (0.25):</label>
              {renderSelector(E_Replayable.communityEngagement, setE_Replayable, 'communityEngagement')}
            </div>
            <div>
              <label>Expansion Potential (0.25):</label>
              {renderSelector(E_Replayable.expansionPotential, setE_Replayable, 'expansionPotential')}
            </div>
          </div>
        </section>
      ) : (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Factor 5: The Existence Factor (E - One-Shot)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Emotional Longevity (0.35):</label>
              {renderSelector(E_OneShot.emotionalLongevity, setE_OneShot, 'emotionalLongevity')}
            </div>
            <div>
              <label>Recommendation Likelihood (0.25):</label>
              {renderSelector(E_OneShot.recommendLikelihood, setE_OneShot, 'recommendLikelihood')}
            </div>
            <div>
              <label>Cultural Impact (0.20):</label>
              {renderSelector(E_OneShot.culturalImpact, setE_OneShot, 'culturalImpact')}
            </div>
            <div>
              <label>Revisit Mood (0.20):</label>
              {renderSelector(E_OneShot.revisitMood, setE_OneShot, 'revisitMood')}
            </div>
          </div>
        </section>
      )}

      <button
        onClick={calculateFinal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate Score
      </button>

      {finalScore && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold">Results</h2>
          <p>Raw Heart (H): {finalScore.rawH.toFixed(3)}</p>
          <p>Raw Brain (B): {finalScore.rawB.toFixed(3)}</p>
          <p>Raw Body (Bo): {finalScore.rawBo.toFixed(3)}</p>
          <p>Raw Reality (R): {finalScore.rawR.toFixed(3)}</p>
          <p>Raw Existence (E): {finalScore.rawE.toFixed(3)}</p>
          <p className="font-bold">Total (0–5): {finalScore.rawTotal.toFixed(3)}</p>
          <p className="font-bold text-lg">{getCategoryLabel(finalScore.rounded)}</p>
        </div>
      )}
    </div>
  );
}
