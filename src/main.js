import api from './api';


class App{
    constructor(){
        // lista de repositorios
        this.repositorios = [];

        // Recuperar o formulario
        this.formulario = document.querySelector('form');

        // Lista
        this.lista = document.querySelector('.list-group');

        // Método para registrar os eventos do formulário
        this.registrarEventos();
    }
    
    registrarEventos(){
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento)
    }
    
    async adicionarRepositorio(evento){
        // Evita que o formulário recarregue a pagina
        evento.preventDefault();

        // Recuperar o valor do input
        let input = this.formulario.querySelector('input[id=repositorio]').value;

        // Se o input vier vazio, sai da aplicação
        if(input.lenght === 0){
            return; // return sempre sai da funcao, funciona como go to fim.
        }

        // Ativar a busca
        this.apresentarBuscando();

        try{
            let response = await api.get(`/repos/${input}`);
            
            //console.log(response);

            // Destructuring
            let {name, description, html_url, owner: {avatar_url}} = response.data

            // Adiciona o repositorio na lista
            this.repositorios.push({
                nome: name,
                descricao: description,
                avatar_url,
                link: html_url
            });

            // Renderizar a tela
            this.renderizarTela();
        }catch(erro){
            // Remover mensagem de busca
            this.lista.removeChild(document.querySelector('.list-group-item-warning'));

            //Limpar mensagem de erro já existente
            let err = this.lista.querySelector('.list-group-item-danger');

            if(err !== null){
                this.lista.removeChild(err);
            }

            // criar uma <li> informativa
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-danger');
            let txtErro = document.createTextNode(`Repositório ${input} não encontrado.`);
            li.appendChild(txtErro);
            this.lista.appendChild(li);
        }
    }
    apresentarBuscando(){

        let li = document.createElement('li');
        li.setAttribute('class', 'list-group-item list-group-item-warning');
        let txtBusca = document.createTextNode(`Aguarde, buscando o repositório...`);
        li.appendChild(txtBusca);
        this.lista.appendChild(li);
    }


    renderizarTela(){
        // Limpar Conteudo de lista
        this.lista.innerHTML = '';

        // Percorrer toda a lista de repositorios e criar os elementos
        this.repositorios.forEach(repositorio => {
            // Criar o elemento <li>
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-action');

            // Criar o elemento img
            let img = document.createElement('img');
            img.setAttribute('src', repositorio.avatar_url);
            
            // Adicionar a imagem como filha de lista
            li.appendChild(img);

            // Criar o elemento strong
            let strong = document.createElement('strong');
            let txtNome = document.createTextNode(repositorio.nome);
            // Adicionar o texto como filho de strong
            strong.appendChild(txtNome);

            // Adicionar o elemento strong como filho da lista
            li.appendChild(strong);

            // Criar o elemento <p>
            let p = document.createElement('p');
            let txtDescricao = document.createTextNode(repositorio.descricao);
            p.appendChild(txtDescricao)

            // Adicionar o elemento <p> como filho da lista
            li.appendChild(p);

            // Criar o elemento <a>
            let a = document.createElement('a');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', repositorio.link);
            let txtA = document.createTextNode('Acessar');
            a.appendChild(txtA);

            // Adicionar o elemento <a> como filho da lista
            li.appendChild(a);

            // Adicionar <li> como filho da <ul>
            this.lista.appendChild(li)  ;

            // Limpar o conteúdo do input
            this.formulario.querySelector('input[id=repositorio]').value = '';

            // Adiciona o foco no input
            this.formulario.querySelector('input[id=repositorio]').focus();

        });
    }
};

new App();