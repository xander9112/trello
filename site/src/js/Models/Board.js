$$.Model.Board = class ModelBoard {
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
		this.template = `
				<div class="row js-board">
					<div class="col s12 js-header"></div>
					<div class="col s12">
						<div class="row js-lists"></div>
					</div>
					<div class="fixed-action-btn" style="bottom: 45px; right: 24px;">
				        <a class="btn-floating btn-large red">
					        <i class="large material-icons">add</i>
					    </a>
					    <ul>
						    <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></i></a></li>
							<li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
							<li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
							<li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
						</ul>
					</div>
				</div>`;
	}

	_cacheNodes () {
		"use strict";
		this.nodes = {
			content: this.root.find('.js-board'),
			header: this.root.find('.js-header'),
			lists: this.root.find('.js-lists')
		}
	}

	_templateHeader (data) {
		"use strict";


		return `
					<div class="col s12 m4">
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

	_getBoard (params) {
		"use strict";

		return Trello.get(`/boards/${params}`).then((response) => {
			this.nodes.header.append(this._templateHeader(response));

			new $$.Model.List(this.nodes.lists, params);
		});
	}

	/*_getLists (params) {
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
	}*/
};


