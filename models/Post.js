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
		frontpage: { type: Types.Html, wysiwyg: true, required: false, initial: false, label:"Заголовок для блога"},
		brief: { type: Types.Html, wysiwyg: true, height: 150, label:"Лид" },
		extended: { type: Types.Html, wysiwyg: true, height: 400, label:"Основной текст" },
		cta: { type: Types.Html, wysiwyg: true, initial:false, label:"Call to action" },
	},
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});


Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
