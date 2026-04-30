# 诗词阅读

中小学古诗词必背篇目在线阅读应用，共收录 **183 首** 课标必背古诗词，涵盖小学一年级到高中三年级。

## 功能

- 按年级浏览 —— 1 至 12 年级分册展示
- 按朝代浏览 —— 唐、宋、元、明、清等
- 诗词搜索 —— 按标题、作者、诗句搜索
- 诗词详情 —— 全文、注释、译文、创作背景、赏析

## 技术栈

- [Next.js](https://nextjs.org) 16 (App Router, Static Export)
- React 19
- Tailwind CSS v4
- TypeScript

## 本地开发

```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 构建

```bash
npm run build
```

静态导出至 `out/` 目录。

## 部署

项目已配置 GitHub Actions，推送 `master` 分支自动构建并部署到 GitHub Pages。

访问地址：[https://zhouchong741.github.io/poetry](https://zhouchong741.github.io/poetry)
