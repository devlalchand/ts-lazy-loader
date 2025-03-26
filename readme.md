# ts-lazy-loader

A lightweight TypeScript image lazy loading library with retry logic, placeholder support, custom events, and dynamic refresh. Built for modern web apps and globally scalable projects. Supports both **NPM module import** and **CDN usage**.

## 🚀 Features

✅ Intersection Observer API-based lazy loading  
✅ Automatic retries on image load failure  
✅ Placeholder image support  
✅ Emits custom events (`ts-lazy-loader:loaded`, `ts-lazy-loader:failed`)  
✅ Dynamic refresh support for AJAX content  
✅ Periodic broken image checks and re-tries  
✅ Zero dependencies  
✅ CDN and NPM Ready

---

## 📦 Installation

```bash
npm install ts-lazy-loader
```

## ✨ NPM Usage Example

### HTML

```html
<img
  class="ts-lazy-loader"
  data-src="https://example.com/image.jpg"
  data-placeholder="https://example.com/placeholder.jpg"
  alt="Lazy Image"
  width="600"
  height="400"
/>
```

### JavaScript/TypeScript

```typescript
import { initLazyLoader } from "ts-lazy-loader";

document.addEventListener("DOMContentLoaded", () => {
  initLazyLoader();
});
```

---

## ✨ CDN Usage Example

```html
<script src="https://cdn.jsdelivr.net/npm/ts-lazy-loader/dist/ts-lazy-loader.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    TsLazyLoader.initLazyLoader();
  });
</script>
```

## 🛠 API Options

```typescript
initLazyLoader({
  selector: ".ts-lazy-loader", // CSS Selector for lazy images
  rootMargin: "0px 0px 100px 0px", // IntersectionObserver root margin
  retryCount: 3, // Max retries for failed images
  retryInterval: 5000, // Interval to check broken images (ms)
  retryDelay: 2000, // Delay between retries (ms)
});
```

## 🔄 Dynamic Refresh (for AJAX content)

```typescript
import { refreshLazyLoader } from "ts-lazy-loader";
refreshLazyLoader();
```

Or in browser global:

```html
<script>
  TsLazyLoader.refreshLazyLoader();
</script>
```

## 📢 Custom Events Example

```javascript
document.addEventListener("ts-lazy-loader:loaded", (e) => {
  console.log("Image Loaded:", e.detail);
});

document.addEventListener("ts-lazy-loader:failed", (e) => {
  console.error("Image Failed:", e.detail);
});
```

## 🎯 Class Names

| Purpose         | Class Name               |
| --------------- | ------------------------ |
| Target Image    | `.ts-lazy-loader`        |
| On Load Success | `.ts-lazy-loader-loaded` |
| On Load Failure | `.ts-lazy-loader-failed` |

## ✅ License

MIT License

---

## 👨‍💻 Maintained By

[Lal Chand]
