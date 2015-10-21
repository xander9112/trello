$$.Model.Boards = class ModelBoards {
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

		this._getBoards();
	}

	destroy () {
		"use strict";
		console.log('destroy Boards');
	}

	_template () {
		"use strict";
		this.template = `<div class="row js-boards">
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
			content: this.root.find('.js-boards')
		}
	}

	_templateBoards (data) {
		"use strict";

		return `<div class="col s12 m4">
			         <div class="card" style="background-color: ${data.prefs.backgroundColor}">
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

	_getBoards () {
		"use strict";

		return Trello.get('/members/me/boards').then((response) => {
			this.boards = response;

			_.where(this.boards, {closed: false}).forEach(board => {
				if (_.isEmpty(board.prefs.backgroundColor)) {
					board.prefs.backgroundColor = '#546e7a';
				}

				this.nodes.content.append(this._templateBoards(board));
			});
		});
	}
};


