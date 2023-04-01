'use strict';

import pgPromise from 'pg-promise';
import { ServerOptions, Server } from "@hapi/hapi";
import { DecoratedServer } from '../../types/types.js';


const setDb = (config: Object) => {
  const pgp = pgPromise({/* Initialization Options */});
  return pgp(config) as any;
}



export const dbPlugin = {
  name: 'dbPlugin',
  version: '0.0.1',
  register: async function (server: Server, options: ServerOptions) {
    const dbConf = (server as DecoratedServer).conf.db;
    server.decorate('server', 'db', setDb(dbConf));
  }
}
