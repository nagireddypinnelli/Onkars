var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'www/**/*.js'];


gulp.task('style', function(){
    return gulp.src(jsFiles)
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish',{
                   verbose: true
               }))
               .pipe(jscs());
});

gulp.task('inject', function(){
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    
    var injectSrc = gulp
                    .src( ['./www/assets/css/*.css',
                           './www/assets/js/*.js',
                           './www/app/**/**/*module.js',
                           './www/app/*.js'], {read: false});
                        
    var injectOptions = {
        ignorePath: '/www/'
    };
    
    var options = {
        bowerJson: require('./bower.json'),
        directory: './vendor',
        ignorePath: '../vendor/'
    };
    
    return gulp.src('./www/index.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./www'));
});

gulp.task('serve', ['style','inject'], function(){
    var options = {
        script: 'server/app.js',
        delayTime: 1,
        env:{
            'PORT': 2000
        },
        watch: jsFiles
    };
    
    return nodemon(options)
        .on('restart', function(ev){
            console.log('Restarting...');
        });
});