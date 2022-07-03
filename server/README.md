# 👹 Sokudo Server

## Built With

* [Java](https://www.java.com/)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [MongoDB](https://www.mongodb.com/)
* [GitHub Apps](https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps)

For more details check `build.gradle`.

## Prerequisites

* Java 16+
* MongoDB instance (you can use docker container)
* Apache Maven 3.6+

## Installation

1. Go to the `server` folder.
1. Run `./gradlew clean build` to download all required dependencies.
1. Open the properties file located at `src/main/resources/application.properties`.
1. Define the following variables:
```bash
server.port=8900 # Default port.

spring.data.mongodb.host=host.docker.internal # Default host.
spring.data.mongodb.port=27017 # Default port.

git.provider.client.id=<github-apps-client-id> # Generated from GitHub Apps.
git.provider.client.secret=<github-apps-client-secret> # Generated from GitHub Apps.
git.provider.access.token.issuer.url=https://github.com/login/oauth/access_token # Default URL.

git.provider.base.url=https://api.github.com # Default URL.
```
4. Run the application from your IDE or with the following command: `./gradlew bootRun`.

## License
[GPL3](../LICENSE)

