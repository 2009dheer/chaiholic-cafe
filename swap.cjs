const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');

const str1 = `      {/* 9. Premium About Founder Section (Soft White Theme with Ambient Liquid Lights) */}`;
const str2 = `      {/* 5. Pictures of Menu (Soft White Background) */}`;
const str3 = `      {/* 6. Cozy Boutique Café Gallery (Dark Midnight Blue \`#0B2342\`) */}`;

const p1 = content.indexOf(str1);
const p2 = content.indexOf(str2);
const p3 = content.indexOf(str3);

if (p1 === -1 || p2 === -1 || p3 === -1) {
    console.log("Could not find sections");
    console.log({p1, p2, p3});
    process.exit(1);
}

const before1 = content.substring(0, p1);
const aboutSection = content.substring(p1, p2);
const menuSection = content.substring(p2, p3);
const after3 = content.substring(p3);

const newContent = before1 + menuSection + aboutSection + after3;
fs.writeFileSync('src/App.tsx', newContent);
console.log("Swapped successfully");
