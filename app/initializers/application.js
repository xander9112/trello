export function initialize(container, application) {
    application.inject('route', 'login', 'service:login');
    application.inject('controller', 'login', 'service:login');
}

export default {
    name: 'application',
    initialize: initialize
};
