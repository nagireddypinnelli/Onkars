
responsiveSite();

msieversion();

function openNav() {
    $('.wizard .content').show();

    document.getElementById("myNav").style.height = "100%";

	$('#wizard-t-0').click();

    $("nav.nav-main").css('opacity', '.5');    

    $("body").css('overflow-y', 'hidden');   

    $('.wizard .content').css({ 'height': (($(window).height()) - 60) + 'px' });

    $('.container-content.create').css({'z-index': '10','display':'block'});

    $('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

    $('.container-content.create').css({ 'width': (($('body').width())) + 'px' });

    $("body").css('overflow-y', 'hidden');

    if  ($(window).width() < 992)
        {
        $("body").css('position', 'fixed');

        $('header, .nav-mob-res-logo ').removeClass('nav-up').addClass('nav-down');

        $('.menu-fixed').removeClass('nav-relative').addClass('nav-static');

        $('.wizard .content').css({ 'height': (($(window).height()) - 50) + 'px' });
        }
}

function closeNav() {	
    document.getElementById("myNav").style.height = "0%";

    $("body").css('overflow-y', 'visible');

    $('.wizard .content').hide();

    $('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

    $('.container-content.create').css({'z-index': '0','display':'none'})

    $("body").css('position', 'static');
}

function openCreateUserNav() {
    $('.wizard .content').show();

    document.getElementById("myUserNav").style.height = "100%";

	$('#wizard-t-0').click();

    $("nav.nav-main").css('opacity', '.5');    

    $("body").css('overflow-y', 'hidden');

    $('.wizard .content').css({ 'height': (($(window).height()) - 60) + 'px' });

    $('.container-content.create-user').css({'z-index': '10','display':'block'});

    $('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

    $('.container-content.create-user').css({ 'width': (($('body').width())) + 'px' });

    
    if  ($(window).width() < 992)
        {
        $("body").css('position', 'fixed');

        $('header, .nav-mob-res-logo ').removeClass('nav-up').addClass('nav-down');

        $('.menu-fixed').removeClass('nav-relative').addClass('nav-static');

        $('.wizard .content').css({ 'height': (($(window).height()) - 50) + 'px' });
        }
}

function closeCreateUserNav() {	
    document.getElementById("myUserNav").style.height = "0%";

    $("body").css('overflow-y', 'visible');

    $("body").css('position', 'static');

    $('.wizard .content').hide();

    $('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

    $('.container-content.create-user').css({'z-index': '0','display':'none'})

    $("body").css('position', 'static');
}

function responsiveSite() {

    if  ($(window).width() < 992)
        {
        $('.col-sel-left').removeClass('col-left-cust-width');

        $('.col-sel-middle').removeClass('col-middle-cust-width');

        $('.col-sel-right').removeClass('col-right-cust-width');

        $('.filter-mob-res').addClass('filter-mob-res-class');

        $(".mobRes").hide();

        $(".mobView").show();

        $(".mobileFilterHideIcon").show();  

        $('.filter-mob-res-class').css({ 'height': (($(window).height()) - 85) + 'px' });

        $('.col-sel-left').addClass('animate-left-hide');

        $('.create-mob-col-view').removeClass('col-md-11').addClass('col-md-6');

        $('.lbl-details').removeClass('col-md-12');

        $('.col-auto-scroll').css({
                    'margin-left': '0%'
        });
        }
    else if  ($(window).width() >= 992)
        {
        if  ($(".col-sel-left").hasClass("col-left-cust-width") ==  false)
            {
            $('.col-sel-left').addClass('col-left-cust-width');

            $('.col-sel-middle').addClass('col-middle-cust-width');

            $('.col-sel-right').addClass('col-right-cust-width');
            }

        $('.filter-mob-res').removeClass('filter-mob-res-class');

        $(".mobileFilterHideIcon").hide();   
        
        $(".mobRes").show();

        $(".mobView").hide();

        $('.col-sel-left').removeClass('animate-left-hide');

        $('.create-mob-col-view').addClass('col-md-11').removeClass('col-md-6');
        
        $('.filterDiv').css('height','auto');

        if  ($(".lbl-details").hasClass("col-md-12") ==  false)
            {
            $('.lbl-details').addClass('col-md-12');
            }        
        
        $("body").css('position', 'static');
        }

    if  ($(window).width() > 1280)
        {
        $('header').css({ 'width': '85%' });
        }
    else if  ($(window).width() < 1281 )
        {
        $('header').css({ 'width': '100%' });
        }
    //else if  ($(window).width() < 1186)
    //    {
    //    $('header').css({ 'width':'100%' });
    //    }

}

function msieversion() {

    var ua = window.navigator.userAgent;

    var msie = ua.indexOf("MSIE");

    if  (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
        {
        $('.col-bg-para-detail').removeClass('col-bg-para-detail').addClass('col-bg-para-detail-ie');

        $('.col-philosophy').removeClass('col-philosophy').addClass('col-philosophy-ie');

        //$('.id3-logo-bottom').removeClass('id3-logo-bottom').addClass('id3-logo-bottom-ie');

        //$('.img-ust').removeClass('img-ust').addClass('img-ust-ie');
        }

    return false;
}


$(window).resize(function () {
    if  ($(window).width() >= 992){
        $('.wizard .content').css({ 'height': (($(window).height()) - 60) + 'px' });
        }    

    if  ($(window).width() < 992){
        $('.wizard .content').css({ 'height': (($(window).height()) - 50) + 'px' });
        } 

    $('.wizard>.content').css({ 'width': (($('body').width())) + 'px' });

    $('.container-content.create').css({ 'width': (($('body').width())) + 'px' });

    $('.container-content.create-user').css({ 'width': (($('body').width())) + 'px' });

    $("body").css('overflow-y', 'scroll');

    responsiveSite();
});

function slideDownPhase(event)
    {
    resetChevronIcon();

    $('#rowGridPhase').slideToggle();
    
    toggleChevronIcon(event);
    }

function slideDownStatus(event)
    {
    resetChevronIcon();

    $('#rowGridStatus').slideToggle();

    toggleChevronIcon(event);
    }

function slideDownId3(event)
    {
    resetChevronIcon();

    $('#rowGridId3').slideToggle();

    toggleChevronIcon(event);
    }

function resetChevronIcon()
    {
    var $event = $('.span-click-icon');


    if ($event.hasClass('ion-ios-arrow-down') == true)
        {
        $event.removeClass('ion-ios-arrow-down').addClass('ion-ios-arrow-right');

        $('.slide-menu').slideUp();
        }
    
    }

function toggleChevronIcon(event)
    {
    if (event.find(".span-click-icon").hasClass('ion-ios-arrow-down') == true)
        {
        event.find(".span-click-icon").removeClass('ion-ios-arrow-down').addClass('ion-ios-arrow-right');
        }
    else
        {
        event.find(".span-click-icon").removeClass('ion-ios-arrow-right').addClass('ion-ios-arrow-down');
        }
    }