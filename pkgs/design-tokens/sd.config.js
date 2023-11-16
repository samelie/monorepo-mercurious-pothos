const paths = {
  tokenInput: './build/tokens/**/*.js',
  tokenOutput: './tokens.ts',
}

function getJSConfig(destination) {
  return {
    transforms: ['name/ti/camel', 'size/rem', 'color/hex'],
    format: 'javascript/es6',
    files: [
      {
        format: 'javascript/es6',
        destination,
        options: {
          outputReferences: true,
        },
      },
    ],
  }
}
function getCSSConfig(buildPath) {
  return {
    transformGroup: 'css',
    buildPath,
    files: [
      {
        format: 'css/variables',
        destination: 'tokens.css',
        options: {},
      },
    ],
  }
}
function getLessConfig(buildPath) {
  return {
    transformGroup: 'less',
    buildPath,
    files: [
      {
        format: 'less/variables',
        destination: 'tokens.less',
        options: {},
      },
    ],
  }
}

module.exports = {
  source: [paths.tokenInput],
  platforms: {
    js: {
      ...getJSConfig(paths.tokenOutput),
    },
    css: {
      ...getCSSConfig('./'),
    },
    less: {
      ...getLessConfig('./'),
    },
  },
}
