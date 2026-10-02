`use strict`;

const autoresLivrosModel = require(`../models/autoresLivrosModel`);

const listarAutoresLivros = async (req, res) => {
    try{
        const autoresLivros = await autoresLivrosModel.selecionarTodos();

        if(autoresLivros.length === 0){
            return res.status(404).json({
                message: `Nenhum autor está relacionado a nenhum livro atualmente na biblioteca`
            });
        }

        res.status(200).json({
            autoresLivros
        });

    } catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const listarAutoresLivrosPorIdAutor = async (req, res) => {
    try{
        const id = req.params.id;
        const autorLivros = await autoresLivrosModel.selecionarPorIdAutor(id);

        if(autorLivros.length === 0){
            return res.status(404).json({
                message: `Autor não relacionado com nenhum livro`
            });
        }

        res.status(200).json({
            autorLivros
        });

    } catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const listarAutoresLivrosPorIdLivro = async (req, res) => {
    try{
        const id = req.params.id;
        const livros = await autoresLivrosModel.selecionarPorIdLivro(id);

        if(livros.length === 0){
            return res.status(404).json({
                message: `Autor não relacionado com nenhum livro`
            });
        }

        res.status(200).json({
            livros
        });

    } catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const cadastrarAutorLivro = async (req, res) => {
    try{
        const {idAutor, idLivro} = req.body;

        if(!idAutor || !idLivro){
            return res.status(400).json({
                erro: `Os IDs do autor e do livro são obrigatórios para cadastrar o relacionamento entre eles`
            });
        }

        const autorBuscado = await autoresLivrosModel.selecionarPorIdAutor(idAutor);
        const livroBuscado = await autoresLivrosModel.selecionarPorIdLivro(idLivro);

        if(autorBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum autor com id ${idAutor} cadastrado para ser relacionado`
            });
        }

        if(livroBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum livro com id ${idLivro} cadastrado para ser relacionado`
            });
        }

        const novoAutorLivro = await autoresLivrosModel.criar(idAutor, idLivro);

        res.status(200).json({
            message: `Relacionamento entre autor e livro cadastrado com sucesso`,
            relacionamento: novoAutorLivro
        });


    }catch (err){
        res.status(500).json({
            erro: `Não foi possível cadastrar o relacionamento entre Autor e Livro. Erro interno do Servidor`
        });
    }
}

module.exports = {
    listarAutoresLivros,
    listarAutoresLivrosPorIdAutor,
    listarAutoresLivrosPorIdLivro,
    cadastrarAutorLivro
}