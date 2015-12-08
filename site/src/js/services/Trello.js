var TrelloFactory = function ($resource, $localStorage) {
	"use strict";

	var resource = function (action, params, method) {

		var method = method || {};

		var options = {
			key:   $localStorage.key,
			token: $localStorage.token
		};

		_.assign(options, params);

		return $resource(`https://api.trello.com/1/${action}`, options, method)
	};

	return {
		/**
		 /[id]
		 /[id]/[field]
		 /[id]/actions
		 /[id]/boardBackgrounds
		 /[id]/boardBackgrounds/[idBoardBackground]
		 /[id]/boardStars
		 /[id]/boardStars/[idBoardStar]
		 /[id]/boards
		 /[id]/boards/[filter]
		 /[id]/boardsInvited
		 /[id]/boardsInvited/[field]
		 /[id]/cards
		 /[id]/cards/[filter]
		 /[id]/customBoardBackgrounds
		 /[id]/customBoardBackgrounds/[idBoardBackground]
		 /[id]/customEmoji
		 /[id]/customEmoji/[idCustomEmoji]
		 /[id]/customStickers
		 /[id]/customStickers/[idCustomSticker]
		 /[id]/deltas
		 /[id]/notifications
		 /[id]/notifications/[filter]
		 /[id]/organizations
		 /[id]/organizations/[filter]
		 /[id]/organizationsInvited
		 /[id]/organizationsInvited/[field]
		 /[id]/savedSearches
		 /[id]/savedSearches/[idSavedSearch]
		 /[id]/tokens
		 */

		members: {
			id:      resource('members/:id'),
			field:   resource('members/:id/:field'),
			actions: resource('members/:id/actions'),
			boards:  resource('members/:id/boards')
		},

		/**
		 /[id]
		 /[id]/[field]
		 /[id]/actions
		 /[id]/boardStars
		 /[id]/cards
		 /[id]/cards/[filter]
		 /[id]/cards/[idCard]
		 /[id]/checklists
		 /[id]/deltas
		 /[id]/labels
		 /[id]/labels/[idLabel]
		 /[id]/lists
		 /[id]/lists/[filter]
		 /[id]/members
		 /[id]/members/[filter]
		 /[id]/members/[idMember]/cards
		 /[id]/membersInvited
		 /[id]/membersInvited/[field]
		 /[id]/memberships
		 /[id]/memberships/[idMembership]
		 /[id]/myPrefs
		 /[id]/organization
		 /[id]/organization/[field]
		 */

		boards: {
			self:       $resource('testJson.json'),
			/*self:       resource('boards', {}, {
			 method: 'POST'
			 }),*/
			id:         resource('boards/:id', { id: '@id' }),
			field:      resource('boards/:id/:field'),
			actions:    resource('boards/:id/actions'),
			lists:      resource('boards/:id/lists', { id: '@id' }),
			labels:     resource('boards/:id/labels', { id: '@id' }),
			labelsId:   resource('boards/:id/labels/:idLabel', { id: '@id' }),
			labelNames: resource('boards/:id/labelNames/:labelName',
				{
					id: '@id', labelName: '@labelName'
				}, {
					'update': { method: 'PUT' }
				})

		},

		/**
		 /lists/[idList]
		 /lists/[idList]/[field]
		 /lists/[idList]/actions
		 /lists/[idList]/board
		 /lists/[idList]/board/[field]
		 /lists/[idList]/cards
		 /lists/[idList]/cards/[filter]
		 */

		lists: {
			id:          resource('lists/:id'),
			field:       resource('lists/:id/:field'),
			actions:     resource('lists/:id/actions'),
			board:       resource('lists/:id/board'),
			cards:       resource('lists/:id/cards'),
			listsClosed: resource('/lists/:idList/closed',
				{
					idList: '@idList'
				}, {
					'update': { method: 'PUT' }
				})
		},

		/**
		 /[id]
		 /[id]/[field]
		 /[id]/actions
		 /[id]/attachments
		 /[id]/attachments/[idAttachment]
		 /[id]/board
		 /[id]/board/[field]
		 /[id]/checkItemStates
		 /[id]/checklists
		 /[id]/list
		 /[id]/list/[field]
		 /[id]/members
		 /[id]/membersVoted
		 /[id]/stickers
		 /[id]/stickers/[idSticker]
		 */

		cards: {
			id:              resource('cards/:id'),
			field:           resource('cards/:id/:field'),
			actions:         resource('cards/:id/actions'),
			attachments:     resource('cards/:id/attachments'),
			checkItemStates: resource('cards/:id/checkItemStates'),
			checklists:      resource('cards/:id/checklists'),
			members:         resource('cards/:id/members')
		},

		/**
		 /[id]
		 /[id]/[field]
		 /[id]/board
		 /[id]/board/[field]
		 /[id]/card
		 /[id]/card/[field]
		 /[id]/display
		 /[id]/entities
		 /[id]/list
		 /[id]/list/[field]
		 /[id]/member
		 /[id]/member/[field]
		 /[id]/memberCreator
		 /[id]/memberCreator/[field]
		 /[id]/organization
		 /[id]/organization/[field]
		 */
		actions: {
			id:    resource('actions/:id'),
			field: resource('actions/:id/:field'),
			board: resource('actions/:id/board')
		},

		labels: {
			id: resource('labels/:idLabel', { idLabel: '@idLabel' })
		}
	}
};
