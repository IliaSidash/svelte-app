import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy-glob';
import alias from 'rollup-plugin-alias';
import postcssRollup from 'rollup-plugin-postcss';
import { postcss } from 'svelte-preprocess';
import postcssImport from 'postcss-import'; 
import postcssPresetEnv from 'postcss-preset-env';
import postcssPxToRem from 'postcss-pxtorem';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: [
    // ES module version, for modern browsers
    {
      dir: "public/module",
      format: "esm",
      sourcemap: true,
      name: "app"
    },
    // SystemJS version, for older browsers
    {
      dir: "public/nomodule",
      format: "system",
      sourcemap: true,
      name: "app"
    }
  ],
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: true,
      preprocess: [
        postcss({
          plugins: [
            postcssImport,
            postcssPresetEnv,
            postcssPxToRem()
          ]
        })
      ],
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/styles/bundle.css');
      }
    }),
    alias({
      resolve: ['.svelte', '.js', '.svg'],
      '@': path.resolve(__dirname, './src')
    }),
    postcssRollup({
      plugins: [
        postcssImport,
        postcssPresetEnv,
        postcssPxToRem()
      ],
      extensions: [ '.css' ],
      extract: 'public/styles/global.css'
    }),
    resolve(),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    commonjs(),
    livereload({
      watch:'public/**/*'
    }),
    
    copy([
      {files: 'src/assets/**/*.*', dest: 'public/assets'},
      {files: 'src/index.html', dest: 'public'},
      /*{files: 'src/styles/global.css', dest: 'public/styles'},
      {files: 'src/styles/raleway.css', dest: 'public/styles'}*/
    ],
    {
      verbose: true, watch: true
    }),
    serve({
      contentBase: 'public',
      host: 'localhost',
      port: '5000'
    })
	]
};
