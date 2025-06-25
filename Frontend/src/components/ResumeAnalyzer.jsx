import { useState } from "react";
import mammoth from "mammoth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store=>store.auth)

  const extractTextFromPDF = async (file) => {
    try {
      if (!window.pdfjsLib) {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        fullText += content.items.map((item) => item.str).join(" ") + "\n\n";
      }

      return fullText.replace(/\s+/g, " ").trim();
    } catch (error) {
      throw new Error("Failed to extract text from PDF.");
    }
  };

  const extractTextFromDocx = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value.trim();
    } catch (error) {
      throw new Error("Failed to extract text from DOCX.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      let text = "";
      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await extractTextFromDocx(file);
      } else {
        throw new Error("Only PDF and DOCX files are supported.");
      }

      if (text.length < 50) {
        throw new Error("Extracted resume text is too short.");
      }

      setResumeText(text);
    } catch (error) {
      alert(error.message);
    }
  };

  const analyzeWithGemini = async () => {
     if (!user) {
      toast.error("You must be logged in to analyze your resume");
      return; 
    }

    if (!resumeText || !jobDescription) {
      alert("Please provide both resume and job description.");
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const prompt = `You're an AI resume evaluator. Given the following resume and job description, evaluate the candidate's suitability for the role and return your analysis in the following JSON format only:

{
"relevanceScore": number (out of 10),
"matchingKeywords": [array of strings],
"missingKeywords": [array of strings],
"improvementSuggestions": [array of strings],
"summary": "string"
}

Guidelines:

relevanceScore: Rate how closely the resume matches the job description, based on skills, experience, and keywords.

matchingKeywords: Extract key skills, technologies, and phrases from the job description that are also found in the resume.

missingKeywords: Identify important terms in the job description that are not present in the resume.

improvementSuggestions: Provide actionable tips to enhance the resumes relevance to the job.

summary: Provide a concise evaluation highlighting strengths, weaknesses, and overall fit.

Do not include any markdown formatting, Return only the raw JSON.

Resume:
${resumeText}

Job Description:
${jobDescription}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Invalid response");

      const parsed = JSON.parse(jsonMatch[0]);
      setAnalysis(parsed);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setAnalysis({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen p-4 sm:p-6 font-sans">
  {loading && (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-primary" />
      <p className="mt-4 text-base sm:text-lg font-semibold text-primary text-center px-4">
        Analyzing your resume...
      </p>
    </div>
  )}

  <div className="w-full max-w-3xl mx-auto space-y-6">
    <h1 className="text-xl sm:text-2xl font-bold text-center text-primary tracking-wide">
      Resume Analyzer
    </h1>

    <Card className="bg-card text-card-foreground">
      <CardContent className="space-y-4 py-6">
        <Input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileUpload}
          disabled={loading}
          className="w-full bg-card border-border focus:ring-ring focus:border-ring 
                     file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium 
                     file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        <p className="text-sm text-muted-foreground">Only PDF and DOCX files are supported.</p>
      </CardContent>
    </Card>

    <Card className="bg-card text-card-foreground">
      <CardContent className="space-y-4 py-6">
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea
          id="jobDescription"
          rows={6}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          disabled={loading}
          placeholder="Paste the job description here..."
          className="bg-input"
        />
      </CardContent>
    </Card>

    <div className="text-center">
      <Button
        onClick={analyzeWithGemini}
        disabled={loading || !resumeText || !jobDescription}
        className="w-full sm:w-auto bg-primary text-primary-foreground"
      >
        Analyze Resume
      </Button>
    </div>

    {analysis && typeof analysis === "object" && !analysis.error && (
      <Card className="border mt-6 bg-card text-card-foreground">
        <CardContent className="space-y-6 py-6">
          <div>
            <h2 className="text-lg font-semibold text-secondary-foreground">Relevance Score</h2>
            <p className="text-xl font-bold">{analysis.relevanceScore}/10</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary">Matching Keywords</h2>
            <ul className="list-disc list-inside text-sm sm:text-base">
              {analysis.matchingKeywords?.map((kw, i) => <li key={i}>{kw}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-destructive">Missing Keywords</h2>
            <ul className="list-disc list-inside text-sm sm:text-base">
              {analysis.missingKeywords?.map((kw, i) => <li key={i}>{kw}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-accent">Improvement Suggestions</h2>
            <ul className="list-disc list-inside text-sm sm:text-base">
              {analysis.improvementSuggestions?.map((sugg, i) => <li key={i}>{sugg}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Summary</h2>
            <p className="text-sm sm:text-base">{analysis.summary}</p>
          </div>
        </CardContent>
      </Card>
    )}

    {analysis?.error && (
      <div className="bg-destructive text-destructive-foreground p-4 rounded text-sm sm:text-base">
        {analysis.error}
      </div>
    )}
  </div>
</div>

  );
}