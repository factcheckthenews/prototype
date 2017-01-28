# AWS Lambda version of Node
FROM node:4.3

WORKDIR /app

# Install dev dependencies so that express can act like API Gateway
COPY package.json /app/package.json
RUN npm install

# Copy the rest of the app
COPY . /app

ENTRYPOINT ["node", "index.js"]
EXPOSE 3000
