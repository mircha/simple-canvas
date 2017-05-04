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
  switch (font) {
    case 'times': fontFamily = 'Times New Roman, Times, serif'; break;
    case 'arial': fontFamily = 'Arial, Helvetica, sans-serif'; break;
    case 'verdana': fontFamily = 'Verdana,Geneva,sans-serif'; break;
    case 'comic': fontFamily = '"Comic Sans MS", cursive, sans-serif'; break;
    case 'courier': fontFamily = '"Courier New", Courier, monospace'; break;
  }
  var text = new fabric.Text(label, {
    id: j,fontFamily,fontWeight,fontStyle,textDecoration,fontSize,fill,stroke,originX: 'center',originY: 'center',left: 100,top: 100,
  });
  canvas.add(text)
emitUpdate()
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
  })
  $("#textBold, #textItalic, #textUnderline, #textStrike").on('click', function(){
    $(this).toggleClass('active');
  })
})