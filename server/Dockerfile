FROM node:10-alpine

MAINTAINER eLife Reviewer Product Team <reviewer-product@elifesciences.org>

WORKDIR /opt

COPY package.json .
COPY yarn.lock .

COPY dist/ dist/

COPY gql/ dist/modules/

COPY node_modules/ ./node_modules/

EXPOSE 3000
HEALTHCHECK --interval=1m --timeout=1s \
	CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/main.js"]

