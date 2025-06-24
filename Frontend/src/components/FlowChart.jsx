import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ArrowLeft, BookOpen, Clock, TrendingUp } from 'lucide-react';

const FlowChart = ({ domain, onBack }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const generateRoadmapFromGemini = async (selectedDomain) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const prompt = `Create a detailed 8-week learning roadmap for ${selectedDomain}. Return only JSON with structure:
    {
      "domain": "${selectedDomain}",
      "weeks": [
        {
          "week": 1,
          "title": "Week 1 Title",
          "topics": ["Topic 1", "Topic 2"],
          "description": "Summary",
          "estimatedHours": "10-15 hours",
          "level": "beginner"
        }
      ]
    }`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid response from Gemini');
    return JSON.parse(jsonMatch[0]);
  };

  const convertToReactFlowFormat = (roadmapData) => {
    const flowNodes = [];
    const flowEdges = [];

    // Header node
    flowNodes.push({
      id: 'domain-header',
      position: { x: isMobile ? 50 : 400, y: 50 },
      data: {
        label: (
          <div className="text-center text-[#efefff]">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-[#ffffff]" />
            <div className="font-bold text-xl">
              {roadmapData.domain || domain} Roadmap
            </div>
            <div className="text-sm opacity-80">8-Week Learning Path</div>
          </div>
        )
      },
      style: {
        background: '#2f2a45',
        color: '#efefff',
        padding: 20,
        borderRadius: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width: isMobile ? 300 : 360,
        height: 'auto',
        overflow: 'visible',
        boxShadow: '0px 0px 25px rgba(0,0,0,0.1), 0px 4px 6px -1px rgba(0,0,0,0.1)'
      }
    });

    // Week nodes
    roadmapData.weeks.forEach((week, index) => {
      const id = `week-${week.week}`;
      const x = isMobile ? 50 : (index % 2 === 0 ? 100 : 550);
      const y = isMobile ? 400 + index * 800 : 250 + index * 300;

      flowNodes.push({
        id,
        position: { x, y },
        data: {
          label: (
            <div className="w-full h-full p-4 space-y-3 overflow-visible text-[#efefff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#91a7ff]/20 text-[#91a7ff] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {week.week}
                </div>
                <div className="font-semibold text-[#efefff] text-base leading-tight">
                  {week.title}
                </div>
              </div>

              <div className="text-sm text-[#b3b3c3] leading-relaxed">
                {week.description}
              </div>

              <div>
                <div className="text-xs font-semibold text-[#b3b3c3] mb-1">
                  Key Topics:
                </div>
                <div className="flex flex-wrap gap-2">
                  {week.topics?.map((topic, i) => (
                    <span
                      key={i}
                      className="bg-[#ffcb7c]/20 text-[#ffcb7c] px-2 py-1 rounded-full text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs mt-2">
                <div className="flex items-center gap-1 text-[#91a7ff]">
                  <Clock className="w-3 h-3" />
                  <span>{week.estimatedHours}</span>
                </div>
                <div className="flex items-center gap-1 text-[#91a7ff]">
                  <TrendingUp className="w-3 h-3" />
                  <span className="capitalize">{week.level}</span>
                </div>
              </div>
            </div>
          )
        },
        style: {
          background: '#2f2a45',
          color: '#efefff',
          border: '2px solid #4a445d',
          borderRadius: 16,
          width: isMobile ? 320 : 400,
          height: 'auto',
          padding: 16,
          overflow: 'visible',
          boxShadow: '0px 0px 25px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.1)'
        }
      });

      const prevId =
        index === 0 ? 'domain-header' : `week-${roadmapData.weeks[index - 1].week}`;

      flowEdges.push({
        id: `e-${prevId}-to-${id}`,
        source: prevId,
        target: id,
        type: 'smoothstep',
        markerEnd: { type: 'arrowclosed', color: '#91a7ff' },
        style: { stroke: '#91a7ff', strokeWidth: 2 }
      });
    });

    return { nodes: flowNodes, edges: flowEdges };
  };



  useEffect(() => {
    const loadRoadmap = async () => {
      setIsLoading(true);
      try {
        const data = await generateRoadmapFromGemini(domain);
        const { nodes, edges } = convertToReactFlowFormat(data);
        setNodes(nodes);
        setEdges(edges);
      } catch (err) {
        setError(err.message || 'Failed to load roadmap.');
      } finally {
        setIsLoading(false);
      }
    };
    if (domain) loadRoadmap();
  }, [domain, isMobile]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background text-foreground">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-b-4 border-primary"></div>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-center">
          Generating roadmap for <span className="capitalize">{domain}</span>...
        </p>
      </div>

    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-destructive/10 text-destructive">
        <div className="text-center p-6 max-w-md">
          <div className="text-3xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="mb-6">{error}</p>
          <button onClick={onBack} className="bg-destructive text-destructive-foreground px-4 py-2 rounded shadow">
            <ArrowLeft className="inline w-4 h-4 mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-background text-foreground">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 bg-card hover:bg-muted border border-border text-foreground px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {isMobile ? 'Back' : 'Back to Domains'}
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.1 }}
      >
        <Controls className="bg-card text-foreground border border-border rounded-lg shadow-lg" />
        {!isMobile && (
          <MiniMap
            nodeColor={() => '#91a7ff'}
            className="bg-card border border-border rounded-lg shadow"
          />
        )}
        <Background
          variant="dots"
          gap={20}
          size={2}
          color="#efefff"
          style={{ backgroundColor: '#1b1b1b' }}
        />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
