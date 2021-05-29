const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export const isAlpha = (letter: string) => {
  if(!letter) return false;
  return ALPHABET.includes(letter.toUpperCase());
}