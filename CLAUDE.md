# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

- **GitHub:** `rsandrade/institutoacessos`
- **Deployed at:** `institutoacessos.org.br` (GitHub Pages, custom domain via `CNAME`)
- **Branch:** `main` — every push deploys automatically via GitHub Pages

## Publishing changes

```bash
git add <files>
git commit -m "description"
git push origin main
```

There is no build step. The site is pure HTML/CSS/JS — what is in `main` is what is live.

## File structure

| File | Purpose |
|------|---------|
| `index.html` | Single-page site — all sections in one file |
| `style.css` | All styles — sections are delimited by `/* ===== SECTION ===== */` comments |
| `script.js` | Scroll effects, animated counters, gallery lightbox, mobile nav |
| `img/` | All images used by the site |
| `CNAME` | Custom domain for GitHub Pages |

## Architecture

Single-page site with anchor-based navigation (`#sobre`, `#acoes`, `#casos`, etc.). No framework, no bundler, no dependencies.

**Section order in `index.html`:**
`#hero` → `#contadores` → `#sobre` → `#metodologia` → `#areas` → `#acoes` → `#casos` → `#publico` → `#galeria` → `#direcionamento` → `#depoimento` → `#utilidade` → `#apoie` → `#contato` → `footer`

**Background colour pattern** (must alternate to avoid adjacent sections merging visually):
- `var(--white)` `#ffffff`
- `var(--light)` `#fdf8ee` (cream)
- `var(--primary)` `#3a3a3a` (dark)
- `var(--accent)` `#c8960a` (gold) — used sparingly

## Images

- Images that need cropping or rotation should be processed with **Pillow** (`python3 -c "from PIL import Image; ..."`) before committing.
- Logo file: `img/logo-acesso.jpg` — already cropped to remove excess black padding.
- Dona Lili case photos: `img/lili-*.jpg`
- Gallery photos: `img/mutirao-2023-*.jpg`, `img/acao-2021-*.jpg`

## Project context

Site for **Instituto Acessos e Cidadania** — a social impact organisation in Salvador, BA, that mediates access to public rights (INSS, DPU, CRAS, CAD Único, etc.) for low-income communities.

The Trello board `4CIH4udo - 5-projeto-acesso.json` (in the parent directory) is the project management source. New cases, actions and content often come from there first.

## zip archive

`website.zip` (in parent directory) must be manually updated with `zip -r website.zip website/` after significant changes.
