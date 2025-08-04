var posts=["2025/08/04/这是一篇新的博文/","2025/08/04/这是一篇新新的文章/","2025/08/04/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };