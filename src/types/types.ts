import { Server } from "@hapi/hapi";

type ConfDecoration = {
    conf: any
}
export type DecoratedServer = Server & ConfDecoration;
