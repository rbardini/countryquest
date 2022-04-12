const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['atoms', 'components', 'data', 'hooks', 'lib', 'pages'],
  },
  generateBuildId: () => 'build',
})
