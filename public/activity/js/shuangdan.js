$(function(){
	var floatBox = function(element,relativeEle){ //定位滚动
        var limitBottom;
		if(!element.length) return;
        if(!relativeEle.length) {
            limitBottom = $("body").outerHeight();    
        }else{
            limitBottom = relativeEle.offset().top;
        }
		var top = element.position().top,left = element.position().left, pos = element.offset();
		if(element.outerHeight() > element.siblings().outerHeight()) return false;
        $(window).scroll(function() {
            var scrolls = $(this).scrollTop(),eleBotTop = scrolls + element.outerHeight() + 100;
            if (scrolls > pos.top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: ( eleBotTop > limitBottom) ? (limitBottom - eleBotTop) : 40,
                        left:element.offset().left
                    });    
                } else {
                    element.css({
                        top: scrolls
                    });    
                }
            }else {
                element.css({
                    position: "absolute",
                    top: top,
                    left : left
                });    
            }
        });
	}($('.floatBox'),$('#footer_index'));
});