import React, { useState } from 'react';
import { TypoSettings } from '../types';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  settings: TypoSettings;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ settings }) => {
  const [copied, setCopied] = useState(false);

  const cssCode = `.custom-text {
  font-family: ${settings.fontFamily === 'font-sans' ? 'sans-serif' : settings.fontFamily === 'font-serif' ? 'serif' : 'monospace'};
  font-size: ${settings.fontSize}px;
  font-weight: ${settings.fontWeight};
  line-height: ${settings.lineHeight};
  letter-spacing: ${settings.letterSpacing}em;
}`;

  const tailwindCode = `class="${settings.fontFamily} text-[${settings.fontSize}px] font-[${settings.fontWeight}] leading-[${settings.lineHeight}] tracking-[${settings.letterSpacing}em]"`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-t border-slate-200 bg-white p-6">
       <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">CSS Output</h3>
          <button 
            onClick={() => handleCopy(cssCode)}
            className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy CSS'}
          </button>
       </div>
       <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-xs font-mono overflow-x-auto">
         <code>{cssCode}</code>
       </pre>
       
       <div className="flex items-center justify-between mt-4 mb-2">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Tailwind Arbitrary Values</h3>
          <button 
             onClick={() => handleCopy(tailwindCode)}
             className="text-xs font-medium text-slate-500 hover:text-slate-700"
          >
             Copy Class
          </button>
       </div>
       <div className="bg-slate-100 text-slate-600 p-2 rounded text-[10px] font-mono truncate">
          {tailwindCode}
       </div>
    </div>
  );
};