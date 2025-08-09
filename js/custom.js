// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
  // 背景图片数组 - 替换为您自己的图片URL
  const backgroundImages = [
    "https://free.picui.cn/free/2025/08/07/6893bf0e5af10.jpg",
    "https://free.picui.cn/free/2025/08/07/6893bf0e5ec7b.jpg",
    // 添加更多图片URL...
  ];

  // 获取背景元素
  const bgElement = document.getElementById('web_bg');
  
  if (!bgElement) return;

  // 设置随机背景函数
  function setRandomBackground() {
    // 从数组中随机选择一张图片
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const selectedImage = backgroundImages[randomIndex];
    
    // 创建临时图片检测加载
    const tempImg = new Image();
    tempImg.src = selectedImage;
    
    tempImg.onload = function() {
      // 应用背景图片（带平滑过渡）
      bgElement.style.backgroundImage = `url('${selectedImage}')`;
      
      // 可选：在控制台输出当前背景信息
      console.log('已切换背景:', selectedImage);
      
      // 可选：保存当前背景索引到sessionStorage
      sessionStorage.setItem('lastBgIndex', randomIndex);
    };
    
    tempImg.onerror = function() {
      console.warn('背景图片加载失败:', selectedImage);
      // 如果加载失败，使用默认背景
      bgElement.style.backgroundImage = "url('https://free.picui.cn/free/2025/08/07/6893bf0e5af10.jpg')";
    };
  }

  // 首次加载设置背景
  setRandomBackground();

  // 监听PJAX完成事件（如果主题使用PJAX）
  if (typeof pjax !== 'undefined') {
    document.addEventListener('pjax:complete', setRandomBackground);
  }

  // 可选：添加键盘快捷键调试 (按B键切换背景)
  document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'b') {
      setRandomBackground();
    }
  });
});

// custom.js
document.addEventListener('DOMContentLoaded', function() {
  // 滚动箭头智能定位
  function handleScroll() {
    const coverBlock = document.getElementById('cover-block');
    if (!coverBlock) return;

    const coverHeight = coverBlock.offsetHeight;
    if (window.pageYOffset > coverHeight * 0.3) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }

  // 防抖处理
  let isScrolling;
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 50);
  }, { passive: true });

  // 初始化检查
  handleScroll();
});

