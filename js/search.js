function searchShow() {
	$(".opn-btn_search").hide(500);
	$(".search-container").show(700);
	$("#id_q").focus();
}

function searchHide() {
	$(".opn-btn_search").show(300);
	$(".search-container").hide(400);
}

$(document).mouseup(function(event) {
    if ($(event.target).closest('.search-container').length) return;
    searchHide();
    event.stopPropagation();
});