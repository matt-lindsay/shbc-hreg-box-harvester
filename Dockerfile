# Use nodejs LTS source
FROM node:boron

# Add envrionment variables
ENV PORT ****
ENV boxClientID ****
ENV boxClientSecret ****
ENV boxEnterpriseId ****
ENV boxHousingFolder ****
ENV boxHousingUser ****
ENV boxKeyID ****
ENV boxKeyPassphrase ****
ENV boxPrivateKey ****

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD ["npm", "start" ]