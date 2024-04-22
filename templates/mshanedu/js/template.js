/**
 * Global variables
 */


// preloader
$(window).on('load', function() {
    setTimeout(delayMyLoader, 5000);

    function delayMyLoader() {
        $('.site-loader').hide();
        $('.site-loader').removeClass();
        $('html').addClass('overflow');
    };
});

//jQuery(function($) {
jQuery(document).ready(function($) {

    var userAgent = navigator.userAgent.toLowerCase(),
        initialDate = new Date(),
        $document = $(document),
        $window = $(window),
        $html = $("html"),

        isDesktop = $html.hasClass("desktop"),
        isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isTouch = "ontouchstart" in window,

        plugins = {
            pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
            smoothScroll: $html.hasClass("use--smoothscroll") ? "js/smoothscroll.min.js" : false,
            SidebarRight: $("#aside"),
            SidebarLeft: $("#sidebar"),
            newsflashModifyVert: $(".newsflash-vert.modify"),
            newsflashModifyHoriz: $(".newsflash-horiz.modify"),
            pastPrincipalTable: $(".past-principals table"),
            articleBodyImg: $(".article-body img"),
            managementCommittee: $(".management-committee"),
            tutorialStaff: $(".tutorial-staff"),
            audioPlayer: $(".player"),
            textSlider: $(".text-slider"),
            articleBody: $(".article-body"),
            mshangallery: $("#mshangallery")
        };


    /**
     * Initialize All Scripts
     */




    $('.menu-item-has-dropdown>a').append('<span class="arrow"></span>');
    $('.menu-item-has-megamenu>a').append('<span class="arrow"></span>');

    /**
     * Header Style 01: 
     */
    if ($('header').is('.header-style-0')) {
        if (isDesktop) {
            var li = $('#main-menu-wrapper > ul.navbar-nav > li');
            var half = li.length / 2;
            for (var i = 0; i < li.length; i += half) {
                li.slice(i, i + half).wrapAll("<ul class='nav navbar-nav'></ul>");
            }
            $('ul.navbar-nav>ul').unwrap();

            //Drop Down Sub Menu Conditional open left or Right depending on browser size
            $(".sub-menu > .menu-item-has-dropdown").mouseover(function() {
                if ($(this).children("ul").length == 1) {
                    var parent = $(this);
                    var child_menu = $(this).children("ul");
                    if ($(parent).offset().left + $(parent).width() + $(child_menu).width() > $(window).width()) {
                        $(child_menu).css("left", "-" + $(parent).width() + "px");
                    } else {
                        $(child_menu).css("left", $(parent).width() + "px");
                    }
                }
            });
        }
    }

    if ($('header').is('.header-style-3')) {
        if (isDesktop) {
            var ul = $(".navbar-nav");
            $('header').find(ul).removeClass().addClass('sf-menu');
            $('.sf-menu').superfish();
        }
    }


    if ($('header').is('.header-style-4') || $('header').is('.header-style-5')) {
        $('.header-style-4, .header-style-5').next().addClass('view-height');
        $('.header-style-4, .header-style-5').next().find('.inner').addClass('high');
    }



    if (isMobile) {
        //mobile nav
        $(".mobile-menu").click(function() {
            $(".menu-btn").toggleClass("active");
            $(".navigation").toggleClass("active");
            $("body").toggleClass("menu-open");
            $('html').toggleClass('overflow');
        });

        $('.menu-item-has-dropdown > a').on('click', function() {
            //$(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
            } else {
                element.addClass('open');
                element.children('ul, .megamenu').slideDown();
                element.siblings('li').children('ul, .megamenu').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul, .megamenu').slideUp();
            }
        });
    }


    if (isDesktop) {
        //fix header
        $(window).scroll(function() {
            var sticky = $('.header'),
                scroll = $(window).scrollTop();
            if (scroll >= 100) sticky.addClass('sticky');
            else sticky.removeClass('sticky');
        });
    }

    scroll_top();

    $("ul.lang-inline a:contains('Sinhala')").text("සිංහල");
    $("ul.lang-inline a:contains('English')").text("English");
    $("ul.lang-inline a:contains('Tamil')").text("Tamil");

    $('.news-and-highlight .item').each(function() {
        $(this).children().eq(3).addClass('first');
        $(this).children().wrapAll('<div class="news-description-block" />');
        $('<div class="news-image-block" />').append($(this).find('.item-image')).prependTo($(this));
        var $copiedDate = $(this).find('.create').replaceTag('div').appendTo($(this).find('.news-image-block'));
        var words = $copiedDate.find('time').text().split(" ");
        $copiedDate.find('time').empty();
        $.each(words, function(i, v) {
            $copiedDate.find('time').append($("<span>").text(v));
        });

        $(this).find('dd.create').remove();

    });


    if ($('.launchpad-toolbar').is('.style-2')) {
        $('.launchpad-toolbar').parent().next().css("padding", "25px 0");
    }

    if (isMobile) {
        $('.usefull-links').removeClass('border-left').addClass('border-center');
    }

    if (plugins.articleBody.length) {
        if (plugins.mshangallery.length) {
            plugins.mshangallery.lightGallery({
                share: false,
                thumbnail: true,
                subHtmlSelectorRelative: true
            });
        }
    }



    /** 
     * Use Alt Text as Image Captions
     * For Blog Images 
     */
    if ($('.item-image').length) {
        $('.item-image img').each(function() {
            var el = $(this).prop('title');
            if (el != '') {
                $(this).wrap('<div class="img-with-caption">');
                $('<div class="img-caption">').html('<span>' + $(this).prop("title") + '</span>').insertAfter($(this));
            }
        });
    }


    /**
     * Past Principal Table: 
     * Remove [style] attribute from the table: 
     */
    if (plugins.articleBodyImg.length) {
        // plugins.articleBodyImg.find('img').wrap('<div class="img-wrapper">').after(function() {
        //   return $('<div class="caption">').text($(this).attr('title'));
        // });

        plugins.articleBodyImg.each(function() {
            var el = $(this).prop('title');
            if (el != '') {
                $(this).wrap('<div class="img-with-caption">');
                $('<div class="img-caption">').html('<span>' + $(this).prop("title") + '</span>').insertAfter($(this));
            }
        });

        var $el = $('.img-with-caption > img');
        $el.each(function() {
            const float = $(this).css('float');
            const marginT = $(this).css('margin-top')
            const marginL = $(this).css('margin-left')
            const marginR = $(this).css('margin-right')
            const marginB = $(this).css('margin-bottom')
            //alert(margin);
            if (float !== 'none') $(this).parent().css("float", float);
            if (marginT !== '0px') $(this).parent().css("margin-top", marginT);
            if (marginL !== '0px') $(this).parent().css("margin-left", marginL);
            if (marginR !== '0px') $(this).parent().css("margin-right", marginR);
            if (marginB !== '0px') $(this).parent().css("margin-bottom", marginB);

            $(this).removeAttr('style');
        });
    }

    /**
     * Past Principal Table: 
     * Remove [style] attribute from the table: 
     */
    if (plugins.pastPrincipalTable.length) {
        $('.past-principals table *').removeAttr('style');
        plugins.pastPrincipalTable.removeAttr('style');
    }


    /**
     * Management Committee Table: 
     * Add Bootstrap Classes to table
     */
    if (plugins.managementCommittee.length || plugins.tutorialStaff.length) {
        $('.management-committee .article-body table')
            .removeClass()
            .addClass('table table-striped table-hover')
            .removeAttr('style');

        $('.tutorial-staff .article-body table')
            .removeClass()
            .addClass('table table-striped table-hover')
            .removeAttr('style');

        $('.tutorial-staff .article-body table *, .management-committee .article-body table *').removeAttr('style');
    }


    /**
     * Audio Player: 
     */
    if (plugins.audioPlayer.length) {
        new RedAudioPlayer('.player1');
        if ($('.player2').length) {
            new RedAudioPlayer('.player2');
        }
        if ($('.player3').length) {
            new RedAudioPlayer('.player3');
        }
    }


    if ($('.category-blog').is('.sidebar-left') || $('.single-article').is('.sidebar-left')) {
        $('.category-blog, .single-article').parent().parent().addClass('content-right').next().addClass('aside-left');
    }


    /**
     * Text Slider: 
     */
    if (plugins.textSlider.length) {
        var owl = $(".vision-mission");
        if (owl.length) {
            owl.owlCarousel({
                items: 1,
                //loop: true,
                autoplay: true,
                autoplayTimeout: 10000,
                margin: 10,
                //autoWidth: true,
                //nav:true,
                dots: true,
                //animateOut: 'fadeOut',
                animateOut: 'fade',
                animateIn: 'flipInX',
                responsive: {
                    0: {
                        items: 1
                    }
                }
            })

        }
    }

});


