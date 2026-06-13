;(function(){
  var timers = [];

  function clearTimers(){
    while(timers.length){
      var t = timers.shift();
      try{ clearTimeout(t); }catch(e){}
    }
  }

  function safeSetTimeout(fn, delay){
    var id = setTimeout(fn, delay);
    timers.push(id);
    return id;
  }

  function initTypewriter(){
    clearTimers();

    var titleParent = document.querySelector('#cover-block h1.cover-title');
    var subParent = document.querySelector('#cover-block p.cover-subtitle');
    if(!titleParent || !subParent) return;
    var titleSpan = titleParent.querySelector('.cover-typewriter');
    var subSpan = subParent.querySelector('.cover-typewriter');
    if(!titleSpan || !subSpan) return;

    var titleRaw = titleParent.getAttribute('data-text') || '';
    var subRaw = subParent.getAttribute('data-text') || '';
    var titleText = titleRaw;
    var subText = subRaw;
    var titleSpeed = parseInt(titleParent.getAttribute('data-speed'),10) || 180;
    var subSpeed = parseInt(subParent.getAttribute('data-speed'),10) || 120;
    var pause = parseInt(subParent.getAttribute('data-pause'),10) || 5000;

    function typeText(span, text, speed, cb){
      if(!span) return cb && cb();
      span.textContent = '';
      span.classList.add('cursor-blink');
      var i = 0;
      function step(){
        // if element removed from DOM, abort
        if(!span || !span.isConnected){ return; }
        if(i <= text.length){
          span.textContent = text.slice(0, i);
          i++;
          safeSetTimeout(step, speed);
        } else {
          span.classList.remove('cursor-blink');
          cb && cb();
        }
      }
      step();
    }

    function runSequence(){
      typeText(titleSpan, titleText, titleSpeed, function(){
        safeSetTimeout(function(){
          typeText(subSpan, subText, subSpeed, function(){
            if(titleSpan && titleSpan.isConnected) titleSpan.classList.remove('cursor-blink');
            if(subSpan && subSpan.isConnected) subSpan.classList.remove('cursor-blink');
            safeSetTimeout(function(){
              if(titleSpan && titleSpan.isConnected) titleSpan.textContent = '';
              if(subSpan && subSpan.isConnected) subSpan.textContent = '';
              safeSetTimeout(runSequence, 300);
            }, pause);
          });
        }, 200);
      });
    }

    safeSetTimeout(runSequence, 400);
  }

  // init on first load
  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    initTypewriter();
  } else {
    document.addEventListener('DOMContentLoaded', initTypewriter);
  }

  // Re-init after PJAX navigation (AnZhiYu uses pjax)
  document.addEventListener('pjax:complete', function(){ safeSetTimeout(initTypewriter, 50); });
  document.addEventListener('pjax:end', function(){ safeSetTimeout(initTypewriter, 50); });
  document.addEventListener('pjax:success', function(){ safeSetTimeout(initTypewriter, 50); });

  // Re-init when page becomes visible again (in case of tab switch)
  document.addEventListener('visibilitychange', function(){ if(document.visibilityState === 'visible'){ safeSetTimeout(initTypewriter, 50); } });

})();
