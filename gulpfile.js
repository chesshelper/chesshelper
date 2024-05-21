import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import autoprefix from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import gulpFlatten from 'gulp-flatten';
import insert from 'gulp-insert';
import uglify from 'gulp-uglify';
import htmlmin from "gulp-htmlmin";
import rename from "gulp-rename";
import replace from "gulp-replace";
import filter from 'gulp-filter';
import zip from 'gulp-zip';
import chalk from 'chalk';


let { src, dest, task, series } = gulp;
const link = chalk.hex('#5e98d9');
const EXTENSION_NAME = 'chesshelper'
const EXTENSION_V = 'v.1.1.4.5'

const COPYRIGHT = `//   - This file is part of ChessHelper Extension
//  <https://github.com/gerwld/ChessHelper-extension/blob/main/README.md>,
//   - Copyright (C) 2023-present ChessHelper Extension
//   -
//   - ChessHelper Extension is a software: you can redistribute it, but you are not allowed to modify it under the terms of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
//   -
//   - ChessHelper Extension is distributed in the hope that it will be useful,
//   - but WITHOUT ANY WARRANTY; without even the implied warranty of
//   - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   - Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License for more details.
//   -
//   - You should have received a copy of the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License
//   - along with ChessHelper Extension.  If not, see <https://creativecommons.org/licenses/by-nc-nd/4.0/>.

`

//## Minify Images  ##//
task('minifyImg', async function () {
    src(['./assets/img/*.svg', './assets/img/**/*.svg'])
        .pipe(svgmin())
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/img/'))
        .pipe(dest('./public/firefox/assets/img/'))

    src(['./assets/img/*.png', './assets/img/**/*.png'])
        // .pipe(imagemin())
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/img/'))
        .pipe(dest('./public/firefox/assets/img/'))

    src(['./assets/icons/*.png', './assets/icons/**/*.png'])
        // .pipe(imagemin())
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/icons/'))
        .pipe(dest('./public/firefox/assets/icons/'))

    src(['./assets/img/**/*.md'])
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/img/'))
        .pipe(dest('./public/firefox/assets/img/'))
});

//## Minify CSS  ##//
task('minifyCSS', async function () {
    src(['./assets/graphs/*.css', './assets/graphs/**/*.css', './assets/graphs/**/**/*.css'])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefix('last 2 versions'))
        .pipe(insert.prepend(`/*\n${COPYRIGHT}*/\n\n`))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/graphs/'))

    src(['./assets/graphs/*.css', './assets/graphs/**/*.css', './assets/graphs/**/**/*.css'])
        .pipe(replace('chrome-extension://', 'moz-extension://'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefix('last 2 versions'))
        .pipe(insert.prepend(`/*\n${COPYRIGHT}*/\n\n`))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/firefox/assets/graphs/'))
});

//## Minify JS ##//
task('minifyJS', async function () {
    src(['./assets/js/*.js'])
        .pipe(uglify())
        .pipe(insert.prepend(COPYRIGHT))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/assets/js/'))
        .pipe(dest('./public/firefox/assets/js/'))
});

//## Minify HTML ##//
task('minifyHTML', async function () {
    src(['./content/*.html'])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(insert.prepend(`<!--\n${COPYRIGHT}-->\n\n`))
        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/chrome/content/'))
        .pipe(dest('./public/firefox/content/'))
});


//## Add other files  ##//
task('addOther', async function () {
    src(['./LICENSE.md', './package.json', './README.md', './SECURITY.md', './CONTRIBUTING.md'])
        .pipe(dest('./public/chrome'))
        .pipe(dest('./public/firefox'))
        .pipe(dest('./public'));

    src(['./assets/graphs/fonts/*.css', './assets/graphs/fonts/**/*.css', './assets/graphs/fonts/**/**/*.css',
        './assets/graphs/fonts/*.woff2', './assets/graphs/fonts/**/*.woff2', './assets/graphs/fonts/**/**/*.woff2'])

        .pipe(gulpFlatten({ includeParents: 4 }))
        .pipe(dest('./public/firefox/assets/graphs/fonts/'))
        .pipe(dest('./public/chrome/assets/graphs/fonts/'))

    src('./manifest-chrome.json').pipe(rename("manifest.json")).pipe(dest('./public/chrome'));
    src('./manifest-firefox.json').pipe(rename("manifest.json")).pipe(dest('./public/firefox'));

    src(['_locales/**/*'])
        .pipe(dest('./public/chrome/_locales'))
        .pipe(dest('./public/firefox/_locales'))
});

//## For source code .zip ##//
task('source', async function (done) {
    const excludedDirs = ['public', 'node_modules', 'previews', '.git'];
    const excludedFiles = ['**', '!**/__*.js', '!**/*.zip', '.git', '.gitignore', '.DS_Store', "!**/manifest.json", "!**/pnpm-lock.yaml"];

    src("./**/*")
        .pipe(filter(['**', ...excludedFiles]))
        .pipe(filter(['**', ...excludedDirs.map(e => [`!./${e}/**/*`, `!./${e}/`]).flat(2)]))
        .pipe(dest('./public/__source_code/'))

    src("./**/*")
        .pipe(filter(['**', ...excludedFiles]))
        .pipe(filter(['**', ...excludedDirs.map(e => [`!./${e}/**/*`, `!./${e}/`]).flat(2)]))
        .pipe(zip(`${EXTENSION_NAME}_${EXTENSION_V}_source_code.zip`))
        .pipe(gulp.dest('./public/'))
        .on('end', function () {
            console.log("Source finished, dest: " + link(`./public/${EXTENSION_NAME}_${EXTENSION_V}_source_code.zip`));
            done();
        })
});

task('zipper', async function (done) {
    setTimeout(function () {
        const fn_base = `${EXTENSION_NAME}_${EXTENSION_V}`
        console.log(chalk.green("Zipper started."));
        src("./public/firefox/**/*")
            .pipe(zip(`${fn_base}_firefox.zip`))
            .pipe(gulp.dest('./public/'))
            .on('end', function () {
                console.log("Zipper finished, dest: " + link(`./public/${fn_base}_firefox.zip`));
                done();
            });
        src("./public/chrome/**/*")
            .pipe(zip(`${fn_base}_chromium.zip`))
            .pipe(gulp.dest('./public/'))
            .on('end', function () {
                console.log("Zipper finished, dest: " + link(`./public/${fn_base}_chromium.zip`));
                done();
            });
    }, 12000);
});



task('build', series('minifyImg', "minifyCSS", "minifyJS", "minifyHTML", "addOther"));
task('gbuild', series('minifyImg', "minifyCSS", "minifyJS", "minifyHTML", "addOther", "zipper", "source"));
export default series('minifyImg');
