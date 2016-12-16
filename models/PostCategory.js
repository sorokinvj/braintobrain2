var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PostCategory.add({
	name: { type: String, required: true },
	heading: {type: String, required: false},
	NoShow: {type: Boolean, required: true, initial:false, default:false},
	Main_question: {type: Boolean, required: true, initial:false, default:false},
});

PostCategory.relationship({ ref: 'Post', path: 'categories' });

PostCategory.register();
