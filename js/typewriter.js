document.addEventListener('DOMContentLoaded', function(){
  (function(){
    var titleParent = document.querySelector('#cover-block h1.cover-title');
    var subParent = document.querySelector('#cover-block p.cover-subtitle');
    if(!titleParent || !subParent) return;
    var titleSpan = titleParent.querySelector('.cover-typewriter');
    var subSpan = subParent.querySelector('.cover-typewriter');
    if(!titleSpan || !subSpan) return;

    var titleRaw = titleParent.getAttribute('data-text') || '';
    var subRaw = subParent.getAttribute('data-text') || '';
    // 保留原始文本（包含方括号），直接用于打字效果
    var titleText = titleRaw;
    var subText = subRaw;
    var titleSpeed = parseInt(titleParent.getAttribute('data-speed'),10) || 180;
    var subSpeed = parseInt(subParent.getAttribute('data-speed'),10) || 120;
    var pause = parseInt(subParent.getAttribute('data-pause'),10) || 5000;

    function typeText(span, text, speed, cb){
      span.textContent = '';
      span.classList.add('cursor-blink');
      var i = 0;
      function step(){
        if(i <= text.length){
          span.textContent = text.slice(0, i);
          i++;
          setTimeout(step, speed);
        } else {
          // finished: remove cursor so border disappears
          span.classList.remove('cursor-blink');
          cb && cb();
        }
      }
      step();
    }

    function runSequence(){
      typeText(titleSpan, titleText, titleSpeed, function(){
        setTimeout(function(){
          typeText(subSpan, subText, subSpeed, function(){
            // ensure both cursors removed
            titleSpan.classList.remove('cursor-blink');
            subSpan.classList.remove('cursor-blink');
            setTimeout(function(){
              titleSpan.textContent = '';
              subSpan.textContent = '';
              setTimeout(runSequence, 300);
            }, pause);
          });
        }, 200);
      });
    }

    setTimeout(runSequence, 400);
  })();
});
