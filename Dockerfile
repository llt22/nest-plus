FROM node:12.22.1-slim

# 设置时区
ENV TZ="Asia/Shanghai"
WORKDIR /app
CMD [ "npm", "run", "start:prod"]
