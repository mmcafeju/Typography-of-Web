import React from 'react';
import { TypoSettings, FontFamily } from '../types';
import { Sliders, Type, AlignJustify, MoveHorizontal } from 'lucide-react';

interface ControlsProps {
  settings: TypoSettings;
  onChange: (newSettings: TypoSettings) => void;
}

export const Controls: React.FC<ControlsProps> = ({ settings, onChange }) => {
  
  const handleChange = (key: keyof TypoSettings, value: number | string) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white border-b md:border-b-0 md:border-r border-slate-200 h-full overflow-y-auto w-full md:w-80 shrink-0 shadow-sm z-10">
      <div className="flex items-center gap-2 mb-2">
        <Sliders className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-800">Settings</h2>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Typeface</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Sans', value: FontFamily.SANS },
            { label: 'Serif', value: FontFamily.SERIF },
            { label: 'Mono', value: FontFamily.MONO },
          ].map((font) => (
            <button
              key={font.value}
              onClick={() => handleChange('fontFamily', font.value)}
              className={`px-3 py-2 text-sm rounded-md border transition-all ${
                settings.fontFamily === font.value
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-medium'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Type className="w-4 h-4 text-slate-400" />
            Size
          </label>
          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{settings.fontSize}px</span>
        </div>
        <input
          type="range"
          min="8"
          max="128"
          step="1"
          value={settings.fontSize}
          onChange={(e) => handleChange('fontSize', Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-slate-400 px-1">
          <span>8px</span>
          <span>128px</span>
        </div>
      </div>

      {/* Letter Spacing */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <MoveHorizontal className="w-4 h-4 text-slate-400" />
            Spacing (Tracking)
          </label>
          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{settings.letterSpacing.toFixed(3)}em</span>
        </div>
        <input
          type="range"
          min="-0.15"
          max="0.5"
          step="0.005"
          value={settings.letterSpacing}
          onChange={(e) => handleChange('letterSpacing', Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-slate-400 px-1">
          <span>-0.15em</span>
          <span>0.5em</span>
        </div>
      </div>

      {/* Line Height */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <AlignJustify className="w-4 h-4 text-slate-400" />
            Line Height
          </label>
          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{settings.lineHeight.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.8"
          max="3.0"
          step="0.05"
          value={settings.lineHeight}
          onChange={(e) => handleChange('lineHeight', Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-slate-400 px-1">
          <span>0.8</span>
          <span>3.0</span>
        </div>
      </div>

      {/* Font Weight */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-slate-700">Weight</label>
          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{settings.fontWeight}</span>
        </div>
        <input
          type="range"
          min="100"
          max="900"
          step="100"
          value={settings.fontWeight}
          onChange={(e) => handleChange('fontWeight', Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Presets */}
      <div className="pt-4 border-t border-slate-100">
        <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider mb-3 block">Presets</label>
        <div className="grid grid-cols-2 gap-2">
           <button 
             onClick={() => onChange({...settings, fontSize: 32, letterSpacing: -0.02, lineHeight: 1.1, fontWeight: 700})}
             className="px-3 py-2 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 text-left"
           >
             Headline
           </button>
           <button 
             onClick={() => onChange({...settings, fontSize: 16, letterSpacing: 0, lineHeight: 1.6, fontWeight: 400})}
             className="px-3 py-2 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 text-left"
           >
             Body Text
           </button>
           <button 
             onClick={() => onChange({...settings, fontSize: 12, letterSpacing: 0.05, lineHeight: 1.5, fontWeight: 500})}
             className="px-3 py-2 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 text-left"
           >
             Caption / UI
           </button>
           <button 
             onClick={() => onChange({...settings, fontSize: 48, letterSpacing: -0.04, lineHeight: 1, fontWeight: 800})}
             className="px-3 py-2 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 text-left"
           >
             Display
           </button>
        </div>
      </div>
    </div>
  );
};