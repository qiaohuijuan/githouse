var gulp = require('gulp');
var minsass = require('gulp-sass'); //把scss文件转换成css
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var htmljs = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var url = require('url');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            open: true,
            host: 'localhost',
            port: 8080,
            livereload: false,
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

gulp.task('default', ['webserver'])