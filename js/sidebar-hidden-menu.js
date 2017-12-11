
var timer;
var delay = 400;

$("#sidebar-hidden-menu").hover(

	function() {
		timer = setTimeout(function() {
			$("#sidebar-hidden-menu .menu-item-hint").stop(true).show(300);
			$("#sidebar-hidden-menu .menu-item-link").css("background-color", "rgba(240, 250, 255, 1)");
		}, delay);
	},

	function() {
		$("#sidebar-hidden-menu .menu-item-hint").delay(200).stop(true).hide(200);
		$("#sidebar-hidden-menu .menu-item-link").css("background-color", "inherit");
		clearTimeout(timer);
	}
);


$("#toggle-btn-sidebar").click(function(){
		$('#sidebar-hidden-panel').toggle(400);

		if($("#toggle-btn-sidebar").hasClass("active-toggle-btn")){
			$("#toggle-btn-sidebar").removeClass("active-toggle-btn");
		}
		else{
			$("#toggle-btn-sidebar").addClass("active-toggle-btn");	
		}
});
