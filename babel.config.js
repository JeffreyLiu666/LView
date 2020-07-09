module.exports = {
    presets: ['@babel/preset-env', '@vue/babel-preset-jsx'],
    plugins: [
        ['@babel/plugin-transform-runtime', {
            corejs: 3
        }],
        '@babel/plugin-proposal-export-default-from'
    ],
    env: {
        utils: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs'
                    }
                ]
            ],
            plugins: [
                [
                    'module-resolver',
                    {
                        root: ['l-view-vue'],
                        alias: {
                            '@': 'l-view-vue'
                        }
                    }
                ]
            ]
        },
        dev: {
            plugins: ['@babel/plugin-transform-modules-umd']
        }
    }
}
