
$('#gnbList').on('mouseenter', function() {
    $(this).stop().animate({ height: 400 }, 1000)


})
$('#gnbList').on('mouseleave', function() {
    $(this).stop().animate({ height: 75 }, 1000)
})