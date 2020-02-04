FROM mhart/alpine-node:10.7.0
RUN yarn global add serve
WORKDIR /code/
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build --production
CMD serve -s build
EXPOSE 5000
