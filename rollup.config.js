import path from 'path'

import babel from '@rollup/plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize'

import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

import postcss from 'rollup-plugin-postcss'

const isDev = process.env.NODE_ENV === 'dev',
      isProd = !isDev,
      inputFile = 'src/index.tsx',
      outputDir = 'dist',
      extensions = ['.js', '.ts', '.tsx']

const plugins = [
        resolve({
            browser: true,
            extensions
        }),
        postcss({
            extract: path.resolve('dist/style/index.css')
        }),
        external(),
        babel({
            extensions,
            babelHelpers: 'runtime',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        bugfixes: true,
                        modules: false,
                        targets: { browsers: '> 0.25%, ie 11, not op_mini all, not dead' }
                    }
                ],
                '@babel/preset-react',
                '@babel/preset-typescript'
            ],
            plugins: [
                '@babel/plugin-transform-runtime'
            ],
            exclude: 'node_modules/**',
        }),
        commonjs(),
        filesize(),
    ],
    moduleBuildParams = {
        input: inputFile,
        external: [/@babel\/runtime/],
        plugins
    }

if (isProd) {
    plugins.push(terser())
}

const esmModule = {...moduleBuildParams, output: {file: `${outputDir}/index.esm.js`, format: 'esm'}},
      cjsModule = {...moduleBuildParams, output: {file: `${outputDir}/index.cjs.js`, format: 'cjs'}}

export default [
    esmModule,
    cjsModule
]