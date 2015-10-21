import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {
    this.route('boards');

    this.route('board', {path: 'boards/:board_id'}, function () {
        "use strict";
    });

    this.route('list', {path: 'boards/:board_id/list/:list_id'});

    this.route('members', function () {
        "use strict";
    });

    this.route('member', {path: 'members/:member_id'});

    this.route('login');
});

Router.reopen({
    location: 'history'
});

export default Router;
