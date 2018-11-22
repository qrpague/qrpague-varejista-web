//config host , port

var connectApp =
  {

  


    toUrl: function () {
      if (this.protocol)
        return this.protocol + "://" + this.host + ':' + this.port + '/sfd';
      else
        return "http://" + this.host + ':' + this.port + '/sfd';
    },

    toUrlWebsocket: function () {
      return (this.protocol == 'https' ? 'wss://' : "ws://") + this.hostWebsocket;
    }
  };
