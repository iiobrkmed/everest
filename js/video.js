"use strict";

/***** START BOILERPLATE CODE: Load client library, authorize user. *****/

  // Global variables for GoogleAuth object, auth status.
  var GoogleAuth;
  var isAuthorized;
  var currentApiRequest;
    
  /**
   * Load the API's client and auth2 modules.
   * Call the initClient function after the modules load.
   */
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes

    gapi.client.init({
        'clientId': '100752540185-0bba1l10b9urvtdgn2nfjmf12q7a6q7s.apps.googleusercontent.com',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      setSigninStatus();
      
    });
  }

  function setSigninStatus() {
    var user = GoogleAuth.currentUser.get();
    isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
    // Toggle button text and displayed statement based on current auth status.
    console.log("Проверка статуса авторизации пользователя");
    if(isAuthorized){
        //запрос на проверку подписан ли пользователь или нет. если подписан добавляем класс к кнопке
        /*buildApiRequest('GET',
            '/youtube/v3/subscriptions',
            {'forChannelId': 'UCOeG8V5kWy9hwA3m1jmw5PQ',
             'mine': 'true',
             'part': 'snippet,contentDetails'});*/
            /*var user_status = buildApiRequest('GET',
                '/youtube/v3/subscriptions',
                {'forChannelId': 'UCOeG8V5kWy9hwA3m1jmw5PQ',
                 'mine': 'true',
                 'part': 'snippet,contentDetails'});
            console.log("foo = " + executeRequest(user_status));*/
            
        console.log("Пользователь авторизован. Проверяем подписку пользователя");
    } else {
        console.log("Пользователь не авторизирован");
        $("#subscribe-button").removeClass("subscribe-ok").addClass(".subscribe-none").html("Подписаться");
        $("#like-button, #dislike-button").removeClass("selected");
    }
  }

  function updateSigninStatus(isSignedIn) {
    setSigninStatus();
    console.log("статус пользователя изменился");
  }

  function createResource(properties) {
    var resource = {};
    var normalizedProps = properties;
    for (var p in properties) {
      var value = properties[p];
      if (p && p.substr(-2, 2) == '[]') {
        var adjustedName = p.replace('[]', '');
        if (value) {
          normalizedProps[adjustedName] = value.split(',');
        }
        delete normalizedProps[p];
      }
    }
    for (var p in normalizedProps) {
      // Leave properties that don't have values out of inserted resource.
      if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
        var propArray = p.split('.');
        var ref = resource;
        for (var pa = 0; pa < propArray.length; pa++) {
          var key = propArray[pa];
          if (pa == propArray.length - 1) {
            ref[key] = normalizedProps[p];
          } else {
            ref = ref[key] = ref[key] || {};
          }
        }
      };
    }
    return resource;
  }

  function removeEmptyParams(params) {
    for (var p in params) {
      if (!params[p] || params[p] == 'undefined') {
        delete params[p];
      }
    }
    return params;
  }

  function executeRequest(request) {
    request.execute(function(response) {
      console.log(response);
    });
  }
  
  function buildApiRequest(requestMethod, path, params, properties) {
    params = removeEmptyParams(params);
    var request;
    if (properties) {
      var resource = createResource(properties);
      request = gapi.client.request({
          'body': resource,
          'method': requestMethod,
          'path': path,
          'params': params
      });
    } else {
      request = gapi.client.request({
          'method': requestMethod,
          'path': path,
          'params': params
      });
    }
    executeRequest(request);
  }

  /***** END BOILERPLATE CODE *****/

  function videosRate(params) {
  params = removeEmptyParams(params); // See full sample for function
  var request = gapi.client.youtube.videos.rate(params);
  executeRequest(request);
}

/*события по клику like*/

var present_like_count, present_dislike_count;

