# Set nginx base image
FROM nginx:1.18

# File Author / Maintainer

# Copy custom configuration file from the current directory
COPY config/ /etc/nginx/
COPY config/amppubkeys /etc/nginx/amppubkeys/.well-known/amphtml

# Append "daemon off;" to the beginning of the configuration
# in order to avoid an exit of the container
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Define default command
CMD service nginx start
