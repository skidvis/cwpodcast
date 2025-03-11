FROM nginx:stable-alpine-slim

COPY dist/ /etc/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]