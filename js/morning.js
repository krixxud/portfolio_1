function resizing() {
    if (window.innerWidth < 1200) {
        $('.desk').off();
        $('#gnb').removeClass('desk').addClass('mobile')
        $('.mobileBtn').css({ display: 'block' })
    }
    else {
        $('#gnb').removeClass('mobile').addClass('desk')
        $('.desk').on('mouseenter', function () {
            $('#header').addClass('on')
        })
        $('.desk').on('mouseleave', function () {
            $('#header').removeClass('on')
        })
        $('.mobileBtn').css({ display: 'none' })
    }
}

resizing();
$(window).on('resize', function () {
    resizing()
})
$('.mobileClose').hide();
$('.mobileBtn').on('click', function () {
    $('.mobileClose').show();
    $('.mobile').addClass('on');
})
$('.mobileClose').on('click', function () {
    $('.mobileClose').hide();
    $('.mobile').removeClass('on');
})

// 모바일에서 메인 메뉴 클릭 시 서브메뉴 토글
$('#gnbList > li > a').on('click', function (e) {
    // viewport 너비가 1199px 이하일 때만 작동
    if ($(window).width() <= 1199) {
        e.preventDefault(); // 링크 기본 동작 방지

        const $this = $(this);
        const $subMenu = $this.siblings('.snb');

        // 현재 클릭한 메뉴의 서브메뉴가 닫혀있는 경우
        if (!$subMenu.is(':visible')) {
            // 다른 열린 서브메뉴들을 먼저 닫기
            $('#gnbList .snb').slideUp(300);
            // 현재 서브메뉴 열기
            $subMenu.slideDown(300);

            // 활성화된 메뉴 스타일 적용
            $('#gnbList > li > a').removeClass('active');
            $this.addClass('active');
        } else {
            // 현재 서브메뉴가 열려있으면 닫기
            $subMenu.slideUp(300);
            $this.removeClass('active');
        }
    }
});

// 리사이즈 시 모바일 메뉴 초기화
$(window).on('resize', function () {
    if ($(window).width() > 1199) {
        $('#gnb').removeClass('mobile on');
        $('.mobileClose').hide();
        $('.snb').removeAttr('style');
        $('#gnbList > li > a').removeClass('active');
    }
});

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
        if (window.innerWidth < 501);
        const $el = $(this);
        if (!$el.data('scrolled')) {
            const rect = $el[0].getBoundingClientRect();
            const winHeight = window.innerHeight;
            const contentHeight = rect.bottom - rect.top;

            if (rect.top <= winHeight - (contentHeight * exposurePercentage1 / 50)) {
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

    document.addEventListener('DOMContentLoaded', function () {
        const introduction = document.querySelector('#introduction');
        const articles = introduction.querySelectorAll('article');

        const introTitle = document.querySelector('#introduction .introTitle');
        if (introTitle) {
            setTimeout(() => {
                introTitle.classList.add('fade-out');
            }, 3000);
        }

        // 페이지 인디케이터 생성
        const indicator = document.createElement('div');
        indicator.className = 'page-indicator';
        articles.forEach(() => {
            const dot = document.createElement('span');
            indicator.appendChild(dot);
        });
        introduction.appendChild(indicator);

        // 현재 활성 슬라이드 추적
        const updateActiveSlide = () => {
            const index = Math.round(introduction.scrollLeft / window.innerWidth);

            // 인디케이터 업데이트
            indicator.querySelectorAll('span').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // 슬라이드 활성화 효과
            articles.forEach((article, i) => {
                article.classList.toggle('active', i === index);
            });
        };

        // 스크롤 이벤트
        let timeout;
        introduction.addEventListener('scroll', () => {
            clearTimeout(timeout);
            timeout = setTimeout(updateActiveSlide, 100);
        });

        // 초기 활성화
        updateActiveSlide();

        // 5초 후 스와이프 힌트 제거
        setTimeout(() => {
            introduction.style.setProperty('--hint-opacity', '0');
        }, 5000);
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
$("#introduction article h3 span").on('mouseenter', function () {
    if ($(this).parent().next().css("z-index") == '11') return;
    else {
        if (zNum == 10) zNum = zNum + 2;
        else if (zNum == 11) zNum++;


        $(this).parent().next()
            .stop()
            .css({ zIndex: zNum, opacity: 0 })
            .animate({ opacity: 1 }, 400, function () {
                zNum--;
                $(this).css({ zIndex: zNum });
                $("#introduction article .business").not($(this)).css({ zIndex: 10 })
            })
    }
    $('#introduction article h3').removeClass('on')
    $(this).parent().addClass('on')
})



$("#newsNotice article h3").on('click', function () {
    $("#newsNotice article").not($(this).parent()).css({ flex: `1 1 1px` })
    $(this).parent().css({ flex: `3 1 1px` })
})




