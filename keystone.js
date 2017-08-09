// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'braintobrain',
	'brand': 'braintobrain',
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret':"Well, it is an awesome day for me to finally deploy my Keystone app",
	'session store':'mongo',

	//tinymce
	'wysiwyg additional plugins': 'image, media, autosave',
	'wysiwyg cloudinary images': true,
	'wysiwyg override toolbar': false,
	'wysiwyg menubar': true,
	'wysiwyg additional options': {
		image_caption: true,
		image_description: false,
		image_title: true,
		extended_valid_elements : "no-typo",
    custom_elements: "emstart",
		external_plugins: {
	            'typograf':'/js/tinymce/plugins/typograf/plugin.min.js'
	        }
	},
});

keystone.set('cloudinary config', 'cloudinary://745226289771832:4aMAbiqaAVB5zd1roKaZT_lN9G0@braintobrain-ru' );

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
