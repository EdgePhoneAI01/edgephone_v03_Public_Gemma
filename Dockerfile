# Lightweight Dockerfile — uses pre-built dist/ from local npm run build
# No node/npm needed in Cloud Build, just copies static files into nginx
FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy pre-built Vite output
COPY dist/ /usr/share/nginx/html/

# Cloud Run requires port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
