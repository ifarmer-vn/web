# Set the base image to Ubuntu
FROM node:10-slim

# Install PM2
RUN npm install -g pm2

# Define working directory
WORKDIR /var/www/ifarmer

COPY package.json ./
COPY package-lock.json ./
CMD ["npm", "install"]
CMD ["npm", "build"]

COPY . .

# Expose port
EXPOSE 3000
