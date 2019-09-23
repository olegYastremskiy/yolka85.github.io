(function(){
    "use strict";

    createHTML(data);

    function createHTML(context){
        var template = document.getElementById("pmba").innerHTML,
            templateCompile = Handlebars.compile(template),
            templateHTML = templateCompile(context);
            document.getElementById('app').innerHTML = templateHTML;
    }

    // Burger menu
    $('.header__burger--trigger').click(function(){
        $('.header__nav').slideDown(400, function(){
            if( $(this).css('display') === "none"){
                $(this).removeAttr('style');
            }
            $('#app').addClass('menu-open');
        });
    });
    $(document).click(function(event){
        if ($(event.target).closest('.header__burger--trigger').length) return;
        if ($(event.target).hasClass('header__nav')) return;
        if ($(event.target).hasClass('header__nav--closer')) return;
        if ($('.header__nav').css('display') === "block"){
                $('.header__nav').removeAttr('style');
                $('#app').removeClass('menu-open');
            }
        event.stopPropagation();
    });

    // Circle text
    const circleType = new CircleType(document.getElementById('main-top__img--circle-text'));
    circleType.radius();

    //About mobile tiles
    $('.about__tile').click(function(event){
        $(event.target).parent().toggleClass( "about__tile--selected" );
    });   
    
    //Slick slider
    $('.speakers__carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '40px 0px 0px',
        prevArrow: '<div class="slick-prev"><img class="speakers__carousel--btn-prev" src="images/chevron-left-solid.svg"></div>',
        nextArrow: '<div class="slick-next"><img class="speakers__carousel--btn-next" src="images/chevron-right-solid.svg"></div>',
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
                    centerPadding: '80px 0px 0px',
                    }
             },
             {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                    }
             },
        ]
      });

    //Carousel image handler
    $('.speakers__tile').click(function(event){
        var id;
        if($(event.target).parent().attr('data-slick-index') <'0'){
            id = data.speakers.info.length + Number($(event.target).parent().attr('data-slick-index'));
        }else if(Number($(event.target).parent().attr('data-slick-index')) ==='data.speakers.info.length'){
            id = $(event.target).parent().attr('data-slick-index') - data.speakers.info.length;            
        }else{
            id = $(event.target).attr('id');
        }
        console.log(id);
    })
})();