
$('#gnb').on('mouseenter', function() {
    $('#header').addClass('on')


})
$('#gnb').on('mouseleave', function() {
    $('#header').removeClass('on')
})

// aboutUs

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
        const $el = $(this);
        if (!$el.data('scrolled')) {
            const rect = $el[0].getBoundingClientRect();
            const winHeight = window.innerHeight;
            const contentHeight = rect.bottom - rect.top;

            if (rect.top <= winHeight - (contentHeight * exposurePercentage1 / 400) && rect.bottom >= (contentHeight * exposurePercentage1 / 400)) {
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

            if (rect.top <= winHeight - (contentHeight * exposurePercentage2 / 400) && rect.bottom >= (contentHeight * exposurePercentage2 / 400)) {
                const start = parseInt($el.data("start"));
                const end = parseInt($el.data("end"));
                updateCounter2($el, start, end);
                $el.data('scrolled', true);
            }
        }
    });
}).scroll();




