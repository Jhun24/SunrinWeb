var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();
var checkDay;

var monthData = new Array();
monthData = ['','January','Febuary','March','April','May','June','July','August','September','October','November','December'];

$(function(){
  window.onload = function checkid(){
    $.ajax({
      method:"POST",
      url:"http://localhost:3000/checkId",
      success:function(data){
          if(data == 1){
            window.location = "http://localhost:3000"
          }
      },
      error:function(){

      }
    });
  }

  window.onload = function drawCal(){
    $(".calDate").html(monthData[month]+" "+year)

    var day = new Date(year+"."+month+".1").getDay()-1;
    //7이 일요일
    var cal;
    var check;
    if(month < 8 && month%2 == 1){
        check = 31;
    }
    else if(month > 7 && month%2 == 0){
        check = 31;
    }
    else{
        check = 30;
    }
    var e = 1;
    var frDay = 7-day;

    cal = "<div class=\"dateLine\">";
    for(var i = 0; i<day; i++){
      cal += "<div class=\"numNone\">2</div>";
    }
    for(var i = 1; i<=frDay; i++){
      cal += "<div id=\""+i+"\" class=\"num\">"+i+"</div>";
    }
    cal+= "</div>"
    cal+= "<div class=\"dateLine\">";
    for(var i=frDay+1; i<=check; i++){
      cal+="<div id=\""+i+"\" class=\"num\">"+i+"</div>";
      if(e%7 ==0){
        cal+="</div>";
        cal+= "<div class=\"dateLine\">";
      }
      e++;
    }
    for(var i=0; i<=7-e%7; i++){

      cal+= "<div class=\"numNone\">2</div>";
      if(e%7 ==0){
        cal+="</div>";
        cal+= "<div class=\"dateLine\">";
      }
    }
    cal += "</div>"

    $(".dataNum").html(cal);

    $(".num").click(function(){
      var dayData = $(this).text();
      $("#"+checkDay).removeClass("calSelect");
      $("#"+dayData).addClass("calSelect");
      checkDay = dayData;
      $.ajax({
        method:"POST",
        url:"http://localhost:3000/sessionDay",
        data:{"month":month,"year":year,"day":checkDay},
        success:function(data){
          console.log(data)

          $.ajax({
            method:"POST",
            url:"http://localhost:3000/memoList",
            success:function(da){
              if(data != '0'){
                console.log(da);
                if(da != '0'){
                  var lm = ""
                  for(var i=0; i<da.length; i++){
                    var dt = da[i];
                    lm += "<div class=\"listData\">"
                    lm += "<div class=\"listTime\">"+da[i]['time']+"</div>"
                    lm += "<div class=\"listName\">"+da[i]['content']+"</div>"
                    lm += "</div>"
                  }
                  $('.listContent').html(lm);
                }
              }

            },
            error:function(){
              console.log("memoList Not Found")
            }
          });
        },
        error:function(){
          console.log("Connect Error")
        }
      });


    });
  }

  $(".calSideBarNext").click(function addDate(){
    month = month+1;
    if(month == 13){
      month = 1;
      year = year + 1;
    }
    $(".calDate").html(monthData[month]+" "+year)

    var day = new Date(year+"."+month+".1").getDay()-1;
    //7이 일요일
    var cal;
    var check;
    if(month < 8 && month%2 == 1){
        check = 31;
    }
    else if(month > 7 && month%2 == 0){
        check = 31;
    }
    else{
        check = 30;
    }

    if(month == 2){
      check = 28;
    }

    var e = 1;
    var frDay = 7-day;

    cal = "<div class=\"dateLine\">";
    for(var i = 0; i<day; i++){
      cal += "<div class=\"numNone\">2</div>";
    }
    for(var i = 1; i<=frDay; i++){
      cal += "<div id=\""+i+"\" class=\"num\">"+i+"</div>";
    }
    cal+= "</div>"
    cal+= "<div class=\"dateLine\">";
    for(var i=frDay+1; i<=check; i++){
      cal+="<div id=\""+i+"\" class=\"num\">"+i+"</div>";
      if(e%7 ==0){
        cal+="</div>";
        cal+= "<div class=\"dateLine\">";
      }
      e++;
    }
    e--;

    for(var i=0; i<7-e%7; i++){

      cal+= "<div class=\"numNone\">2</div>";
    }
    cal += "</div>"
    $(".dataNum").html(cal);
  });

  $(".calSideBarBack").click(function addDate(){
    month = month-1;
    if(month == 0){
      month = 12;
      year = year - 1;
    }
    $(".calDate").html(monthData[month]+" "+year)

    var day = new Date(year+"."+month+".1").getDay()-1;
    //7이 일요일
    var cal;
    var check;
    if(month < 8 && month%2 == 1){
        check = 31;
    }
    else if(month > 7 && month%2 == 0){
        check = 31;
    }
    else{
        check = 30;
    }

    if(month == 2){
      check = 28;
    }
    var e = 1;
    var frDay = 7-day;

    cal = "<div class=\"dateLine\">";
    for(var i = 0; i<day; i++){
      cal += "<div class=\"numNone\">2</div>";
    }
    for(var i = 1; i<=frDay; i++){
      cal += "<div id=\""+i+"\" class=\"num\">"+i+"</div>";
    }
    cal+= "</div>"
    cal+= "<div class=\"dateLine\">";
    for(var i=frDay+1; i<=check; i++){
      cal+="<div id=\""+i+"\" class=\"num\">"+i+"</div>";
      if(e%7 ==0){
        cal+="</div>";
        cal+= "<div class=\"dateLine\">";
      }
      e++;
    }
    e--;

    for(var i=0; i<7-e%7; i++){

      cal+= "<div class=\"numNone\">2</div>";
    }
    cal += "</div>"
    $(".dataNum").html(cal);
  });



});
