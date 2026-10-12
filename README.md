# Willis Judd product landing page mockup

This is a local, Shopify-friendly HTML/CSS/JavaScript prototype for the captured Willis Judd copper magnetic bracelet product page.

## Files

- `index.html` — semantic page structure and product content
- `styles.css` — approved desktop hero composition
- `landing.css` — responsive landing-page sections and phone layout
- `app.js` — variant, quantity, mock add-to-cart, dialog, and sticky-cart interactions
- `assets/plates/` — optimized first-viewport product plates with original PNG files retained
- `assets/media/` — curated WebP product, sizing, clasp, and customer-review imagery plus the source product video

## Shopify translation

The page is deliberately organized as independent sections that can be moved into Liquid section files: product hero, highlights, construction, video, comparison, sizing, review gallery, safety, FAQ, and final CTA. Replace the prototype variant data and add-to-cart handler with Shopify product-form values, live variant IDs, localized money formatting, and the theme cart drawer.

The full unmodified scrape remains in `../willis-judd-asset-pack/`, including the manifest, original product JSON, fonts, imagery, review photos, and video.

## Performance choices

- First-viewport plates are WebP and explicitly sized.
- Below-fold images are WebP with native lazy loading and async decoding.
- The 1080p video uses `preload="none"` and a lightweight poster.
- Only the two required Barlow weights are loaded.
- JavaScript is dependency-free and deferred.

# Willis-Judd
