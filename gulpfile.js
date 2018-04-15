var gulp = require('gulp');
var sass = require('gulp-sass'); //把scss文件转换成css
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minjs = require('gulp-uglify');
var minhtml = require('gulp-htmlmin');
var url = require('url');
var webserver = require('gulp-webserver');
var sequence = require('gulp-sequence');
var autoprefixer = require('gulp-autoprefixer');
var mincss = require('gulp-clean-css');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean())
})

gulp.task('mincss', function() {
    return gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(mincss())
        .pipe(gulp.dest('dist/css'))
})

gulp.task('minjs', function() {
    return gulp.src('src/js/*.js')
        .pipe(minjs())
        .pipe(gulp.dest('dist/js'))
})

var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true //压缩HTML
}

gulp.task('minhtml', function() {
    return gulp.src('src/*.html')
        .pipe(minhtml(options))
        .pipe(gulp.dest('dist'))
})

gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            open: true,
            host: 'localhost',
            port: 8080,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url, true).pathname;
                if (pathname === '/newdata') {
                    res.end(JSON.stringify([{
                            "url": "imgs/1.png",
                            "tit": "德盛苑",
                            "money": ["¥2200", "可月付"],
                            "der": "7户合租|朝东次卧|15M",
                            "add": "浦东-北蔡",
                            "type": ["新上架", "独卫", "独立厨房", "今天发布"]
                        },
                        {
                            "url": "imgs/2.png",
                            "tit": "上河园",
                            "money": ["¥2500", "可月付"],
                            "der": "7户合租|朝东次卧|13M",
                            "add": "浦东-北蔡",
                            "type": ["新上架", "独卫", "独立厨房", "今天发布"]
                        },
                        {
                            "url": "imgs/3.png",
                            "tit": "北京市",
                            "money": ["¥1200", "可月付"],
                            "der": "7户合租|朝东次卧|15M",
                            "add": "浦东-北蔡",
                            "type": ["新上架", "独卫", "独立厨房", "今天发布"]
                        }
                    ]))
                } else {
                    next();
                }
            }
        }))
})

gulp.task('default', function(cb) {
    sequence('clean', ['mincss', 'minjs', 'minhtml'], 'webserver', cb)
})