
import fs from "fs"
import path from "path"

const DOCS = "docs"

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

const specFiles = walk(DOCS).filter(p => path.basename(p).startsWith("spec-") && p.endsWith(".md"))
const tddFiles = new Set(walk(DOCS).filter(p => path.basename(p).startsWith("tdd-") && p.endsWith(".md")).map(p => path.basename(p)))

let fail = false

for (const file of specFiles) {
  const base = path.basename(file)
  const txt = fs.readFileSync(file, "utf8")

  // A) Contract syntax
  const hasREQ = /###\s+REQ-[A-Z]+-\d+/.test(txt)
  const hasNormative = /\b(MUST NOT|MUST|SHALL|FORBIDDEN|NEVER)\b/i.test(txt)

  // Detect normative language outside REQ blocks (coarse but effective)
  // If any normative word exists AND no REQ blocks exist => hard fail
  if (hasNormative && !hasREQ) {
    console.error(`❌ ${base}: normative language present but no REQ blocks`)
    fail = true
  }

  // B) TDD partner presence (best-effort, audit-grade)
  // Look for a line like: TDD Partner: `tdd-foo.md` or (See `tdd-foo.md`)
  const partnerMatch =
    txt.match(/TDD Partner:\s*`([^`]+)`/i) ||
    txt.match(/\(See\s+`([^`]+)`\)/i) ||
    txt.match(/See\s+`(tdd-[^`]+\.md)`/i)

  if (partnerMatch) {
    const partner = partnerMatch[1]
    if (!tddFiles.has(partner)) {
      console.error(`❌ ${base}: references missing TDD partner ${partner}`)
      fail = true
    }
  } else {
    // If it’s a spec file and has REQs, it MUST declare a partner.
    if (hasREQ) {
      console.error(`❌ ${base}: has REQs but no declared TDD Partner`)
      fail = true
    }
  }

  // C) Traceability token presence inside REQ blocks (lightweight enforcement)
  // Require that each REQ block contains a "TDD Coverage:" line
  if (hasREQ) {
    const reqBlocks = txt.split(/###\s+REQ-/).slice(1)
    reqBlocks.forEach((blk, i) => {
      if (!/TDD Coverage:/i.test(blk)) {
        console.error(`❌ ${base}: REQ block #${i + 1} missing "TDD Coverage:"`)
        fail = true
      }
    })
  }
}

if (fail) process.exit(1)
console.log("✅ Contract lint passed")
