"use strict";

if(Cookies.get("status-special-mode")){
    $("body").addClass("special-mode-active");
    $(".posibility-mode-on-container").addClass("is-active");
    $(".posibility-mode-on").addClass("active");
}

if(Cookies.get("fontsize-active")){
    var element = $("#" + Cookies.get("fontsize-active"));
    $("body.special-mode-active").addClass(Cookies.get("fontsize-active"));
    $(element).addClass("active");
    $("#font-selected-title").empty().append($(element).attr("title"));
    Foundation.reInit("equalizer");
}

if(Cookies.get("contrast-active")){
    var element = $("#" + Cookies.get("contrast-active"));
    $("body.special-mode-active").addClass(Cookies.get("contrast-active"));
    $(element).addClass("active");
    $("#contrast-selected-title").empty().append($(element).attr("title"));
}

if(Cookies.get("spacing-active")){
    var element = $("#" + Cookies.get("spacing-active"));
    $("body.special-mode-active").addClass(Cookies.get("spacing-active"));
    $(element).addClass("active");
    $("#spacing-selected-title").empty().append($(element).attr("title"));
    Foundation.reInit("equalizer");
}

if(Cookies.get("visible-img") == "true") {
    $("#on-off").prop("checked", true);
    $("body.special-mode-active").removeClass("hide-img").addClass("show-img");
    $("#img-visible-status").html("Вкл");
    $(".alt-text-img").remove();
} else {
    $("#on-off").prop("checked", false);
    $("body.special-mode-active").removeClass("show-img").addClass("hide-img");
    $("#img-visible-status").html("Выкл");
    each_img();
}

$(".posibility-mode-off").click(function(){
    special_mode_off();
});

$(".posibility-mode-on").click(function(){
    if($("#special-mode-controls-container").is(":visible")){
        $("#special-mode-controls-container").slideUp(500, function(){
            $("#special-mode-controls-container").removeClass("is-show").hide();
            $(".posibility-mode-on").removeClass("active");
            $(".posibility-mode-on-container").removeClass("is-active");
        })
    } else {
        $("#special-mode-controls-container").slideDown(500, function(){
            $("#special-mode-controls-container").addClass("is-show").show();
            $(".posibility-mode-on").addClass("active");
            $(".posibility-mode-on-container").addClass("is-active");
        })
    };
    
    if($("body").hasClass("special-mode-active")){
        return false
    } else {
        $("body").addClass("special-mode-active");
        Cookies.set("status-special-mode", "special-mode-active", { expires: 13 });
        Cookies.set("fontsize-active", "normal-font", { expires: 13 });
        Cookies.set("contrast-active", "normal-contrast", { expires: 13 });
        Cookies.set("spacing-active", "normal-spacing", { expires: 13 });
        Cookies.set("visible-img", "true", { expires: 13 });
        $("#on-off").prop("checked", Cookies.get("visible-img"));
        $("#img-visible-status").html("Вкл");
        $("#special-mode-controls-container .button-group button:first-child").addClass("active");
        $("#font-selected-title").empty().append($("#font-size").find(".active").attr("title"));
        $("#contrast-selected-title").empty().append($("#contrast").find(".active").attr("title"));
        $("#spacing-selected-title").empty().append($("#spacing").find(".active").attr("title"));
        $("body").addClass(Cookies.get("status-special-mode") + " " + Cookies.get("fontsize-active") + " " + Cookies.get("contrast-active") + " " + Cookies.get("spacing-active") + " show-img");
    }
});

function special_mode_off () {
    Cookies.remove("status-special-mode");
    Cookies.remove("fontsize-active");
    Cookies.remove("contrast-active");
    Cookies.remove("spacing-active");
    $("body.special-mode-active").removeClass();
    $("#special-mode-controls button").removeClass("active");
    $(".posibility-mode-on-container").removeClass("is-active");
    $("#special-mode-controls-container").slideUp(500, function(){
        $(this).removeClass("is-show").hide();
    });
    $(".alt-text-img").remove();
}

