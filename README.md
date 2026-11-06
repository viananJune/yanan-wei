# Yanan Wei

做能自己每天用的自动化与信息工作流。  
Automation and information workflows I use myself, every day.

个人作品页：首页、工作索引、三篇案例、关于。联系方式只有 GitHub：[viananJune](https://github.com/viananJune)。

正文以中文为主，导航和案例结构使用短英文标签。配色是松绿、陶土和浅纸色，低饱和。

A personal portfolio. Chinese body, short English labels. The palette is pine, clay, and paper.

线上地址 / Live: <https://viananjune.github.io/yanan-wei/>

Pages 来源已设为 GitHub Actions。推送到 `main` 会重新部署。

---

## 中文

### 本地运行

需要 Node.js 20 或以上。

```bash
npm install
npm run dev
```

开发地址：<http://127.0.0.1:5173/yanan-wei/>

打开根路径 `/` 会转到 `/yanan-wei/`，与 GitHub 项目页的前缀一致。

```bash
npm run build    # 内容检查、类型检查、构建，并写出深链
npm run preview  # 预览 dist，地址 http://127.0.0.1:4173/yanan-wei/
```

`npm run build` 会检查 `content/` 是否完整、运行 `tsc --noEmit`、用 Vite 构建，然后把 `index.html` 复制到每个路由目录和 `404.html`。这样 GitHub Pages 可以打开深链。

### 部署到 GitHub Pages

仓库名是 **yanan-wei**。Vite 的 `base` 固定为 `/yanan-wei/`，对应：

`https://viananjune.github.io/yanan-wei/`

1. 把代码推到 `main`。
2. 打开 [Settings → Pages](https://github.com/viananJune/yanan-wei/settings/pages)。
3. 在 **Build and deployment** 里，把 **Source** 选成 **GitHub Actions**。不要选 Deploy from a branch。选中后页面会保存，没有单独的 Save 按钮。
4. `.github/workflows/pages.yml` 会在推送到 `main` 时构建并部署。Pull request 只跑构建，不部署。也可以在 Actions 页手动运行 **Deploy GitHub Pages**。
5. 若部署步骤失败并提示 `Ensure GitHub Pages has been enabled`，是 Source 还没改成 GitHub Actions。改完后打开 [Actions → Deploy GitHub Pages](https://github.com/viananJune/yanan-wei/actions/workflows/pages.yml)，进入失败的那次运行，点 **Re-run failed jobs**。
6. 首次部署若提示启用 `github-pages` 环境，按 GitHub 的确认完成即可。
7. 站点包含 `public/.nojekyll`，避免 Jekyll 忽略下划线开头的文件。

也可以用 API 把 Pages 来源设为 GitHub Actions（站点尚未创建时）：

```bash
gh api --method POST repos/viananJune/yanan-wei/pages -f build_type=workflow
```

已经创建过 Pages 时：

```bash
gh api --method PUT repos/viananJune/yanan-wei/pages -f build_type=workflow
```

### 怎样改文案

站点名称、标语、导航和首页三条原则在 `content/site.json`。

关于页正文在 `content/about.md`。

每篇案例是 `content/cases/` 里的一个 Markdown 文件。文件名即网址中的 slug。四个二级标题必须按这个顺序出现：`Problem`、`Approach`、`Outcome`、`Stack`。页面会把它们显示成「问题 / 做法 / 结果 / 技术栈」。

```markdown
---
slug: example-case
index: "04"
title: 中文标题
titleEn: English title
summary: 索引页上的一两句介绍。
---

## Problem

问题是什么。

## Approach

自己做了哪一层。

## Outcome

每天实际拿到什么。

## Stack

- 所用的交付物或约定
```

改完运行 `npm run build`。检查脚本会核对三篇现有案例的关键事实：约 48 个账号、标题中文与简介中文、每日 xlsx、06:00 Asia/Shanghai、既有 SOP、例程与 Windows 同步。新增案例时，需要同时改 `scripts/check-content.mjs` 里的名单，深链会按目录自动生成。

---

## English

Personal portfolio for Yanan Wei. Contact is GitHub only: <https://github.com/viananJune>.

### Run and build

Node.js 20 or newer.

```bash
npm install
npm run dev       # http://127.0.0.1:5173/yanan-wei/
npm run build     # check content, typecheck, Vite build, route indexes
npm run preview   # http://127.0.0.1:4173/yanan-wei/
```

`/` redirects to `/yanan-wei/` in dev, matching the project-page prefix.

### Deploy

`base` is `/yanan-wei/`. Live URL: <https://viananjune.github.io/yanan-wei/>.

1. Push to `main`.
2. Open [Settings → Pages](https://github.com/viananJune/yanan-wei/settings/pages).
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not Deploy from a branch). The choice saves by itself.
4. `.github/workflows/pages.yml` builds and deploys on pushes to `main`. Pull requests build only.
5. If deploy fails with `Ensure GitHub Pages has been enabled`, the source was not GitHub Actions yet. After changing it, open the failed run and choose **Re-run failed jobs**: [Deploy GitHub Pages](https://github.com/viananJune/yanan-wei/actions/workflows/pages.yml).

Or with the API:

```bash
gh api --method POST repos/viananJune/yanan-wei/pages -f build_type=workflow
```

Use `PUT` instead of `POST` if a Pages site already exists.

### Edit copy

- `content/site.json` — name, tagline, nav, home principles
- `content/about.md` — about page
- `content/cases/*.md` — case studies. Required headings, in order: `Problem`, `Approach`, `Outcome`, `Stack`

The check script keeps the three shipped cases tied to the facts they describe. Add a case by dropping a Markdown file in `content/cases/` and updating `scripts/check-content.mjs`.
