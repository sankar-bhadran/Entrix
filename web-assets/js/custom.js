/***SCROLLHEADER */

        // When the user clicks on the button, scroll to the top of the document
    
        $(window).scroll(function(){
            if ($(this).scrollTop() > 10) {
               $('header .header-white').addClass('header-in');
            } else {
               $('header .header-white').removeClass('header-in');
            }
        });
        $(window).scroll(function(){
            if ($(this).scrollTop() > 50) {
               $('#dynamic').addClass('newClass');
            } else {
               $('#dynamic').removeClass('newClass');
            }
        });

        // PORTFOLIO CAROUSEL SLICK
$(document).ready(function(){
   $('.portfolioCarousel').slick({
       slidesToShow: 1,
       dots: false,
       autoplay: false,
       infinite: true,
       arrows: false,
       responsive: [
           {
               breakpoint: 768,
               settings: {
                   centerPadding: '40px',
                   slidesToShow: 1
               }
           },
           {
               breakpoint: 480,
               settings: {
                   centerPadding: '40px',
                   slidesToShow: 1
               }
           }
       ]
   });
});

// /***serice-porivde-portfolio */
// $('.portfolioCarouselB').slick({
//    slidesToShow: 6,
//    slidesToScroll: 1,
//    dots: true,
//    centerMode: true,
//    focusOnSelect: true
//  });



// animat text js
function checkInView() {
    $('.fade-animat, .text-animat').each(function() {
        var $this = $(this);
        var elementTop = $this.offset().top;
        var viewportBottom = $(window).scrollTop() + $(window).height();

        if (viewportBottom > elementTop) {
          if ($this.hasClass('fade-animat')) $this.addClass('fade-inview');
            setTimeout(function() {
                if ($this.hasClass('text-animat')) $this.addClass('text-inview');
            }, 500);
        }
    });
}

$(document).ready(function() { checkInView(); });
$(window).on('scroll', function() { checkInView(); });
