FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app ./
# Expose the port the app runs in
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
# Create image based on the official Node 10 image from dockerhub
#FROM node:12
#
## Create a directory where our app will be placed
#RUN mkdir -p /app
#
## Change directory so that our commands run inside this new directory
#WORKDIR /app
#
## Copy dependency definitions
#COPY package*.json /app/
#
## Install dependecies
#RUN npm install
#
## Get all the code needed to run the app
#COPY . /app/
#
## Expose the port the app runs in
#EXPOSE 3000
#
## Serve the app
#CMD ["npm", "start"]
