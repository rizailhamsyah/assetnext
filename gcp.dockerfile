FROM node:18-alpine AS development

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY .env* ./
COPY package*.json ./

RUN npm ci

FROM node:18-alpine AS build

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY .env* ./
COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS production

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY --from=build /app/package*.json ./
COPY --from=build /app/.env* ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app ./

CMD [ "npm", "start" ]