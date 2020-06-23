$(document).ready(function (){
    $(".graph-btn").click(function(){
        $("#Graph-view").addClass("show");
        $("#List-view").removeClass("show");
    });
});

$(document).ready(function (){
    $(".list-btn").click(function(){
        $("#List-view").addClass("show");
        $("#Graph-view").removeClass("show");
    });
});

$(document).ready(function (){
    $(".calculate-btn").click(function(){
        $(".details").addClass("details-show");
    });
});