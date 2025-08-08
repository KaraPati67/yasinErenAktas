# Node.js base image kullanılıyor
FROM node:18

# Çalışma dizini oluştur
WORKDIR /app

# Uygulama dosyalarını kopyala
COPY package*.json ./
COPY index.js ./

# Bağımlılıkları yükle
RUN npm install

# Uygulamayı başlat
CMD ["node", "index.js"]
