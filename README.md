# 🐩 PoodleHaircuts.com — Next.js Starter

Complete website for poodlehaircuts.com with:
- **AI Before/After tool** — upload poodle photo → choose cut → FLUX Kontext generates preview
- **18 cut pages** — one per style, all SEO-optimized  
- **Blog** — 10 priority posts mapped out, ready to write
- **Community gallery** — before/after photo submissions
- **poodlesworld.com integration** — UTM-tracked links on every page

---

## 🚀 Deploy in 5 steps

### Step 1 — Get a Replicate API token
1. Go to [replicate.com](https://replicate.com) and create account
2. Add $10 in credits (≈250 AI generations for testing)
3. Go to **Account → API Tokens** → copy your token

### Step 2 — Clone & install
```bash
# If you got this as a zip, just extract it
cd poodlehaircuts
npm install
```

### Step 3 — Set up environment
```bash
cp .env.example .env.local
# Edit .env.local and paste your Replicate token
```

### Step 4 — Test locally
```bash
npm run dev
# Open http://localhost:3000
# Go to /style-finder — upload a poodle photo — test!
```

### Step 5 — Deploy to Vercel (free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Set environment variable in Vercel dashboard:
# Settings → Environment Variables → Add REPLICATE_API_TOKEN
```

---

## 📁 Project structure

```
app/
├── page.tsx              # Homepage
├── layout.tsx            # Nav + Footer (all pages)
├── globals.css           # Design system + fonts
├── style-finder/
│   └── page.tsx          # 3-step AI tool (upload → choose → generate)
├── cuts/
│   ├── page.tsx          # All 18 cuts listing
│   └── [slug]/
│       └── page.tsx      # Individual cut guide page
├── blog/
│   └── page.tsx          # Blog listing
├── gallery/
│   └── page.tsx          # Before/after community gallery
└── api/
    └── transform/
        └── route.ts      # Replicate FLUX Kontext API route

lib/
└── cuts.ts               # All 18 poodle cuts data + AI prompts
```

---

## 💰 Monthly costs after launch

| Service | Cost |
|---|---|
| Vercel hosting | **Free** |
| Replicate (~500 generations/month) | ~$20/month |
| Klaviyo email (up to 1000 contacts) | **Free** |
| Domain renewal | ~$1/month |
| **Total** | **~$21/month** |

---

## 🔗 Poodles World integration

Every page links to poodlesworld.com with UTM tracking:
```
https://poodlesworld.com?utm_source=poodlehaircuts&utm_medium=cut&utm_campaign=teddy-bear
```

Track conversions in Google Analytics → Acquisition → Campaigns.

---

## ✍️ Blog posts to write (priority order)

1. "Poodle teddy bear cut: complete guide 2026" → `/blog/poodle-teddy-bear-cut-complete-guide`
2. "Poodle lamb cut vs teddy bear — which is better?" → `/blog/poodle-lamb-cut-vs-teddy-bear`
3. "How often should you cut a poodle's hair?" → `/blog/how-often-should-you-cut-a-poodle-hair`
4. "Poodle ear infections: signs, causes & prevention" → `/blog/poodle-ear-infection-guide`
5. "Best poodle cuts for hot weather" → `/blog/best-poodle-cuts-for-hot-weather`

Each post targets a long-tail keyword with 1K–10K monthly searches.

---

## 🎨 Customization

**Colors** — edit `app/globals.css` CSS variables:
```css
--caramel: #c8773a;    /* Main accent */
--ink: #1a1612;        /* Text */
--cream: #faf8f4;      /* Background */
```

**Add blog posts** — create `app/blog/[slug]/page.tsx` for each post.

**Add gallery photos** — add to database or CMS, update `app/gallery/page.tsx`.

---

## 🆘 Troubleshooting

**AI generation not working?**
- Check `REPLICATE_API_TOKEN` is set in `.env.local`
- Verify token at replicate.com/account/api-tokens
- Add billing credits at replicate.com/account/billing

**Photo upload failing?**  
- Max file size: 10MB
- Supported formats: JPG, PNG, WEBP
- For best AI results: front-facing photo, good lighting

**Build errors?**
```bash
npm run build
# Check error messages — usually missing dependencies
npm install
```
