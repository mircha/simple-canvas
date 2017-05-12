$(document).click( "#drawLine", function(){
if(drawLine == true){
var line, isDown;
 console.log(drawLine) 
    canvas.on('mouse:down', function(o){
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
      line = new fabric.Line(points, {
        strokeWidth: 5,
        fill: 'red',
        stroke: 'red',
        originX: 'center',
        originY: 'center'
      });
      canvas.add(line);
    });

    canvas.on('mouse:move', function(o){
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);
      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    });

    canvas.on('mouse:up', function(o){
      isDown = false;
      emitUpdate();
    });
  }
})


