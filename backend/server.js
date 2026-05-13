const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());

app.post("/analyze", async (req, res) => {
  try {
    const { transcript } = req.body;

    console.log("Received:", transcript);

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: transcript,
        stream: false
      })
    });

    console.log("Ollama request sent");

    const data = await response.json();

    console.log("Ollama response received");

    res.json({
      result: data.response
    });

  } catch (error) {
    console.log("Error:", error.message);

    res.status(500).json({
      error: "Failed to connect to Ollama"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});