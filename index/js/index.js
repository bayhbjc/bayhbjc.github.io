var $nav=$(".nav");
var $center=$(".center");
//随着导航栏下滑，侧边栏也随着高亮
$center.scroll(function(){
	//获取滚动条的高度
	
    
	// var scrollTop=$center.scrollTop();
	// $nav.find("li").each(function(index,item){
	// 	var $item=$(item);
	// 	var top=$item.offset().top;
	// 	if(scrollTop>top-100){
	// 		$item.addClass("active").siblings().removeClass("active");
	// 	}
	// })
})

// 点击导航栏，侧边栏也随着高亮
$nav.find("li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
})







