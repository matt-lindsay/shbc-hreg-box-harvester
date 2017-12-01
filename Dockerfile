# Use nodejs LTS source
FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Add envrionment variables
ENV PORT 8080
ENV boxClientID ****
ENV boxClientSecret ****
ENV boxEnterpriseId ****
ENV boxHousingFolder ****
ENV boxHousingUser ****
ENV boxKeyID ****
ENV boxKeyPassphrase ****
ENV boxPrivateKey ****

# Create app directory
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app

# Install app dependencies
#COPY package.json /usr/src/app/

# Bundle app source
#COPY . /usr/src/app

EXPOSE 8080
CMD ["npm", "start" ]