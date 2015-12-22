// $(".demo").attr('href','https://itunes.apple.com/us/app/zhao-yong-zai-xian-you-piao/id468613187?l=zh&ls=1&mt=8');
// $(".demo").attr('href','http://mp.weixin.qq.com/mp/redirect?url=https%3A%2F%2Fitunes.apple.com%2Fus%2Fapp%2Fzhao-yong-zai-xian-you-piao%2Fid468613187%3Fl%3Dzh%26ls%3D1%26mt%3D8');
$(function () {
  // register submit
  $('#register-submit').click(function () {
    console.log('register submit ...');
    //var url = 'http://116.236.187.3:8085/register';
    //$.ajax({
    //  url: url,
    //  type: 'GET',
    //  cache: true,
    //  dataType: 'jsonp',
    //  jsonp:"jsoncallback",
    //  data: {
    //    "pn": $('user_pn').val(),
    //    "nickname": $('#user_nickname').val(),
    //    "password": $('#user_pass').val(),
    //    "appId": 1,
    //    "captchaCode": 1111,
    //    "ip": ''
    //  },
    //  success: function(data){
    //    console.log(data);
    //    console.log(data.statusText);
    //  },
    //  error: function () {
    //    console.log('error');
    //  }
    //});
  });
  // login submit
  $('#login-submit').click(function () {
    console.log('login submit ...')
  });
  var errorShake = function (ele, options) {
    var times = options.times;
    var distance = options.distance;
    var duration = options.duration;
    for(var i= 1; i < times; i++){
      $(ele).animate({left: (distance * -1), right: distance },(((duration / times) / 4)))
        .animate({left: distance, right: (distance * -1)},((duration/times)/2))
        .animate({left: 0, right: 0},(((duration/times)/4)));
    }
  };
  $('.hide-show-pass').click(function () {
    return $(this).prev().attr('type') === 'text' ?
      $(this).removeClass('ion-eye').addClass('ion-eye-disabled').prev().attr('type', 'password'):
      $(this).removeClass('ion-eye-disabled').addClass('ion-eye').prev().attr('type', 'text');
  });
  $('#getCode').click(function () {
    $(this).html('剩余<span>60</span>秒').prop('disabled', true);
    var _this = this;
    var COUNTDOWN_TIMER = null;
    COUNTDOWN_TIMER = setInterval(function () {
      var currentCount = $(_this).find('span').html();
      if (currentCount < 1) {
        $(_this).html('获取验证码').prop('disabled', false);
        clearInterval(COUNTDOWN_TIMER);
      } else {
        $(_this).html('剩余<span>' + (--currentCount) + '</span>秒');
      }
    }, 1000);
    errorShake('.error-tip', {
      times: 6,
      distance: 10,
      duration: 400
    });
  });
  // init page
  (function () {
    var url = 'http://api.weixin.qq.com/cgi-bin/token';
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'jsonp',
      data: {
        'grant_type': 'client_credential',
        'appid': 'wx663aa8a8a0a6ca6a',
        'secret': 'd4624c36b6795d1d99dcf0547af5443d'
      },
      jsonp: 'callback',
      success: function (data) {
        console.log(JSON.stringify(data));
      },
      error: function (data) {
        console.log('get access token fail ...')
      }
    });
  })();
});