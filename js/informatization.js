"use strict";

$(document).ready(function () {
    
    $("#documents ul").paginate();
    
    /*[записалось на прием к врачу за месяц, записалось на прием к врачу всего, зарегистрировалось в ЛК за месяц, зарегистрировалось в ЛК всего]*/
    var initial_data = [40906, 967668, 3657, 344513];

    $("#napriem-month").append((initial_data[0] + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/gm, "$1 "));
    $("#napriem-all").append((initial_data[1] + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/gm, "$1 "));
    $("#lk-month").append((initial_data[2] + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/gm, "$1 "));
    $("#lk-all").append((initial_data[3] + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/gm, "$1 "));

    var target = $("#informatization-main-indicators");
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;

    $(document).scroll(function () {
        var winScrollTop = $(this).scrollTop();
        if (winScrollTop > scrollToElem) {
            var easingFn = function (t, b, c, d) {
                var ts = (t /= d) * t;
                var tc = ts * t;
                return b + c * (tc + -3 * ts + 3 * t);
            };

            var options = {
                useEasing: true,
                easingFn: easingFn,
                useGrouping: true,
                separator: " "
            };

            var napriem_month = new CountUp("napriem-month", initial_data[0] - 100, initial_data[0], 0, 3, options);
            var napriem_all = new CountUp("napriem-all", initial_data[1] - 120, initial_data[1], 0, 3, options);
            var lk_month = new CountUp("lk-month", initial_data[2] - 85, initial_data[2], 0, 3, options);
            var lk_all = new CountUp("lk-all", initial_data[3] - 193, initial_data[3], 0, 3, options);
            
            if (!napriem_month.error || !napriem_all.error || !lk_month.error || !lk_all.error) {
                napriem_month.start();
                napriem_all.start();
                lk_month.start();
                lk_all.start();
            } else {
                console.error(napriem_month.error + "\n" + napriem_all.error + "\n" + lk_month.error + "\n" + lk_all.error);
            }

            $(document).off("scroll");
        }
    });
    
    var point;
    
    $(window).resize(function () {
        $("#informat-content").foundation("_destroy");
        clearTimeout(point);
        point = setTimeout(doneResizing, 500);
    });
    
    function doneResizing() {
        Foundation.reInit("equalizer");
    }
})