var config = {
   entry: './main.js',
	
   output: {
      path:'./',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080,
      stats: {
         colors: true,
         hash: false,
         version: false,
         timings: false,
         assets: false,
         chunks: false,
         modules: false,
         reasons: false,
         children: false,
         source: false,
         errors: true,
         errorDetails: true,
      warnings: true
      }
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;