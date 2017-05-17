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
    canvas.sendToBack(activeObject)
    emitUpdate()
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

canvas.on("object:moving", function(e){
  if(canvas.getActiveObject()){
    canvas.getActiveObject().opacity = 0.5;
  }
})
canvas.on("mouse:up", function(e){
  if(canvas.getActiveObject()){
    obj = canvas.getActiveGroup();
    canvas.getActiveObject().opacity = 1;
    canvas.trigger('object:modified', {target: obj});
  }
})

  var collection =[];
  canvas.on("object:selected", function(e){
/*  var moved = false;
    canvas.on("object:moving", function(e){
      moved = true;
      if(canvas.getActiveObject()){
        var obj = canvas.getActiveObject();
        obj.opacity=0.7;
      }
      if(canvas.getActiveGroup()){
        var group = canvas.getActiveGroup();
        group.opacity=0.7;
      }
    })
*/

    if(canvas.getActiveObject()){
      collection[0] = canvas.getActiveObject();
      var obj = canvas.getActiveObject()
      var opacity = obj.opacity;
        //  obj.on('deselected', function(){
        //   obj.opacity=1;
        //   if(moved){
        //     canvas.trigger('object:modified', {target: obj});
        //     moved = false;
        //   }
        // })
      /*
      canvas.on('mouse:up', function(){

        if(canvas.getActiveObject()){
          var obj = canvas.getActiveObject();
          obj.set({opacity: opacity});
          if(moved){
            //canvas.trigger('object:modified', {target: obj});
            emitUpdate();
            moved = false;
          }
          canvas.renderAll();
        }
        if(canvas.getActiveGroup()){
          var group = canvas.getActiveGroup();
          group.set({opacity: opacity});
          canvas.renderAll();
        }
      });
*/
    if(obj.lockMovementX==true && obj.type!='text'){
      var leftObj = obj.getLeft()-20;
      var topObj = obj.getTop()-20;
      var textLock = new fabric.Text('*', {left: leftObj, top: topObj, fill:'red', id: 'lock'});
      textLock.toggle('lockScalingX').toggle('lockScalingY').toggle('lockRotation').toggle('lockMovementX').toggle('lockMovementY').toggle('selectable');
      canvas.add(textLock)
        obj.on('deselected', function(){
          canvas.remove(textLock)
        })
    }
      if(!obj.shadow){
        //console.log('no shadow')
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
  $("#lock").on('click', function(){
    if(canvas.getActiveObject()){
      var obj = canvas.getActiveObject();
      // {lockScalingX: true,lockScalingY: true,lockRotation: true,lockMovementX = true;}
      obj.toggle('lockScalingX').toggle('lockScalingY').toggle('lockRotation').toggle('lockMovementX').toggle('lockMovementY')
    }
  })
  $('body').on('click',"#normalizeX", function(){
    if(canvas.getActiveGroup()){
        var group = canvas.getActiveGroup();
        if(collection[0]){
            group.forEachObject(function(obj){
              obj.left = collection[0].left
            })
        }else{
              group.forEachObject(function(obj){
                obj.left = group.item(0).left
              })
            }
      canvas.renderAll();
      emitUpdate();
    }
  })
  $('body').on('click', "#normalizeY",function(){
    if(canvas.getActiveGroup()){
        var group = canvas.getActiveGroup();
        if(collection[0]){
            group.forEachObject(function(obj){
              obj.top = collection[0].top
            })
        }else{
            group.forEachObject(function(obj){
              obj.top = group.item(0).top
            })
      }
      canvas.renderAll();
      emitUpdate();
    }
  })
  $('body').on('click',"#normalizeW", function(){
    if(canvas.getActiveGroup()){
        var group = canvas.getActiveGroup();
        if(collection[0]){
            group.forEachObject(function(obj){
              obj.width = collection[0].width
              obj.scaleX = collection[0].scaleX
            })
        }else{
            group.forEachObject(function(obj){
              obj.scaleX = group.item(0).scaleX
              obj.width = group.item(0).width
            })
      }
      canvas.renderAll();
      emitUpdate();
    }
  })
  $('body').on('click',"#normalizeH", function(){
    if(canvas.getActiveGroup()){
        var group = canvas.getActiveGroup();
        if(collection[0]){
            group.forEachObject(function(obj){
              obj.height = collection[0].height
              obj.scaleY = collection[0].scaleY
            })
        }else{
            group.forEachObject(function(obj){
              obj.height = group.item(0).height
              obj.scaleY = group.item(0).scaleY
            })
      }
      canvas.renderAll();
      emitUpdate();
    }
  })
  $("body").on('click','#serializeX', function(){
    if(canvas.getActiveGroup()){
        var group = canvas.getActiveGroup();
        group.left = 10;
        group.originX = 'center';
        group.originY = 'top'
        var k=0;
        var offset=0;
        // if(collection[0]){
        //     group.forEachObject(function(obj){
        //       if(k==1){
        //         offset += collection[0].width+25
        //         obj.offset = collection[0].width+25

        //       }else{
        //       offset += (parseInt(group.item(k-2).width)+25)
        //       obj.left = offset;
        //       }
        //       obj.top = group.item(0).top
        //       k++;
        //       console.log(obj.left)
        //     })
        // }else{
            group.forEachObject(function(obj){
              obj.left = offset;
              offset += (parseInt(group.item(k).width*group.item(k).scaleX+25))
              console.log(offset)
              k++;
              obj.top = group.item(0).top;
            })
      // }
      group.left = 10;
      canvas.renderAll();
      emitUpdate();
    }
  })
  $("body").on('click','#serializeY', function(){
    if(canvas.getActiveGroup()){
        var group = canvas.getActiveGroup();
        group.top = 10;
        group.originX = 'center';
        group.originY = 'top'
        var k=0;
        var offset=0;
            group.forEachObject(function(obj){
              obj.top = offset;
              offset += (parseInt(group.item(k).height*group.item(k).scaleY+25))
              console.log(offset)
              k++;
              obj.left = group.item(0).left;
            })
      group.top = 10;
      canvas.renderAll();
      emitUpdate();
    }
  })
  var dbcheck = false;
  var arrowcheck1 = true;
  var arrowcheck2 = true;
  var p1 = {x:0, y:0};
  var p2 = {x:0, y: 0};
  var px = [];
  var py = [];
  var quad = '';
  fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (e) {
    var target = canvas.findTarget(e);
    var pointer = canvas.getPointer(event.e);
    
    canvas.on('mouse:down', function(e){
      if(dbcheck == true){
      
        px.push(canvas.getPointer(event.e).x);
        py.push(canvas.getPointer(event.e).y);
        //px.push(p1);
      }
    })
    if(dbcheck == false){
      if(!target){
        arrowcheck1 = false;
      }
      // p1 = target.getCenterPoint();
       p1.x = pointer.x;
       p1.y = pointer.y;
      dbcheck = true;
    }else{
      if(!target){
        arrowcheck2 = false;
      }
       //p2 = target.getCenterPoint();
       p2.x = pointer.x;
       p2.y = pointer.y;
      dbcheck = true;

      for (cc=1; cc<px.length-2;cc++){
        quad +=`Q ${px[cc]}, ${py[cc]} `;
      }
      pathx = `M ${p1.x} ${p1.y} ${quad}  ${p2.x} ${p2.y}`
      var newLine = new fabric.Path(pathx, {
        stroke: 'black',
        strokeWidth: 2,
        //originX:'right',
        //originY: 'bottom',
        //strokeDashArray: [5, 5],
        fill: ''
      })
      canvas.add(newLine)
      // if(arrowcheck1 && arrowcheck2){
      //   var angleDeg = calcDeg(p1.x, p2.x, p1.y, p2.y)
      //   arrowToGroup(p2.x,p2.y,Math.ceil(angleDeg), newLine)
      // }
      if(arrowcheck1 && arrowcheck2){
        straightArrow(p2.x,p2.y,p1.x,p1.y, newLine)
        canvas.remove(newLine)
      }else{
        if(arrowcheck1 && px.length>3){
        quadArrow(quad, px[px.length-3], py[py.length-3], px[px.length-1], py[py.length-1], newLine)
        }
      }
      
      dbcheck = false;
      arrowcheck1 = true;
      arrowcheck2 = true;
      canvas.off('mouse:down')
      px.length=0;
      py = [];
      quad = '';
    }
  });
});
