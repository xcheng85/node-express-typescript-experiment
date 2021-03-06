FROM node:16.13.1 as base

# Add package file
COPY package*.json ./

# Install deps
RUN npm i

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json
# COPY openapi.json ./openapi.json

# Build dist
RUN npm run build

# Start production image build
FROM gcr.io/distroless/nodejs:16

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

# Expose port 3000
EXPOSE 3000
CMD ["dist/src/server.js"]
