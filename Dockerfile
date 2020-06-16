FROM node:14-alpine

ENV WORKDIR_PATH "/inkohx/app/link-viewer-discordbot"

COPY . ${WORKDIR_PATH}

WORKDIR ${WORKDIR_PATH}

RUN yarn --prod
RUN yarn cache clean

ENTRYPOINT [ "yarn", "start" ]
