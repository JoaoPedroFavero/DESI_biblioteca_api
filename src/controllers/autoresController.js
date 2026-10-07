`use strict`;

const autoresModel = require(`../models/autoresModel`);
const validadorData = require(`validate-date`);

const listarAutores = async (req, res) => {
    try{
        const autores = await autoresModel.selecionarTodos();

        if(autores.length === 0){
            return res.status(404).json({
                message: `Nenhum autor cadastrado ainda`
            });
        }

        res.status(200).json({
            autores
        });

    } catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const listarAutoresPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const autor = await autoresModel.selecionarPorId(id);

        if(autor.length == 0){
            return res.status(404).json({
                message: `Nenhum autor com o id ${id} cadastrado na biblioteca`
            });
        }

        res.status(200).json({
            autor
        });

    } catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const cadastrarAutor = async (req, res) => {
    try{
        let {nome, nacionalidade, data_nascimento} = req.body;

        if(!nome){
            return res.status(400).json({
                erro: `Nome é obrigatório`
            });
        }

        if(!nacionalidade){
            return res.status(400).json({
                erro: `Nacionalidade é obrigatória`
            });
        }

        if(!data_nascimento || !validadorData(data_nascimento.toString(), "boolean", "dd/mm/yyyy")){
            console.log(data_nascimento, validadorData(data_nascimento.toString(), "boolean", "dd/mm/yyyy"))
            return res.status(400).json({
                erro: `Data de Nascimento é obrigatória e aceita somente no padrão DD/MM/AAAA`
            });
        }

        const [dia, mes, ano] = data_nascimento.split("/");
        data_nascimento = `${ano}-${mes}-${dia}`;

        const novoAutor = await autoresModel.criar(nome, nacionalidade, data_nascimento);

        res.status(200).json({
            message: `Autor cadastrado com sucesso`,
            autor: novoAutor
        })

    } catch (err){
        res.status(500).json({
            erro: `Não foi possível cadastrar o autor. Erro interno do Servidor`
        });
        console.log(err)
    }
}

const editarAutor = async (req, res) => {
    try{
        const id = req.params.id;
        let {nome, nacionalidade, data_nascimento} = req.body;
        const autorBuscado = await autoresModel.selecionarPorId(id);
        let dataAntiga = false;

        if(autorBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum autor com o id ${id} cadastrado na biblioteca`
            });
        }

        if(!nome){
            nome = autorBuscado[0].nome;
        }

        if(!nacionalidade){
            nacionalidade = autorBuscado[0].nacionalidade;
        }

        if(!data_nascimento){
            data_nascimento = autorBuscado[0].data_nascimento;
            dataAntiga = true;
        }

        if(data_nascimento && dataAntiga === false){
            console.log(data_nascimento);
            const [dia, mes, ano] = data_nascimento.split("/");
            data_nascimento = `${ano}-${mes}-${dia}`;
        }     

        if(data_nascimento && dataAntiga === false && !validadorData(data_nascimento.toString(), "boolean", "dd/mm/yyyy")){
            return res.status(400).json({
                erro: `Data de Nascimento aceita somente no padrão DD/MM/AAAA ou YYYY-MM-DD`
            });
        }

        const autorEditado = await autoresModel.editar(id, nome, nacionalidade, data_nascimento);

        res.status(200).json({
            message: `Autor editado com sucesso`,
            autor: autorEditado
        });

    } catch (err){
        res.status(500).json({
            erro: `Não foi possível editar o autor. Erro interno do Servidor`
        });
    }
}

const deletarAutor = async (req, res) => {
    try{
        const id = req.params.id;
        const autorBuscado = await autoresModel.selecionarPorId(id);
        if(autorBuscado.length === 0){
            return res.status(404).json({
                message: `Nenhum autor com o id ${id} cadastrado na biblioteca`
            });
        }

        await autoresModel.deletar(id);

        res.status(200).json({
            message: `Autor excluído com sucesso`
        });

    }catch (err){
        res.status(500).json({
            erro: `Não foi possível deletar o autor. Erro interno do Servidor`
        });
    }
}

module.exports = {
    listarAutores,
    listarAutoresPorId,
    cadastrarAutor,
    editarAutor,
    deletarAutor
}