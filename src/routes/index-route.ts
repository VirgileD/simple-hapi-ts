import { Server, Request, ResponseToolkit, ResponseObject, ServerRoute, ResponseValue } from "@hapi/hapi";
import { IDatabase } from 'pg-promise'

type DbDecoration = {
  db: IDatabase<any>
}

export const routes: ServerRoute[] = [
  {
    method: "GET",
    path: "/",
    handler: async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
      const decoratedServer = request.server as (Server & DbDecoration)
      const indicators = await decoratedServer.db.query('SELECT * FROM indicators');
      return h.response(indicators);
    }
  }
];
