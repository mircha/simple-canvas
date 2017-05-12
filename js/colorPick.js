$(document).ready(function(){
	$("#selectColor").on('change', function(){
	  canvas.freeDrawingBrush.color = $(this).val();
	})
	$("#strokeSelect").on('change mousemove', function() {
	  $("#strokeSize").val($(this).val());
	  paintSize = parseInt($(this).val());
	  canvas.freeDrawingBrush.width = paintSize;
	});
	$("#strokeSize").on('change keyup', function(){
	  if (parseInt($(this).val()) > 99){
	    $(this).val(99);
	  }
	  paintSize = parseInt($(this).val());
	  $("#strokeSelect").val(paintSize)
	  canvas.freeDrawingBrush.width = paintSize;
	})
	$('#fill').on('click', function(){
	  var o = canvas.getActiveObject();
	  var fill = $("#selectColor").val();
	  if(o.type!=='image'){
	    o.setFill (fill);
	    canvas.renderAll();
	    canvas.trigger('object:modified', {target: o});
	  }else{
	      o.filters.push(new fabric.Image.filters.Tint({
	                color: fill,
	            }));
	            o.applyFilters(canvas.renderAll.bind(canvas));
	  }
	})
	$('#removeFill').on('click', function(){
	  var o = canvas.getActiveObject();
	  var fill = '';
		 if(o.type!=='image'){
		    o.setFill (fill);
		    canvas.renderAll();
		    canvas.trigger('object:modified', {target: o});
		}
	})
	$('#outline').on('click', function(){
	  var o = canvas.getActiveObject();
	  var stroke = $("#selectColor2").val();
	  o.setStroke (stroke);
	  canvas.renderAll();
	  canvas.trigger('object:modified', {target: o});
	})
	$('#removeOutline').on('click', function(){
	  var o = canvas.getActiveObject();
	  var stroke = '';
	  o.setStroke (stroke);
	  canvas.renderAll();
	  canvas.trigger('object:modified', {target: o});
	})
})