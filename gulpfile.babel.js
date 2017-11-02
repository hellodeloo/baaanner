import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
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
  devDir: folder + '/dev/',
  appDir: folder + '/app/',
  devHtml: folder + '/dev/index.html',
  appHtml: folder + '/app/index.html',
  devImages: folder + '/dev/*.{jpg,jpeg,png,svg}',
  appImages: folder + '/app/*.{jpg,jpeg,png,svg}',
  devScripts: folder + '/dev/main.js',
  appScripts: folder + '/app/main.js',
  devStyles: folder + '/dev/main.scss',
  appStyles: folder + '/app/main.css'
};

const compressFiles = [paths.appHtml, paths.appScripts, paths.appStyles, paths.appImages];

const onError = (err) => {
  notify.onError({
    title: folder,
    subtitle: 'Error!',
    message: '<%= error.message %>'
  })(err);
  this.emit('end');
};


// Delete App folder Task
export const clear = () => del([paths.appDir]);


// Styles Task
export function styles() {
  return gulp.src(paths.devStyles)
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
    .pipe(gulp.dest(paths.appDir))
    .pipe(gulp.dest(paths.devDir));
}


// Javascript Task
export function scripts() {
  return gulp.src(paths.devScripts, {
      sourcemaps: true
    })
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.appDir));
}


// Minify HTML Task
export function html() {
  return gulp.src(paths.devHtml)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(minifyHTML({
      conditionals: true,
      spare: true,
      quotes: true
    }))
    .pipe(gulp.dest(paths.appDir));
}


// Compress Images Task
export function images() {
  return gulp.src(paths.devImages, {
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
    .pipe(gulp.dest(paths.appDir));
}


// Compress in zip Task
function compress() {
  return gulp.src(compressFiles)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(zip(folder + '.zip'))
    .pipe(gulp.dest(folder + '/'));
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
      baseDir: paths.appDir
    },
    open: false,
    notify: false
  });
  done();
}


// Watch Task
function watch() {
  gulp.watch(paths.devHtml, gulp.series(html, reload));
  gulp.watch(paths.devScripts, gulp.series(scripts, reload));
  gulp.watch(paths.devStyles, gulp.series(styles, reload));
  gulp.watch(paths.devImages, gulp.series(images, reload));
}


const dev = gulp.series(clear, html, styles, scripts, images, serve, watch);
gulp.task('serve', dev);

const deliver = gulp.series(html, styles, scripts, images, compress);
gulp.task('deliver', deliver);

export default dev;
