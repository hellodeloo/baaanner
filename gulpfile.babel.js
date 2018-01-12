import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import del from 'del';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import minifyHTML from 'gulp-minify-html';
import imagemin from 'gulp-imagemin';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import zip from 'gulp-zip';

const server = browserSync.create();

const folder = 'baaanner-300x250';

const paths = {
  srcDir: folder + '/src/',
  distDir: folder + '/dist/',
  buildDir: folder + '/build/',
  srcHtml: folder + '/src/index.html',
  distHtml: folder + '/dist/index.html',
  srcImages: folder + '/src/*.{jpg,jpeg,png,svg}',
  distImages: folder + '/dist/*.{jpg,jpeg,png,svg}',
  srcScripts: folder + '/src/main.js',
  distScripts: folder + '/dist/main.js',
  srcStyles: folder + '/src/main.scss',
  distStyles: folder + '/dist/main.css'
};

const compressFiles = [paths.distHtml, paths.distScripts, paths.distStyles, paths.distImages];

const onError = (err) => {
  notify.onError({
    title: folder,
    subtitle: 'Error!',
    message: '<%= error.message %>'
  })(err);
  this.emit('end');
};

// Delete App folder Task
export const clear = () => del([paths.distDir]);

// Styles Task
export function styles() {
  return gulp.src(paths.srcStyles)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 3%', 'last 3 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.distDir))
    .pipe(gulp.dest(paths.srcDir));
}

// Javascript Task
export function scripts() {
  return gulp.src(paths.srcScripts, {
    sourcemaps: true
  })
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.distDir));
}

// Minify HTML Task
export function html() {
  return gulp.src(paths.srcHtml)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(minifyHTML({
      conditionals: true,
      spare: true,
      quotes: true
    }))
    .pipe(gulp.dest(paths.distDir));
}

// Compress Images Task
export function images() {
  return gulp.src(paths.srcImages, {
    since: gulp.lastRun(images)
  })
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest(paths.distDir));
}

// Compress in zip Task
function compress() {
  return gulp.src(compressFiles)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(zip(folder + '.zip'))
    .pipe(gulp.dest(paths.buildDir));
}

// BrowserSync Reload Task
function reload(done) {
  server.reload();
  done();
}

// BrowserSync Serve Task
function serve(done) {
  server.init({
    server: {
      baseDir: paths.distDir
    },
    open: false,
    notify: false
  });
  done();
}

// Watch Task
function watch() {
  gulp.watch(paths.srcHtml, gulp.series(html, reload));
  gulp.watch(paths.srcScripts, gulp.series(scripts, reload));
  gulp.watch(paths.srcStyles, gulp.series(styles, reload));
  gulp.watch(paths.srcImages, gulp.series(images, reload));
}

const dev = gulp.series(clear, html, styles, scripts, images, serve, watch);
gulp.task('dev', dev);

const build = gulp.series(html, styles, scripts, images, compress);
gulp.task('build', build);

export default dev;
