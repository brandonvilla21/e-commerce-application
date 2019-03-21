const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const path = require('path')
const Dotenv = require('dotenv-webpack')

require('dotenv').config()


module.exports = withTypescript(withSass({
  webpack: config => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  }
}))