$("#like-button").on("click", function () {
    
    present_like_count = parseInt($(this).find("#like-count").text());
    present_dislike_count = parseInt($("#dislike-button").find("#dislike-count").text());
    
    if (isAuthorized) {
        if ($("#like-button").hasClass("selected")) {
           $("#like-button").removeClass("selected");
           $("#like-button").find("#like-count").empty().append(present_like_count - 1);
           console.log(present_like_count - 1);
        } else {
            if ($("#dislike-button").hasClass("selected")) {
               $("#dislike-button").removeClass("selected");
               $("#like-button").addClass("selected");
               $("#dislike-button").find("#dislike-count").empty().append(present_dislike_count - 1);
               $("#like-button").find("#like-count").empty().append(present_like_count + 1);
               console.log(present_dislike_count - 1);
            } else {
               $("#like-button").addClass("selected");
               $("#like-button").find("#like-count").empty().append(present_like_count + 1);
               console.log(present_like_count + 1);
               $("body").append("<div class='message' id='like-message' style='display:none'><p>Отметка &laquo;Мне нравится&raquo; поставлена</p></div>");
                //videosRate({'id': $(".video-items").find(".playing").attr("data-videoid"), 'rating': 'like'});
                $("#like-message.message").slideDown(500);
                remove_message();
           }
        }
    } else {
        GoogleAuth.signIn();//Показываем окно с просьбой авторизации
    }
});


$("#dislike-button").on("click", function () {
    
    present_like_count = parseInt($("#like-button").find("#like-count").text());
    present_dislike_count = parseInt($(this).find("#dislike-count").text());
    
    if (isAuthorized) {
        if ($("#dislike-button").hasClass("selected")) {
           $("#dislike-button").removeClass("selected");
           $("#dislike-button").find("#dislike-count").empty().append(present_dislike_count - 1);
           console.log(present_dislike_count - 1);
        } else {
            if ($("#like-button").hasClass("selected")) {
               $("#like-button").removeClass("selected");
               $("#dislike-button").addClass("selected");
               $("#like-count").empty().append(present_like_count - 1);
               $("#dislike-count").empty().append(present_dislike_count + 1);
               console.log(present_like_count - 1);
            } else {
               $("#dislike-button").addClass("selected");
               $("#dislike-button").find("#dislike-count").empty().append(present_dislike_count + 1);
               console.log(present_dislike_count + 1);
               $("body").append("<div class='message' id='dislike-message' style='display:none'><p>Отметка &laquo;Мне нравится&raquo; поставлена</p></div>");
                //videosRate({'id': $(".video-items").find(".playing").attr("data-videoid"), 'rating': 'dislike'});
                $("#dislike-message.message").slideDown(500);
                remove_message();
            }
        }
    } else {
        GoogleAuth.signIn();//Показываем окно с просьбой авторизации
    }
});

/*событие по клику shared*/
$("#shared-button").on("click", function () {
    $(".shared-block").fadeIn(300, function() {
        $(this).show();
    });
    $("#shared-link-input").val("https://youtu.be/" + $(".playlists").find(".playing").attr("data-videoid"));
    $("#shared-link-input").select();
});

$("#shared-container").on("click", "#close-shared-block", function (e) {
    e.preventDefault();
    $(this).parents(".shared-block").fadeOut(300, function () {
        $(this).hide();
    });
    $("#shared-link-input").val("");
    $("#shared-link-input").attr("value","");
});

$("#shared-container").on("click", "#shared-link-input", function () {
    $("#shared-link-input").select();
});

$(document).mouseup(function(event) {
    if ($(event.target).closest(".shared-block").length) return;
    $(".shared-block").fadeOut(300, function(){
        $(this).hide();
    });
    event.stopPropagation();
});

$("#copy-shared-link-button").on("click", function(){
    document.execCommand('copy');
    $("#shared-link-input").select();
    $("body").append("<div class='message' id='copy-shared-link' style='display:none'><p>Ссылка скопирована в буфер обмена</p></div>");
    $("#copy-shared-link.message").slideDown(500);
    remove_message();
});

