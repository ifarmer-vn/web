# Set nginx base image
FROM nginx

# File Author / Maintainer

# Copy custom configuration file from the current directory
#COPY config/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY config/ /etc/nginx/

# Append "daemon off;" to the beginning of the configuration
# in order to avoid an exit of the container
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Define default command
CMD service nginx start
