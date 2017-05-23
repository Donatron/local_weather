//declare variables
var gulp = require("gulp"),
 postcss = require("gulp-postcss");

 //plugins
 var postcss = require("gulp-postcss"),
     cssnext = require("postcss-cssnext"),
     pxtorem = require("postcss-pxtorem"),
     cssnano = require("cssnano");


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

gulp.task("default", function() {
  gulp.watch("src/*.css", ["css"]);
});
