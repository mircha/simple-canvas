function addImg(myImg){
    fabric.Image.fromURL(myImg, function(oImg) {
      if(myImg=='img/arrow.svg') {alert('a')}
        oImg.set('id', parseInt(j));
        oImg.scale(0.3);

        if(myImg=='img/server2.svg' || myImg=='img/laptop.svg' || myImg=='img/news.svg' || myImg=='img/cloud.svg' || myImg=='img/chat.svg'){
          oImg.scale(0.7);
        }
        if(myImg=='img/database-alt1.svg' || myImg=='img/database.svg' || myImg=='img/antenna.svg' || myImg=='img/servers.svg'){
          oImg.scale(0.2);
        }
        oImg.set({'left':left()});
        oImg.set({'top':tops()});
        oImg.set('id', j);
        j++;
          canvas.add(oImg)
          emitUpdate()
    });
}
function left(){
  var position = Math.random(10) * canvas.width/1.5;
  return position;
}
function tops(){
  var position = Math.random(10) * canvas.height/2;
  return position;
}
function rectangle(color,stroke, width, height){
  var rect = new fabric.Rect({
    id: j,left: left(),top: tops(),fill: color,stroke: stroke,width: width,height: height,
  });
  canvas.add(rect);
emitUpdate()
}
function addArrowHead( L, T, Lstart, Tstart, path, pivotx, pivoty){
  var start = {x: pivotx, y: pivoty};
  var end = {x: L, y: T};
  var angleDeg = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
  var adj=90;
  var centerX = (L + L) / 2,  centerY = (T + T) / 2;
  var arrowx;
  // deltaX = L - centerX,
  // deltaY = T - centerY;
        arrowx = new fabric.Triangle({
            left: L /*+ deltaX*/,
            top: T  /*+ deltaY*/,
            originX: 'center',
            originY: 'center',
            hasBorders: false,
            hasControls: false,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            pointType: 'arrow_start',
            angle: angleDeg+adj,
            width: 15,
            height: 15,
            fill: '#000'
        });
        canvas.add(arrowx);
        var group = new fabric.Group([arrowx.clone(),path.path.clone()]);
        canvas.add(group);
        canvas.remove(arrowx);
        canvas.remove(path.path);
  canvas.renderAll()
emitUpdate()
}
function straightArrow(L, T, Lstart, Tstart, path){
  var pathP = `M ${Lstart} ${Tstart} L ${L} ${T}`;
  var line = new fabric.Path(pathP, {
    stroke: 'black',
    strokeWidth: 3,
    fill: ''
  })
  canvas.add(line);//console.log(line)
  var lineL = line.path[0][1];
  var lineT = line.path[0][2];

  var start = {x: lineL, y: lineT};
  var end = {x: L, y: T};
  var angleDeg = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
          arrowx = new fabric.Triangle({
            left: L /*+ deltaX*/,
            top: T  /*+ deltaY*/,
            originX: 'center',
            originY: 'center',
            hasBorders: false,
            hasControls: false,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            pointType: 'arrow_start',
            angle: angleDeg+90,
            width: 15,
            height: 15,
            fill: '#000'
        });
  canvas.add(arrowx)
  canvas.remove(path.path);
        var group = new fabric.Group([arrowx.clone(),line.clone()]);
        canvas.add(group);
        canvas.remove(arrowx);
        canvas.remove(line);
  canvas.renderAll();
}
function qArrow(L, T, Lstart, Tstart, path){
  var Lhalf = (L+Lstart)/2;
  var halfPath = parseInt(path.path.path.length/2);
  var halfPathT = path.path.path[halfPath][2]
  var halfPathL = path.path.path[halfPath][1]

 if(halfPathT > T){
  offsetT = 100;
 }else{
  offsetT = -100;
 }
 offsetY = 0;
  var start = {x: Lstart, y: Tstart};
  var end = {x: L, y: T};
  var angleDeg = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;

if((angleDeg > 50 && angleDeg < 160) || (angleDeg <-50 && angleDeg > -105)){
  offsetY = 100;
}
if(halfPathL < L && halfPathL < Lstart ){
  offsetY = -100
}
  var pathP = `M${Lstart},${Tstart} Q${Lhalf+offsetY},${T+offsetT} ${L},${T}`;
    var line = new fabric.Path(pathP, {
    stroke: 'black',
    strokeWidth: 3,
    fill: ''
  })
    canvas.add(line);
    
    
  var start = {x: path.path.path[path.path.path.length-10][1], y: path.path.path[path.path.path.length-10][2]};
  var end = {x: L, y: T};
  var angleDeg = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;

canvas.remove(path.path);
          arrowx = new fabric.Triangle({
            left: L /*+ deltaX*/,
            top: T  /*+ deltaY*/,
            originX: 'center',
            originY: 'center',
            hasBorders: false,
            hasControls: false,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            lockFill: true,
            pointType: 'arrow_start',
            angle: angleDeg+90,
            width: 15,
            height: 15,
            fill: '#000'
        });
        canvas.add(arrowx)
          var group = new fabric.Group([arrowx.clone(),line.clone()]);
        canvas.add(group);
        canvas.remove(arrowx);
        canvas.remove(line);
  canvas.renderAll();
}
function circle(fill, stroke){
  var circle = new fabric.Circle({
    id:j,radius: 30, fill, left: left(), top: tops(), stroke
  });
  canvas.add(circle)
emitUpdate()
}
function triangle(fill, stroke){
  var triangle = new fabric.Triangle({
    id:j,width: 50, height: 50, fill, left: left(), top: tops(), stroke
  });
  canvas.add(triangle)
emitUpdate()
}
$(document).ready(function() {

  $("#addServer").on('click', function(e) { addImg(serverImg);  })
  $("#addServers").on('click', function(e) {  addImg(serversImg); })
  $("#addLib").on('click', function(e) {  addImg(libImg); })
  $("#addPC").on('click', function(e) { addImg(pcImg);  })
  $("#addDb").on('click', function(e) { addImg(dbImg);  })
  $("#addArrow").on('click', function(e) {  addImg(arrowIMG);  })
  $("#addArrows").on('click', function(e) {  addImg(arrows); })
  $("#addCache").on('click', function(e) {  addImg(cache);  })
  $("#addFtp").on('click', function(e) {  addImg(ftp);  })
  $("#addUnc").on('click', function(e) {  addImg(unc);  })
  $("#addPC2").on('click', function(e) {  addImg(pcImg2); })
  $("#addLib2").on('click', function(e) {  addImg(libImg2);  })
  $("#line").on('click', function(e) {  addImg(lineH);  })
  $("#addNews").on('click', function(e) {  addImg(news);  })
  $("#lineVertical").on('click', function(e) {  addImg(lineV);  })
  $("#lineDiag").on('click', function(e) {  addImg(lineD);  })
  $("#addCloud").on('click', function(e) {  addImg(cloud);  })
  $("#addChat").on('click', function(e) {  addImg(chat);  })
  $("#addArrow2").on('click', function(e) {  addImg(arrow2);  })

  $("#rectangle").on('click', function(e) {
    var color = $("#selectColor").val();
    var stroke = $("#selectColor2").val();
    rectangle(color,stroke,125,75);
  })
  $("#rectangleO").on('click', function(e) {
    var color = '';
    var stroke = $("#selectColor2").val();
    rectangle(color,stroke,125,75);
  })  
  $("#triangle").on('click', function(e) {
    var color = $("#selectColor").val();
    var stroke = $("#selectColor2").val();
    triangle(color, stroke);
  })
  $("#triangleO").on('click', function(e) {
    var color = '';
    var stroke = $("#selectColor2").val();
    triangle(color, stroke);
  })
  $("#circle").on('click', function(e) {
    var stroke = $("#selectColor2").val();
    var color = $("#selectColor").val();
    circle(color, stroke);
  })
  $("#circleO").on('click', function(e) {
    var stroke = $("#selectColor2").val();
    var color = '';
    circle(color, stroke);
  })
})