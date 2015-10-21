import Ember from 'ember';

export default Ember.Route.extend({
    login: Ember.inject.service(),
    isLoggedIn: false,
    init: function () {
        "use strict";
        this.set('isLoggedIn', this.get('login').isAuthenticated);
    },

    model: function () {
        "use strict";
    }
});
