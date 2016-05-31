var path = require('path');
var livereload = require('livereload');

var server = livereload.createServer({
    exts: ['html', 'php', 'css', 'js'],
    exclusions: [path.join(__dirname, 'node_modules')],
});

server.watch([__dirname]);