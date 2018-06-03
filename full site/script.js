window.addEventListener("load", init);
window.addEventListener("resize", init);

function startTime() {
  var today = new Date();
  var d = today.getDate();
  var mo = (today.getMonth() + 1);
  var y = today.getFullYear();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  d = checkTime(d);
  mo = checkTime(mo);
  m = checkTime(m);
  s = checkTime(s);
  document.querySelector('.clock').innerHTML =
  mo + "/" + d + "/" + y + " " + h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function openWindow (a) {
  var b = document.querySelector('.' + a);
  b.style.top = '25vh';
  b.style.opacity = 1;
  b.style.transform = '';
}

function unsleepMe(){
  var b = document.querySelector('.sleep');
  b.style.top = '-150%';
}
function sleepMe () {
  var b = document.querySelector('.sleep');
  b.style.top = '0';
}

function init(e) {
  startTime();

  function findAncestor (el, sel) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
    return el;
  }
  
  var draggableElems = document.querySelectorAll('.drag');
  var draggies = [];

  // MOBILE
  if (window && window.outerWidth <= 768) {
    // Remove inline styles on mobile
    for ( var i=0; i < draggableElems.length; i++ ) {
      if (draggableElems[i].style && !draggableElems[i].dataset.style) {
        // save a backup of styles
        draggableElems[i].dataset.style = draggableElems[i].getAttribute('style');
      }
        // erase styles
        draggableElems[i].setAttribute('style', '');
      
    }
  }

  // NOT MOBILE
  else {
    // Make windows draggable if not mobile
    for ( var i=0; i < draggableElems.length; i++ ) {
      var backup = draggableElems[i].dataset.style;
      if (backup) {
        draggableElems[i].setAttribute('style',backup);
      }

      var draggableElem = draggableElems[i];
      var draggie = new Draggabilly( draggableElem, {
        handle: '.handle'
      });
      draggie.on('dragStart', function(event, pointer) {
        findAncestor(event.target, ".drag").classList.remove('hidden');
      });
      draggies.push( draggie );
    }
  }
}