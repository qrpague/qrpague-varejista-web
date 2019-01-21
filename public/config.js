
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
  connectApp.websocket_url = 'wss://0.0.0.0:4000';
  connectApp.image_shared_url = 'http://0.0.0.0:9093/';


  connectApp.idTerminal = '0001128322332'
  connectApp.terminal = {
    "idTerminal": "0001128322332",
    "descricao": "Terminal b9384 ",
    "uf": "DF",
    "cep": "70000-000",
    "latitudeTerminal": "-15.7801",
    "longitudeTerminal": "-47.9292"
  },
