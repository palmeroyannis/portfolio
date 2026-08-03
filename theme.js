(function(){
  var root = document.documentElement;
  var slider = document.querySelector('.hue-slider');
  if(!slider) return;
  var saved = null;
  try{ saved = localStorage.getItem('bgHue'); }catch(e){}
  var current = saved || getComputedStyle(root).getPropertyValue('--hue').trim() || '205';
  slider.value = current;
  slider.addEventListener('input', function(){
    root.style.setProperty('--hue', this.value);
    try{ localStorage.setItem('bgHue', this.value); }catch(e){}
  });
})();
