// 1. 定义图片列表（确保是完整的图床 URL）
const bgImages = [
  "https://free.picui.cn/free/2025/08/07/6893bf0e5af10.jpg",
  "https://free.picui.cn/free/2025/08/07/6893bf0e5ec7b.jpg"
];

// 2. 设置随机背景
function setRandomBackground() {
  const randomBg = bgImages[Math.floor(Math.random() * bgImages.length)];
  
  // 3. 应用到页面
  document.body.style.backgroundImage = `url("${randomBg}")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";
  
  // 4. 调试输出（可选）
  console.log("已设置背景:", randomBg);
}

// 5. 页面加载时执行
window.addEventListener("DOMContentLoaded", setRandomBackground);