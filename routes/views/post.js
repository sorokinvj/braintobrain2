var keystone = require('keystone');

// инициализация типографа
const Typograf = require('typograf');
const tp = new Typograf({lang: 'ru'});
// tp.enable('ru/optalign/*');

// override console.log, чтобы писать лог и в консоль, и в файл
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debugge.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;


	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.post = result;
			// for (var dict in locals.data.post) {
			// 	var value = locals.data.post[dict];
			// 	console.log(value);
			// }
			locals.data.post.title = tp.execute(locals.data.post.title);
			locals.data.post.cases.client = tp.execute(locals.data.post.cases.client);
			locals.data.post.cases.product = tp.execute(locals.data.post.cases.product);
			locals.data.post.cases.problem = tp.execute(locals.data.post.cases.problem);
			locals.data.post.cases.result = tp.execute(locals.data.post.cases.result);
			locals.data.post.content.frontpage = tp.execute(locals.data.post.content.frontpage);
			locals.data.post.content.brief = tp.execute(locals.data.post.content.brief);
			locals.data.post.content.extended = tp.execute(locals.data.post.content.extended);
			locals.data.post.content.cta = tp.execute(locals.data.post.content.cta);
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Render the view
	view.render('post');
};
