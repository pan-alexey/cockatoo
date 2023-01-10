const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const { NodeFederationPlugin, StreamingTargetPlugin } = require("@module-federation/node");

const widgetName = 'remote2~1.0.1'

module.exports =  {
    client: new ModuleFederationPlugin({
        name: widgetName,
        filename: "module.js",
        library: {type: 'window', name: ['widget', widgetName]},
        remotes: {},
        exposes: {
            widget: './src/index'
        },
        shared: {
            ...deps,
            react: {
                singleton: true,
                requiredVersion: deps.react,
            },
            "react-dom": {
                singleton: true,
                requiredVersion: deps["react-dom"],
            },
        },
    }),
    server: [
        new NodeFederationPlugin({
            name: widgetName,
            filename: "module.js",
            library: { type: "commonjs-module" },
            exposes: {
                widget: './src/index.jsx'
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
    ]
}