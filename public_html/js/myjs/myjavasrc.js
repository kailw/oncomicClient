
//window.onload = function () {
//    setTimeout(function () {
//        var contenedor = document.getElementById("contenedor_carga");
//        contenedor.style.visibility = "hidden";
//        contenedor.style.opacity = "0";
//    }, 1000);
//
//}

$(function () {
    var availableTags = [
        "Batman",
        "Superman",
        "Flash",
        "Dc",
        "Marvel",
        "Spiderman",
        "Hulk",
        "IronMan",
        "Aquaman",
        "Wonder Woman",
        "Thor"
    ];
    $("#tags").autocomplete({
        source: availableTags
    });

    //precio home
    $(".precio1D").html("3,40€");
    $("div[class*=\"precio\"").css({"text-align": "center", "font-size": "1.5em"});

//    $(".titulo1").html("The increible Hulk and Wolverine");
    $("div[class*=\"titulo\"").css({"text-align": "center", "font-size": "1.2em"});

    $("div[class*=\"cesta\"").html("AÑADIR A LA CESTA");
    $("div[class*=\"cesta\"]").css({"background": "#ED1410", "text-align": "center", "color": "white", "padding": "4px 0", "cursor": "pointer", "transform": "skew(-6deg)"});

    $(".cesta").on("mouseenter", function () {
        $(".cesta1").css({"background": "#0053BA", "transition": "background 0.2s linear"});
    });
    $(".cesta1").on("mouseleave", function () {
        $(".cesta1").css({"background": "#ED1410"});
    });

    $(".cestacomic").hover(function () {
        $(this).css("background-color", "#0053BA");
    }, function () {
        $(this).css("background-color", "#ED1410");
    });
    console.log("usuando");


    // $(".portada1").append("<div class=\"vistaRapidaCuadrado\" style=\"background-color: lightgreen; margin-top: 50px; margin-left: 38px; padding: 10px; color:black; display: none\">VISTA RÁPIDA</div>");

    // $(".portada1").on("mouseenter", function () {        
    //   $(".vistaRapidaCuadrado").css({"display":"inline-block", "background":"red","transition" : "all 1s linear", "cursor" : "pointer"});
    // });

    // $(".portada1").on("mouseleave", function () {        
    //     $(".vistaRapidaCuadrado").css({"display":"none" });
    //   });
//    $(".vistaCuadrado1").on("click", function () {
//        redireccionar();
//    });
//    $(".vistaCuadrado2").on("click", function () {
//        redireccionar();
//    });
//



    $(".precio1DN").html("5,45 €");
    $(".precio1DN").css({"text-decoration": "line-through", "font-size": "1em"});

    $(".precio2").html("3,20 €");
    $(".titulo2").html("Dared Evil");

    $(".cesta2").html("AÑADIR A LA CESTA");
    $(".cesta2").on("mouseenter", function () {
        $(".cesta2").css({"background": "#0053BA", "transition": "background 0.2s linear"});
    });
    $(".cesta2").on("mouseleave", function () {
        $(".cesta2").css({"background": "#ED1410"});
    });

//    function redireccionar() {
//        window.location = "vistaRapida.html";
//    }

    $("div[class*=\"cesta\"").on("click", function () {
    });

    $("div[class*=\"cesta\"").addClass("opener");
    $(".cestV").addClass("opener");

    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        show: {
            effect: "puff",
            duration: 500
        },
        hide: {
            effect: "scale",
            duration: 800
        },
        draggable: false,
        resizable: false

    });

    $("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left");


    $(".opener").on("click", function () {
        $("#dialog").dialog("open");
    });



    $(".precio3").html("5,45 €");
    $(".titulo3").html("Teen Titans #1");

    $(".cesta3").html("AÑADIR A LA CESTA");
    $(".cesta3").on("mouseenter", function () {
        $(".cesta3").css({"background": "#0053BA", "transition": "background 0.2s linear"});
    });
    $(".cesta3").on("mouseleave", function () {
        $(".cesta3").css({"background": "#ED1410"});
    });



    $(".precio4").html("3,20 €");
    $(".titulo4").html("The Flash #5");

    $(".cesta4").html("AÑADIR A LA CESTA");
    $(".cesta4").on("mouseenter", function () {
        $(".cesta4").css({"background": "#0053BA", "transition": "background 0.2s linear"});
    });
    $(".cesta4").on("mouseleave", function () {
        $(".cesta4").css({"background": "#ED1410"});
    });









    $(".precio5").html("5,45 €");
    $(".titulo5").html("Iron Man: The Birth of the Power #1");

    $(".cesta5").html("AÑADIR A LA CESTA");
    $(".cesta5").on("mouseenter", function () {
        $(".cesta5").css({"background": "#0053BA", "transition": "background 0.2s linear"});
    });
    $(".cesta5").on("mouseleave", function () {
        $(".cesta5").css({"background": "#ED1410"});
    });



    $(".precio6").html("3,20 €");
    $(".titulo6").html("The increible Hulk #8");

    $(".cesta6").html("AÑADIR A LA CESTA");
    $(".cesta6").on("mouseenter", function () {
        $(".cesta6").css({"background": "#0053BA", "transition": "background 0.2s linear"});
    });
    $(".cesta6").on("mouseleave", function () {
        $(".cesta6").css({"background": "#ED1410"});
    });






    $(".precio7").html("5,45 €");
    $(".titulo7").html("Superman #2");

    $(".cesta7").html("AÑADIR A LA CESTA");
    $(".cesta7").on("mouseenter", function () {
        $(".cesta7").css({"background": "#0053BA", "transition": "background 0.2s linear"});
    });
    $(".cesta7").on("mouseleave", function () {
        $(".cesta7").css({"background": "#ED1410"});
    });




    $(".precio8").html("3,20 €");
    $(".titulo8").html("Green Arrow #10");

    $(".cesta8").html("AÑADIR A LA CESTA");
    $(".cesta8").on("mouseenter", function () {
        $(".cesta8").css({"background": "#0053BA", "transition": "background 0.2s linear"});
    });
    $(".cesta8").on("mouseleave", function () {
        $(".cesta8").css({"background": "#ED1410"});
    });

    $(".tituloV1").html("Captian America #5");
    $(".tituloV2").html("La boda Batman");
    $(".tituloV3").html("La última cacería de kraven");
    $(".tituloV4").html("Superman");
    $(".tituloV5").html("Batman el puto amo");



});





