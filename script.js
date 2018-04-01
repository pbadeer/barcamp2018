window.addEventListener("load", function(event) {
    var draggableElems = document.querySelectorAll('.drag');
    var draggies = []
    for ( var i=0; i < draggableElems.length; i++ ) {
      var draggableElem = draggableElems[i];
      var draggie = new Draggabilly( draggableElem, {
        handle: '.handle'
      });
      draggies.push( draggie );
    }
});