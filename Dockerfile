# install node in container
    FROM node:22 AS base
    WORKDIR /myFolder
    COPY package.json .
    COPY . .
    EXPOSE 4000



FROM base AS development

RUN npm install


FROM base AS production

RUN npm install --production



# CMD ["npm" , "run" ,"start-dev"]