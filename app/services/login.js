import Ember from 'ember';

export default Ember.Service.extend({
    isAuthenticated: false,
    trello: null,
    init: function () {
        var success = () => {
            "use strict";
            this.set('trello', Trello);
            this.set('isAuthenticated', true);
            //console.log('success authorized Trello');
        };

        Trello.authorize({
            type: "redirect", //redirect, popup
            name: "Getting Started Application",
            scope: {
                read: true,
                write: true
            }, success
        });
    }
});
