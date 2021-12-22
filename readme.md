https://www.logicbig.com/tutorials/misc/typescript/method-decorator.html
https://blog.logrocket.com/a-practical-guide-to-typescript-decorators/
https://devsmitra.medium.com/how-to-make-rest-apis-using-node-js-express-js-typescript-decorators-5fd468e0f3c9




https://github.com/GoogleContainerTools/distroless/blob/main/examples/nodejs/Dockerfile

https://medium.com/swlh/alpine-slim-stretch-buster-jessie-bullseye-bookworm-what-are-the-differences-in-docker-62171ed4531d


docker-compose down

docker-compose build --no-cache

docker-compose up


# 
bodyparser.json vs express.json

The reason this is separate is because express.js used NOT to have any body parsing functions. That was added in V4.16+

If you are running a later version, you technically no longer need body-parser.

See https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c

# error handling
But if we inherit, then it becomes possible to use obj instanceof Error to identify error objects. So it’s better to inherit from it.