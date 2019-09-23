(function() {
  "use strict";

  createHTML(data);

  function createHTML(context) {
    var template = document.getElementById("pmba").innerHTML,
      templateCompile = Handlebars.compile(template),
      templateHTML = templateCompile(context);
    document.getElementById("app").innerHTML = templateHTML;
  }

  // Burger menu
  $(".header__burger--trigger").click(function() {
    $(".header__nav").slideDown(400, function() {
      if ($(this).css("display") === "none") {
        $(this).removeAttr("style");
      }
      $("#app").addClass("menu-open");
    });
  });
  $(document).click(function(event) {
    if ($(event.target).closest(".header__burger--trigger").length) return;
    if ($(event.target).hasClass("header__nav")) return;
    if ($(event.target).hasClass("header__nav--closer")) return;
    if ($(".header__nav").css("display") === "block") {
      $(".header__nav").removeAttr("style");
      $("#app").removeClass("menu-open");
    }
    event.stopPropagation();
  });

  // Circle text
  const circleType = new CircleType(
    document.getElementById("main-top__img--circle-text")
  );
  circleType.radius();

  //About mobile tiles
  $(".about__tile").click(function(event) {
    $(event.target)
      .parent()
      .toggleClass("about__tile--selected");
  });

  //Slick slider
  $(".speakers__carousel").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px 0px 0px",
    prevArrow:
      '<div class="slick-prev"><img class="speakers__carousel--btn-prev" src="images/chevron-left-solid.svg"></div>',
    nextArrow:
      '<div class="slick-next"><img class="speakers__carousel--btn-next" src="images/chevron-right-solid.svg"></div>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          centerPadding: "80px 0px 0px"
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  });

  //Carousel image handler
  $(".speakers__tile").click(function(event) {
    var dataId = $(event.target).attr("data-id");
    $("#speaker-image").css(
      "background-image",
      `url(${data.speakers.info[dataId].image})`
    );
    $("#speaker-name").text(data.speakers.info[dataId].name);
    $("#speaker-info").text(data.speakers.info[dataId].position);
    console.log(dataId);
  });

  //Ticker
  var ticker = $(".location__string--text");
  $.fn.multiply = function(numCopies) {
    var newElements = this.clone();
    for (var i = 1; i < numCopies; i++) {
      newElements = newElements.add(this.clone());
    }
    return newElements;
  };
  ticker.css({ overflow: "hidden", width: "100%" });
  ticker.wrapInner("<span>");
  ticker
    .find("span")
    .css({
      width: "50%",
      display: "inline-block",
      "text-align": "center",
      "font-weight": "bold"
    });
  ticker.append(ticker.find("span").multiply(1));
  ticker.wrapInner("<div>");
  ticker.find("div").css("width", "200%");
  var reset = function() {
    $(this).css("margin-left", "0%");
    $(this).animate({ "margin-left": "-100%" }, 8000, "linear", reset);
  };
  reset.call(ticker.find("div"));

  //Scroll
  $('a[href^="#"], *[data-href^="#"]').on("click", function(e) {
    e.preventDefault();
    var t = 1000;
    var d = $(this).attr("data-href")
      ? $(this).attr("data-href")
      : $(this).attr("href");
    $("html,body")
      .stop()
      .animate({ scrollTop: $(d).offset().top - 100 }, t);
  });
})();
