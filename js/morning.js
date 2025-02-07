
$('#gnb').on('mouseenter', function() {
    if (window.innerWidth < 501) e.preventDefault();
    $('#header').addClass('on')
})
$('#gnb').on('mouseleave', function() {
    $('#header').removeClass('on')
})

// 모바일
$(".siteMapView").on('click', function() {
    $("#gnb").addClass('mobile')
})

$(".mobileClose").on('click', function() {
    $("#gnb").removeClass('mobile')
})

// aboutUs

const winHeight = window.innerHeight;
const exposurePercentage = 100;

// 첫 번째 카운터
const $counters1 = $(".counter1");
const exposurePercentage1 = 100;
const duration1 = 600;
const addCommas1 = false;


function updateCounter1($el, start, end) {
    

    let startTime;

    function animateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration1;
        const current = Math.round(start + progress * (end - start));
        const formattedNumber = addCommas1 ? current.toLocaleString() : current;
        $el.text(formattedNumber);

        if (progress < 1) {
            requestAnimationFrame(animateCounter);
        } else {
            $el.text(addCommas1 ? end.toLocaleString() : end);
        }
    }
    requestAnimationFrame(animateCounter);
}

// 두 번째 카운터
const $counters2 = $(".counter");
const exposurePercentage2 = 100;
const duration2 = 1700;
const addCommas2 = false;

function updateCounter2($el, start, end) {

    let startTime;
    function animateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration2;
        const current = Math.round(start + progress * (end - start));
        const formattedNumber = addCommas2 ? current.toLocaleString() : current;
        $el.text(formattedNumber);

        if (progress < 1) {
            requestAnimationFrame(animateCounter);
        } else {
            $el.text(addCommas2 ? end.toLocaleString() : end);
        }
    }
    requestAnimationFrame(animateCounter);
}

// 스크롤 이벤트 병합
$(window).on('scroll', function () {
    // 첫 번째 카운터
   
    $counters1.each(function () {
        if (window.innerWidth < 501) e.preventDefault();
        const $el = $(this);
        if (!$el.data('scrolled')) {
            const rect = $el[0].getBoundingClientRect();
            const winHeight = window.innerHeight;
            const contentHeight = rect.bottom - rect.top;

            if (rect.top <= winHeight - (contentHeight * exposurePercentage1 / 50) ) {
                // if (rect.top <= winHeight - (contentHeight * exposurePercentage1 / 1000) && rect.bottom >= (contentHeight * exposurePercentage1 / 400)) {
                const start = parseInt($el.data("start"));
                const end = parseInt($el.data("end"));
                updateCounter1($el, start, end);
                $el.data('scrolled', true);

                $("#aboutUs #count .num1").addClass("active");
            }
        }
    });

    // 두 번째 카운터
    $counters2.each(function () {
        const $el = $(this);
        if (!$el.data('scrolled')) {
            const rect = $el[0].getBoundingClientRect();
            const winHeight = window.innerHeight;
            const contentHeight = rect.bottom - rect.top;

            if (rect.top <= winHeight - (contentHeight * exposurePercentage2 / 50)) {
                const start = parseInt($el.data("start"));
                const end = parseInt($el.data("end"));
                updateCounter2($el, start, end);
                $el.data('scrolled', true);
            }
        }
    });

    // introduction 도달시
const $introduction = $("#introduction");

// introduction 도달시
$introduction.each(function () {
    const $el = $(this);
    const rect = $el[0].getBoundingClientRect();
    const contentHeight = rect.bottom - rect.top;
    if (rect.top <= winHeight - (contentHeight * exposurePercentage / 400)) {
        $el.css({ scale: 1 })
    }
    else {
        $el.css({ scale: 0.7 })
        $("#introduction .business").css({ zIndex: 1 })
    }
});

// newsNotice 도달시
const $newsNotice = $("#newsNotice");

   // 소식 도달시
   $newsNotice.each(function () {
    const $el = $(this);
    const $heading = $el.find('h2')
    const rect = $el[0].getBoundingClientRect();
    const contentHeight = rect.bottom - rect.top;
    if (rect.top <= winHeight - (contentHeight * exposurePercentage / 200)) {
        $heading.addClass('on')
    }
    else {
        $heading.removeClass('on')

    }
})
}).scroll();

$('.searchIcon').on('click', function (e) {
    e.preventDefault();
    alert('검색 기능은 준비 중입니다.');
});

// $(window).on('load', function () {
//     $('#slogan h2').css({ opacity: 1 });
//     $('#slogan p').css({ opacity: 1 });
// });





let zNum = 10;
$("#introduction article h3 span").on('mouseenter', function() {
    if ( $(this).parent().next().css("z-index") == '11') return;
    else {
        if (zNum == 10) zNum = zNum + 2;
        else if (zNum == 11) zNum++;   

        
        $(this).parent().next()
                    .stop()
                    .css({ zIndex: zNum, opacity: 0 })
                    .animate({ opacity: 1 }, 400, function() {
                        zNum--;
                        $(this).css({ zIndex: zNum });
                        $("#introduction article .business").not($(this)).css({ zIndex: 10 })
                    })
    }
    $('#introduction article h3').removeClass('on')
    $(this).parent().addClass('on')
})



$("#newsNotice article h3").on('click', function() {
    $("#newsNotice article").not($(this).parent()).css({  flex: `1 1 1px` })
    $(this).parent().css({ flex: `3 1 1px`})
})


