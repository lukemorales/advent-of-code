import { readFileSync } from 'fs';
import path from 'path';

export function loadInput(directory: string) {
  const pathname = path.join(directory, 'input.txt');
  const input = readFileSync(pathname, 'utf8');

  return input.trimEnd();
}
