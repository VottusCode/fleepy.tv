let Encore = require("@symfony/webpack-encore")

Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "development")
  .disableSingleRuntimeChunk()
  .setOutputPath("public/build")
  .setPublicPath("/build")
  .addEntry("app", `./src/frontend/js/all.ts`)
  .enableTypeScriptLoader()
  .enableSassLoader()
  .enablePostCssLoader()
  .autoProvidejQuery()
  .enableSourceMaps()

module.exports = Encore.getWebpackConfig()