const { src, dest } = require('gulp');
const uglify = require('gulp-uglify-es').default;
const cp = require('gulp-copy');

const minify = () => {
	return src('./cache/src/**/*.js').pipe(dest('dist'));
};

const copy = () => {
	return src(['env.yaml']).pipe(cp('./dist', { prefix: 1 }));
};

exports.minify = minify;
exports.copy = copy;
