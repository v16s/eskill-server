FROM node:10.16-alpine
WORKDIR /usr/src/app
RUN yarn
RUN yarn global add serve
RUN yarn fbuild
RUN rm -rf ./node_modules
ENV NODE_ENV production
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production && mv node_modules ../
RUN rm -rf build && mv ./dist ./build
EXPOSE 5000
EXPOSE 6000
CMD node server && ["serve", "-p", "6000", "-s", "."]