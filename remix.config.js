/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildPath: "build/index.js",
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
};
