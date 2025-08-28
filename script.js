const windows = document.querySelectorAll(".desktop > div");
const files = document.querySelectorAll(".files > a");
let topZIndex = 1;

for (const file of files) {
  const href = file.getAttribute("href");
  if (href[0] != '#') continue;
  const win = document.getElementById(href.slice(1));
  file.addEventListener("click", (e) => {
    win.style.display = "block";
  });
}

for (const win of windows) {
  const bar = win.querySelector(".window-bar");
  const closeBtn = bar.querySelector("button");
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  win.style.zIndex = ++topZIndex;
  bar.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    win.style.zIndex = ++topZIndex;
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const x = parseInt(win.style.left || window.getComputedStyle(win).left)
    const y = parseInt(win.style.top || window.getComputedStyle(win).top)
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    win.style.left = `${x+dx}px`;
    win.style.top = `${y+dy}px`;
  });
  document.addEventListener("mouseup", (e) => {
    isDragging = false;
  });
  closeBtn.addEventListener("click", (e) => {
    win.style.display = "none";
  });
};
