FROM node:latest
WORKDIR /app
COPY package.json ./
ARG API
RUN REACT_APP_API=${API}
RUN npm install
COPY . .
CMD ["npm", "start"]