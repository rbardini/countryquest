const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['atoms', 'components', 'data', 'hooks', 'lib', 'pages'],
  },
  generateBuildId: () => 'build',
  output: 'export',
})
