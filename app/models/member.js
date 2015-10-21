import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
    avatarHash: attr('string'),
    bio: attr('string'),
    confirmed: attr('boolean'),
    email: attr('string'),
    fullName: attr('string'),
    gravatarHash: attr('string'),
    //idBoards: Array[42],
    idBoardsPinned: attr('string'),
    //idOrganizations: Array[1],
    //idPremOrgsAdmin: Array[0]
    initials: attr('string'),
    loginTypes: attr('string'),
    memberType: attr('string'),
    //oneTimeMessagesDismissed: Array[3]
    //prefs: Object
    //premiumFeatures: Array[0]
    //products: Array[0]
    status: attr('string'),
    //trophies: Array[0]
    uploadedAvatarHash: attr('string'),
    url: attr('string'),
    username: attr('string')
});
