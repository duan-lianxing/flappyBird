var gulp = require('gulp');
    var uglify = require('gulp-uglify');
var concat = require('gulp-concat');//- ����ļ��ϲ�Ϊһ����
 
gulp.task('jsmin', function () {
    gulp.src(['js/Game.js','js/ScenManager.js','js/background.js','js/Bild.js','js/Land.js','js/Pipe.js']) //����ļ���������ʽ����
       .pipe(uglify())
        .pipe(concat('min.js'))
       .pipe(gulp.dest('dist/js'));
});