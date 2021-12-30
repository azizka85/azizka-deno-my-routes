// src/client/main.ts
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('[data-button="fetch"]');
  btn?.addEventListener("click", async () => {
    const response = await fetch("/ru?ajax=1");
    const content = await response.text();
    console.log(content);
  });
});
//# sourceMappingURL=main.js.map
