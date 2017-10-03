"use strict";
    
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '360',
        width: '640',
        //videoId: $(".playlists li:first-child .video-item:first-child").attr("data-videoid"),
        events: {
          //'onStateChange': onPlayerStateChange
        }
      });
    };
    
    /*изменение состояния плеера*/
    /*function onPlayerStateChange(event) {
      if(player.getPlayerState() == 0){
        player.loadVideoById({
          videoId: $(".playlists").find(".playing").next().attr("data-videoid")
        });
        player.playVideo();
        $(".playlists").find(".playing").next().addClass("playing");
        $(".playlists").find(".playing").prev().removeClass("playing");
      }
    };*/
    
    /*Получаем список видео из плейлистов канала*/  
    function get_video(i, playlists){
      
      $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=" + playlists.items[i].id + "&key=AIzaSyAhuIK-DHm8cbeZFdTsqmlsyjsZCeWpytI",
        beforeSend: function(){
          $(".playlists").append("<li class='accordion-item' data-pls_id='playlist_" + i + "' data-accordion-item><a href='#' class='accordion-title playlist_name'>" + playlists.items[i].snippet.title + "</a><div class='accordion-content video-items' data-tab-content></div></li>");
          
          $(".playlists li:first-child").addClass("is-active");
        },
        success: function(playlist_items){
          for(var a = 0; a < playlist_items.items.length; a++){  
            $("li[data-pls_id='playlist_" + i + "'] .accordion-content").append("<div class='row video-item' data-videoid='" + playlist_items.items[a].snippet.resourceId.videoId + "'><div class='large-3 medium-3 small-3 columns video-item_preview'><img src='" + playlist_items.items[a].snippet.thumbnails.default.url + "'/></div><div class='large-9 medium-9 small-9 columns video-item_body'><span class='video-item_name'>" + playlist_items.items[a].snippet.title + "</span></div><div class='large-12 medium-12 small-12 columns video-item_footer text-right'><span class='date-published'><small>Опубликовано: " + playlist_items.items[a].contentDetails.videoPublishedAt.split("T")[0].split("-")[2] + "." + playlist_items.items[a].contentDetails.videoPublishedAt.split("T")[0].split("-")[1] + "." + playlist_items.items[a].contentDetails.videoPublishedAt.split("T")[0].split("-")[0] + " г." + "</small></span></div>");
          };
          
        },
        error: function(){
          console.log("error");
        }
        
      });
      
    };
    
    /*получаем все плейлисты на канале*/
    $.ajax({
      type: "GET",
      url: "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCOeG8V5kWy9hwA3m1jmw5PQ&key= AIzaSyAhuIK-DHm8cbeZFdTsqmlsyjsZCeWpytI",
      beforeSend: function(){
        $("#playlists-container").append("<ul class='accordion playlists' data-accordion></ul>");
      },
      success: function(playlists){
        
        for(var i = 0; i < playlists.items.length; i++){
          get_video(i, playlists);
        };
        
        $('.playlists').foundation();
      
      },
      error: function(){
        console.log("error");
      }
    });
    
    /*Событие по клику элемента плейлиста*/
    $("#playlists-container").on("click", ".video-item", function(){
      
      $("#start_preview").remove();
      
      $(".playlists").find(".playing").removeClass("playing");
      
      $(this).addClass("playing");
      
      $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" + $(this).attr("data-videoid") + "&key=AIzaSyAhuIK-DHm8cbeZFdTsqmlsyjsZCeWpytI",
        beforeSend: function(){
          $("#video-description").empty();
          $("#video-statistics").empty();
        },
        success: function(video_description){
          
          $("#video-statistics").append("<div class='large-3 medium-3 small-5 columns text-left viewed-count-container'>Просмотров:&nbsp;<span class='viewed_count badge primary'>" + video_description.items[0].statistics.viewCount + "</span></div><div class='large-5 medium-5 small-7 columns text-center rating-container'><span class='like_video'>Понравилось:&nbsp;<span class='like_video_count badge success'>" + video_description.items[0].statistics.likeCount + "</span></span>&nbsp;|&nbsp;<span class='dislike_video'>Не понравилось:&nbsp;<span class='dislike_video_count badge alert'>" + video_description.items[0].statistics.dislikeCount + "</span></span></div><div class='large-4 medium-4 small-12 columns text-right upload-date-container'>Опубликовано:&nbsp;<span class='upload_video_date'>" + video_description.items[0].snippet.publishedAt.split("T")[0].split("-")[2] + "." + video_description.items[0].snippet.publishedAt.split("T")[0].split("-")[1] + "." + video_description.items[0].snippet.publishedAt.split("T")[0].split("-")[0] + " г." + "</span></div>");
          
          if(!video_description.items[0].snippet.description){
            $("#video-description").append("<p>Описание видео недоступно</p>");
          } else {
            $("#video-description").append("<p>" + video_description.items[0].snippet.description + "</p>");
          };
          
        },
        error: function(){
          console.log("error");
        }
      });
      
      if(player.getPlayerState() == 1 || player.getPlayerState() == 2 || player.getPlayerState() == 3){
        player.stopVideo();
        player.loadVideoById({
          videoId: $(this).attr('data-videoid')
        });
      } else{
        player.loadVideoById({
          videoId: $(this).attr('data-videoid')
        });
      };
      
      player.playVideo();

    });