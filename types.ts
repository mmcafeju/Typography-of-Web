export enum FontFamily {
  SANS = 'font-sans',
  SERIF = 'font-serif',
  MONO = 'font-mono'
}

export interface TypoSettings {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  fontWeight: number;
  fontFamily: FontFamily;
}

export interface AIAnalysisResult {
  readabilityScore: number;
  feedback: string[];
  suggestion: string;
}

export const DEFAULT_SETTINGS: TypoSettings = {
  fontSize: 16,
  letterSpacing: 0,
  lineHeight: 1.5,
  fontWeight: 400,
  fontFamily: FontFamily.SANS
};