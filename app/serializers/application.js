import DS from 'ember-data';
//import config from '../config/environment';

export default DS.JSONSerializer.extend({
    serialize: function (snapshot, options) {
        var json = {};
        console.log(snapshot);
        snapshot.eachAttribute(function (name) {
            json[serverAttributeName(name)] = snapshot.attr(name);
        });

        snapshot.eachRelationship(function (name, relationship) {
            if (relationship.kind === 'hasMany') {
                json[serverHasManyName(name)] = snapshot.hasMany(name, {ids: true});
            }
        });

        if (options.includeId) {
            json.ID_ = snapshot.id;
        }

        return json;
    }
});

function serverAttributeName(attribute) {
    return attribute.underscore().toUpperCase();
}

function serverHasManyName(name) {
    return serverAttributeName(name.singularize()) + "_IDS";
}
