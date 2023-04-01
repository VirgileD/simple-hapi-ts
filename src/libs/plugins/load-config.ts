'use strict';

import glob from 'glob';
import { parse } from 'yaml'
import { readFileSync } from 'fs';

import { ServerOptions, Server } from "@hapi/hapi";

// TODO: when in production, overwrite some config with secrets.
export const configPlugin = {
  name: 'configPlugin',
  version: '0.0.1',
  register: async function (server: Server, options: ServerOptions) {
    const env = process.env.NODE_ENV ?? 'development'
    const configFiles = await glob(`./configs/config-${env}.yaml`);
    configFiles.forEach(async (file: string) => {
      try {
        server.decorate('server', 'conf', parse(readFileSync(file, ('utf-8'))));
        console.log(`Loaded configuration file ${file}`)
      } catch (errLoadConfig) {
        console.error(`Can't load configuration file ${file}: ${errLoadConfig}`)
      }
    });
  }
}