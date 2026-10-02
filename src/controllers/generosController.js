`use strict`;

const generosModel = require(`../models/generosModel`);

const listarGeneros = async (req, res) => {
    try{
        const generos = await generosModel.selecionarTodos();

        if(generos.length === 0){
            return res.status(404).json({
                message: `Nenhum genero cadastrado na biblioteca ainda`
            });
        }

        res.status(200).json({
            generos
        });

    }catch(err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const listarGenerosPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const genero = await generosModel.selecionarPorId(id);

        if(genero.length === 0){
            return res.status(404).json({
                message: `Nenhum genero com o id ${id} cadastrado na biblioteca`
            });
        }

        res.status(200).json({
            genero
        });

    }catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const cadastrarGenero = async (req, res) => {
    try{
        const nome = req.body;

        if(nome.split() == "" || !nome){
            return res.status(400).json({
                erro: `O nome é obrigatório`
            });
        }

        const novoGenero = await generosModel.criar(nome);

        res.status(200).json({
            message: `Genero cadastrado com sucesso`,
            genero: novoGenero
        });

    }catch (err){
        res.status(500).json({
            erro: `Não foi possível cadastrar o genero. Erro interno do Servidor`
        });
    }
}

const editarGenero = async (req, res) => {
    try{
        const id = req.params.id;
        const nome = req.body
        const generoBuscado = await generosModel.selecionarPorId(id);

        if(generoBuscado.length === 0){
            return res.stauts(404).json({
                message: `Nenhum genero com id ${id} encontrado na biblioteca`
            });
        }

        if(!nome){
            return res.status(204).json({
                message: `Nenhum dado foi alterado no genero informado`
            });
        }

        const generoEditado = await generosModel.editar(id, nome);

        res.status(200).json({
            message: `Edição realizada com sucesso`,
            genero: generoEditado
        });

    }catch (err){
        res.status(500).json({
            erro: `Não foi possível editar o genero. Erro interno do Servidor`
        });
    }
}

const deletarGenero = async (req, res) => {
    try{
        const id = req.params.id;
        const generoBuscado = await generosModel.selecionarPorId(id);

        if(generoBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum genero com id ${id} encontrado na biblioteca`
            });
        }

        await generosModel.deletar(id);

        res.status(200).json({
            message: `Genero excluido com sucesso da biblioteca`
        });

    }catch (erro){
        res.status(500).json({
            erro: `Não foi possível deletar o genero. Erro interno do Servidor`
        });
    }
}

module.exports = {
    listarGeneros,
    listarGenerosPorId,
    cadastrarGenero,
    editarGenero,
    deletarGenero
}