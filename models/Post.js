var keystone = require('keystone');

//req can be node request or connect/express request

var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, wysiwyg: true, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	cases: {
		client: {type: String, initial:false, label:"Клиент:"},
		problem: {type: String, initial:false, label:"Проблема:"},
		product: {type: String, initial:false, label:"Что сделали:"},
		result: {type: String, initial:false, label:"Результат:"},
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	content: {
		brief: { type: String, wysiwyg: true, height: 150, label:"Лид" },
		extended: { type: Types.Html, wysiwyg: true, height: 400, label:"Основной текст" },
		cta: { type: Types.Html, wysiwyg: true, initial:false, label:"Call to action" },
	},
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'cases.client, title|40%, categories|20%, publishedDate, state';
Post.register();
