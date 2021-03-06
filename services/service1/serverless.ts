import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";

const serverlessConfiguration: AWS = {
  service: "service2",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
      keepOutputDirectory: true,
    },
    // TODO: Resolve localstack startup issue
    localstack: {
      stages: ["local"],
      host: "http://localhost",
      edgePort: 4566,
      autostart: true,
      lambda: {
        mountCode: true,
      },
      docker: {
        sudo: false,
      },
    },
  },
  plugins: ["serverless-webpack", "serverless-localstack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { hello },
};

module.exports = serverlessConfiguration;
