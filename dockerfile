FROM node

WORKDIR /usr/src

COPY . .

EXPOSE 4000

RUN npm i

RUN npm run build

CMD ["npm", "start"]
