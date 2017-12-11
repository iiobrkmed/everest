$('#id_search').attr("autocomplete", "off");

$('#search-accept-btn').click( function(event) {
				// check valid input form
				var empty = 0;
				// empty input it's 1
				if($('#id_search').val() == ''){
					empty = 1;
					console.log("1");
				}
				// filled input it's steel 0
				else{
					empty = 0;
					console.log("0");
				}

				// handler of result
				if(empty == 1){
					event.preventDefault();
					$('#search-accept-btn').css("background-color", "#ccc");
					$('#id_search').css("background-color", "yellow");
					$('#id_search').focus();
				} else {
                    $('#search-accept-btn').css("background-color", "#2ba6cb");
                    event.isDefaultPrevented();
                }
			});

            
            
$('#id_search').keyup(function(event) {
	if(this.value.length == 1 ) {
		$("#id_search").unbind("keyup");
        console.log(this.value.length)
	}
	else if(this.value.length == 0){
		$("#id_search").bind("keyup", function() {
			$('#id_search').css("background-color", "#fff");
    		$('#search-accept-btn').css("background-color", "#993333");
		});
	}
    $('#id_search').css("background-color", "#fff");
    $('#search-accept-btn').css("background-color", "#993333");
} );

// function checkerInputForm(){
// 	// check valid input form
// 		var empty = 1;
// 		// empty input it's 1
// 		if($('#id_search').val() == ''){
// 			empty = 0;
// 			console.log("0");
// 		}
// 		// filled input it's steel 0
// 		else{
// 			empty = 1;
// 			console.log("1");
// 		}

// 		// handler of result
// 		if(empty == 0){
// 			return true;
// 		}
// }

// $('#search-accept-btn').click(

// 			function(event) {

// 				if(checkerInputForm()){
// 					event.preventDefault();
// 					$('#search-accept-btn').css("background-color", "#ccc");					
// 				}
// 				else{
// 					return false;
// 				}
// 			}
// 	);



// $('#search-accept-btn').hover(
// 		function() {
// 			var empty = 0;

// 			if($('#id_search').val() == ''){
// 				empty = 1;
// 				console.log("1");
// 			}
// 			else{
// 				empty = 0;
// 				console.log("0");
// 			}
// 			if(empty == 1){
// 				$('#search-accept-btn')
// 				$('#search-accept-btn').css("background-color", "#ccc");
// 				console.log($('#id_search').html());
// 				$('#id_search').html('<input type="text" name="search" id="id_search" data-tooltip aria-haspopup="true" class="has-tip" data-disable-hover="false" title="Необходимо заполнить поле поиска!">');
// 				$('#id_search').css("background-color", "yellow");
// 				$('#id_search').focus();
// 			}
// 		},

// 		function() {
// 			$('#search-accept-btn').css("background-color", "#663333");
// 			$('#id_search').css("background-color", "#fff");
// 		}
// 	);



/* $('#search-accept-btn').click(

			function(event) {
				// check valid input form
				var empty = 1;
				// empty input it's 1
				if($('#id_search').val() == ''){
					empty = 0;
					console.log("0");
				}
				// filled input it's steel 0
				else{
					empty = 1;
					console.log("1");
				}

				// handler of result
				if(empty == 0){

					event.preventDefault();
					$('#search-accept-btn').css("background-color", "#ccc");
					$('#id_search').css("background-color", "yellow");
					$('#id_search').focus();
				}
			}
	);

$('#id_search').keyup(

		function(event) {
			event.isDefaultPrevented();
		}

	); */