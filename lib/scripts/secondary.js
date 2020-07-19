$(document).ready(function (){
    $(".graph-btn").click(function(){
        $("#Graph-view").addClass("show-details");
        $("#List-view").removeClass("show-details");
    });
});

$(document).ready(function (){
    $(".list-btn").click(function(){
        $("#List-view").addClass("show-details");
        $("#Graph-view").removeClass("show-details");
    });
});

$(document).ready(function (){
    $(".calculate-btn").click(function(){
        $(".details").addClass("details-show");
        $("#details-section").addClass("show-details");
    });
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "0px 15px";
    document.getElementById("logo").style.fontSize = "1.3rem";
  } else {
    document.getElementById("navbar").style.padding = "15px";
    document.getElementById("logo").style.fontSize = "1.7rem";
  }
}