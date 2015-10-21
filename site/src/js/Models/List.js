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

		this._getBoard(this.params.board_id);
	}

	destroy () {
		"use strict";
		console.log('destroy Boards');
	}

	_template () {
		"use strict";
		this.template = `<ul class="col s3 collection with-header"></ul>`;
	}

	_cacheNodes () {
		"use strict";
		this.nodes = {
			lists: this.root.find('.js-lists')
		}
	}

	_templateHeader (data) {
		"use strict";

		return `	<div class="col s12 m4">
						<div class="card-panel grey lighten-5 z-depth-1">
		                    <div class="row valign-wrapper">
					            <div class="col s12">
					                <h5>${data.name}</h5>
				                    <span class="black-text">
					                    ${data.desc}
					                </span>
					            </div>
				            </div>
				        </div>
			        </div>`;
	}

	_templateBoard (data) {
		"use strict";

		return `<div class="col s12 m4">
			         <div class="card blue-grey darken-1">
					     <div class="card-content white-text">
						     <span class="card-title">${data.name}</span>
						     <p>${data.desc}</p>
					     </div>
					     <div class="card-action right-align">
						     <a href="/boards/${data.shortLink}">Открыть</a>
					     </div>
				     </div>
			     </div>`
	}

	_templateList (data) {
		"use strict";

		return `<ul class="col s3 collection with-header"></ul>`;
	}

	_getBoard (params) {
		"use strict";

		return Trello.get(`/boards/${params}`).then((response) => {
			this.nodes.header.append(this._templateHeader(response));

			this._getLists(params);
		});
	}

	_getLists (params) {
		"use strict";

		return Trello.get(`/boards/${params}/lists`).then((response) => {
			this.lists = response;


			_.where(this.lists, {closed: false}).forEach(list => {
				var template = $(this._templateList()).appendTo(this.nodes.lists);
				template.append(`<li class="collection-header"><h4>${list.name}</h4></li>`);

				Trello.get(`/list/${list.id}/cards`).then((response) => {
					_.where(response, {closed: false}).forEach(card => {
						template.append(`
					<li class="collection-item">
						<a href="/boards/${params}/${card.id}">
							${card.name}
						</a>
					</li>`);
					});
				});
			});

			//this.nodes.content.append(this._templateHeader(response));

		});
	}
};


