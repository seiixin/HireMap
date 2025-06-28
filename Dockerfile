############################################
# 🏗 Build Stage: Node.js for frontend assets
############################################
FROM node:18-alpine AS node-builder

# Set working directory
WORKDIR /app

# Copy only package files first (for caching npm install)
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build assets (public/build)
RUN npm run build

############################################
# 🐘 PHP Stage: Laravel app with Composer
############################################
FROM php:8.2-fpm-alpine

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
    libpng libpng-dev libjpeg-turbo-dev libwebp-dev libxpm-dev \
    libxml2-dev oniguruma-dev zip unzip git curl \
 && docker-php-ext-configure gd --with-jpeg --with-webp --with-xpm \
 && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy Laravel PHP code
COPY . .

# Copy built frontend assets from node-builder
COPY --from=node-builder /app/public/build ./public/build

# Install PHP dependencies without dev packages
RUN composer install --no-dev --optimize-autoloader


# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose php-fpm port
EXPOSE 9000

# Start php-fpm server
CMD php artisan config:clear \
 && php artisan cache:clear \
 && php artisan view:clear \
 && php-fpm
