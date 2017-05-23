function handleContextMenu(e){
  //e.preventDefault();
  // get mouse position relative to the canvas
  var x=parseInt(e.pageX);
  var y=parseInt(e.pageY);
  // hide the context menu
  showContextMenu(x,y);
  return(false);
}
function showContextMenu(x,y){
  if(canvas.getActiveObject() || canvas.getActiveGroup()){
    $('#context-menu').css({'top': y, 'left':x});
    $('#context-menu').show();
  }
}
function update(obj){
        	canvas.renderAll();
        	canvas.trigger('object:modified', {target: obj});
}
$(document).ready(function(){
canvas.on('mouse:down', function(){
	$('#context-menu').hide();
	$('#setsame').hide();
})
	document.addEventListener('contextmenu', handleContextMenu, false);
    $(document).keydown(function(e) {
    	if(e.keyCode == 82 && e.ctrlKey){

    	}else{
    		//e.preventDefault();
    	}
    	var obj = canvas.getActiveObject();
        if (e.keyCode == 49 && e.ctrlKey) {
            $("#rectangle").trigger('click');
        }
        if (e.keyCode == 50 && e.ctrlKey) {
            $("#circle").trigger('click');
        }
        if (e.keyCode == 46 && e.ctrlKey) {
            $("#removeMany").trigger('click');
        }
        if (e.keyCode == 68 && e.ctrlKey && obj) {
        	e.preventDefault();
            $("#clone").trigger('click');
        }
        if (e.keyCode == 38 && obj){
        	e.preventDefault();
        	obj.top -= 5;
        	update(obj)
        }
        if (e.keyCode == 40 && obj){
        	e.preventDefault();
        	obj.top += 5;
        	update(obj)
        }
        if (e.keyCode == 37 && obj){
        	e.preventDefault();
        	obj.left -=5;
        	update(obj)
        }
        if (e.keyCode == 39 && obj){
        	e.preventDefault();
        	obj.left += 5;
        	update(obj)
        }
    });
	$("#menu_delete").on('click', function(){
		$("#removeMany").trigger('click');
		$('#context-menu').hide();
	})
	$("#menu_duplicate").on('click', function(){
		$("#clone").trigger('click');
		$('#context-menu').hide();
	})
	$("#menu_lock").on('click', function(){
		$("#lock").trigger('click');
		$('#context-menu').hide();
	})
	$("#menu_set").on('click', function(){
		$("#setsame").toggle();
	})
	$("#setX").on('click', function(){
		$("#normalizeX").trigger('click');
	})
	$("#setY").on('click', function(){
		$("#normalizeY").trigger('click');
	})
	$("#setW").on('click', function(){
		$("#normalizeW").trigger('click');
	})
	$("#setH").on('click', function(){
		$("#normalizeH").trigger('click');
	})
})
