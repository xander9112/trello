import DS from 'ember-data';

export default DS.Model.extend({
    closed: DS.attr('boolean'),
    name: DS.attr('string'),
    shortLink: DS.attr('string'),
    shortUrl: DS.attr('string'),
    dateLastView: DS.attr('date')
});
