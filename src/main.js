//document.querySelector('body').style.background= '#7E625D';
class App{
    constructor(){
        // lista de repositorios
        this.repositorios = [];

        // Recuperar o formulario
        this.formulario = document.querySelector('form');

        // Método para registrar os eventos do formulário
        this.registrarEventos();
    }
    
    registrarEventos(){
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento)
    }
    
    adicionarRepositorio(evento){
        // Evita que o formulário recarregue a pagina
        evento.preventDefault();
        // Adiciona o repositorio na lista
        this.repositorios.push({
            nome: 'Nerd Fonts',
            descricao: 'Iconic font aggregator, collection and patcher',
            avatar_url: 'https://avatars0.githubusercontent.com/u/8083459?v=4',
            link: 'https://github.com/ryanoasis/nerd-fonts'
        });

        // Renderizar a tela
        console.log(this.repositorios);
    }
};

new App();