'use strict';

import { ServerOptions, Server, RequestRoute } from "@hapi/hapi";
import glob from 'glob';
import * as path from 'path';


export const routesPlugin = {
  name: 'loadRoutes',
  version: '0.0.1',
  register: async function (server: Server, options: ServerOptions) {
    let routeFiles = await glob('./routes/*-route.js')
    for(const file of routeFiles) {
      try {
          const aroute = await import(path.resolve(file));
          server.route(aroute.routes);
        } catch (errLoadModule) {
          if(process.env.NODE_ENV!='production') {
            console.log(`route ${file} not loaded: ${errLoadModule}`);
          }
        }
    }
    if(process.env.NODE_ENV!='production') {
      // TODO: beautify this.
      console.log(`The following endpoints have been loaded: `)
      server.table().sort((rr: RequestRoute, orr: RequestRoute) => {
        if(rr.path!=orr.path) {
          return rr.path > orr.path ? 1 : -1;
        } else {
          return rr.path > rr.method  ? 1 : -1;
        }
      }).map((rr: RequestRoute) => {
        console.log(`${rr.path} - ${rr.method}`)
      })
    }
  }
}