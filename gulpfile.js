import postcss from "gulp-postcss";
import gulp from "gulp";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import imageminGifsicle from "imagemin-gifsicle";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo from "imagemin-svgo";

gulp.task("css", function () {
  const plugins = [autoprefixer(), cssnano()];
  return gulp
    .src("./src/styles/*.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./dist/styles"));
});

gulp.task("html", () => {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("image", () => {
  return gulp
    .src("src/images/*")
    .pipe(
      imagemin([
        imageminGifsicle({ interlaced: true }),
        imageminMozjpeg({ quality: 75, progressive: true }),
        imageminOptipng({ optimizationLevel: 5 }),
        imageminSvgo({
          plugins: [
            {
              name: "removeViewBox",
              active: true,
            },
            {
              name: "cleanupIDs",
              active: false,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest("dist/images"));
});

export default function () {
  gulp.watch("src/styles/*.css", gulp.task("css"));
  gulp.watch("src/*.html", gulp.task("html"));
  gulp.watch("src/images/*", gulp.task("image"));
}

export const build = gulp.parallel("css", "html", "image");
