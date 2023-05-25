# cadastro-clientes-vue

Projeto de cadastro de contatos, no qual é possível visualizar, cadastrar, editar e excluir um contato. Os dados são armazenados na API utilizando o JSON Server.

É possível visualizar o build do site no link [GitHub](https://samuel-silva.github.io/cadastro-contatos-vue-build/). Este link é com API apenas modo de leitura, não sendo possível editar, excluir e criar um novo contato.

# Configuração do Vue
## Project setup
Na raiz do projeto rodar:
```
npm install
```
Para instalar os pacotes do NPM.

### Compiles and hot-reloads for development
Em seguida rodar:
```
npm run serve
```

Para abrir a versão de desenvolvimento.
Abrir [http://localhost:8080](http://localhost:8080) para visualizar no browser.

A página será recarregada quando houver mudanças salvas no código.

### Compiles and minifies for production
Para visualizar a versão de build, rodar:
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# Configuração do JSON Server
Para criar o servidor, entrar na pasta `db`:
```
cd db
```
E rodar:
```
npm start
```
Para verificar se o servidor foi levantado corretarmente, acessar a url [http://localhost:3000](http://localhost:3000) para visualizar no browser.