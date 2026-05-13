import { useState } from "react";

function App() {
  
  const [text, setText] = useState("Test-fellow");
  const [result, setResult] = useState("");
   

  const handleSubmit = async () => {
  // console.log(text);
  const res = await fetch("http://localhost:3000/analyze", {
      method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
        transcript: text
      })
    });

     const data = await res.json();
     console.log(data);
    //setResult(data.result);
  };

  return (
    <div><button onClick={handleSubmit}>clickMe!</button></div>
   
    // <div style={{ padding: 20 }}>
    //   <h2>Trinethra Analyzer</h2>

    //   <textarea
    //     rows="6"
    //     cols="50"
    //     value={text}
    //     onChange={(e) => setText(e.target.value)}
    //     placeholder="Paste transcript here..."
    //   />

    //   <br /><br />

    //   <button onClick={handleSubmit}>
    //     Run Analysis
    //   </button>

    //   <h3>Result:</h3>
    //   <pre>{result}</pre>
    // </div>
  );
}

export default App;