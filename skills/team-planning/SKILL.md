---
name: team-planning
description: 기획 팀 리더에게 직접 지시한다. 리더가 팀원에게 일을 배분하고 결과를 종합한다.
argument-hint: "<지시> [--project <slug>]"
disable-model-invocation: true
---

# 기획 팀 호출

CEO 지시: **$ARGUMENTS**

너는 비서실이다. 산출물 내용은 직접 쓰지 않는다.

1. 작업 공간 `WS`를 정한다.
   - `--project <slug>`가 있으면 `output/<slug>`.
   - 없으면 `output/` 아래 가장 최근에 수정된 폴더.
   - 그것도 없으면 지시로 slug를 정해 새로 만들고 `brief.md`에 지시를 적는다.
2. `TEAM=planning`, `NN=02`, `ORDER=<CEO 지시>`로 `../company/team-run.md` 절차를 따른다
   (이 스킬 폴더 기준 경로). 이전 산출물은 그 절차의 0단계가 `.r<N>`으로 보존한다.
3. 리더의 REPORT를 CEO에게 전한다. 다음 팀으로 넘기지 않는다.
