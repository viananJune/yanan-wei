---
slug: overseas-morning-brief
index: "02"
title: 出海早报
titleEn: Overseas morning brief
summary: 每天 06:00（Asia/Shanghai）完成编排、成报和同步。站点监测沿用既有 SOP。
---

## Problem

出海站点的动态如果放到白天再拼，当天该做的判断就已经晚了。需要的是一份在固定钟点出现，并且同步到每天会看的位置的早报。

## Approach

早报自动化负责三件事：在 06:00（Asia/Shanghai）触发编排，生成当日报，再把报告同步出去。底层的站点监测遵循既有 SOP，早报层只承接编排、成报和同步。

## Outcome

每个 Asia/Shanghai 的早晨 06:00，编排、报告和同步按同一节奏走完。早上读到的是成稿。站点监测仍走原来的 SOP。

## Stack

- 定时：06:00 Asia/Shanghai
- 编排
- 报告生成
- 结果同步
- 站点监测：既有 SOP