/*событие подписаться*/
$("#subscribe-button").on("click", function(){
    console.log("Нажата кнопка подписаться");
    if($(this).hasClass("subscribe-none") && isAuthorized){
        console.log("Пользователь авторизован и не подписан. Подписываем пользователя");
        buildApiRequest('POST',
                '/youtube/v3/subscriptions',
                {'part': 'snippet'},
                {'snippet.resourceId.kind': 'youtube#channel',
                 'snippet.resourceId.channelId': 'UCOeG8V5kWy9hwA3m1jmw5PQ'
        });//отправляем запрос на подписку
        
        $("#subscribe-button").removeClass("subscribe-none").addClass("subscribe-ok").html("Подписка оформлена");
        $("body").append("<div class='message' id='subscribe-message' style='display:none'><p>Подписка оформлена</p></div>");
        $("#subscribe-message.message").slideDown(500);
        remove_message();
        //$("#subscribe-button").unbind("click");
    } else if($(this).hasClass("subscribe-none") && !isAuthorized){
        console.log("пользователь не подписан и не авторизован. Авторизируем пользователя, и подписываем на канал");
        GoogleAuth.signIn();
        //Авторизируем пользователя, и отправляем запрос на подписку
    } else if($(this).hasClass("subscribe-ok") && isAuthorized) {
        console.log("Пользователь подписан и авторизирован. Отписываем пользователя");
        buildApiRequest('DELETE',
            '/youtube/v3/subscriptions',
            {'id': 't9CM-VVhabRzhGNgbTuzPQo6XfjkPjYJLqSuPJ8HusA'}); //отправляем запрос на отписку от канала
        $("#subscribe-button").removeClass("subscribe-ok").addClass("subscribe-none").html("Подписаться");
        $("body").append("<div class='message' id='subscribe-message' style='display:none'><p>Подписка отменена</p></div>");
        $("#subscribe-message.message").slideDown(500);
        remove_message();
    } else {
        console.log("else");
        return false
    }
});





/*загружаем youtube api*/
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/*создаем iframe с плеером youtube*/
var player;

function onYouTubeIframeAPIReady () {
    player = new YT.Player("player", {
        height: "485",
        width: "959",
        videoId: "",
        playerVars: {
            rel: 0
        },
        events: {
            "onStateChange": onPlayerStateChange
        }
    });
}

/*получаем все плейлисты на канале*/
$.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCOeG8V5kWy9hwA3m1jmw5PQ&key=AIzaSyAhuIK-DHm8cbeZFdTsqmlsyjsZCeWpytI",
    beforeSend: function () {
        $("#playlists-container").append("<ul class='accordion playlists' data-accordion data-allow-all-closed='true'></ul>");
    },
    success: function (playlists) {
        for (var i = 0; i < playlists.items.length; i += 1) {
            get_video(i, playlists);
        }
        $(".playlists").foundation();
    },
    error: function () {
        console.log("error");
    }
});

/*Получаем список видео из плейлистов канала*/
function get_video(i, playlists) {
    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=" + playlists.items[i].id + "&key=AIzaSyAhuIK-DHm8cbeZFdTsqmlsyjsZCeWpytI",
        beforeSend: function () {
            $(".playlists").append("<li class='accordion-item' data-pls_id='playlist_" + i + "' data-accordion-item><a href='#' class='accordion-title playlist_name'>" + playlists.items[i].snippet.title + "</a><div class='accordion-content video-items' data-tab-content></div></li>");
        },
        success: function (playlist_items) {
            for (var a = 0; a < playlist_items.items.length; a += 1) {
                $("li[data-pls_id='playlist_" + i + "'] .accordion-content").append("<div class='row video-item' data-videoid='" + playlist_items.items[a].snippet.resourceId.videoId + "'><div class='large-3 medium-3 small-3 columns video-item_preview'><img src='" + playlist_items.items[a].snippet.thumbnails.default.url + "'/><div class='video-duration video-duration_" + a + "'></div></div><div class='large-9 medium-9 small-9 columns video-item_body'><span class='video-item_name'>" + playlist_items.items[a].snippet.title + "</span></div>");
                duration(i,a,playlist_items);
            }
        },
        error: function () {
            console.log("error");
        }
    });
}

