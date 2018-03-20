// Check off specific To dos by clicking
$("ul").on("click", "li", function() {
	$(this).toggleClass('completed');
});

//Click on X to Delete
$("ul").on("click", "span", function(event) {
	// On listens for future events when elements or tags are added
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	// Stop event Bubbling
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
	if(event.which === 13) {
		var toDoText = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class= 'fa fa-trash'></i></span> " + toDoText + "</li>");

	}
});

$("#toggle-form").click(function() {
	$("input[type='text']").fadeToggle();
});