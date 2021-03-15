const {
  series, src, dest
} = require('gulp');
const postcss = require('gulp-postcss');
const pxToRem = require('postcss-pxtransform');
const foldPath = "miniprogram_npm/@vant/"

function pxToRpx() {
  const processors = [
    pxToRem({
      platform: 'weapp',
      designWidth: 750,
      deviceRatio: {
        640: 2.34 / 2,
        750: 2 / 1,
        828: 1.81 / 2
      }
    })
  ];

  return src([foldPath + '**/*.wxss'])
    .pipe(postcss(processors))
    .pipe(dest(foldPath))
};

exports.default = series(pxToRpx)