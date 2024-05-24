const path = require("path");

// Backpack config
module.exports = {
  webpack: (config) => {
    // Customize the webpack config
    config.resolve.alias = {
      src: path.resolve(__dirname, "src"),
      config: path.resolve(__dirname, "config"),
      package: path.resolve(__dirname, "package.json"),
    };

    config.target = "node";

    // Add support for MJS files
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    // Important: Return the modified webpack config
    return config;
  },
};
