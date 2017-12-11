"use strict";

function search_org() {

    if ($("#search_org_input").val().length === 0) {
        $("#search_org_input").addClass("error");
        return false;
    } else {
        $("#search_org_input").removeClass("error");
    };

    $(".message-not-found").remove();

    var search_input_val = $("#search_org_input").val();

    $(".accordion-title").each(function () {
        if ($(this).text().toUpperCase().indexOf(search_input_val.toUpperCase()) !== -1) {
            $(this).parents(".accordion-item").slideDown(350, function () {
                $(this).removeClass("hide-org-item").addClass("show-org-item");
            });
        } else {
            $(this).parents(".accordion-item").slideUp(350, function () {
                $(this).removeClass("show-org-item").addClass("hide-org-item");
            });
        }
    });

    setTimeout(function () {
        if ($(".accordion-item").length === $(".accordion-item.hide-org-item").length) {
            $(".vacancy_hosp-workspace").prepend("<div class='message-not-found text-center alert callout' style='margin-top:.925rem;'><p>Результаты поиска по запросу &laquo;" + search_input_val + "&raquo;<br/>Проверьте корректность фразы или попробуйте её переформулировать.</p></div>");
            $("#search_org_input").focus();
        }
    }, 400);

}

$("#search-org-for-vacancy_button").click(function () {
    search_org();
});

$("#reset-org-for-vacancy-button").click(function () {
    $("#search_org_input").val("");
    $(".accordion-title").parents(".accordion-item").slideDown(350, function () {
        $(this).removeClass("hide-org-item").addClass("show-org-item");
    });
    $("#search_org_input").removeClass("error").focus();
    $(".message-not-found").remove();
});

$("#search_org_input").keydown(function (e) {
    if (e.keyCode === 13) {
        search_org();
    }
});