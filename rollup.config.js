import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'esm',
    name: 'app',
    dir: 'public'
  },
  plugins: [
    svelte({
      dev: true,
      css: css => {
        css.write('public/bundle.css');
      }
    }),
    resolve(),
    commonjs(),
    livereload({
      watch:'public'
    }),
    serve({
      contentBase: 'public',
      host: 'localhost',
      port: '5000'
    })
  ]
};
