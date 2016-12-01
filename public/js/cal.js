var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();
var checkDay;

var monthData = new Array();
monthData = ['','January','Febuary','March','April','May','June','July','August','September','October','November','December'];
$(document).ready(function checkSessionId(){
  console.log("a")
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

});

$(function(){

  window.onload = function drawCal(){
    $(".calDate").html(monthData[month]+" "+year)

    var day = new Date(year+"."+month+".1").getDay();
    console.log(day);
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
      check=28;
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
        url:"http://localhost:3000/sessionInputDay",
        data:{"month":month,"year":year,"day":checkDay},
        success:function(data){
          console.log(data)
          $(".monthList").html(" ");
          $(".listContent").html(" ")
          $.ajax({
            method:"POST",
            url:"http://localhost:3000/memoList",
            success:function(model){
              for(var i = 0; i<model.length; i++){
                if(model[i]["setMonth"] == "This Month"){
                  var s = "<div class=\"aa\">"
                      s +=  "<div class=\"inlineBox\">"
                      s += "<h1 class=\"aaTxt\">Time : "+model[i]["time"]+"</h1>"
                      s += "<div class=\"aaa\">"
                      s += "<h1 class=\"aaaTxt\">Content : "+model[i]["content"]+"</h1>"
                      s += "</div>"
                      s += "</div>"
                      s += "</div>"

                      $(".listContent").append(s)
                }
                else if(model[i]["setMonth"] == "Every Month"){
                  var s = "<div class=\"monthListBox\">"
                      s += "<h1 class=\"monthListTime\">"+model[i]["time"]+"</h1>"
                      s += "<h1 class=\"monthListText\">"+model[i]["content"]+"</h1>"
                      s += "</div>"
                      $(".monthList").append(s);
                }
              }
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
    $(".monthList").html(" ");
    $(".listContent").html(" ")
    month = month+1;
    if(month == 13){
      month = 1;
      year = year + 1;
    }
    $(".calDate").html(monthData[month]+" "+year)

    var day = new Date(year+"."+month+".1").getDay();
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
    $(".num").click(function(){
      var dayData = $(this).text();
      $("#"+checkDay).removeClass("calSelect");
      $("#"+dayData).addClass("calSelect");
      checkDay = dayData;
      $.ajax({
        method:"POST",
        url:"http://localhost:3000/sessionInputDay",
        data:{"month":month,"year":year,"day":checkDay},
        success:function(data){
          console.log(data)
          $(".monthList").html(" ");
          $(".listContent").html(" ")
          $.ajax({
            method:"POST",
            url:"http://localhost:3000/memoList",
            success:function(model){
              for(var i = 0; i<model.length; i++){
                if(model[i]["setMonth"] == "This Month"){
                  var s = "<div class=\"aa\">"
                      s +=  "<div class=\"inlineBox\">"
                      s += "<h1 class=\"aaTxt\">Time : "+model[i]["time"]+"</h1>"
                      s += "<div class=\"aaa\">"
                      s += "<h1 class=\"aaaTxt\">Content :"+model[i]["content"]+"</h1>"
                      s += "</div>"
                      s += "</div>"
                      s += "</div>"

                      $(".listContent").append(s)
                }
                else if(model[i]["setMonth"] == "Every Month"){
                  var s = "<div class=\"monthListBox\">"
                      s += "<h1 class=\"monthListTime\">"+model[i]["time"]+"</h1>"
                      s += "<h1 class=\"monthListText\">"+model[i]["content"]+"</h1>"
                      s += "</div>"
                      $(".monthList").append(s);
                }
              }
            }
          });
        },
        error:function(){
          console.log("Connect Error")
        }
      });
     });    
    //$(".num").click(function(){
    //       var dayData = $(this).text();
    //       $("#"+checkDay).removeClass("calSelect");
    //       $("#"+dayData).addClass("calSelect");
    //       checkDay = dayData;
    //       $.ajax({
    //         method:"POST",
    //         url:"http://localhost:3000/sessionInputDay",
    //         data:{"month":month,"year":year,"day":checkDay},
    //         success:function(data){
    //           console.log(data)
    //           $(".monthList").html(" ");
    //           $(".listContent").html(" ")
    //           $.ajax({
    //             method:"POST",
    //             url:"http://localhost:3000/memoList",
    //             success:function(model){
    //               for(var i = 0; i<model.length; i++){
    //                 if(model[i]["setMonth"] == "This Month"){
    //                   var s = "<div class=\"aa\">"
    //                       s +=  "<div class=\"inlineBox\">"
    //                       s += "<h1 class=\"aaTxt\">Time : "+model[i]["time"]+"</h1>"
    //                       s += "<div class=\"aaa\">"
    //                       s += "<h1 class=\"aaaTxt\">Content :"+model[i]["content"]+"</h1>"
    //                       s += "</div>"
    //                       s += "</div>"
    //                       s += "</div>"
    //
    //                       $(".listContent").append(s)
    //                 }
    //                 else if(model == "1"){
    //
    //                 }
    //                 else if(model[i]["setMonth"] == "Every Month"){
    //                   var s = "<div class=\"monthListBox\">"
    //                       s += "<h1 class=\"monthListTime\">"+model[i]["time"]+"</h1>"
    //                       s += "<h1 class=\"monthListText\">"+model[i]["content"]+"</h1>"
    //                       s += "</div>"
    //                       $(".monthList").append(s);
    //                 }
    //               }
    //             }
    //           });
    //         },
    //         error:function(){
    //           console.log("Connect Error")
    //         }
    //       });
    //     });
  });

  $(".calSideBarBack").click(function addDate(){
    $(".monthList").html(" ");
    $(".listContent").html(" ")
    month = month-1;
    if(month == 0){
      month = 12;
      year = year - 1;
    }
    $(".calDate").html(monthData[month]+" "+year)

    var day = new Date(year+"."+month+".1").getDay();
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
    $(".num").click(function(){
      var dayData = $(this).text();
      $("#"+checkDay).removeClass("calSelect");
      $("#"+dayData).addClass("calSelect");
      checkDay = dayData;
      $.ajax({
        method:"POST",
        url:"http://localhost:3000/sessionInputDay",
        data:{"month":month,"year":year,"day":checkDay},
        success:function(data){
          console.log(data)
          $(".monthList").html(" ");
          $(".listContent").html(" ")
          $.ajax({
            method:"POST",
            url:"http://localhost:3000/memoList",
            success:function(model){
              for(var i = 0; i<model.length; i++){
                if(model[i]["setMonth"] == "This Month"){
                  var s = "<div class=\"aa\">"
                      s +=  "<div class=\"inlineBox\">"
                      s += "<h1 class=\"aaTxt\">Time : "+model[i]["time"]+"</h1>"
                      s += "<div class=\"aaa\">"
                      s += "<h1 class=\"aaaTxt\">Content : "+model[i]["content"]+"</h1>"
                      s += "</div>"
                      s += "</div>"
                      s += "</div>"

                      $(".listContent").append(s)
                }
                else if(model == "1"){

                }
                else if(model[i]["setMonth"] == "Every Month"){
                  var s = "<div class=\"monthListBox\">"
                      s += "<h1 class=\"monthListTime\">"+model[i]["time"]+"</h1>"
                      s += "<h1 class=\"monthListText\">"+model[i]["content"]+"</h1>"
                      s += "</div>"

                      $(".monthList").append(s);
                }
              }
            }
          });
        },
        error:function(){
          console.log("Connect Error")
        }
      });
    });
  });

$(".listSubmit").click(function(){
  var month = $(".md").val();
  var time = $(".addTime").val();
  var content = $(".addContent").val();


  $.ajax({
    method:"POST",
    url:"http://localhost:3000/addMemo",
    data:{"content":content,"time":time,"setMonth":month},
    success:function(data){
    },
    error:function(){
      alert("Server Error 500");
    }
  });

  location.reload(true)
});


});
