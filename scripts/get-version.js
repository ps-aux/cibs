#!/usr/bin/env node
const packageVersion = require('../package.json').version

const isRc = packageVersion.endsWith('-rc')

let version = ''
if (isRc) {
    const buildNo = process.env.BUILD_NO
    if (!buildNo) throw new Error('Missing BUILD_NO in env vars')
    version = packageVersion + '.' + buildNo
} else {
    version = packageVersion
}

console.log(version)
