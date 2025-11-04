# Summit Dashboard — Technical Test

Product Management Dashboard built for Summit Global Teknologi technical assessment.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Ant Design
- Axios
- Next.js API Routes (as proxy middleware layer)

## Features
- Product listing table
- Create / Read / Update / Delete
- Real-time search with debounce
- Pagination
- Form validation
- Toast Notification (success & error)
- API Proxy pattern (Frontend → Next API → External API)

## Folder Structure
app/
├─ api/
│ ├─ products/route.ts → GET product list (proxy)
│ └─ product/route.ts → GET/POST/PUT/DELETE product
└─ products/page.tsx → UI + CRUD logic

## ▶️ Run Locally
```bash
npm install
npm run dev
Visit: http://localhost:3000/products
