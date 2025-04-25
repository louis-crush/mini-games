const screen = document.getElementById("screen");
let state = "waiting";  // "waiting", "ready", "now"
let startTime, timeout;

screen.addEventListener("click", () => {
  if (state === "waiting") {
    screen.textContent = "准备好... 等颜色变绿！";
    screen.style.backgroundColor = "#666";
    timeout = setTimeout(() => {
      screen.textContent = "现在！快点！";
      screen.style.backgroundColor = "#00cc66";
      state = "now";
      startTime = new Date().getTime();
    }, Math.random() * 3000 + 2000);  // 2-5秒后变色
    state = "ready";
  } else if (state === "ready") {
    clearTimeout(timeout);
    screen.textContent = "太早了！你输了 😓 点击再试一次";
    screen.style.backgroundColor = "#cc3333";
    state = "waiting";
  } else if (state === "now") {
    const reaction = new Date().getTime() - startTime;
    screen.textContent = `你的反应速度是 ${reaction} 毫秒 🎉\n点击再试一次`;
    screen.style.backgroundColor = "#444";
    state = "waiting";
  }
});
