$(document).ready(function(){
    var articleUrl,
        pk;
        
    $(".listen").click(function(e){
        e.preventDefault();
        articleUrl = $(this).attr("data-url");
        pk = $(this).attr("data-pk");
        $.ajax({
            type: "GET",
            url: "/voice/play/?url=www2.brkmed.ru" + articleUrl + "&tag=article&css_class=article&pk=" + pk,
            beforeSend: function(){
                console.log("beforeSend");
                console.log("URL = " + "/voice/play/?url=www.brkmed.ru" + articleUrl + "&tag=article&css_class=article&pk=" + pk);
            },
            success: function(data){
                console.log("success");
                console.log(data);
            },
            error: function(xhr, status, error){
                console.log("error");
                console.log(xhr.responseText);
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    });
})


/* $(document).ready(function(){
	var articleUrl,
		container,
		pk,
		startProgress,
		time,
		allTime;
		
	function voicer(){
		function startVoicer(){
			$.ajax({
				type: 'GET',
				url: '/voice/play/?url=www.brkmed.ru' + articleUrl + '&tag=article&css_class=article&pk=' + pk,
				success: function(data){
					$(container).append(data);
					$(container).append('<a href="javascript:void(0);" class="close-player-button">&times;</a>');
					console.log('success');
					$('.loader').hide();
					audiojs.events.ready(function(){
						var player = audiojs.createAll({
							trackEnded: function(){
								var next = $('.voices-list li.playing').next();
								if(!next.length){
									next = $('.voices-list li').first();
								}
								if($('.voices-list li:last-child').hasClass('playing') && next.length){
									$('.voices-list li').removeClass('playing');
									$('.voices-list li').first().addClass('playing');
									return false;
								}
								next.addClass('playing').siblings().removeClass('playing');
								audio.load($('a', next).attr('data-src'));
								audio.play();
							}
						});
							
						player.currentTime = 0;
						
						var progressBar = document.getElementById('progress');
						var audio = player[0];
						first = $('.voices-list a').attr('data-src');
						$('.voices-list li').first().addClass('playing');
						audio.load(first);
						
						$('.replay').click(function(){
							audio.pause();
							player.currentTime = 0;
							$('.voices-list').find('.playing').removeClass();
							$('.voices-list li').first().addClass('playing');
							audio.load(first);
							audio.play();
							$('#progress').attr('value','0');
						});
						
						$('.close-player-button').click(function(){
							$(this).parents('.audio-container').empty().hide();
							player.currentTime = 0;
						});
						
						var players = document.getElementById("voicer");
						time = players.currentTime;
						var audioLength = players.getAttribute('data-seconds');
						$('progress').attr('max', audioLength);
						progressBar.value = 0;

						function setUpdate(){
							progressBar.value += 1;
							if(progressBar.value == audioLength){
								clearInterval(startProgress);
							};	
						};
						
						players.onplay = function(){
							startProgress = setInterval(function(){
								setUpdate();
							},1000);	
						};
						
						players.onpause = function(){
							clearInterval(startProgress);
						};						
						
						if($('.audiojs').hasClass('error')){
							progressBar.value = 0;
							clearInterval(startProgress);
						};
						
						$('.replay').click(function(){
							progressBar.value = 0;
							clearInterval(startProgress);
						});							

						if(($('audio').attr('data-ready') == 'False') || $('audio').attr('src') == 'undefined'){
							console.log('data-ready = False || error, повторяем запрос через 10 сек');
							$(container).show();
							$('.loader').show();
							var intervalVoicer = setTimeout(function(){
								startVoicer();
							},10000);
						}else{
							console.log('data-ready = True, начинаем воспроизведение');
							clearTimeout(intervalVoicer);
							audio.play();
						};
					});
				},
				error: function(){
					console.log('error');
				},
				beforeSend: function(){
					$('.player').empty();
					$(container).show();
					$('.loader').append('<div class="waiting-voice-message">Пожалуйста, подождите!<br>Происходит синтез речи</div>').show();
				}
			});
		};
		
		function messageForIE(){
			$(container).append('<div class="message-for-ie">Данный браузер не поддерживает сервис синтеза речи!</div><a href="javascript:void(0);" class="close-player-button">&times;</a>').show();
			$('.loader').hide();
			$('.close-player-button').click(function(){
				$('.audio-container').empty().hide();
			});
		};
		
		if($.browser.msie || document.documentMode || /Edge/.test(navigator.userAgent)){
			console.log('browser == msie || edge');
			messageForIE();
		}else{
			startVoicer();
		};
			
		if($('.article-list .audio-container').is(':hidden')){
			$(this).parents('footer').next().show();
			var heightArticle = $(this).parents('article').height();
			var widthArticle = $(this).parents('article').width();
			$(this).parents("article").find(".audio-container").css("height", heightArticle).css("width", widthArticle + 30).show();
		};
	};	
	
	$('.listen').click(function(){
		articleUrl = $(this).attr('data-url');
		container = $(this).parents('footer').next();
		$('.loader').show();
		pk = $(this).attr('data-pk');
		$('.audio-container').not(container).hide();
		
		voicer();
	});
		
	$('.dub-button-full-article').click(function(){
		articleUrl = $(this).attr('data-url');
		container = $(this).prev('article').find('.audio-container');
		pk = $(this).attr('data-pk');
		$(container).show();
		$('.loader').show();
		
		voicer();
	});
}); */