const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const transcriptsData = require("./sample-transcripts.json");

app.post("/analyze", async (req, res) => {
  try {
    const { id } = req.body;

    // STEP 1: get transcript
    const selected = transcriptsData.transcripts.find(
      t => t.id === id
    );

    if (!selected) {
      return res.status(404).json({ error: "Transcript not found" });
    }

    // STEP 2: prompt
    const prompt = `
You are a strict performance evaluator.

Return ONLY valid JSON.

FELLOW:
${JSON.stringify(selected.fellow)}

COMPANY:
${JSON.stringify(selected.company)}

TRANSCRIPT:
${selected.transcript}

OUTPUT FORMAT:
{
  "score": number,
  "evidence": [],
  "kpis": [],
  "gaps": [],
  "questions": []
}
`;

    // STEP 3: call Ollama
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt,
        stream: false
      })
    });

    const data = await response.json();

    // STEP 4: safe JSON parsing
    let result;

    try {
      result = JSON.parse(data.response);
    } catch (e) {
      const match = data.response.match(/\{[\s\S]*\}/);

      if (!match) {
        return res.status(500).json({
          error: "AI did not return JSON",
          raw: data.response
        });
      }

      try {
        result = JSON.parse(match[0]);
      } catch (err) {
        return res.status(500).json({
          error: "Malformed JSON from AI",
          raw: data.response
        });
      }
    }

    // STEP 5: send response
    return res.json(result);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Analysis failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:59000");
});