module.exports = {
  mode: "development",
  entry: "./src/js/app.js",
  output: {
    filename: "js/bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options:{
              presets:[
                ['es2015',{'modules':false}]
              ]
            }
          }
        ]
      }
    ]
  }
}
