window.addEventListener("load", init);
window.addEventListener("resize", init);

function init(e) {
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
    // Disable notepad editing on mobile
    document.querySelector('[contenteditable]').setAttribute('contenteditable', false);
  }

  // NOT MOBILE
  else {
    // Make windows draggable if not mobile
    for ( var i=0; i < draggableElems.length; i++ ) {
      var backup = draggableElems[i].dataset.style;
      if (backup) {
        draggableElems[i].setAttribute('style',backup);
      }
      // enable editing
      document.querySelector('[contenteditable]').setAttribute('contenteditable', true);

      var draggableElem = draggableElems[i];
      var draggie = new Draggabilly( draggableElem, {
        handle: '.handle'
      });
      draggie.on('dragStart', function(event, pointer) {
        findAncestor(event.target, ".drag").classList.add('moved');
      });
      draggies.push( draggie );
    }
  }
}