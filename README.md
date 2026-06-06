# PT Prosper Witta Sejahtera

Company website and admin dashboard for PT Prosper Witta Sejahtera, built with Next.js App Router and Supabase.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase database and storage
- Resend email
- JWT + bcrypt admin authentication

## Features

- Public company pages: home, about, products, news, and contact.
- Product category pages with document access request flow.
- News listing and dynamic news detail pages.
- Admin dashboard for products, request samples, request access, contact inquiries, and news.
- Admin-only API routes protected by signed session cookies.
- SEO support with metadata, robots.txt, dynamic sitemap, Open Graph, Twitter metadata, and Organization JSON-LD.

## Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
BASE_URL=
JWT_SECRET=
```

Recommended for production:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
BASE_URL=https://your-domain.com
```

`NEXT_PUBLIC_SITE_URL` or `BASE_URL` is used for canonical URLs, sitemap URLs, email links, and SEO metadata. Make sure it points to the final production domain.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## SEO

The project includes:

- `src/app/sitemap.ts` for dynamic sitemap generation.
- `src/app/robots.ts` for crawler rules.
- Root metadata in `src/app/layout.tsx`.
- Page-level metadata for public pages.
- Dynamic metadata for product categories and news detail pages.

The sitemap includes:

- `/`
- `/about`
- `/products`
- `/products/[category]`
- `/news`
- `/news/[slug]`
- `/contact`

The sitemap intentionally excludes admin, API, login, and internal request-status pages.

After deployment, check:

```txt
https://your-domain.com/sitemap.xml
https://your-domain.com/robots.txt
```

Submit the sitemap in Google Search Console.

## Admin Security

Admin authentication uses:

- bcrypt password verification
- JWT session cookie
- `httpOnly` cookie
- `sameSite=strict`
- production-only secure cookie
- protected admin API helpers

Important:

- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.
- Never expose service role keys in client code.
- Rotate keys if they are leaked.

## Supabase Notes

The app expects tables/buckets for:

- admin users
- products
- categories
- product category mapping
- document access requests
- request samples
- contact inquiries
- newsletter subscribers
- news
- document/news storage buckets

Public read operations should use the anon key. Admin mutations use the service role key server-side.

## Deployment Checklist

- Set all environment variables in the hosting provider.
- Set `NEXT_PUBLIC_SITE_URL` or `BASE_URL` to the production domain.
- Confirm `/sitemap.xml` returns public URLs.
- Confirm `/robots.txt` references the correct sitemap URL.
- Confirm admin login works with the production Supabase project.
- Run `npm run build` before release.
