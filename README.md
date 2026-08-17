# OSV Audio — "Noir"

A complete static website. No build step, no framework, no dependencies —
six HTML files, one stylesheet, one small script. Open `index.html` in a
browser and it works.

```
index.html          Home
ht-50.html          HT-50 product page + full specification + gallery
ht-120.html         HT-120 product page + full specification + gallery
about.html          Company story (JK Amplifiers → OSV Audio)
reviews.html        Press & reviews, linked out
contact.html        Contact form + dealer / distributor section
assets/
  css/site.css      The whole design system
  js/site.js        Sticky header, mobile nav, scroll reveal, image fallbacks
  img/              Logo + the Stealth photography
```

---

## 1. The logo — already in

Your OSV monogram is in place. One thing had to change: the original artwork is
filled `#231F20`, a near-black, which would have been invisible on this site.
Rather than making a white duplicate that drifts out of sync, the mark is now
**inlined into the pages as SVG with `fill="currentColor"`** — it takes the
colour of whatever it sits in, goes brass on hover, needs no HTTP request, and
stays sharp at any size.

The lockup is the monogram plus "OSV Audio" letterspaced in Jost, 34px in the
header and 46px in the footer.

| File | What it is |
|---|---|
| `logo_osv.svg` | your original, untouched |
| `logo_osv_mark.svg` | same paths, `currentColor` — the version inlined in the pages |
| `logo_osv_light.svg` | same paths in `#e9e6e1` — used as the favicon, and for anywhere an `<img>` is needed |

If you re-draw the logo, update `logo_osv.svg` and re-run `build_site.py`, or
hand-edit the four `<path d="…">` values inlined in the six HTML files.

---

## 2. Photography

Two kinds of image are referenced.

**Local** — the Stealth photographs, in `assets/img/`. These are already in
place and are the best images on the site.

| File | Used on |
|---|---|
| `hero-stealth.jpg` | Home hero, About hero |
| `stealth-wide.jpg` | HT-50 hero |
| `stealth-detail.jpg`, `stealth-panel.jpg`, `stealth-tall.jpg` | spare crops |

> These were extended in post — the dark background was continued upward and
> to the left so headlines have clean space to sit in. If you re-shoot, frame
> wide and leave empty space on the left; that's what a hero needs.

**Remote** — the existing gallery and product shots are pulled from
`https://osv-audio.com/assets/...`. They keep working when you deploy to the
same domain. To make the site fully self-contained, copy your existing
`assets/gallery/` and `assets/img/pages/` folders in alongside these files and
search-replace `https://osv-audio.com/assets` with `assets` across the HTML.

**Missing photographs** degrade gracefully: any `<img>` that fails is replaced
by a labelled placeholder block instead of breaking the layout. The three
workshop slots on `about.html` are intentionally empty placeholders — a bench,
a part-built chassis, and the listening set-up would fill them.

---

## 3. Make the contact form actually send

`contact.html` has a working, validated form with no back end. Pick one:

**Formspree** (fastest, free tier)
```html
<form data-osv-form method="post" action="https://formspree.io/f/YOUR_ID">
```

**Netlify Forms** (if you host on Netlify)
```html
<form data-osv-form method="post" name="contact" netlify>
```

**Your own PHP handler**
```html
<form data-osv-form method="post" action="/send.php">
```

Until an `action` is set, the form shows a "demo only" notice instead of
submitting. Email-match validation on the two address fields works either way.

---

## 4. Social links

Facebook points at the real page. Instagram and YouTube are
placeholders — search for `instagram.com` and `youtube.com` in the HTML and
drop in your real handles, or delete those two `<a>` blocks from the footer
and `contact.html` if you don't use them.

---

## 5. Deploying

Any static host works. Drag the whole folder onto **Netlify Drop**, or push it
to a repo and connect **Cloudflare Pages** or **GitHub Pages**. On traditional
hosting, upload the contents by FTP to your web root — there is nothing to
install.

Before going live:

- [x] Real logo in place
- [ ] Contact form `action` set
- [ ] Instagram / YouTube URLs corrected or removed
- [ ] Prices or "price on application" added if you want them
- [ ] `og:image` per page checked — they currently point at osv-audio.com

---

## 6. The design system

Everything is driven by custom properties at the top of `site.css`. To retune
the whole site, change these:

```css
--ground: #04060a;   /* page black                  */
--brass:  #c08f4e;   /* accent, sampled from the valve glow */
--ink:    #e9e6e1;   /* primary text                */
--gut:    60px;      /* page gutter                 */
```

Type is **Bodoni Moda** for display and **Jost** for interface, both from
Google Fonts. The rule the layout follows: headlines large, body text small,
lots of empty space, hairline rules instead of boxes, and no rounded corners
or drop shadows anywhere.

Reduced-motion preferences are respected; the scroll reveals switch off.
