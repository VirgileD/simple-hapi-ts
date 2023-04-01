# hapi-good-template

hapi-good-template is a work in progress to have a good starting point to create an API with [hapi](https://hapi.dev/)

Hopefully in time it will also include some scripts to integrate different dbs (postgr & mongo I think) and the possibilities to add graphql feature and/or swagger, and/or... (add a nice feature here).

a kind of [ hapi-scaffold](https://github.com/jeffsouza/hapi-scaffold) and certainly not as good but it's mine :-)

Written in typescript (so I can learn to use it), using mocha/chai for tests. It's just currently extending https://www.solarwinter.net/using-typescript-with-hapi/, a great post!

Also, I want to make some plugins that can be used in hapi with typescript. Maybe one day publish the best of them. Currently it's only files in the libs/plugins directory. It was acutally enough to just read https://hapi.dev/tutorials/plugins/?lang=en_US. There's a trick though, because for tests it's the ts files that are used (for example for the routes)


## Things I had to overcome

I wanted the routes to be loaded automatically without declaring them every time in server.

unfortunately rollup and tsc tree-shaking makes it almost impossible to import dynamically at runtime.

that's the reason why the pakage.json's dev:tsc is a bit complicated and include the routes/** files.

also, to take the yaml and routes files into account for hot reloas durng dev, I resign to use [entr](https://eradman.com/entrproject/). Sometimes typescript is more a problem than a solution.

I suppose that with a very nice rollup and webpack that could be doable too but I didn't manage to do so.

one drawback is that entr does not accept setting env var at the beginning of the executed script. So I had to set the mocha.env.ts at the root of the project so that the NODE_ENV is set to 'test'.

Maybe a little more time with nodemon could do the trick. that would be neater.

or may be [rerun2](https://github.com/tartley/rerun2)

I also had to put the test directory inside src to allow compilation by tsc to create a dist directory containing all files at the right place.

Then there is always this "WARNING: Creating a duplicate database object for the same connection." emitted by pg-promise, but I think it's a false alarm as stated in https://stackoverflow.com/questions/34382796/where-should-i-initialize-pg-promise but I didn't had the will to try to implement the workaround in the update 2 to confirm.



## Installation

install http://eradman.com/entrproject/code/entr-5.3.tar.gz

then just
```bash
npm i
```



## Usage

```bash
npm run dev
```

## testing

```bash
npm run test
```

## Notes

add a XXX-route.ts in src/routes/ to add a route.

add a XXX.test.ts in src/tests to add a test


## License

[MIT](https://choosealicense.com/licenses/mit/)

