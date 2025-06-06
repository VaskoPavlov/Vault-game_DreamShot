export enum Direction {
  CLOCKWISE = 'CLOCKWISE',
  COUNTERCLOCKWISE = 'COUNTERCLOCKWISE',
};

export interface CombinationStep {
  value: number;        
  direction: Direction; 
}

const numOfCombs = 3;
export function generateCombination(): CombinationStep[] {
  const combo: CombinationStep[] = [];
  const directions: Direction[] = Object.values(Direction);
  const startIndex = Math.floor(Math.random() * 2);

  for (let i = 0; i < numOfCombs; i++) {
    const value = Math.floor(Math.random() * 9) + 1;
    const direction = directions[(startIndex + i) % 2];
    combo.push({ value, direction });
  }

  console.log('%c[Vault Combo]', `color: gold;`, 
              `${combo[0].direction} -> ${combo[0].value}`,
              `${combo[1].direction}  -> ${combo[1].value}`,
              `${combo[2].direction} -> ${combo[2].value}`);
  return combo;
}