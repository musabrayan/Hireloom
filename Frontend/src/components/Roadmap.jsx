import Flow from "./FlowChart";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

export default function Roadmap() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [showFlow, setShowFlow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const domains = [
    "Web Development",
    "Mobile App Development",
    "Data Science",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
    "Digital Marketing",
    "Product Management",
  ];

  const handleGenerateRoadmap = async () => {
    if (!selectedDomain) {
      alert("Please select a domain first!");
      return;
    }
    setIsLoading(true);
    setShowFlow(true);
  };

  const handleBackToSelection = () => {
    setShowFlow(false);
    setSelectedDomain("");
    setIsLoading(false);
  };

  if (showFlow) {
    return <Flow domain={selectedDomain} onBack={handleBackToSelection} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-wide mb-4">
              Learning Roadmap Generator
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a domain to generate a personalized learning roadmap
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-xl shadow-lg p-8 border border-border">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="domain-select"
                  className="text-lg font-semibold"
                >
                  Choose your learning domain
                </Label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger
                    id="domain-select"
                    className="w-full h-12 border border-input focus:ring-ring focus:border-ring"
                  >
                    <SelectValue placeholder="Select a domain to get started..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-popover text-popover-foreground">
                    {domains.map((domain, index) => (
                      <SelectItem
                        key={index}
                        value={domain}
                        className="py-3 cursor-pointer hover:bg-muted"
                      >
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <button
                onClick={handleGenerateRoadmap}
                disabled={!selectedDomain || isLoading}
                className="w-full bg-primary text-[#fff] font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                {isLoading ? "Generating..." : "Generate Roadmap"}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card/70 backdrop-blur-sm rounded-xl p-6 border border-border shadow-sm">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Structured Learning</h3>
              <p className="text-sm text-muted-foreground">
                Get step-by-step roadmaps tailored to your chosen domain
              </p>
            </div>

            <div className="bg-card/70 backdrop-blur-sm rounded-xl p-6 border border-border shadow-sm">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Quick Start</h3>
              <p className="text-sm text-muted-foreground">
                Begin your learning journey immediately with curated resources
              </p>
            </div>

            <div className="bg-card/70 backdrop-blur-sm rounded-xl p-6 border border-border shadow-sm">
              <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-secondary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your advancement through each learning milestone
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}