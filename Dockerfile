FROM node:16.8.0
WORKDIR /code

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH
# ENV PATH="./node_modules/.bin:$PATH"

ENV PORT 3000
EXPOSE 3000

# install app dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --production

RUN npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]

# docker build -t sample:dev .
# docker run -it -p 3000:3000 simple-react-app
# $ docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true sample:dev


# Reference:
# Dockerizing a React App, https://mherman.org/blog/dockerizing-a-react-app/
# Heroku + Docker with Secure React in 10 Minutes, https://developer.okta.com/blog/2020/06/24/heroku-docker-react