import React from 'react';
import { AIAnalysisResult } from '../types';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AnalysisPanelProps {
  loading: boolean;
  result: AIAnalysisResult | null;
  onAnalyze: () => void;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ loading, result, onAnalyze }) => {
  return (
    <div className="p-6 border-t border-slate-200 bg-indigo-50/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
           <Sparkles className="w-4 h-4 text-indigo-600" />
           <h3 className="text-sm font-bold text-slate-800">AI Typography Audit</h3>
        </div>
        <button
          onClick={onAnalyze}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-xs font-semibold shadow-sm transition-all flex items-center gap-2
            ${loading 
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow'
            }`}
        >
          {loading ? 'Analyzing...' : 'Analyze Readability'}
        </button>
      </div>

      {result && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-4">
             <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                   <circle 
                      cx="24" cy="24" r="20" 
                      stroke={result.readabilityScore > 80 ? '#22c55e' : result.readabilityScore > 50 ? '#eab308' : '#ef4444'} 
                      strokeWidth="4" 
                      fill="none" 
                      strokeDasharray="126"
                      strokeDashoffset={126 - (126 * result.readabilityScore) / 100}
                      className="transition-all duration-1000 ease-out"
                   />
                </svg>
                <span className="absolute text-xs font-bold text-slate-700">{result.readabilityScore}</span>
             </div>
             <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Readability Score</p>
                <p className="text-sm text-slate-800 font-medium">
                  {result.readabilityScore > 80 ? 'Excellent' : result.readabilityScore > 50 ? 'Good / Average' : 'Needs Improvement'}
                </p>
             </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
             <p className="text-xs font-bold text-indigo-900 mb-1">Feedback</p>
             <ul className="space-y-1">
                {result.feedback.map((item, idx) => (
                   <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                     <span className="mt-0.5 block w-1 h-1 rounded-full bg-indigo-400 shrink-0"></span>
                     {item}
                   </li>
                ))}
             </ul>
          </div>

          <div className="flex gap-2 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
             <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
             <p className="text-xs text-emerald-800 italic">"{result.suggestion}"</p>
          </div>
        </div>
      )}
      
      {!result && !loading && (
         <p className="text-xs text-slate-500 leading-relaxed">
            Use Gemini to evaluate your font sizing, spacing, and height choices against accessibility standards.
         </p>
      )}
    </div>
  );
};