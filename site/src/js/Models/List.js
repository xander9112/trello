$$.Model.List = class ModelList {
	constructor (root = $('main'), params = {}) {
		"use strict";

		this.root = root === '' ? $('main') : root;
		this.params = params;

		this._template();
		this.initialize();
	}

	initialize () {
		"use strict";
		this.root.html(this.template);

		this._cacheNodes();

		this._getLists(this.params);
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
			//lists: this.root.find('.js-lists')
		}
	}

	_templateList () {
		"use strict";

		return `<ul class="col s3 collection with-header"></ul>`;
	}

	_getLists (params) {
		"use strict";

		return Trello.get(`/boards/${params}/lists`).then((response) => {
			this.lists = response;

			_.where(this.lists, {closed: false}).forEach(list => {
				var template = $(this._templateList()).appendTo(this.root);
				template.append(`<li class="collection-header"><h4>${list.name}</h4></li>`);

				new $$.Model.Card(template, {
					board_id: params,
					list_id: list.id
				});

				/*Trello.get(`/list/${list.id}/cards`).then((response) => {
				 _.where(response, {closed: false}).forEach(card => {
				 template.append(`
				 <li class="collection-item">
				 <a href="/boards/${params}/${card.id}">
				 ${card.name}
				 </a>
				 </li>`);
				 });
				 });*/
			});
		});
	}
};


