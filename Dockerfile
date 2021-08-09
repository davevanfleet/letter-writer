# stage 1 - build react app first 
FROM node:12.16.1-alpine3.9 as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Copy both package.json *and* package-lock.json to have all required
# dependencies at correct versions
COPY ./package.json /app/
COPY ./package-lock.json /app/

RUN npm install --silent
COPY . /app

RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]