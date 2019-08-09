from node:10-alpine

maintainer eLife Reviwer Product Team <reviewer-product@elifesciences.org>

workdir /opt

copy package.json .
copy yarn.lock .

copy dist/ dist/

copy gql/ dist/modules/

copy node_modules/ ./node_modules/

expose 3000

cmd ["node", "dist/main.js"]

