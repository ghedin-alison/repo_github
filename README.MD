# Projeto final do curso de Javascript

![Javascript](javascript.png)

**Aqui está a sequencia dos comandos e anotações importantes para a criação do projeto, do início ao fim**.


##Configurando o ambiente:
_Manter todos os campos em branco:_
```
yarn init
```


_Instalar os pacotes:_
```
yarn add @babel/cli -D
yarn add @babel/core -D
yarn add @babel/preset-env -D
yarn add @babel/polyfill


yarn add babel-loader -D

yarn add webpack -D
yarn add webpack-cli -D
yarn add webpack-dev-server -D
```
---


####Na raíz do projeto :
- Criar os diretórios public/ e src/
- Criar os arquivos:
    - .gitignore com o diretório node_modules/

    - .babelrc com os presets
    ```js
    {
    "presets": ["@babel/preset-env"]
    }
    ```
    - webpack.config.js com as configurações:
        ```js
            module.exports = {
            entry: ['@babel/polyfill', './src/main.js'],
            output: {
                path: __dirname + '/public',
                filename: 'bundle.js'
            },
            devServer: {
                contentBase: __dirname + '/public'
            },
            module:{
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, 
                        use: {
                            loader: 'babel-loader',
                        }
                    }
                ],
            },
        };
        ```

- No diretorio public criar o subdiretório CSS e o arquivo index.html
- No diretorio CSS incluir o arquivo de estilos

- No diretório src criar o arquivo main.js com alguma configuração pra teste


- No arquivo package.json adicionar os scripts de desenvolvimento e produção

```js
"scripts": {
    "dev": "webpack-dev-server --mode=development",
    "prod": "webpack --mode=production"
  }

```
---
#####No terminal

```
yarn dev
```
