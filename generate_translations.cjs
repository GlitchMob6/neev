const fs = require('fs');
const path = require('path');

const enFilePath = path.join(__dirname, 'src', 'i18n', 'en.ts');
const enContent = fs.readFileSync(enFilePath, 'utf8');

// Extract all the keys and values from en.ts
const dictMatch = enContent.match(/export const en = \{([\s\S]*?)\};/);
if (!dictMatch) {
  console.error('Failed to parse en.ts');
  process.exit(1);
}

const enDictStr = dictMatch[1];
const enPairs = [];
const lineRegex = /^\s*'([^']+)':\s*['"`](.*?)['"`],$/gm;
let match;
while ((match = lineRegex.exec(enDictStr)) !== null) {
  enPairs.push({ key: match[1], value: match[2] });
}

function updateOrGenerateLangFile(langCode, langName, isNew) {
  const filePath = path.join(__dirname, 'src', 'i18n', `${langCode}.ts`);
  let content = '';
  let existingDictStr = '';
  
  if (fs.existsSync(filePath) && !isNew) {
    content = fs.readFileSync(filePath, 'utf8');
    const m = content.match(new RegExp(`export const ${langCode} = \\{([\\s\\S]*?)\\};`));
    if (m) existingDictStr = m[1];
  }
  
  const existingKeys = new Set();
  const existingPairs = [];
  if (existingDictStr) {
    let m2;
    // this regex might fail on complex strings, let's just do simple matching
    const lr = /^\s*'([^']+)':\s*['"`](.*?)['"`],?$/gm;
    while ((m2 = lr.exec(existingDictStr)) !== null) {
      existingKeys.add(m2[1]);
      existingPairs.push({ key: m2[1], value: m2[2] });
    }
  }

  let newDictContent = '{\n';
  
  for (const { key, value } of enPairs) {
    if (existingKeys.has(key)) {
      const existingVal = existingPairs.find(p => p.key === key).value;
      newDictContent += `  '${key}': '${existingVal.replace(/'/g, "\\'")}',\n`;
    } else {
      let prefix = '';
      if (isNew) {
        prefix = `[${langCode.toUpperCase()}] `;
      }
      newDictContent += `  '${key}': '${prefix}${value.replace(/'/g, "\\'")}',\n`;
    }
  }
  
  newDictContent += '};\n';
  
  const finalContent = `export const ${langCode}: Record<string, string> = ${newDictContent}`;
  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log(`Updated ${langCode}.ts`);
}

// Update existing
updateOrGenerateLangFile('hi', 'Hindi', false);
updateOrGenerateLangFile('mr', 'Marathi', false);

// Generate new
const newLangs = ['gu', 'ta', 'te', 'ml', 'kn', 'tulu', 'pa'];
for (const lang of newLangs) {
  updateOrGenerateLangFile(lang, lang, true);
}

// Modify en.ts to use Record<string, string> for consistency and to avoid TS errors
const newEnContent = enContent.replace('export const en = {', 'export const en: Record<string, string> = {');
fs.writeFileSync(enFilePath, newEnContent, 'utf8');
console.log('Modified en.ts');

// Modify index.tsx to import all
const indexFilePath = path.join(__dirname, 'src', 'i18n', 'index.tsx');
let indexContent = fs.readFileSync(indexFilePath, 'utf8');

const imports = `import { en, type TranslationKeys } from './en';
import { hi } from './hi';
import { mr } from './mr';
import { gu } from './gu';
import { ta } from './ta';
import { te } from './te';
import { ml } from './ml';
import { kn } from './kn';
import { tulu } from './tulu';
import { pa } from './pa';
`;

indexContent = indexContent.replace(/import \{ en, type TranslationKeys \} from '\.\/en';\nimport \{ hi \} from '\.\/hi';\nimport \{ mr \} from '\.\/mr';/, imports);
indexContent = indexContent.replace(/const translations.*? = \{ en, hi, mr \};/, 'const translations: Record<Language, Record<string, string>> = { en, hi, mr, gu, ta, te, ml, kn, tulu, pa };');

fs.writeFileSync(indexFilePath, indexContent, 'utf8');
console.log('Updated index.tsx');
