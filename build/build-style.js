/*
 * @Date: 2020-03-30 15:51:49
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-30 17:43:00
 * @LastEditors: junfeng.liu
 * @Description: des
 */
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const less = require('gulp-less')
const rename = require('gulp-rename')

gulp.task('default', async () => {
    await gulp.src('../packages/style/*.less')
        // less
        .pipe(less())
        // 兼容
        .pipe(autoprefixer())
        // 压缩
        .pipe(cleanCss())
        // 重命名
        // .pipe(rename('index.css'))
        // output
        .pipe(gulp.dest('../lib/style'))
})
