function ungroup(activeObject){
  if(activeObject.type=="group"){
        var items = activeObject._objects;
        activeObject._restoreObjectsState();
        canvas.remove(activeObject);
        for(var i = 0; i < items.length; i++) {
          canvas.add(items[i]);
          canvas.item(canvas.size()-1).hasControls = true;
        }
        canvas.renderAll();
  emitUpdate()
    }
}
function emitUpdate(){
  j++;
  modified=true;
  var json = JSON.stringify(canvas);
  socket.emit('update', json, j);
}
$(document).ready(function() {
  $('#group').on('click', function(){
    var activegroup = canvas.getActiveGroup();
    var objectsInGroup = activegroup.getObjects();
    activegroup.clone(function(newgroup) {
        canvas.discardActiveGroup();
        objectsInGroup.forEach(function(object) {
            canvas.remove(object);
        });
        canvas.add(newgroup);
  emitUpdate()
    });
  });
  $("#ungroup").on('click', function(){
     var activeObject = canvas.getActiveObject();
     ungroup(activeObject)
  });

  $('#removeMany').on('click', function(){
  if(canvas.getActiveGroup()){
        canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o); });
        canvas.discardActiveGroup().renderAll();
      } else {
        var o=canvas.getActiveObject();
        canvas.remove(canvas.getActiveObject());
      }
  emitUpdate()
  })
  $('#clear').on('click', function(){
    canvas.clear();
    socket.emit('clear');
    j=0;
  })

  $("#forward").on('click', function(){
      var activeObject = canvas.getActiveObject(),
          activeGroup = canvas.getActiveGroup();
    // canvas.sendBackwards(myObject)
    // canvas.sendToBack(myObject)
    // canvas.bringForward(myObject)
    canvas.bringToFront(activeObject)
    emitUpdate()
  })

  $("#back").on('click', function(){
      var activeObject = canvas.getActiveObject(),
          activeGroup = canvas.getActiveGroup();
    // canvas.sendBackwards(myObject)
    canvas.sendToBack(activeObject)
    emitUpdate()
    // canvas.bringForward(myObject)
    //canvas.bringToFront(activeObject)
  })
  $("#clone").on('click', function(){
    var group;
    var object;
    if(canvas.getActiveObject()){
      var copyData = canvas.getActiveObject().toObject();
      group=false;
    }
    if(canvas.getActiveGroup()){
      var copyData = canvas.getActiveGroup().toObject();
      group=true;
    }
    canvas.deactivateAll().renderAll();
    fabric.util.enlivenObjects([copyData], function(objects) {
      objects.forEach(function(o) {
        o.set("id", j);
        j++;
        o.set('top', o.top + 15);
        o.set('left', o.left + 15);
        canvas.add(o);
        object=o;
        emitUpdate()
      });
      if(group) ungroup(object)
  });
  emitUpdate()
  });
  $('#draw').on('click', function(){
    canvas.isDrawingMode=true;
    canvas.freeDrawingBrush.color = $("#selectColor").val();
    strokeWidth = 1;
    canvas.freeDrawingBrush.width = strokeWidth;
    arrow = false;
    arrowStraight = false;
    arrowQ= false;
  })
  $('#paint').on('click', function(){
    canvas.isDrawingMode=true;
    canvas.freeDrawingBrush.color = $("#selectColor").val();
    strokeWidth = parseInt(paintSize);
    canvas.freeDrawingBrush.width = strokeWidth;
    canvas.freeDrawingBrush.strokeLineJoin = 'bevil';
    canvas.freeDrawingBrush.strokeLineCap = 'round';
    arrow = false;
    arrowStraight = false;
    arrowQ= false;
  })
  $('#noDraw').on('click', function(){
    canvas.isDrawingMode=false;
    arrow = false;
    arrowStraight = false;
    arrowQ= false;
  })
  $('#drawArrow').on('click', function(){
    arrow = true;
    arrowStraight = false;
    arrowQ= false;
    canvas.freeDrawingBrush.width = 3;
    canvas.isDrawingMode=true;
  })
  $('#drawArrowStraight').on('click', function(){
    arrow = false;
    arrowStraight = true;
    arrowQ= false;
    canvas.freeDrawingBrush.width = 3;
    canvas.isDrawingMode=true;
  })
  $("#drawQuad").on('click', function(){
    arrow = false;
    arrowStraight = false;
    arrowQ= true;
    canvas.freeDrawingBrush.width = 3;
    canvas.isDrawingMode=true;
  })
  $("body").on('click','#shadow', function(){
    var blurval = parseInt($('#blur').val());
    var offsetx = parseInt($("#offsetx").val());
    var offsety = parseInt($("#offsety").val());
    if(canvas.getActiveObject()){
      obj = canvas.getActiveObject();
        obj.setShadow({color: 'rgba(0,0,0, 0.5)',blur:blurval,offsetX:offsetx,offsetY:offsety});

      canvas.renderAll();
      canvas.trigger('object:modified', {target: obj});
    }
  })
  $("body").on('click','#removeShadow', function(){
    if(canvas.getActiveObject()){
      obj = canvas.getActiveObject();
      obj.setShadow(null)
      canvas.renderAll();
      canvas.trigger('object:modified', {target: obj});
    }
  })
  canvas.on("object:selected", function(e){
    if(canvas.getActiveObject()){
      var obj = canvas.getActiveObject()
      if(!obj.shadow){
        console.log('no shadow')
      }else{
        $('#blur').val(obj.shadow.blur);
        $("#offsetx").val(obj.shadow.offsetX);
          $("#offsety").val(obj.shadow.offsetY);
      }
    }
  })
  $("body").on('click','#clockwise, #counterClockwise',function(e){
    if(canvas.getActiveObject()){
      if(e.target.id=='clockwise' || e.target.id=='cw'){
        angle=-45;
      }else{
        angle=45;
      }
      var obj = canvas.getActiveObject();
      var curAngle = obj.getAngle();
      obj.setAngle(curAngle+angle);
      canvas.renderAll();
      canvas.trigger('object:modified', {target: obj});
    }
  })
  $("body").on('click','#flipX, #flipY',function(e){
    if(canvas.getActiveObject()){
      if(e.target.id=='flipX' || e.target.id=='fx'){
        flip='flipX';
      }else{
        flip='flipY';
      }
      var obj = canvas.getActiveObject();
      obj.toggle(flip);
      canvas.renderAll();
      canvas.trigger('object:modified', {target: obj});
    }
  })
});