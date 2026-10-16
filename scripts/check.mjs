// 에이전트 파일과 스킬이 서로 가리키는 이름이 실제로 있는지 확인한다.
import { readdirSync, readFileSync, existsSync } from 'node:fs';

const AGENTS = 'agents';
const TEAMS = ['research', 'planning', 'design', 'dev', 'qa', 'release'];
const errors = [];
const names = new Set();

for (const f of readdirSync(AGENTS).filter(f => f.endsWith('.md'))) {
  const text = readFileSync(`${AGENTS}/${f}`, 'utf8');
  const name = text.match(/^name: (.+)$/m)?.[1];
  if (`${name}.md` !== f) errors.push(`${f}: name '${name}' ≠ 파일명`);
  if (!/^tools: .+$/m.test(text)) errors.push(`${f}: tools 없음`);
  if (/\bAgent\b/.test(text.match(/^tools: (.+)$/m)?.[1] ?? '')) errors.push(`${f}: 서브에이전트는 Agent 도구를 가질 수 없다`);
  const model = text.match(/^model: (.+)$/m)?.[1];
  if (model && !['sonnet', 'haiku', 'opus', 'inherit'].includes(model)) errors.push(`${f}: 알 수 없는 model '${model}'`);
  // 개발팀은 sonnet 미만 금지 — 코드 품질이 QA 재작업 비용을 좌우한다
  if (name?.startsWith('dev-') && model === 'haiku') errors.push(`${f}: 개발팀은 sonnet 이상이어야 한다`);
  names.add(name);
}

for (const team of TEAMS) {
  const lead = `${team}-lead`;
  if (!names.has(lead)) { errors.push(`${lead} 없음`); continue; }
  const members = [...readFileSync(`${AGENTS}/${lead}.md`, 'utf8').matchAll(/^- `([a-z-]+)`/gm)].map(m => m[1]);
  if (members.length < 1) errors.push(`${lead}: 팀원 목록 없음`);
  for (const m of members) if (!names.has(m)) errors.push(`${lead}: 팀원 ${m} 파일 없음`);
  for (const n of names) if (n.startsWith(`${team}-`) && n !== lead && !members.includes(n)) errors.push(`${n}: ${lead} 명단에 없음`);
  // 배포준비팀은 company 흐름 밖에서 사용자가 직접 부르는 release 스킬이다
  const skill = team === 'release' ? 'release' : `team-${team}`;
  if (!existsSync(`skills/${skill}/SKILL.md`)) errors.push(`${skill} 스킬 없음`);
}

// 리더 6명의 작업 규약, 팀원 12명의 작업 규칙은 각 파일에 복사돼 있다 (혼자 불려도 규칙대로 일하게).
// team-run.md가 ASSIGN/REWORK/DONE을 파싱하므로 한 곳만 고쳐지면 그 팀만 조용히 깨진다 — 전부 같아야 한다.
const section = (name, heading) => readFileSync(`${AGENTS}/${name}.md`, 'utf8').split(`\n${heading}\n`)[1]?.split('\n## ')[0];
for (const [heading, group] of [['## 일하는 방식', [...names].filter(n => n.endsWith('-lead'))],
                                ['## 작업 규칙', [...names].filter(n => !n.endsWith('-lead'))]]) {
  const variants = new Set(group.map(n => section(n, heading)));
  if (variants.has(undefined)) errors.push(`'${heading}' 절이 없는 에이전트가 있다`);
  else if (variants.size > 1) errors.push(`'${heading}' 절이 에이전트마다 다르다 — 모두 같게 고쳐라`);
}

// 플러그인 매니페스트와 마켓플레이스 항목이 같은 이름·버전을 가리키는지
const plugin = JSON.parse(readFileSync('.claude-plugin/plugin.json', 'utf8'));
const entry = JSON.parse(readFileSync('.claude-plugin/marketplace.json', 'utf8')).plugins.find(p => p.name === plugin.name);
if (!entry) errors.push(`marketplace.json에 ${plugin.name} 없음`);
else if (entry.version !== plugin.version) errors.push(`버전 불일치: plugin ${plugin.version} ≠ marketplace ${entry.version}`);
// 에이전트는 플러그인 접두사로 불린다 — 접두사가 바뀌면 team-run.md도 바뀌어야 한다
if (!readFileSync('skills/company/team-run.md', 'utf8').includes(`${plugin.name}:<TEAM>-lead`)) errors.push(`team-run.md가 ${plugin.name}: 접두사를 쓰지 않는다`);

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`OK — 에이전트 ${names.size}명, 팀 ${TEAMS.length}개`);
