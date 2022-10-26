###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# stage build
FROM node:18-alpine AS development

# set working directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install` for clean install
RUN npm ci

# Set NODE_ENV environment variable
ENV NODE_ENV development

# Bundle app source
COPY --chown=node:node . .

# remove potential security issues
RUN npm audit fix
    
# build SvelteKit app
RUN npm run build

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine AS build

WORKDIR /app

# copy dependency list
COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# clean install dependencies, no devDependencies, no prepare script
# RUN npm ci --production --ignore-scripts

# remove potential security issues
RUN npm audit fix

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine AS production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package.json ./

# copy built SvelteKit app to /app
COPY --from=0 /app/build ./

EXPOSE 3000
CMD ["node", "./index.js"]