const nextBuildId = require('next-build-id')
module.exports = {
    generateBuildId: () => nextBuildId({ dir: __dirname }),
    images: {
      domains: ['cdn.discordapp.com', 'i.imgur.com'],
    },
  }
  