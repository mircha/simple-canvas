function text(label, fill, stroke){
  var font = $("#textFont").val();
  var fontSize = $("#textSize").val();
  var fontWeight = ($("#textBold").hasClass('active') ? 'bold' : 'normal');
  var fontStyle = ($("#textItalic").hasClass('active') ? 'italic' : 'normal');
  var textDecoration1 = ($("#textUnderline").hasClass('active') ? 'underline' : '');
  var textDecoration2 = ($("#textStrike").hasClass('active') ? 'line-through' : '');

if(textDecoration1!='' && textDecoration2 !=''){
  textDecoration = textDecoration1+','+textDecoration2;
}else{
  if(textDecoration1==''){
    textDecoration = textDecoration2;
  }else{
    textDecoration = textDecoration1;
  }
}
fontFamily = getFontStyle(font);
var leftObj;
var topObj;
if(canvas.getActiveObject()){
  leftObj = canvas.getActiveObject().getLeft()+30;
  topObj = canvas.getActiveObject().getTop()+25;
}else{
  leftObj = 100;
  topObj = 100;
}
  var text = new fabric.IText(label, {
    id: j,fontFamily,fontWeight,fontStyle,textDecoration,fontSize,fill,stroke,originX: 'center',originY: 'center',left: leftObj,top:topObj
  });
  canvas.add(text)
emitUpdate()
}
function getFontStyle(font){
  switch (font) {
    case 'times': fontFamily = 'Times New Roman, Times, serif'; break;
    case 'arial': fontFamily = 'Arial, Helvetica, sans-serif'; break;
    case 'verdana': fontFamily = 'Verdana,Geneva,sans-serif'; break;
    case 'comic': fontFamily = '"Comic Sans MS", cursive, sans-serif'; break;
    case 'courier': fontFamily = '"Courier New", Courier, monospace'; break;
  }
  return fontFamily;
}
$(document).ready(function(){
$("#textSizeSelect").on('change mousemove', function() {
  $("#textSize").val($(this).val());
});
$("#textSize").on('change keyup', function(){
  if (parseInt($(this).val()) > 99){
    $(this).val(99);
  }
  textSize = parseInt($(this).val());
  $("#textSizeSelect").val(textSize)
})
  $("#label").on('change keyup', function(){
    if($(this).val()==''){
      $('#addText').attr('disabled', true);
    }else{
      $('#addText').attr('disabled', false);
    }
  })
  $('#addText').on('click', function(){
          var color = $("#selectColor").val();
          var label = $("#label").val();
          var stroke = $("#selectColor2").val();
          text(label, color, stroke)
          $("#label").val('').trigger('change');
  })
  $(".font").on('click', function(){
    var id = $(this).attr('id');
    $('#textFont').val(id);

    if(canvas.getActiveObject()){
      var text = canvas.getActiveObject();
      if(text.type=='i-text'){
        text.fontFamily= getFontStyle(id);
        canvas.renderAll();
        canvas.trigger('object:modified', {target: text});
      }
    }
  })
canvas.on('mouse:up', function(e){
  if(canvas.getActiveObject()){
    if(e.target && e.target.type=='i-text'){
      $("#textSize, #textSizeSelect").val(e.target.fontSize)
    }
  }
})
  $("#textSize, #textSizeSelect").on('change mousemove', function(){
    var size = $(this).val();
    console.log(size)
      if(canvas.getActiveObject()){
      var text = canvas.getActiveObject();
      if(text.type=='i-text'){
        text.fontSize= size;
        canvas.renderAll();
        canvas.trigger('object:modified', {target: text});
      }
    }
  })
  $("#textBold, #textItalic, #textUnderline, #textStrike").on('click', function(){
    $(this).toggleClass('active');
  })
})
