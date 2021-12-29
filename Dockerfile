FROM nginx:stable 
# https://hub.docker.com/_/nginx

# 添加自己的配置 default.conf 在下面
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/dist

EXPOSE 80