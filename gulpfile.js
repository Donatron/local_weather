//declare variables
var gulp = require("gulp"),
 postcss = require("gulp-postcss");

 //plugins
 var postcss = require("gulp-postcss"),
     cssnext = require("postcss-cssnext"),
     pxtorem = require("postcss-pxtorem"),
     cssnano = require("cssnano"),
      minify = require("gulp-minify");


gulp.task("css", function() {
  var processors = [cssnext({browsers: ['last 3 versions', 'Firefox < 27']}),
                    pxtorem({
                      propWhiteList: [],
                      mediaQuery: true
                    }),
                    cssnano];

  return gulp.src("./src/*.css")
  .pipe(postcss(processors))
  .pipe(gulp.dest("./"));
});

gulp.task("js", function() {
  gulp.src("./src/*.js")
  .pipe(minify( {
    ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: [],
        ignoreFiles: []
    }))
  .pipe(gulp.dest("./"));
});

gulp.task("default", function() {
  gulp.watch(["src/*.css", "./src/*.js"], ["css", "js"]);
});
