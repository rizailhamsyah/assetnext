FROM node:18-alpine AS development

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY .env* ./
RUN npm ci --legacy-peer-deps

FROM node:18-alpine AS build

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
COPY .env* ./
COPY --from=development /app/node_modules ./node_modules
COPY . .

RUN npm run build

RUN npm ci --legacy-peer-deps --only=production && npm cache clean --force

FROM node:18-alpine AS production

ENV NODE_ENV production
ENV TZ="Asia/Jakarta"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY --from=build /app ./

EXPOSE 3000

CMD [ "npm", "preview" ]