/*Получаем длинну каждого видео*/
function duration(i,a, playlist_items){
    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/youtube/v3/videos?id=" + playlist_items.items[a].snippet.resourceId.videoId + "&key=AIzaSyAhuIK-DHm8cbeZFdTsqmlsyjsZCeWpytI&part=snippet,contentDetails",
        success: function(video_duration){
            var PT = video_duration.items[0].contentDetails.duration
            function parseDuration(PT) {
                var output = [];
                var durationInSec = 0;
                var matches = PT.match(/P(?:(\d*)D)?T?(?:(\d*)H)?(?:(\d*)M)?(?:(\d*)S)?/i);
                var video_duration = [
                    { // hours
                        pos: 2,
                        multiplier: 3600
                    },
                    { // minutes
                        pos: 3,
                        multiplier: 60
                    },
                    { // seconds
                        pos: 4,
                        multiplier: 1
                    }
                ];
                for (var b = 0; b < video_duration.length; b++) {
                    if (typeof matches[video_duration[b].pos] != 'undefined') {
                      durationInSec += parseInt(matches[video_duration[b].pos]) * video_duration[b].multiplier;
                    }
                }
                // Hours extraction
                if (durationInSec > 3599) {
                    output.push(parseInt(durationInSec / 3600));
                    durationInSec %= 3600;
                }
                // Minutes extraction with leading zero
                output.push(('0' + parseInt(durationInSec / 60)).slice(-2));
                // Seconds extraction with leading zero
                output.push(('0' + durationInSec % 60).slice(-2));
                return output.join(':');
            };
            $("li[data-pls_id='playlist_" + i + "'] .accordion-content .video-duration_" + a).append(parseDuration(video_duration.items[0].contentDetails.duration));
        },
        error: function(){
            console.log("error");
        }
    })
}

/*Событие по клику элемента плейлиста*/
$("#playlists-container").on("click", ".video-item", function () {
    if ($(this).hasClass("playing")) {
        if (player.getPlayerState() === 1) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
        return false
    } else {
        $(".playlists").find(".playing").removeClass("playing");
        $(this).addClass("playing");
        $.ajax({
            type: "GET",
            url: "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" + $(this).attr("data-videoid") + "&key=AIzaSyAhuIK-DHm8cbeZFdTsqmlsyjsZCeWpytI",
            beforeSend: function () {
                $("#video-title, #video_count, #like-count, #dislike-count, #video-description").empty();
                $(".channel-preview").fadeOut(700, function () {
                    $(this).remove();
                });
            },
            success: function (video_description) {
                $("#video-title").append(video_description.items[0].snippet.title);
                $("#video_count").append(video_description.items[0].statistics.viewCount);
                $("#like-count").append(video_description.items[0].statistics.likeCount);
                $("#dislike-count").append(video_description.items[0].statistics.dislikeCount);
                if (!video_description.items[0].snippet.description) {
                    $("#video-description").append("<p>Описание видео недоступно</p>");
                } else {
                    $("#video-description").append("<p>" + video_description.items[0].snippet.description + "</p>");
                }
            },
            error: function () {
                console.log("error");
            }
        });
        if (player.getPlayerState() === 1 || player.getPlayerState() === 2 || player.getPlayerState() === 3){
            player.stopVideo();
            player.loadVideoById({
                videoId: $(this).attr("data-videoid")
            });
        } else {
            player.loadVideoById({
                videoId: $(this).attr("data-videoid")
            });
        }
        player.playVideo();
    }
});

/*изменение состояния плеера*/
function onPlayerStateChange () {
    if (player.getPlayerState() === 1) {
        $(".playing").find(".video-duration").fadeOut(500, function () {
            $(this).hide();
        });
        $(".playing").find(".video-item_preview").append("<div class='bar-c'><div id='bar-1' class='bar'></div><div id='bar-2' class='bar'></div><div id='bar-3' class='bar'></div><div id='bar-4' class='bar'></div><div id='bar-5' class='bar'></div><div id='bar-6' class='bar'></div></div>");
    } else {
        $(".bar-c").fadeOut(500, function () {
            $(this).remove();
        });
        $(".playing").find(".video-duration").fadeIn(500, function () {
            $(this).show();
        });
    }
}

/*удаление сообщения о событии*/
function remove_message () {
    setTimeout(function () {
        $(".message").slideUp(500, function () {
           $(this).remove(); 
        });
    }, 3000);
}