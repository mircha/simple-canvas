$(document).ready(function(){
	$("#svg").on('click', function(){
	  $('#saveJSONFile').modal({backdrop: 'static', keyboard: false},'show');
	})
	$("#save").on('click', function(){
	  $('#savePNGorSVG').modal({backdrop: 'static', keyboard: false},'show');
	})

	$("#jsonName").on('change keyup',function(){
	  if($(this).val()=='' || $(this).val()==' '){
	    $("#saveJson").addClass('disabled').attr('disabled', true)
	  }else{
	    var name = $(this).val();
	    $.ajax({
	    url: '/check_name',
	    type: 'GET',
	    dataType: 'TEXT',
	    data: {name},
	    }).always(function(check){
	      if(check=='true'){
	        $("#saveJson").removeClass('disabled').attr('disabled', false)
	        $("#jsonForm").removeClass('has-error').addClass('has-success');
	        $("#jsonFeedback").removeClass('glyphicon glyphicon-remove').addClass('glyphicon glyphicon-ok')
	        $("#saveJson").text('Save')
	      }else{
	        $("#saveJson").addClass('disabled').attr('disabled', true)
	        $("#jsonForm").removeClass('has-success').addClass('has-error');
	        $("#jsonFeedback").removeClass('glyphicon glyphicon-ok').addClass('glyphicon glyphicon-remove')
	        $("#saveJson").text('File already exists')
	      }
	    })
	  }
	})

	$("#saveJson").on('click', function(){
	  var name = $("#jsonName").val()
	  var json = JSON.stringify(canvas.toJSON(["lockMovementX", "lockMovementY","lockScalingX", "lockScalingY", "lockRotation", "selectable"]));
	  socket.emit('saveToJSON', json, name);
	  $("#jsonName").val('');
	  $(this).addClass('disabled').attr('disabled', true)
	  $("#jsonForm").removeClass('has-error').removeClass('has-success');
	  $("#jsonFeedback").removeClass('glyphicon glyphicon-ok')
	  $('#saveJSONFile').modal('hide');
	})

	$("#savePNG").on('click', function(){
	  var name = $("#pngName").val();
	  var save = document.getElementById("myCanvas"), ctx = canvas.getContext("2d");
	  var background = $(".radio input[type=radio]:checked").val();
	  if(background !='0'){
	  	canvas.backgroundColor=background;
	  }
	  canvas.renderAll();
	  save.toBlob(function(blob) {
	    saveAs(blob, name+".png");
	  });
	  canvas.backgroundColor="";
	  canvas.renderAll();
	  $('#savePNGorSVG').modal('hide');
	  $("#pngName").val('');
	  $("#background").val('FFFFFF');
	  $("#pickColor3").val('FFFFFF');
	  document.getElementById('pickColor3').jscolor.importColor();

	})
	$("#test").on('click', function(){
		alert($(".radio input[type=radio]:checked").val());
	})
	$("#saveSVG").click(function(){
	  var name = $("#pngName").val();
	  var background = $(".radio input[type=radio]:checked").val();
	  if(background !='0'){
	  	canvas.backgroundColor=background;
	  }
	  var trsvg = canvas.toSVG();
	  saveAs(new Blob([trsvg], {type:"application/svg+xml"}), name+".svg")
	  canvas.backgroundColor="";
	  canvas.renderAll();
	  $('#savePNGorSVG').modal('hide');
	  $("#pngName").val('');
	  $("#background").val('FFFFFF');
	  $("#pickColor3").val('FFFFFF');
	  document.getElementById('pickColor3').jscolor.importColor();
	})

	$("#loadJson").on('click', function(){
	    socket.emit('loadFiles');
	    $("#sqlFiles").html('please wait while loading')
	    $('#files').modal({backdrop: 'static', keyboard: false},'show');
	})

	$("#help").on('click', function(){
		$("#viewport").hide();
		$('#helpPage').show();
	})

	$("#closeHelp").on('click', function(){
		$("#viewport").show();
		$('#helpPage').hide();
	})
})
