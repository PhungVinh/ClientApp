FROM node:11.6.0-alpine AS builder
COPY . ./clientapp
WORKDIR /clientapp
RUN npm i
RUN npm run build:prod

FROM nginx:1.15.8-alpine
COPY --from=builder /clientapp/dist/crm-v0.0.1/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf