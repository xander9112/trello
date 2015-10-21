import Ember from 'ember';

export default Ember.Controller.extend({
    login: Ember.inject.service(),
    auth: false,
    init: function () {
        "use strict";

        this.set('auth', this.get('login').isAuthenticated)

        /* this.get('login').trello.members.get('me', (response) => {
         this.set('model', response);
         });*/

        /*var key = this.get('login').trello.key();
         var token = this.get('login').trello.token();

         this.set('model', this.store.find('member', 'me', {
         key: key,
         token: token
         }));*/
    }
});
