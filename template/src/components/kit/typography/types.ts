export type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
export type FontStyle = 'normal' | 'italic';
export type FontFamily = 'Quicksand' | 'CrimsonPro';
export type Font = Record<FontStyle, Record<FontWeight, string | undefined>>;
