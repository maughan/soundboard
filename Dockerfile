FROM node:15
WORKDIR /app
RUN apt update
RUN apt install ffmpeg python3 --yes
ADD package.json .
ADD yarn.lock .
RUN yarn
ADD prisma .
RUN yarn generate
ADD . .
RUN yarn build
