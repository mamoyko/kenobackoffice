require('dotenv').config()

require("@babel/register")({
    presets: ["@babel/preset-env"],
    plugins: [
        ["@babel/plugin-proposal-class-properties"],
        ["@babel/plugin-transform-runtime",{
            "regenerator" : true
        }]
      ]
  });
  
 
 module.exports = require('./app');