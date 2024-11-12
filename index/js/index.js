
var $list = $('.list')
var $nav = $('.nav')

$(window).scroll(function () {
	var scrollTop = $(window).scrollTop();
	console.log(scrollTop);

	


	var list = $(".box2").find(".list");
	// console.log(list);

	list.each(function (index, item) {
		// console.log(index, item);
		var top = $(item).offset().top;
		// console.log(top);

		if (scrollTop >= top - 100) {
			$(".nav ul li").eq(index).addClass("active").siblings().removeClass("active");

		}
	})

})


$('.nav li').click(function () {

	if ($(this).hasClass('last')) {
		// $(window).scrollTop(0)
		$('html').animate({
			scrollTop: 0
		})

		return
	}

	var idx = $(this).index()

	var top = $list.eq(idx).offset().top

	console.log($(window));


	$("html").animate({
		scrollTop: top
	})
})