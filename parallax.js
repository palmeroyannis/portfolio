(function(){
  var factor = 0.95;

  var ticking = false;
  function update(){
    document.documentElement.style.setProperty('--parallax-y', (window.scrollY * -factor) + 'px');
    ticking = false;
  }
  function onScroll(){
    if(!ticking){
      requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  update();

  // Scroll at 85% of native wheel speed on desktop (leave touch scrolling untouched).
  var isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if(!isCoarsePointer){
    var SCROLL_SPEED = 0.85;
    window.addEventListener('wheel', function(e){
      e.preventDefault();
      window.scrollBy({top: e.deltaY * SCROLL_SPEED, left: 0, behavior: 'instant'});
    }, {passive:false});
  }
})();
