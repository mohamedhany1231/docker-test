# install node in container
    FROM node:22 AS base
    WORKDIR /myFolder
    COPY package.json .




FROM base AS development

RUN npm install
COPY . .
EXPOSE 4000


FROM base AS production

RUN npm install --production
COPY . .
EXPOSE 4000



# CMD ["npm" , "run" ,"start-dev"]