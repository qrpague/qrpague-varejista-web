var appT = angular.module('app', ['ngMaterial', 'ngRoute', 'ngLocale', 'ui.bootstrap', 'ngTable']);

appT.controller('appController', function ($scope, $http, $timeout, $rootScope, $route, $routeParams, $location) {

	var me = this;
    var escopo = $scope;
    
    me.listaSanduiches = [{id:1,titulo:'X-buger',valor:10.9},
                            {id:2,titulo:'X-salada',valor:11.9},
                            {id:3,titulo:'X-bacon',valor:15.9},
                            {id:4,titulo:'X-tudo tradicional',valor:20.9},
                            {id:5,titulo:'X-simples',valor:8.9},
                            {id:6,titulo:'X-dog',valor:9.9}]


    me.listaBebidas  = [{id:1,titulo:'Coca-cola',valor:5},
    {id:2,titulo:'Guaraná',valor:7},
    {id:3,titulo:'Sprite',valor:8},
    {id:4,titulo:'Guaraná Limão',valor:5},
    {id:5,titulo:'7-up',valor:4},
    {id:6,titulo:'Coca-cola 2 litros',valor:8}]

    
    me.listaSobremesas   = [{id:1,titulo:'Cupcake limão',valor:10.9},
    {id:2,titulo:'Cupcake chocolate',valor:11.9},
    {id:3,titulo:'Casadinho',valor:15.9},
    {id:4,titulo:'Cupcake simples',valor:20.9},
    {id:5,titulo:'Doces',valor:8.9},
    {id:6,titulo:'Cupcake baunilha',valor:9.9}]

    me.listaPedido = [];
    me.valorTotal = 0;

    me.concluirPagamento = false;
    me.selecioneTipoPagamento = false;
    me.mostraListaItems = true;
    me.pagamentoEfetuado = false;
    me.dataPagamento = new Date();

    connectApp.protocol = 'http';
    connectApp.host = '189.74.157.246';
    connectApp.port = '8080';

    me.qrcode = new QRCode(document.getElementById("qrcode") , '', { width: 256, height: 256, text: '' });

    function conectarSocket() {
        me.connection = new WebSocket('ws://' + connectApp.host + ':4000');

        me.connection.onopen = function (event) {
            console.log("Connection opened")
        }
        me.connection.onclose = function (event) {
            console.log("Connection closed")
        }
        me.connection.onerror = function (event) {
            console.error("Connection error")
        }
        me.connection.onmessage = function (event) {
            me.mostraPagamentoEfetuado();
        }
    };

    me.hash = me.hash = CryptoJS.MD5(new Date().getTime()).toString();

    conectarSocket();

    me.adicionarSanduiche = function (id){
        me.listaPedido.push({indice:new Date(), dados:me.listaSanduiches[id]}); 
        me.valorTotal += me.listaSanduiches[id].valor;

        me.concluirPagamento = false;
        me.selecioneTipoPagamento = false;
        me.mostraListaItems = true;
        me.pagamentoEfetuado = false;
    }

    me.adicionarBebida = function (id){
        me.listaPedido.push({indice:new Date(), dados:me.listaBebidas[id]}); 
        me.valorTotal += me.listaSanduiches[id].valor;

        me.concluirPagamento = false;
        me.selecioneTipoPagamento = false;
        me.mostraListaItems = true;
        me.pagamentoEfetuado = false;
    } 
    
    me.adicionarSobremesa = function (id){
        me.listaPedido.push({indice:new Date(), dados:me.listaSobremesas[id]}); 
        me.valorTotal += me.listaSobremesas[id].valor;

        me.concluirPagamento = false;
        me.selecioneTipoPagamento = false;
        me.mostraListaItems = true;
        me.pagamentoEfetuado = false;
    }     

    me.realizarPagamento = function (){
        me.selecioneTipoPagamento = true;
        me.mostraListaItems = false;
        me.concluirPagamento = false;
    }

    me.voltarLista = function (){
        me.selecioneTipoPagamento = false;
        me.mostraListaItems = true;
        me.concluirPagamento = false;        
    }

    me.voltarSelecione = function (){
        me.selecioneTipoPagamento = true;
        me.mostraListaItems = false;
        me.concluirPagamento = false;        
    }

    me.mostraQRcode = function (){
        me.concluirPagamento = true;
        me.selecioneTipoPagamento = false;
        me.mostraListaItems = false;

        me.buscaQRCode();
    }

    me.buscaQRCode = function (){
		var rest = {
			method: 'POST',
			url: connectApp.toUrl() + "/getQRCode",
			headers: { 'Content-Type': 'application/json' },
			data: { valor : me.valorTotal }
		}

		$http(rest).then(function (e) {
            if(me.qrcode)
                me.qrcode.clear();

            me.qrcode.makeCode(e.data);
		});
    }

    me.novaVenda = function (){
        me.listaPedido = [];
        me.valorTotal = 0;        
        me.concluirPagamento = false;
        me.selecioneTipoPagamento = false;
        me.mostraListaItems = true;
        me.pagamentoEfetuado = false;
    }

    me.mostraPagamentoEfetuado = function (){
        
        $('.sub-total').css({'display':'block'});

        $('.textoRecebendo').css({'margin-top':80});

        setTimeout(function (){
            me.mostraAguarde = true;
            me.pagamentoEfetuado = false;
            me.concluirPagamento = false;
            me.selecioneTipoPagamento = false;
            me.mostraListaItems = false;        
            
            $('.textoRecebendo').animate({'margin-top':0}, 300);

            $scope.$apply();

            setTimeout(function (){
                me.mostraAguarde = false;
                me.pagamentoEfetuado = true;
                $('.icoOk').css({'font-size':0});
                $('.textoConcluido').css({'opacity':0, 'margin-top':-20});
                $('.textoPagamentoSucesso').css({'opacity':0});
                $('.txtValorPago').css({'opacity':0});
                $('.txtDataPago').css({'opacity':0});

                $('.icoOk').animate({'font-size':130}, function (){
                    $('.textoConcluido').animate({'opacity':1, 'margin-top':0});
                    $('.textoPagamentoSucesso').css({'opacity':1});
                    $('.txtValorPago').animate({'opacity':1, 'margin-top':-15});
                    $('.txtDataPago').animate({'opacity':1});
                });
                $scope.$apply();
            }, 2000)

        }, 100)
    }

    $('.bx-content').css({width: "100%"});
    $('.bx-right').css({right: -500, 'min-width': '0px', 'width': '0px'});
    setTimeout(function (){
        $('.bx-right').animate({right: 0, 'min-width': '328px', 'width': '328px'},500);
        $('.bx-content').css({width: "100%"});
    },200)
    
});
