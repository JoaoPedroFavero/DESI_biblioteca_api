`use strict`;
const livrosModel = require(`../models/livrosModel`);
const ISBN = require(`isbn3`);

const listarLivros = async (req, res) => {
    try{
        const livros = await livrosModel.selecionarTodos();

        if(livros.length === 0){
            return res.status(404).json({
                message: `Nenhum livro cadastrado ainda`
            });
        }

        res.status(200).json({
            livros
        });

    }catch (err){
        res.status(500).json({
            message: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const listarLivrosPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const livro = await livrosModel.selecionarPorId(id);

        if(livro.length === 0){
            return res.status(404).json({
                message: `Nenhum livro com o id ${id} encontrado na biblioteca`
            })
        }

        res.status(200).json({
            livro
        })

    } catch (err){
        res.status(500).json({
            message: `Não foi possível realizar a busca. Erro interno do Servidor`
        })
    }
}

const cadastrarLivro = async (req, res) => {
    const {titulo, isbn, ano_publicacao, numero_paginas, sinopse} = req.body
    try{
        if(!titulo || titulo.trim() === ""){
            return res.status(400).json({
                erro: `O titulo é obrigatório`
            });
        }

        if(!ISBN.parse(isbn) || !ISBN.parse(isbn).isValid){
            return res.status(400).json({
                erro: `O ISBN está inválido. Por favor, insira um ISBN válido`
            });
        }

        if(!ano_publicacao){
            return res.status(400).json({
                erro: `O ano de publicação do livro é obrigatório`
            });
        }

        if(ano_publicacao < 1901 || ano_publicacao > 2155){
            return res.status(400).json({
                erro: `Não é possível cadastrar livros mais velhos do que 1901 nesta biblioteca, nem mais novos do que 2155`
            });
        }

        if(!/^\d+$/.test(ano_publicacao)){
            return res.status(400).json({
                erro: `O ano de publicação deve conter apenas números`
            });
        }

        if(!numero_paginas || !/^\d+$/.test(numero_paginas)){
            return res.status(400).json({
                erro: `O numero de páginas é obrigatório e deve conter apenas numeros`
            });
        }

        const livroCadastrado = await livrosModel.criar(titulo, isbn, ano_publicacao, numero_paginas, sinopse);

        res.status(200).json({
            message: `Livro cadastrado com sucesso`,
            livro: livroCadastrado
        });

    } catch (err){
        res.status(500).json({
            message: `Não foi possível cadastrar o Livro. Erro interno do Servidor`
        })
    }
}

const editarLivro = async (req, res) => {
    const id = req.params.id;
    const {titulo, isbn, ano_publicacao, numero_paginas, sinopse} = req.body
    try{

        const livroBuscado = await livrosModel.selecionarPorId(id);
        if (livroBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum livro com o id ${id} encontrado na biblioteca`
            });
        }

        if(!ISBN.parse(isbn) || !ISBN.parse(isbn).isValid){
            return res.status(400).json({
                erro: `O ISBN está inválido. Por favor, insira um ISBN válido`
            });
        }

        if(ano_publicacao < 1901 || ano_publicacao > 2155){
            return res.status(400).json({
                erro: `Não é possível cadastrar livros mais velhos do que 1901 nesta biblioteca, nem mais novos do que 2155`
            });
        }

        if(!/^\d+$/.test(ano_publicacao)){
            return res.status(400).json({
                erro: `O ano de publicação deve conter apenas números`
            });
        }

        if(!/^\d+$/.test(numero_paginas)){
            return res.status(400).json({
                erro: `O numero de páginas deve conter apenas numeros`
            });
        }

        const livroEditado = await livrosModel.editar(id, titulo, isbn, ano_publicacao, numero_paginas, sinopse);

        res.status(200).json({
            message: `Livro editado com sucesso`,
            livro: livroEditado
        });

    } catch (err){
        res.status(500).json({
            message: `Não foi possível editar o Livro. Erro interno do Servidor`
        });
    }
}

const deletarLivro = async (req, res) => {
    try{ 
        const id = req.params.id;
        const livroBuscado = await livrosModel.selecionarPorId(id);
        if(livroBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum livro com o id ${id} encontrado na biblioteca`
            });
        }

        await livrosModel.deletar(id);

        res.status(200).json({
            message: `Livro excluido com sucesso da biblioteca`
        });

    } catch (err){
        res.status(500).json({
            message: `Não foi possível excluir o Livro. Erro interno do Servidor`
        });
    }
}

module.exports = {
    listarLivros,
    listarLivrosPorId,
    cadastrarLivro,
    editarLivro,
    deletarLivro
}