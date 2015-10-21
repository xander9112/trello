var $$ = $$ || {};

$$.Application = class Application {
	constructor () {
		this.currentPage = undefined;

		this.root = $('body');

		this._cacheNodes();
		this._createComponents();

		this._initialize();
	}

	_cacheNodes () {
		this.nodes = {};
	}

	/**
	 * Создает необходимые компоненты.
	 *
	 * @private
	 */
	_createComponents () {
		this._authorizeTrello();

		this.siteMenu = new $$.Component.Menu($('.js-application > header'));

		this.user = new $$.Component.User({
			menu: this.siteMenu
		});

		this.route = new $$.Component.Route($('body'), {
			menu: this.siteMenu
		});
	}

	_initialize () {

	}

	_authorizeTrello () {
		var authenticationSuccess = function () {
			console.log("Successful authentication");
		};
		var authenticationFailure = function () {
			console.log("Failed authentication");
		};

		Trello.authorize({
			type: "redirect",
			name: "Getting Started Application",
			scope: {
				read: true,
				write: true
			},
			authenticationSuccess,
			authenticationFailure
		});
	}
};

$(function () {
	$$.window = $(window);
	$$.windowWidth = $$.window.width();
	$$.windowHeight = $$.window.height();

	$$.application = new $$.Application();

	$$.window.on('resize', () => {
		$$.windowWidth = $$.window.width();
		$$.windowHeight = $$.window.height();
	});
});
