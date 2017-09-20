var gulp = require('gulp');
    var uglify = require('gulp-uglify');
var concat = require('gulp-concat');//- 多个文件合并为一个；
 
gulp.task('jsmin', function () {
    gulp.src(['js/Game.js','js/ScenManager.js','js/background.js','js/Bild.js','js/Land.js','js/Pipe.js']) //多个文件以数组形式传入
       .pipe(uglify())
        .pipe(concat('min.js'))
       .pipe(gulp.dest('dist/js'));
});