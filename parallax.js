(function(){
  var factor = 0.4;
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
})();
