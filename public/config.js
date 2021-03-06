
var connectApp =
  {

    toUrl: function () {
      if (this.protocol)
        return this.protocol + "://" + this.host + ':' + this.port + '/loja';
      else
        return "http://" + this.host + ':' + this.port + '/loja';
    },

    toUrlWebsocket: function () {
      return (this.protocol == 'https' ? 'wss://' : "ws://") + this.hostWebsocket;
    }
  };


  connectApp.protocol = 'http';
  connectApp.host = '0.0.0.0';
  connectApp.port = '9093';
  connectApp.websocket_url = 'ws://0.0.0.0:4000';
  connectApp.image_shared_url = 'http://0.0.0.0:9093/';
  connectApp.url_sms_gateway = 'https:/lab.sicoobnet.com.br/sms';

 
  connectApp.idTerminal =  Math.floor((Math.random() * 99999) + 1)
  connectApp.terminal = {
    "idTerminal":  connectApp.idTerminal ,
    "descricao": "Terminal  " + connectApp.idTerminal,
    "uf": "DF",
    "cep": "70000-000",
    "latitudeTerminal": "-15.7801",
    "longitudeTerminal": "-47.9292",
    "empresa_logomarca" : "static/payment_company_icon.svg",
    "empresa_nome" : "Rapifood"
    
  }


  $(document).ready(function () {
    $(".tabs-menu a").click(function (event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
});


$('.bx-content').css({ width: "100%" });
$('.bx-right').css({ right: -500, 'min-width': '0px', 'width': '0px' });
setTimeout(function () {
    $('.bx-right').animate({ right: 0, 'min-width': '328px', 'width': '328px' }, 500);
    $('.bx-content').css({ width: "100%" });
}, 200)



function truncateNumber(num, n) {

  let m = Math.pow(10, n);

  return Math.trunc(num * m) / m;

}

function Msg(msg, type ) {
  $(type).notify({
      message: { text: msg },
      transition: 'fade',
      closable: false,
      fadeOut: { enabled: true, delay: 3000 }
  }).show();
}
