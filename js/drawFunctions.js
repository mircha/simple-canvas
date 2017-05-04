function addImg(myImg){
    fabric.Image.fromURL(myImg, function(oImg) {
        oImg.set('id', parseInt(j));
        oImg.scale(0.3);

        if(myImg=='img/server2.svg' || myImg=='img/laptop.svg' || myImg=='img/news.svg'){
          oImg.scale(0.7);
         }

        oImg.set({'left':100});
        oImg.set({'top':100});
        oImg.set('id', j);
        j++;
          canvas.add(oImg)
          emitUpdate()
    });
}
function rectangle(color,stroke, width, height, left, top){
  var rect = new fabric.Rect({
    id: j,left: left,top: top,fill: color,stroke: stroke,width: width,height: height
  });
  canvas.add(rect);
emitUpdate()
}
function circle(fill, stroke){
  var circle = new fabric.Circle({
    id:j,radius: 30, fill, left: 100, top: 100, stroke
  });
  canvas.add(circle)
emitUpdate()
}
function triangle(fill, stroke){
  var triangle = new fabric.Triangle({
    id:j,width: 50, height: 50, fill, left: 50, top: 50, stroke
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
  $("#addArrow").on('click', function(e) {  addImg(arrow);  })
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

  $("#rectangle").on('click', function(e) {
    var color = $("#selectColor").val();
    var stroke = $("#selectColor2").val();
    rectangle(color,stroke,125,75,100,100);
  })
  $("#rectangleO").on('click', function(e) {
    var color = '';
    var stroke = $("#selectColor2").val();
    rectangle(color,stroke,125,75,100,100);
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