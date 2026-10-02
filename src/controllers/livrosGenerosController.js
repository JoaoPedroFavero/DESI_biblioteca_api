`use strict`;

const livrosGenerosModel = require(`../models/livrosGenerosModel`);

const listarLivrosGeneros = async (req, res) => {
    try{
        const livrosGeneros = await livrosGenerosModel.selecionarTodos();

        if(livrosGeneros.length === 0){
            return res.status(404).json({
                message: `Nenhum genero está relacionado a nenhum livro atualmente na biblioteca`
            });
        }

        res.status(200).json({
            livrosGeneros
        });

    } catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const listarLivrosGenerosPorIdLivro = async (req, res) => {
    try{
        const id = req.params.id;

        const livroBuscado = livrosGenerosModel.selecionarPorIdLivro(id);

        if(livroBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum livro com id ${id} relacionado com nenhum genero na bibliteca ainda`
            });
        }

        res.status(200).json({
            livroBuscado
        });
        
    } catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const listarLivrosGenerosPorIdGenero = async (req, res) => {
    try{
        const id = req.params.id;

        const generoBuscado = livrosGenerosModel.selecionarPorIdGenero(id);

        if(generoBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum genero com id ${id} relacionado com nenhum livro na bibliteca ainda`
            });
        }

        res.status(200).json({
            generoBuscado
        });
        
    } catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const cadastrarLivroGenero = async (req, res) => {
    try{
        const {idLivro, idGenero} = req.body;

        if(!idLivro || !idGenero){
            return res.status(400).json({
                erro: `Os IDs do livro e do genero são obrigatórios para cadastrar o relacionamento entre eles`
            });
        }

        const livroBuscado = await livrosGenerosModel.selecionarPorIdLivro(idLivro);
        const generoBuscado = await livrosGenerosModel.selecionarPorIdGenero(idGenero);

        if(livroBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum livro com id ${idLivro} cadastrado para ser relacionado`
            });
        }

        if(generoBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum genero com id ${idGenero} cadastrado para ser relacionado`
            });
        }

        const novoLivroGenero = await livrosGenerosModel.criar(idLivro, idGenero);

        res.status(200).json({
            message: `Relacionamento entre Livro e Genero cadastrado com sucesso`,
            relacionamento: novoLivroGenero
        });
    }catch (err){
        res.status(500).json({
            erro: `Não foi possível cadastrar o relacionamento de Livro e Genero. Erro interno do Servidor`
        });
    }
}

module.exports = {
    listarLivrosGeneros,
    listarLivrosGenerosPorIdLivro,
    listarLivrosGenerosPorIdGenero,
    cadastrarLivroGenero
}