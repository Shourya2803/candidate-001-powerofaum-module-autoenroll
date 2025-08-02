import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'lib', 'trials.json');

export function loadTrials() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function saveTrials(trials) {
  const dirPath = path.dirname(filePath);
  
  // Create directory if not exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Write file
  fs.writeFileSync(filePath, JSON.stringify(trials, null, 2));
}
