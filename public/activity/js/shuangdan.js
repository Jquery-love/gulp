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
    // $.ajax({
    //     url : 'http://192.168.16.16:8081/register',
    //     data: {
    //         "pn":"18668239181",
    //         "nickname":"翻滚吧",
    //         "password":"123456",
    //         "appId":"1",
    //         "captchaCode":"253462",
    //         "ip":"192.168.0.68",
    //         "type":"0"
    //     },
    //     type : 'POST',
    //     success:function(res){
    //         console.log(res);
    //     }
    // });


});