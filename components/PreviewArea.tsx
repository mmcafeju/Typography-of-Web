import React, { useRef, useEffect } from 'react';
import { TypoSettings } from '../types';

interface PreviewAreaProps {
  settings: TypoSettings;
  text: string;
  setText: (text: string) => void;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ settings, text, setText }) => {
  const editableRef = useRef<HTMLDivElement>(null);

  const style = {
    fontSize: `${settings.fontSize}px`,
    letterSpacing: `${settings.letterSpacing}em`,
    lineHeight: settings.lineHeight,
    fontWeight: settings.fontWeight,
    outline: 'none',
  };

  // Sync initial text only once or if explicit reset needed logic existed
  // but for contentEditable we mostly rely on user input.
  // We use this to prevent caret jumping if we were to update innerText on every render
  useEffect(() => {
    if (editableRef.current && editableRef.current.innerText !== text) {
        // Only set if significantly different to avoid cursor issues, 
        // mainly for initial load
        if (editableRef.current.innerText.trim() === '') {
            editableRef.current.innerText = text;
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setText(e.currentTarget.innerText);
  };

  return (
    <div className={`flex-1 relative bg-slate-50 overflow-hidden flex flex-col ${settings.fontFamily}`}>
       <div className="absolute inset-0 p-8 md:p-16 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto bg-white shadow-sm border border-slate-100 min-h-[500px] p-12 rounded-xl">
             <div
                ref={editableRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                className="w-full h-full text-slate-900 break-words whitespace-pre-wrap empty:before:content-[attr(placeholder)] empty:before:text-slate-300"
                style={style}
                placeholder="Type something here..."
             >
               {/* Initial render text is handled by useEffect or dangerouslySetInnerHTML if strict control needed, 
                   but simplistic approach works for this tool */}
             </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-8 flex gap-4 text-slate-400 text-sm">
             <p>Edit the text above to see how your typography scales.</p>
          </div>
       </div>
    </div>
  );
};