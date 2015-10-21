import Ember from 'ember';

export default Ember.Route.extend({
    login: Ember.inject.service('login'),
    model: function (params) {
        var trello = this.get('login').trello;

        trello

        console.log(params.member_id);
    }
});
