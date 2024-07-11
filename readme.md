# Movies Today Bot
<div align="center">

![](https://img.shields.io/codecov/c/github/treipatru/movies-today-bot)
![](https://img.shields.io/github/actions/workflow/status/treipatru/movies-today-bot/sanity-check.yml?branch=main)

</div>

> Node.js based Mastodon bot.

Each day, select a movie released this day from a previous year and post it on Mastodon.

## About

* Built in TypeScript, running on Node.js on an Alpine Linux image.
* Using data from [tmdb.org](https://www.themoviedb.org).
* Running jobs via [Bree](https://github.com/breejs/bree).

## APIs

You will need to set up an `.env.production` or `.env.development` file for this to work.

The required keys can be found in [.env.example](./.env.example).

## Run locally
The project is fully dockerized, no local dependencies required. Just clone and run:

```bash
docker compose --profile development up
```

## Deploy
An image is built with every release and is available on [hub.docker.com](https://hub.docker.com/repository/docker/treipatru/movies-today-bot/general).

The prefered way to boot the project is via a `compose` file. Here is an example:

```yaml
services:
  movies-today-bot:
    image: treipatru/movies-today-bot:latest
    container_name: movies-today-bot
    restart: always
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
```

## License

Distributed under the MIT license. See [LICENSE](./license.txt) for more information.
