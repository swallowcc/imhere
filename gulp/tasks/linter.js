import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import { PATHS, LINT } from '../config';

const $ = plugins({
  pattern: ['gulp-*', 'main-bower-files'],
});

// returns a function that lints the files in src
const lintTask = src =>
  () =>
    gulp.src(src)
      .pipe($.eslint())
      .pipe($.eslint.formatEach())
      .pipe($.eslint.failAfterError());

// create lint tasks for client and server scripts
for (const task of LINT) gulp.task(`lint:${task}`, lintTask(PATHS[task].src));

// lint this gulpfile
gulp.task('lint:gulpfile', lintTask('gulpfile.babel.js'));

// lint everything!
gulp.task('lint', [...LINT].map(el => `lint:${el}`).concat('lint:gulpfile'));
