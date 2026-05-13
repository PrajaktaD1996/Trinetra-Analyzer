import { useState } from "react";

function App() {
  const [result, setResult] = useState(null);

  const runAnalysis = async (id) => {
    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })  
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Server Error:", data);
      return;
    }
    setResult(data);

    console.log("AI Result:", data);
  };

  return (
    <div>
      <h1>Trinethra Analyzer</h1>

      <button onClick={() => runAnalysis("transcript-001")}>
        Run Analysis 1
      </button>

      {/* <button onClick={() => runAnalysis("transcript-002")}>
        Run Analysis 2
      </button>

      <button onClick={() => runAnalysis("transcript-003")}>
        Run Analysis 3
      </button> */}

      {result && (
        <div>
          <h2>Score: {result.score}</h2>

          {/* <h3>Evidence</h3>
          {result.evidence?.map((e, i) => (
            <p key={i}>{e.quote} ({e.tag})</p>
          ))}

          <h3>KPIs</h3>
          {result.kpis?.map((k, i) => (
            <span key={i}>{k} </span>
          ))}

          <h3>Gaps</h3>
          {result.gaps?.map((g, i) => (
            <p key={i}>{g}</p>
          ))}

          <h3>Questions</h3>
          {result.questions?.map((q, i) => (
            <p key={i}>{q}</p>
          ))} */}
        </div>
      )}
    </div>
  );
}

export default App;