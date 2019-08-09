FROM nginx:1.16

MAINTAINER eLife Reviwer Product Team <reviewer-product@elifesciences.org>

COPY deployment/nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html

HEALTHCHECK --interval=1m --timeout=1s \
	CMD curl -f http://localhost/index.html || exit 1

EXPOSE 80
