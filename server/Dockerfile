FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
# Vercel sends traffic to port 80. docker-compose overrides this with PORT=5000.
ENV PORT=80
EXPOSE 80
CMD ["node","server.js"]
