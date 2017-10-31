"use strict";
   
    var highchartsOptions = Highcharts.setOptions({
        lang: {
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            weekdays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
        }
    });

    Highcharts.chart('informatization-chart', {
        chart: {
          type: 'column'
        },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        xAxis: {
          pointWidth: 32,
          reversed: true,
          tickWidth: 65,
          tickInterval: 30.41667 * 24 * 3600 * 1000,
          plotBands: [{
            className: "year",
            from: Date.UTC(2014, 11, 1),
            to: Date.UTC(2015, 11, 31),
            label:{
              text: '2015 год',
              y: 25,
              useHTML: true
            },
            type: 'datetime'
          },
          {
            className: "year",
            from: Date.UTC(2016, 0, 0),
            to: Date.UTC(2016, 12, 0),
            label:{
              text: '2016 год',
              y: 25,
              useHTML: true
            }
          },
          {
            className: "year",
            from: Date.UTC(2017, 0, 0),
            to: Date.UTC(2017, 8, 0),
            label: {
              text: '2017 год',
              y: 25,
              useHTML: true
            }
          }
        ],
        labels: {
          enabled: true,
          style: {
            fontSize: "12px",
            color: "#000"
          }
        },
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%b',
            year: '%b'
          },
        },
        yAxis: {
          alternateGridColor: '#f44336',
          min: 0,
          title: {
            text: null
          },
          labels: {
            format: '{value} чел.',
            step: 1
          }
        },
        tooltip: {
          valueSuffix: ' чел.'
        },
        plotOptions: {
          column: {
            borderWidth: 1,
            pointWidth: 32,
            dataLabels: {
              enabled: true,
              align: 'center',
              style: {
                fontSize: ".68rem",
                fontWeight: "bold"
              }
            },
          }
        },
        navigation:{
          buttonOptions:{
            enabled: false
          }
        },
        credits: {
          enabled: false
        },
        legend: {
          useHTML: true,
          enabled: true,
          useHtml: true
        },
        series: [{
          pointStart: Date.UTC(2015, 0, 0),
          name: 'Зарегистрировалось в личном кабинете (чел.)',
          data: [         
            [Date.UTC(2015, 0, 1), 6536],
            [Date.UTC(2015, 1, 1), 8582],
            [Date.UTC(2015, 2, 1), 8901],
            [Date.UTC(2015, 3, 1), 7975],
            [Date.UTC(2015, 4, 1), 5442],
            [Date.UTC(2015, 5, 1), 5735],
            [Date.UTC(2015, 6, 1), 5540],
            [Date.UTC(2015, 7, 1), 5486],
            [Date.UTC(2015, 8, 1), 9176],
            [Date.UTC(2015, 9, 1), 6658],
            [Date.UTC(2015, 10, 1), 7335],
            [Date.UTC(2015, 11, 1), 5704],
            [Date.UTC(2016, 0, 1), 6278],
            [Date.UTC(2016, 1, 1), 6941],
            [Date.UTC(2016, 2, 1), 7537],
            [Date.UTC(2016, 3, 1), 5581],
            [Date.UTC(2016, 4, 1), 4695],
            [Date.UTC(2016, 5, 1), 4749],
            [Date.UTC(2016, 6, 1), 4816],
            [Date.UTC(2016, 7, 1), 5224],
            [Date.UTC(2016, 8, 1), 5137],
            [Date.UTC(2016, 9, 1), 6046],
            [Date.UTC(2016, 10, 1), 6035],
            [Date.UTC(2016, 11, 1), 4668],
            [Date.UTC(2017, 0, 1), 5218],
            [Date.UTC(2017, 1, 1), 5279],
            [Date.UTC(2017, 2, 1), 6412],
            [Date.UTC(2017, 3, 1), 3969],
            [Date.UTC(2017, 4, 1), 3570],
            [Date.UTC(2017, 5, 1), 3436],
            [Date.UTC(2017, 6, 1), 3657]
          ]
        },
        {
          pointStart: Date.UTC(2015, 0, 0),
          name: 'Записалось на прием к врачу (чел.)',
          data: [         
            [Date.UTC(2015, 0, 1), 16574],
            [Date.UTC(2015, 1, 1), 18619],
            [Date.UTC(2015, 2, 1), 25073],
            [Date.UTC(2015, 3, 1), 21621],
            [Date.UTC(2015, 4, 1), 18481],
            [Date.UTC(2015, 5, 1), 18917],
            [Date.UTC(2015, 6, 1), 18464],
            [Date.UTC(2015, 7, 1), 18918],
            [Date.UTC(2015, 8, 1), 25303],
            [Date.UTC(2015, 9, 1), 19641],
            [Date.UTC(2015, 10, 1), 28689],
            [Date.UTC(2015, 11, 1), 34965],
            [Date.UTC(2016, 0, 1), 24121],
            [Date.UTC(2016, 1, 1), 32324],
            [Date.UTC(2016, 2, 1), 34369],
            [Date.UTC(2016, 3, 1), 31225],
            [Date.UTC(2016, 4, 1), 26853],
            [Date.UTC(2016, 5, 1), 28260],
            [Date.UTC(2016, 6, 1), 25048],
            [Date.UTC(2016, 7, 1), 28175],
            [Date.UTC(2016, 8, 1), 32834],
            [Date.UTC(2016, 9, 1), 35548],
            [Date.UTC(2016, 10, 1), 36133],
            [Date.UTC(2016, 11, 1), 37608],
            [Date.UTC(2017, 0, 1), 31732],
            [Date.UTC(2017, 1, 1), 31055],
            [Date.UTC(2017, 2, 1), 42270],
            [Date.UTC(2017, 3, 1), 47906],
            [Date.UTC(2017, 4, 1), 50113],
            [Date.UTC(2017, 5, 1), 47973],
            [Date.UTC(2017, 6, 1), 40906]
          ]
        }
      ]
    });
    
    $(".data").hover(function(){
      $(".highcharts-point.highcharts-color-" + $(this).attr('data-index') + ", " + ".highcharts-data-label.highcharts-data-label-color-" + $(this).attr('data-index')).css({
        "opacity": "0.3",
        "transition": "opacity 250ms"
      });
      $(this).addClass("selected");
    },
    function(){
      $(".highcharts-point.highcharts-color-" + $(this).attr('data-index') + ", " + ".highcharts-data-label.highcharts-data-label-color-" + $(this).attr('data-index')).css({
        "opacity": "1",
        "transition": "opacity 250ms"
      });
      $(this).removeClass("selected");
    });
    
    $(".data").click(function(){     
      var chart = $('#informatization-chart').highcharts();
      var series = chart.series;
      if(!chart.series[$(this).attr("data-index")].visible){
        return true;
      };
      var seriesIndex = chart.series[$(this).attr("data-index")].index;
      for (var i = 0; i < series.length; i++){
        if(series[i].index != seriesIndex){
          series[i].visible ? series[i].hide() : series[i].show();
          series[i].visible ? $(this).removeClass("selected") : $(this).addClass("selected");
        } 
      };
      return false;
    }); 