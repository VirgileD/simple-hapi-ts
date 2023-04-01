'use strict';

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { dbPlugin } from './libs/plugins/load-db.js';
import { routesPlugin } from './libs/plugins/load-routes.js';
import { configPlugin } from './libs/plugins/load-config.js';


export let server: Server;

export const init = async function(): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT || 4000,
    host: '0.0.0.0'
  });
  
  await server.register(configPlugin);
  await server.register(dbPlugin);
  await server.register(routesPlugin);

  return server;
};

export const start = async function (): Promise<void> {
  console.log(`Starting server, listening on ${server.settings.host}:${server.settings.port}`);
  return server.start();
};

process.on('unhandledRejection', (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});
