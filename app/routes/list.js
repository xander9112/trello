import Ember from 'ember';

export default Ember.Route.extend({
    login: Ember.inject.service('login'),
    model: function (params) {
        var trello = this.get('login').trello;

        var list = trello.get(`lists/${params.list_id}/cards`,
            (board) => {
                "use strict";
            }, (error) => {
                "use strict";
                console.error(error);
            });

        return list;
    }
});
