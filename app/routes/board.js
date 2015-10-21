import Ember from 'ember';

export default Ember.Route.extend({
    login: Ember.inject.service('login'),
    model: function (params) {
        var trello = this.get('login').trello;

        /*trello.get(`boards/${params.board_id}`,
            (currentBoard) => {
                "use strict";
                console.log(currentBoard);
                board.name = currentBoard.name;
            }, (error) => {
                "use strict";
                console.error(error);
            });*/

        var board = trello.get(`boards/${params.board_id}/lists`,
            (board) => {
                "use strict";
            }, (error) => {
                "use strict";
                console.error(error);
            });

        return board;
    },

    afterModel: function(){
        "use strict";
    }
});
