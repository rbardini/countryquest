const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['atoms', 'components', 'data', 'hooks', 'lib', 'pages'],
  },
  generateBuildId: () => 'build',
  webpack: (config, options) => ({
    ...config,
    externals: [
      ...config.externals,
      ({ request }, callback) => {
        // Remove unused chart exporting modules
        // https://www.amcharts.com/docs/v4/getting-started/integrations/using-webpack/#Large_file_sizes
        if (/xlsx|canvg|pdfmake/.test(request)) {
          return callback(null, 'commonjs ' + request)
        }

        callback()
      },
    ],
  }),
})
