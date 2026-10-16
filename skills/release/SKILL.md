---
name: release
description: 개발·QA가 끝난 프로젝트의 배포 준비를 배포준비팀에 맡긴다. 실제 업로드·심사 제출은 하지 않고, 사용자가 직접 할 일 목록을 만든다.
argument-hint: "[지시] [--project <slug>]"
disable-model-invocation: true
---

# 배포 준비

CEO 지시: **$ARGUMENTS**

너는 비서실이다. 산출물 내용은 직접 쓰지 않는다.

1. 작업 공간 `WS`를 정한다.
   - `--project <slug>`가 있으면 `output/<slug>`.
   - 없으면 `output/` 아래 가장 최근에 수정된 폴더.
2. `WS/05-qa.md`가 없으면 멈추고 "먼저 `/agent-company:company`로 개발·QA를 끝내라"고 알린다.
   있으면 비어 있지 않은 마지막 줄(판정)을 CEO에게 보여 준다. `VERDICT: FAIL`이면 남은 결함을 안고 준비한다고 덧붙인다.
3. `TEAM=release`, `NN=06`으로 `../company/team-run.md` 절차를 따른다 (이 스킬 폴더 기준 경로).
   `ORDER`는 지시가 있으면 그 지시, 없으면 "CEO 지시: <brief.md 원문>. 앞 팀 산출물을 바탕으로 배포 준비의 몫을 해라."
   이전 산출물은 그 절차의 0단계가 `.r<N>`으로 보존한다.
4. 리더의 REPORT와 `06-release.md`의 "CEO 할 일" 목록을 CEO에게 전한다.
   실제 업로드·심사 제출은 CEO가 그 목록대로 직접 한다.
