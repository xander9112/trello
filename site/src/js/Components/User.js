$$.Component.User = class ComponentUser {
	constructor (options = {}) {
		var defaultOptions = {};

		this.options = _.merge(options || {}, defaultOptions, _.defaults);

		this.menu = this.options.menu;

		this._getUserData();

		this._cacheNodes();
		this.initialize();
	}

	initialize () {
		"use strict";

		this._getUserData().then(() => {
			this.menu.userInfo = `<li><a href="/members/me"><i class="material-icons left">view_module</i> ${this.userData.fullName}</a></li>`
		});
	}

	_getUserData () {
		"use strict";

		return Trello.get('members/me').then((response) => {
			"use strict";
			this.userData = response
		});
	}

	_template () {
		"use strict";

		this.template = $(``);
	}

	_cacheNodes () {
		this.nodes = {};
	}
};
