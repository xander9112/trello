var MainController = function ($rootScope, $scope, $localStorage, $websocket) {
	"use strict";

	$rootScope.$on('$stateChangeStart', function (ev) {
		$scope.loadingPage = true;
	});

	$rootScope.$on('$stateChangeSuccess', function (ev) {
		$scope.loadingPage = false;
	});

	var authenticationSuccess = function () {
		console.log("Successful authentication");
	};

	var authenticationFailure = function () {
		console.log("Failed authentication");
	};

	Trello.authorize({
		type:  "redirect",
		name:  "Getting Started Application",
		scope: {
			read:  true,
			write: true
		},
		function(){
			console.log('afsfsa');
		},
		function(){
			console.log('sffsa');
		}
	});

	if (!angular.isDefined($localStorage.key)) {
		$localStorage.key = Trello.key();
	} else {
		if ($localStorage.key !== Trello.key()) {
			$localStorage.key = Trello.key();
		}
	}

	if (!angular.isDefined($localStorage.token)) {
		$localStorage.token = Trello.token();
	} else {
		if ($localStorage.token !== Trello.token()) {
			$localStorage.token = Trello.token();
		}
	}

	/*var ws = $websocket.$new(`wss://api.trello.com/1/sessions/socket?token=${$localStorage.token}`); // instance of ngWebsocket, handled by $websocket service

	 ws.$on('$open', function () {
	 console.log('Oh my gosh, websocket is really open! Fukken awesome!');

	 /!*var data = {
	 status:  'active',
	 idBoard: '5625fcbf62c01e6aaa0a4a10'
	 };

	 //ws.$emit('POST', 'hi listening websocket server'); // send a message to the websocket server

	 ws.$emit('POST', data);*!/
	 });

	 ws.$on('$error', function (data) {
	 console.log(data);
	 });

	 ws.$on('$message', function (data) {
	 console.log(data);
	 });

	 ws.$on('POST', function (data) {
	 console.log('The websocket server has sent the following data:');
	 console.log(data);

	 ws.$close();
	 });

	 ws.$on('$close', function () {
	 console.log('Noooooooooou, I want to have more fun with ngWebsocket, damn it!');
	 });*/
};
