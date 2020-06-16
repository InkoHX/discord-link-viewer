FROM node:14-alpine

ENV WORKDIR_PATH "/inkohx/app/link-viewer-discordbot"

WORKDIR ${WORKDIR_PATH}

COPY . ${WORKDIR_PATH}

RUN yarn --prod
RUN yarn cache clean

ENTRYPOINT [ "yarn", "start" ]
