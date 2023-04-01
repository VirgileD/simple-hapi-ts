import { Server } from "@hapi/hapi";
import { describe, it, beforeEach, afterEach } from "mocha";
import chai, { expect } from "chai";

import { init } from "../server.js";

describe("smoke test", async () => {
    let server: Server;

    beforeEach((done) => {
        init().then(s => { server = s; done(); });
    })
    afterEach((done) => {
        server.stop().then(() => done());
    });

    it("index responds", async () => {
        const res = await server.inject({
            method: "get",
            url: "/"
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result).to.be.an.instanceOf(Array);
        const result = res.result as Array<any>;
        expect(result[0]).to.haveOwnProperty('id');
        expect(result[0]).to.haveOwnProperty('name');
        expect(result[0]).to.haveOwnProperty('value');
        expect(typeof result[0].id).equal('number')
        expect(typeof result[0].name).equal('string');
        expect(typeof result[0].value).equal('number');
        expect(result[0].name).equal('energy_price');

    });
})
