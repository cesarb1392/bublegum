const gulp = require('gulp');
const tslint = require("gulp-tslint");
const ts = require("gulp-typescript");
const concat = require("gulp-concat");

gulp.task("lint:ts", function() {
    return gulp.src("backend/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

// pull in the project Typescript config
const tsProject = ts.createProject('tsconfig.json');
//task to be run when the watcher detects changes
gulp.task('compile:ts', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('api'));
});
//set up a watcher to watch over changes
gulp.task('watch', ['compile:ts'], () => {
    gulp.watch('**/*.ts', ['compile:ts']);
});

gulp.task('default', ['watch']);

gulp.task('compile', ['compile:ts']);
