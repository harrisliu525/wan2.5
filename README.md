# wan-2.5.video

wan-2.5.video 是一个基于 Next.js 的资料站，用来跟踪阿里云 WAN 2.5 文生视频/图生视频预览版的最新动态。站点整理了官方 DashScope 文档、fal.ai 的首发文章、GenerativeAI.pub 的测评以及 Pollo AI 的 QA 反馈，帮助团队快速了解规格、API 流程、定价和上线注意事项。

## 核心亮点
- **规格总览**：列出 wan2.5-t2v-preview 与 wan2.5-i2v-preview 的输入输出、分辨率、音频能力与 Prompt 限制。
- **异步 API 流程**：提供必备请求头、任务轮询与错误处理的示例 `curl`，方便直接复用。
- **真实反馈**：同步 fal.ai、GenerativeAI.pub 与 Pollo AI 对 2.5 版本的优缺点点评。
- **定价看板**：对比阿里云 Model Studio 公布的 Preview 计费（480p/720p/1080p）以及 50 秒免费额度提示。

## 技术栈
- Next.js 15 · React 19 · TypeScript
- Tailwind CSS + shadcn/ui 组件体系
- next-intl 多语言（当前仅重写英文文案，中文保持原样）

## 数据来源
- [fal.ai: Wan 2.5 Preview is now available on fal](https://blog.fal.ai/wan-2-5-preview-is-now-available-on-fal/)
- [Pollo AI: I Tested Wan 2.5 AI Video Model And Here''s Why It Fell Short](https://pollo.ai/hub/wan-ai-2-5-review)
- [GenerativeAI.pub: I Tried Wan 2.5 Video Generator](https://generativeai.pub/i-tried-wan-2-5-video-generator-heres-why-it-could-overthrow-veo-3-1a1917264ab0)
- [Alibaba Cloud Model Studio · Models & Pricing](https://www.alibabacloud.com/help/en/model-studio/models)
- YouTube Live: [WAN 2.5 Preview Launch Stream](https://www.youtube.com/live/hyRFWDEX_EA)

## 本地开发
```bash
pnpm install
pnpm dev
```
浏览器访问 `http://localhost:3000` 进行预览。

## 免责声明
wan-2.5.video 为独立的第三方整理站点，与阿里云或 WAN 团队无官方合作关系。所有定价、配额与 API 信息请以 DashScope 控制台为准。若有补充线索，欢迎发送邮件至 `editors@wan-25.video`。
