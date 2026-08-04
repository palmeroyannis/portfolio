(function(){
  var KEY = 'parallaxFactor';
  var saved = null;
  try{ saved = localStorage.getItem(KEY); }catch(e){}
  var factor = saved !== null ? parseFloat(saved) : 0.95;

  var slider = document.getElementById('parallax-factor');
  var readout = document.getElementById('parallax-val');

  function syncUI(){
    if(slider) slider.value = factor;
    if(readout) readout.textContent = factor.toFixed(2);
  }
  syncUI();

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

  if(slider){
    slider.addEventListener('input', function(){
      factor = parseFloat(this.value);
      if(readout) readout.textContent = factor.toFixed(2);
      try{ localStorage.setItem(KEY, factor); }catch(e){}
      update();
    });
  }

  window.addEventListener('scroll', onScroll, {passive:true});
  update();

  // Halve the wheel-scroll speed on desktop (leave touch scrolling untouched).
  var isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if(!isCoarsePointer){
    var SCROLL_SPEED = 0.5;
    window.addEventListener('wheel', function(e){
      e.preventDefault();
      window.scrollBy(0, e.deltaY * SCROLL_SPEED);
    }, {passive:false});
  }
})();
