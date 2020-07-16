# Set the base image to Ubuntu
FROM node:14.4.0

# Install PM2
RUN npm install -g pm2

# Define working directory
WORKDIR /var/www/ifarmer

COPY package.json ./
COPY package-lock.json ./
CMD ["npm", "install"]
RUN npm rebuild node-sass
CMD ["npm", "build"]

COPY . .

# Expose port
EXPOSE 3000
