FROM node:20-alpine AS base
COPY . /app
WORKDIR /app

FROM base AS deps
RUN npm ci

FROM base AS movies-today-bot-dev
COPY --from=deps /app/node_modules /app/node_modules
CMD ["npm", "run", "dev"]

FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
RUN npm run build

FROM base AS movies-today-bot-prod
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
CMD ["npm", "run", "start"]
