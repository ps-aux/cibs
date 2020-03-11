module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: true
                }
            }
        ],
        '@babel/typescript'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        [
            'module-resolver',
            {
                extensions: ['.js', '.ts'],
                root: ['.']
            }
        ]
    ]
}
