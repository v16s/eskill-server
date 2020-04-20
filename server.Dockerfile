FROM node:lts-alpine
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp prisma-cli -g
WORKDIR /app
ADD ./ /app
RUN yarn
ENV NODE_ENV production
RUN prisma deploy --force
RUN yarn build
ENV DBURL 'mongodb://localhost:27017'
EXPOSE 5000
CMD node bin