//if($('.overview-main-slider').length) {
var el = $('.owl-carousel');
$('.overview-main-slider').owlCarousel({
    items: 1,
    //loop: true,
    autoplay: true,
    autoplayTimeout: 10000,
    margin: 10,
    //autoWidth: true,
    //nav:true,
    dots: true,
    //animateOut: 'fadeOut',
    animateOut: 'fade',
    animateIn: 'flipInX',
    responsive: {
        0: {
            items: 1
        }
    }
})
//}




function scroll_top() {
    'use strict';
    var scrollTop = jQuery("a.scroltop");
    /* page scroll top on click function */
    scrollTop.on('click', function() {
        jQuery("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    })

    jQuery(window).bind("scroll", function() {
        var scroll = jQuery(window).scrollTop();
        if (scroll > 500) {
            jQuery("a.scroltop").fadeIn(1000);
        } else {
            jQuery("a.scroltop").fadeOut(1000);
        }
    });
    /* page scroll top on click function end*/
}



/* ==========================================================================
 FAQs page
 ========================================================================== */
var BB = BB || {};
BB.Modules = BB.Modules || {};

BB.Modules.faqs = function($, window, document) {
    "use strict";


    var offset = 311;
    var fixSidebar = 425;
    var stickyEl = $('.sidebar-nav');
    var stickyParentW = stickyEl.parent("#sidebar").width();

    /**
     * Public methods
     *
     * Public methods are returned/exposed at the bottom of the script.
     */

    function initFaqs() {
        stickyEl.width(stickyParentW);

        $(window).on('resize', function() {
            stickyParentW = stickyEl.parent("#sidebar").width();
            stickyEl.width(stickyParentW);
        });

        function doSticky() {
            var contentHeight = $('.main-content-body').innerHeight();
            var sidebarHeight = $('.sidebar-nav').height();
            var sidebarBottomPos = contentHeight - sidebarHeight;
            var trigger = $(window).scrollTop() - fixSidebar;

            //if (!window.matchMedia("(max-width: 767px)").matches) {
            $('.sidebar-nav').stickybits({
                stickyBitStickyOffset: 100
            });
            //$('.sidebar-nav').addClass('sticky');
            //}

            if (trigger >= sidebarBottomPos - 650) {
                stickyEl.css({
                    "top": "inherit",
                    "bottom": "0",
                    "position": "relative",
                    "margin": 0
                });
            } else {
                stickyEl.css({
                    //"margin-top": -65
                });
            }
        }



        $(window).scroll(function(e) {
            doSticky();
        });

        doSticky();
    }

    /**
     * Expose public methods
     */

    return {
        init: initFaqs
    };
}(jQuery, window, document);

/* ==========================================================================
 Lets do dis.
 ========================================================================== */

jQuery(function($) {
    BB.Modules.faqs.init();
});
"use strict";
$(".header-style-0 > #pc-view-logo").css("display", "none");