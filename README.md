# Trinetra-Analyzer
AI-assisted analysis tool for evaluating DeepThought Fellows using supervisor transcripts.

The application uses a local LLM through Ollama to analyze behavioral feedback, suggest rubric scores, map KPI impact, identify assessment gaps, and generate follow-up questions.

---

# Tech Stack

Frontend:
- React

Backend:
- Node.js + Express

LLM:
- Ollama (llama3.2)

---

# Setup Instructions

## 1. Clone Repository

git clone https://github.com/PrajaktaD1996/Trinetra-Analyzer.git

cd Trinetra-Analyzer

---

## 2. Install Backend Dependencies

cd backend

npm install

---

## 3. Install Frontend Dependencies

cd ../frontend

npm install

---

## 4. Install Ollama

Download and install Ollama from:

https://ollama.com

---

## 5. Pull the Model

ollama pull llama3.2

---

## 6. Start Ollama

ollama run llama3.2

---

## 7. Start Backend

cd backend

node server.js

Backend runs on:
http://localhost:5000

---

## 8. Start Frontend

cd frontend

npm start

Frontend runs on:
http://localhost:3000

---

# Ollama Model Used

Model:
- llama3.2

Reason for choosing:
- Good balance between reasoning quality and local performance
- Handles structured evaluation prompts reasonably well
- Lightweight enough to run on standard laptops without GPU requirements

---

# Architecture Overview

The application follows a simple frontend-backend-LLM pipeline.

1. The frontend allows the psychology intern to paste a supervisor transcript and trigger analysis.

2. The React frontend sends the transcript to the Express backend through a POST request.

3. The backend combines:
   - transcript
   - rubric.json
   - KPI definitions
   - evaluation instructions

   into a structured prompt.

4. The backend sends the prompt to Ollama using the local HTTP API.

5. Ollama processes the transcript and returns a structured evaluation containing:
   - evidence extraction
   - rubric score
   - KPI mapping
   - gap analysis
   - follow-up questions

6. The backend parses and cleans the response before returning it to the frontend.

7. The frontend displays the analysis in separate UI sections for readability.

---

# Architecture Diagram

Frontend (React)-->Express Backend (Node.js)-->Ollama Local API-->LLM Analysis-->Structured JSON Response-->Frontend Display.


![Block-Diagram](IMG_20260513_104905707.jpg)

---

# Design Challenges Tackled

## 1. Structured Output Reliability

Challenge:
LLMs often return inconsistent JSON or extra text.

Approach:
- Used prompt constraints requesting strict JSON
- Added backend parsing and fallback cleanup logic
- Implemented JSON.parse with regex fallback extraction

---

## 2. Evidence Linking

Challenge:
Users need to understand why a score was generated.

Approach:
- Extracted transcript quotes directly
- Tagged evidence as positive, negative, or neutral
- Connected evidence with rubric reasoning

---

## 3. Gap Detection

Challenge:
Detecting what was NOT mentioned in the transcript.

Approach:
- Compared transcript content against predefined assessment dimensions
- Asked Ollama to explicitly identify missing behavioral areas
- Generated targeted follow-up questions from missing dimensions

---

# What I Would Improve With More Time

- Add side-by-side transcript and analysis view
- Add clickable evidence highlighting inside transcript
- Add score confidence indicator
- Add transcript upload support (.txt/.pdf)
- Add multiple model support (phi3, mistral, gemma)
- Add transcript history and export functionality

---

# Current Features

- Local LLM integration using Ollama
- Transcript analysis
- Rubric-based scoring
- KPI mapping
- Gap analysis
- Follow-up question generation
- React frontend + Express backend + Ollama integration

---
