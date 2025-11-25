import React, { useState, useEffect } from 'react';
import { Controls } from './components/Controls';
import { PreviewArea } from './components/PreviewArea';
import { CodeBlock } from './components/CodeBlock';
import { AnalysisPanel } from './components/AnalysisPanel';
import { TypoSettings, DEFAULT_SETTINGS, AIAnalysisResult } from './types';
import { analyzeTypography } from './services/geminiService';

const SAMPLE_TEXT = `Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.

타이포그래피는 독자가 글을 읽기 쉽고 매력적으로 보이도록 글자를 배열하는 기술입니다. 서체 선택, 글자 크기, 줄 간격(행간), 자간(글자 사이 간격) 등을 조정하여 가독성을 높이고 시각적인 조화를 이룹니다.

Effective typography is not just about making words legible; it is about communicating the tone of voice and ensuring the content is consumed effortlessly by the reader. Good design is invisible.`;

export default function App() {
  const [settings, setSettings] = useState<TypoSettings>(DEFAULT_SETTINGS);
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Reset analysis when key metrics change to encourage re-checking
  useEffect(() => {
    if (analysisResult) {
      // Don't clear immediately on every tiny slide, but maybe give a visual cue?
      // For simplicity, we keep the old result but it might be stale.
      // Alternatively, we could clear it: setAnalysisResult(null);
    }
  }, [settings.fontSize, settings.letterSpacing, settings.lineHeight, settings.fontFamily]);

  const handleAnalysis = async () => {
    if (!process.env.API_KEY) {
      alert("Please configure your API Key in the environment variables.");
      return;
    }
    setAnalyzing(true);
    try {
      const result = await analyzeTypography(settings, text);
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex h-screen flex-col md:flex-row bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 flex flex-col h-[40vh] md:h-full border-r border-slate-200 bg-white shadow-lg md:shadow-none z-20">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           <Controls settings={settings} onChange={setSettings} />
           <AnalysisPanel 
             loading={analyzing} 
             result={analysisResult} 
             onAnalyze={handleAnalysis} 
           />
           <CodeBlock settings={settings} />
        </div>
      </div>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col h-[60vh] md:h-full relative z-10">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl font-serif">T</div>
             <h1 className="font-bold text-slate-800 tracking-tight">TypoTuner</h1>
          </div>
          <div className="text-xs text-slate-400 font-medium">
             {settings.fontSize}px / {settings.letterSpacing}em / {settings.lineHeight}
          </div>
        </header>

        <PreviewArea 
          settings={settings} 
          text={text} 
          setText={setText} 
        />
      </main>

    </div>
  );
}