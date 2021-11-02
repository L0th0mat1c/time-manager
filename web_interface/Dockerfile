FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server

# définit le dossier 'app' comme dossier de travail
RUN mkdir /app
COPY . /app
WORKDIR /app
# copie 'package.json' et 'package-lock.json' (si disponible)
# RUN ls
COPY package*.json ./
# # installe les dépendances du projet
RUN npm install


# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .
RUN npm build
# construit l'app pour la production en la minifiant
# RUN npm run build
# RUN cd web_interface
EXPOSE 8080
CMD ["http-server", "dist"]

