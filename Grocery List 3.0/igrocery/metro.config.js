const { getDefaultConfig } = require('expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)
defaultConfig.resolver.sourceExts.push('cjs')

module.exports = defaultConfig

// const { getDefaultConfig } = require('expo/metro-config')

// const defaultConfig = getDefaultConfig(__dirname)
// defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, 'cjs']

// module.exports = defaultConfig