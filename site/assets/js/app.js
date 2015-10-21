"use strict";

$$ = $$ || {};

$$.Model = $$.Model || {};
$$.Component = $$.Component || {};;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$$.Model.Boards = (function () {
	function ModelBoards() {
		"use strict";

		var root = arguments.length <= 0 || arguments[0] === undefined ? $('main') : arguments[0];
		var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, ModelBoards);

		this.root = root === '' ? $('main') : root;
		this.params = params;

		this._template();
		this.initialize();
	}

	_createClass(ModelBoards, [{
		key: 'initialize',
		value: function initialize() {
			"use strict";
			this.root.html(this.template);

			this._cacheNodes();

			if (this.params.board_id) {
				this._getBoard(this.params.board_id);
			} else {
				this._getBoards();
			}
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			"use strict";
			console.log('destroy Boards');
		}
	}, {
		key: '_template',
		value: function _template() {
			"use strict";
			this.template = '<div class="row js-boards">\n\t\t\t\t\t\t\t<div class="fixed-action-btn" style="bottom: 45px; right: 24px;">\n\t\t\t\t\t\t    <a class="btn-floating btn-large red">\n\t\t\t\t\t\t      <i class="large material-icons">add</i>\n\t\t\t\t\t\t    </a>\n\t\t\t\t\t\t    <ul>\n\t\t\t\t\t\t      <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></i></a></li>\n\t\t\t\t\t\t      <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>\n\t\t\t\t\t\t      <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>\n\t\t\t\t\t\t      <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>\n\t\t\t\t\t\t    </ul>\n\t\t\t\t\t\t  </div>\n\t\t\t\t\t\t  </div>';
		}
	}, {
		key: '_cacheNodes',
		value: function _cacheNodes() {
			"use strict";
			this.nodes = {
				content: this.root.find('.js-boards')
			};
		}
	}, {
		key: '_templateBoards',
		value: function _templateBoards(data) {
			"use strict";

			return '<div class="col s12 m4">\n\t\t\t         <div class="card blue-grey darken-1">\n\t\t\t\t\t     <div class="card-content white-text">\n\t\t\t\t\t\t     <span class="card-title">' + data.name + '</span>\n\t\t\t\t\t\t     <p>' + data.desc + '</p>\n\t\t\t\t\t     </div>\n\t\t\t\t\t     <div class="card-action right-align">\n\t\t\t\t\t\t     <a href="/boards/' + data.shortLink + '">Открыть</a>\n\t\t\t\t\t     </div>\n\t\t\t\t     </div>\n\t\t\t     </div>';
		}
	}, {
		key: '_getBoards',
		value: function _getBoards() {
			"use strict";

			var _this = this;

			console.log(this.nodes);

			return Trello.get('/members/me/boards').then(function (response) {
				_this.boards = response;

				_.where(_this.boards, { closed: false }).forEach(function (board) {
					console.log(board);

					_this.nodes.content.append(_this._templateBoards(board));
				});
			});
		}
	}, {
		key: '_getBoard',
		value: function _getBoard(params) {
			"use strict";
			return Trello.get('/boards/' + params);
		}
	}]);

	return ModelBoards;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Model.Index = (function () {
	function ModelIndex() {
		"use strict";

		var root = arguments.length <= 0 || arguments[0] === undefined ? $('main') : arguments[0];

		_classCallCheck(this, ModelIndex);

		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	_createClass(ModelIndex, [{
		key: 'initialize',
		value: function initialize() {
			"use strict";
			this.root.html(this.template);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			"use strict";
			console.log('destroy Index');
		}
	}, {
		key: '_template',
		value: function _template() {
			"use strict";
			this.template = '<h1>Index</h1>';
		}
	}]);

	return ModelIndex;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Model.NotFound = (function () {
	function ModelNotFound() {
		"use strict";

		var root = arguments.length <= 0 || arguments[0] === undefined ? $('main') : arguments[0];

		_classCallCheck(this, ModelNotFound);

		this.root = root === '' ? $('main') : root;

		this._template();
		this.initialize();
	}

	_createClass(ModelNotFound, [{
		key: 'initialize',
		value: function initialize() {
			"use strict";
			this.root.html(this.template);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			"use strict";
			console.log('destroy NotFound');
		}
	}, {
		key: '_template',
		value: function _template() {
			"use strict";
			this.template = '<h1>NotFound</h1>';
		}
	}]);

	return ModelNotFound;
})();;
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$$.Component.Menu = (function () {
	function ComponentMenu() {
		var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, ComponentMenu);

		var defaultOptions = {};

		this.root = root;
		this.options = _.merge(options || {}, defaultOptions, _.defaults);
		this.current = '';

		this._template();
		this._cacheNodes();
		this.initialize();
	}

	_createClass(ComponentMenu, [{
		key: "initialize",
		value: function initialize() {
			"use strict";

			this.root.append(this.template);
		}
	}, {
		key: "_template",
		value: function _template() {
			"use strict";

			this.template = $("\n\t\t\t<nav>\n\t\t        <div class=\"nav-wrapper\">\n\t\t\t      <a href=\"/\" class=\"brand-logo\">Trello</a>\n\t\t\t      <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n\t\t\t        <li><a href=\"/boards\">Boards</a></li>\n\t\t\t        <li><a href=\"/fsfasfas\">fsfasfas</a></li>\n\t\t\t        <li><a href=\"collapsible.html\">JavaScript</a></li>\n\t\t\t      </ul>\n\t\t\t    </div>\n\t\t    </nav>");
		}
	}, {
		key: "updateMenu",
		value: function updateMenu(currentItem) {
			this.nodes.items.each(function (index, element) {
				$(element).removeClass('selected active');
			});

			if (!_.isUndefined(currentItem)) {
				currentItem.addClass('active');
			}
		}
	}, {
		key: "findUrl",
		value: function findUrl(url) {
			var currentItem = undefined;

			if (url !== '/') {
				if (url.charAt(url.length - 1) === '/') {
					url = url.substring(0, url.length - 1);
				}
			}

			this.nodes.items.each(function (index, element) {
				var href = $(element).find('a').attr('href');

				if (href === url) {
					currentItem = $(element);
				}
			});

			return currentItem;
		}
	}, {
		key: "_cacheNodes",
		value: function _cacheNodes() {
			this.nodes = {
				nav: this.template.find('ul'),
				items: this.template.find('li')
			};
		}
	}, {
		key: "currentItem",
		set: function set(url) {
			"use strict";

			this.updateMenu(this.findUrl(url));
		}
	}, {
		key: "userInfo",
		set: function set(template) {
			"use strict";

			this.nodes.nav.append(template);
		}
	}]);

	return ComponentMenu;
})();;
"use strict";;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

$$.Component.Route = (function () {
	function Route() {
		var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, Route);

		this.root = root;
		this.currentModel = null;

		this.menu = options.menu;

		this.initialize();
	}

	_createClass(Route, [{
		key: 'initialize',
		value: function initialize() {
			this.currentUrl = window.location.pathname;
			this._registerRoutes();
		}
	}, {
		key: '_registerRoutes',
		value: function _registerRoutes() {
			var _this = this;

			page('/', function (options) {
				"use strict";
				options.pathname = '/index';
				_this._initModel(options);
			});

			page('/boards', function (options) {
				"use strict";
				_this._initModel(options);
			});

			page('/boards/:board_id', function (options) {
				"use strict";
				_this._initModel(options);
			});

			page('*', function (options) {
				"use strict";
				options.pathname = '/notFound';
				_this._initModel(options);
			});

			page();
		}
	}, {
		key: '_initModel',
		value: function _initModel(options) {
			"use strict";

			var pathname = options.pathname.split('/')[1];

			var modelName = pathname.charAt(0).toUpperCase() + pathname.substr(1);

			if (this.currentModel) {
				this.currentModel.destroy();
			}

			if (!_.isUndefined($$.Model[modelName])) {
				this.currentModel = new $$.Model[modelName]('', options.params);
				this.menu.currentItem = options.pathname;

				return;
			}

			//page.redirect('/');
		}
	}]);

	return Route;
})();;
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$$.Component.User = (function () {
	function ComponentUser() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, ComponentUser);

		var defaultOptions = {};

		this.options = _.merge(options || {}, defaultOptions, _.defaults);

		this.menu = this.options.menu;

		this._getUserData();

		this._cacheNodes();
		this.initialize();
	}

	_createClass(ComponentUser, [{
		key: "initialize",
		value: function initialize() {
			"use strict";

			var _this = this;

			this._getUserData().then(function () {
				_this.menu.userInfo = "<li><a href=\"/members/me\"><i class=\"material-icons left\">view_module</i> " + _this.userData.fullName + "</a></li>";
			});
		}
	}, {
		key: "_getUserData",
		value: function _getUserData() {
			"use strict";

			var _this2 = this;

			return Trello.get('members/me').then(function (response) {
				"use strict";
				_this2.userData = response;
			});
		}
	}, {
		key: "_template",
		value: function _template() {
			"use strict";

			this.template = $("");
		}
	}, {
		key: "_cacheNodes",
		value: function _cacheNodes() {
			this.nodes = {};
		}
	}]);

	return ComponentUser;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Pages = $$.Pages || {};

$$.Pages['ContentPage'] = (function () {
    function ContentPage() {
        var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, ContentPage);

        this.root = root;

        this._cacheNodes();
        this._bindEvents();

        this.initialize();
    }

    _createClass(ContentPage, [{
        key: 'destroy',
        value: function destroy() {
            this.root.off();
            delete this.root;
            delete this.nodes;
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            //console.log('ContentPage');
        }
    }, {
        key: '_cacheNodes',
        value: function _cacheNodes() {
            this.nodes = {};
        }
    }, {
        key: '_bindEvents',
        value: function _bindEvents() {}
    }]);

    return ContentPage;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Pages = $$.Pages || {};

$$.Pages['Default'] = (function () {
	function Default() {
		var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, Default);

		this.root = root;

		this._cacheNodes();
		this._bindEvents();

		this.initialize();
	}

	_createClass(Default, [{
		key: 'destroy',
		value: function destroy() {
			delete this.root;
			delete this.nodes;
		}
	}, {
		key: 'initialize',
		value: function initialize() {
			//console.log('Default');
		}
	}, {
		key: '_cacheNodes',
		value: function _cacheNodes() {
			this.nodes = {};
		}
	}, {
		key: '_bindEvents',
		value: function _bindEvents() {}
	}]);

	return Default;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Pages = $$.Pages || {};

$$.Pages['MainPage'] = (function () {
    function MainPage() {
        var root = arguments.length <= 0 || arguments[0] === undefined ? $ : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, MainPage);

        this.root = root;

        this._cacheNodes();
        this._bindEvents();

        this.initialize();
    }

    _createClass(MainPage, [{
        key: 'destroy',
        value: function destroy() {
            this.root.off();
            delete this.root;
            delete this.nodes;
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            //console.log('MainPage');
        }
    }, {
        key: '_cacheNodes',
        value: function _cacheNodes() {
            this.nodes = {};
        }
    }, {
        key: '_bindEvents',
        value: function _bindEvents() {}
    }]);

    return MainPage;
})();;
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var $$ = $$ || {};

$$.Application = (function () {
	function Application() {
		_classCallCheck(this, Application);

		this.currentPage = undefined;

		this.root = $('body');

		this._cacheNodes();
		this._createComponents();

		this._initialize();
	}

	_createClass(Application, [{
		key: '_cacheNodes',
		value: function _cacheNodes() {
			this.nodes = {};
		}

		/**
   * Создает необходимые компоненты.
   *
   * @private
   */
	}, {
		key: '_createComponents',
		value: function _createComponents() {
			this._authorizeTrello();

			this.siteMenu = new $$.Component.Menu($('.js-application > header'));

			this.user = new $$.Component.User({
				menu: this.siteMenu
			});

			this.route = new $$.Component.Route($('body'), {
				menu: this.siteMenu
			});
		}
	}, {
		key: '_initialize',
		value: function _initialize() {}
	}, {
		key: '_authorizeTrello',
		value: function _authorizeTrello() {
			var authenticationSuccess = function authenticationSuccess() {
				console.log("Successful authentication");
			};
			var authenticationFailure = function authenticationFailure() {
				console.log("Failed authentication");
			};

			Trello.authorize({
				type: "redirect",
				name: "Getting Started Application",
				scope: {
					read: true,
					write: true
				},
				authenticationSuccess: authenticationSuccess,
				authenticationFailure: authenticationFailure
			});
		}
	}]);

	return Application;
})();

$(function () {
	$$.window = $(window);
	$$.windowWidth = $$.window.width();
	$$.windowHeight = $$.window.height();

	$$.application = new $$.Application();

	$$.window.on('resize', function () {
		$$.windowWidth = $$.window.width();
		$$.windowHeight = $$.window.height();
	});
});
//# sourceMappingURL=app.js.map
