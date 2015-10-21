$$.Model.Card = class ModelCard {
	constructor (root = $('main'), params = {}) {
		"use strict";

		this.root = root === '' ? $('main') : root;
		this.params = params;

		this._template();
		this.initialize();
	}

	initialize () {
		"use strict";
		this._cacheNodes();

		this._getCards(this.params);
	}

	destroy () {
		"use strict";
		console.log('destroy Boards');
	}

	_template () {
		"use strict";
		this.template = ``;
	}

	_cacheNodes () {
		"use strict";
		this.nodes = {
		}
	}

	_templateCard (data) {
		"use strict";

		return `<li class="collection-item">
					<a href="/boards/${this.params.board_id}/${data.id}">
						${data.name}
					</a>
				</li>`
	}

	_getCards (params) {
		"use strict";

		return Trello.get(`/list/${params.list_id}/cards`).then((response) => {
			this.cards = response;

			_.where(this.cards, {closed: false}).forEach(card => {
				this.root.append(this._templateCard(card));
			});
		});
	}
};


