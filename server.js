'use strict';

const Hapi = require('hapi');
const good = require('good');
const Path = require('path');
const Inert = require('inert');

//create a server with an host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: 1234 });

server.register(Inert, () => {});
server.register({
    register: good,
    options : {
        reporters: [{
            reporter: require('good-console'),
            events  : {
                response: '*',
                log     : '*'
            }
        }]
    }
}, (err) => {
    console.log(err);
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }
    
    console.log('Server running at: ', server.info.uri);
});
