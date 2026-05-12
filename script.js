// Scroll reveal

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

});

document.querySelectorAll(".reveal").forEach(el=>{
observer.observe(el);
});



// Mobile menu

const hamburger=document.getElementById("hamburger");
const mobileMenu=document.getElementById("mobileMenu");

hamburger.addEventListener("click",()=>{

mobileMenu.classList.toggle("open");

});



// Instagram carousel

(function () {
  var track  = document.getElementById('igTrack');
  var wrap   = document.getElementById('igTrackWrap');
  var dots   = document.querySelectorAll('.ig-dot');
  if (!track || !wrap) return;

  var posts    = Array.from(track.querySelectorAll('.ig-post'));
  var total    = posts.length;
  var current  = 0;
  var startX   = 0;
  var dragging = false;
  var isMobile = false;

  function checkMobile() {
    isMobile = window.innerWidth <= 900;
  }

  function getSlideWidth() {
    var rect  = posts[0].getBoundingClientRect();
    var style = window.getComputedStyle(track);
    var gap   = parseFloat(style.columnGap) || 20;
    return rect.width + gap;
  }

  function goTo(index) {
    if (!isMobile) return;
    current = Math.max(0, Math.min(index, total - 1));
    track.style.transform = 'translateX(-' + (current * getSlideWidth()) + 'px)';
    dots.forEach(function (d, i) {
      d.classList.toggle('ig-dot--active', i === current);
    });
  }

  wrap.addEventListener('pointerdown', function (e) {
    if (!isMobile) return;
    startX   = e.clientX;
    dragging = true;
    track.style.transition = 'none';
    wrap.setPointerCapture(e.pointerId);
  });

  wrap.addEventListener('pointermove', function (e) {
    if (!dragging || !isMobile) return;
    var delta = e.clientX - startX;
    var base  = current * getSlideWidth();
    track.style.transform = 'translateX(-' + (base - delta) + 'px)';
  });

  wrap.addEventListener('pointerup', function (e) {
    if (!dragging || !isMobile) return;
    dragging = false;
    track.style.transition = '';
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 50) {
      goTo(dx < 0 ? current + 1 : current - 1);
    } else {
      goTo(current);
    }
  });

  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { goTo(i); });
  });

  document.addEventListener('keydown', function (e) {
    if (!isMobile) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft')  goTo(current - 1);
  });

  window.addEventListener('resize', function () {
    checkMobile();
    if (!isMobile) {
      track.style.transform = '';
      track.style.transition = '';
    } else {
      goTo(current);
    }
  });

  checkMobile();

  /* Re-process embeds if embed.js already loaded before this script */
  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
  }
})();