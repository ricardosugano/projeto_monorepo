# 1.Define a imagem de origem base
FROM node:24-alpine

# 2.Define o diretório de trabalho dentro do container
WORKDIR /app

# 3. Instalar o pnpm globalmente para gerenciar as dependências
RUN npm install -g pnpm@11.20

ENV CI=true

RUN echo "strictDepBuilds: false" > pnpm-workspace.yaml

# 4. Copia apenas o manifesto de dependências
COPY package.json ./

# 5. Instalar as dependências do projeto
RUN CI=true pnpm install

# 6. Copia todos os restante do código
COPY . . 

# 7. eXPOE A PORTA PADRÃO LDW
EXPOSE 3000

# 8. Comando para inicializar a aplicação
CMD ["pnpm", "dev"]