$(window).resize(function(){
    if($(window).outerWidth() < "1280" && $("body").hasClass("special-mode-active")) {
       special_mode_off();
    }
    
    if($(window).outerWidth() < "1279") {
        $(".posibility-mode-on-container").hide();
    } else {
        $(".posibility-mode-on-container").show();
    }
});

$("#turn-special-controls").click(function(){
   $(this).parents("#special-mode-controls-container").slideUp(500, function(){
       $(this).hide();
       $(".posibility-mode-on").removeClass("active");
   }) 
});

$("#font-size button").click(function(){
    if(Cookies.get("fontsize-active")){
        $("body.special-mode-active").removeClass(Cookies.get("fontsize-active"));
    };
    Cookies.set("fontsize-active", $(this).attr("id"), { expires: 13 });
    $("#font-size .button-group").find(".active").removeClass("active");
    $("#font-selected-title").empty().append($(this).attr("title"));
    $(this).addClass("active");
    $("body.special-mode-active").addClass($(this).attr("id"));
    Foundation.reInit("equalizer");
    return false
});

$("#contrast button").click(function(){
    if(Cookies.get("contrast-active")){
        $("body.special-mode-active").removeClass(Cookies.get("contrast-active"));
    };
    Cookies.set("contrast-active", $(this).attr("id"), { expires: 13 });
    $("#contrast .button-group").find(".active").removeClass("active");
    $("#contrast-selected-title").empty().append($(this).attr("title"));
    $(this).addClass("active");
    $("body.special-mode-active").addClass($(this).attr("id"));
    return false
});

$("#spacing button").click(function(){
    if(Cookies.get("spacing-active")){
        $("body.special-mode-active").removeClass(Cookies.get("spacing-active"));
    };
    Cookies.set("spacing-active", $(this).attr("id"), { expires: 13 });
    $("#spacing .button-group").find(".active").removeClass("active");
    $("#spacing-selected-title").empty().append($(this).attr("title"));
    $(this).addClass("active");
    $("body.special-mode-active").addClass($(this).attr("id"));
    Foundation.reInit("equalizer");
    return false
});

$("#on-off").change(function(){
    if($(this).is(":checked")){
       Cookies.set("visible-img", "true", { expires: 13 });
       $("#img-visible-status").html("Вкл");
       $("body.special-mode-active").removeClass("hide-img").addClass("show-img");
       $(".alt-text-img").remove();
    } else {
        Cookies.set("visible-img", "false", { expires: 13 });
        $("#img-visible-status").html("Выкл");
        $("body.special-mode-active").removeClass("show-img").addClass("hide-img");
        each_img();
    };
    //Foundation.reInit("equalizer");
});

function each_img() {
    $("body.special-mode-active #main-content img").each(function(){
        var altTextImg = $(this).attr("alt");
        var imgWidth = $(this).attr("width");
        var imgHeight = $(this).attr("height");
        if(!altTextImg){
            $(this).parent().prepend("<div class='alt-text-img'><span>(Изображение) Описание отсутствует</span></div>");
        } else {
            $(this).parent().prepend("<div class='alt-text-img' style='width:" + imgWidth + "px; height:" + imgHeight + "px;'><span>(Изображение) " + altTextImg + "</span></div>");
        }
    });
    $("body.special-mode-active section:not(#site) img").each(function(){
        var altTextImg = $(this).attr("alt");
        if(!altTextImg){
            $(this).parent().prepend("<div class='alt-text-img'><span>(Изображение) Описание отсутствует</span></div>");
        } else {
            $(this).parent().prepend("<div class='alt-text-img' style='width:inherit; height:inherit'><span>(Изображение) " + altTextImg + "</span></div>");
        }
    });
    //Foundation.reInit("equalizer");
}