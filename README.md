# AI Agent Company

[English](#english) · [한국어](#한국어)

## English

A Claude Code plugin that runs an AI agent company. Give one instruction as the CEO, and the company takes it through
research → planning → design → development → QA, and optionally release prep.
6 teams, each with 1 lead + 2 members. All 18 are separate subagents with their own personas.

> Outputs follow the language of your instruction — give it in English and the documents come out in English.

### Install

```
/plugin marketplace add brad-k-dev/agent_company
/plugin install agent-company@agent-company
```

### Usage

Open Claude Code in the folder where you want the app built:

```
/agent-company:company Build a memo iOS app        # research → QA, automatically
/agent-company:release                             # release prep, run it yourself after QA
/agent-company:team-design Add a dark mode screen  # one team only (latest project)
/agent-company:team-qa Verify again --project memo-ios
```

Results go to `output/<slug>/` in that folder. If a run stops midway, run `company` again with the same instruction — finished teams are skipped.

`release` only prepares store copy, build settings, and a to-do list for you (`06-release.md`).
**It never uploads, submits for review, pays, or creates accounts** — you do those yourself from the list.

### Safety

Agents read web content, and some (dev, QA, ops) have Bash and file-write access.
There is no extra sandbox; it relies on **Claude Code permission prompts**.
Auto-approving all permissions removes that protection, so use the default mode for untrusted topics.

### License

MIT

---

## 한국어

CEO 한 줄 지시로 리서치 → 기획 → 디자인 → 개발 → QA를 끝내고, 원하면 배포 준비까지 하는 Claude Code 스킬.
6개 팀, 팀마다 리더 1 + 팀원 2. 18명 모두 별도 서브에이전트이고 각자 페르소나가 있다.

## 설치

Claude Code 플러그인이다. 한 번 설치하면 어느 폴더에서나 쓴다.

```
/plugin marketplace add brad-k-dev/agent_company
/plugin install agent-company@agent-company
```

이 저장소를 고치는 중에는 설치 없이 `claude --plugin-dir .`로 띄운다.

## 사용

앱을 만들 폴더에서 Claude Code를 열고:

```
/agent-company:company 메모 iOS앱을 만들어          # 리서치~QA 자동 진행
/agent-company:release                            # 결과를 보고 배포 준비 (직접 실행)
/agent-company:team-design 다크모드 화면을 추가해     # 한 팀만 (가장 최근 프로젝트에)
/agent-company:team-qa 다시 검증해 --project memo-ios
```

결과는 그 폴더의 `output/<slug>/`에 쌓인다. 중간에 끊기면 `company`를 같은 지시로 다시 실행한다 — 끝난 팀은 건너뛴다.

`release`는 스토어 문구·빌드 설정·직접 할 일 목록(`06-release.md`)까지만 만든다.
**실제 업로드·심사 제출·결제·계정 생성은 하지 않는다** — 목록대로 직접 한다.

## 안전

에이전트는 웹에서 가져온 내용을 읽고, 일부(개발·QA·운영)는 Bash와 파일 쓰기 권한을 가진다.
경로·명령을 막는 별도 장치는 두지 않고 **Claude Code 권한 확인**에 맡긴다.
권한을 전부 자동 승인하는 모드로 돌리면 이 보호가 사라지므로, 신뢰하지 않는 주제는 기본 모드로 실행한다.

## 구조

```
skills/company/SKILL.md      회사 전체 흐름
skills/company/team-run.md   한 팀이 일하는 절차 (모든 스킬이 공유)
skills/team-*/SKILL.md       팀 직접 호출 5개
skills/release/SKILL.md      배포 준비 (company 흐름 밖, 직접 실행)
agents/*.md                  에이전트 18명 (명단·페르소나의 정본)
docs/DESIGN.md               기획·설계
.claude-plugin/               플러그인 매니페스트 + 로컬 마켓플레이스
```

```
node scripts/check.mjs   # 에이전트·스킬 이름 정합성 확인
```

## 라이선스

MIT
