import Ember from 'ember';

export default Ember.Route.extend({
    login: Ember.inject.service('login'),
    model: function () {
        var trello = this.get('login').trello;

        console.log(this._super());

        var boards = trello.get('members/me/boards',
            (boards) => {
                "use strict";
                this.set('model', boards);
                //console.log(this.get('testModel'));
            }, (error) => {
                "use strict";
                console.error(error);
            });

        return boards;
    },

    afterModel: function () {
        "use strict";
    }
});
