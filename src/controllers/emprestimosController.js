`use strict`;
const emprestimosModel = require(`../models/emprestimosModel`);
const livrosModel = require(`../models/livrosModel`);
const usuariosModel = require(`../models/usuariosModel`);
const validadorData = require(`validate-date`);

const listarEmprestimos = async (req, res) => {
    try{
        const emprestimos = await emprestimosModel.selecionarTodos();

        if(emprestimos.length === 0){
            return res.status(404).json({
                message: `Nenhum emprestimo cadatrado na biblioteca ainda`
            });
        }

        res.status(200).json({
            emprestimos
        });

    }catch(err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const listarEmprestimosPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const emprestimo = await emprestimosModel.selecionarPorId(id);

        if(emprestimo.length === 0){
            return res.status(404).json({
                message: `Nenhum emprestimo com id ${id} cadatrado na biblioteca ainda`
            });
        }

        res.status(200).json({
            emprestimo
        });
        
    }catch(err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
    }
}

const cadastrarEmprestimo = async (req, res) => {
    try{
        const {data_emprestimo, data_devolucao, livro_id, usuario_id} = req.body;

        if(!data_devolucao || !data_emprestimo || !validadorData(data_devolucao, responseType="boolean") || !validadorData(data_emprestimo, responseType="boolean")){
            return res.status(400).json({
                erro: `Datas são obrigatórias e devem ser válidas`
            });
        }

        if(data_devolucao < data_emprestimo){
           return res.status(400).json({
                erro: `A data de devolução deve ser no mínimo no mesmo dia que a data de empréstimo`
            });
        }

        if(!livro_id){
            return res.status(400).json({
                erro: `O Id do Livro é obrigatório para cadastrar um empréstimo`
            });
        }

        if(!usuario_id){
            return res.status(400).json({
                erro: `O Id do Usuário é obrigatório para cadastrar um empréstimo`
            });
        }

        const livro = await livrosModel.selecionarPorId(livro_id);
        const usuario = await usuariosModel.selecionarPorId(usuario_id);

        if(livro.length === 0){
            return res.status(404).json({
                erro: `Nenhum livro com com o id ${id} cadastrado na biblioteca`
            });
        }

        if(usuario.length === 0){
            return res.status(404).json({
                erro: `Nenhum usuario com com o id ${id} cadastrado na biblioteca`
            });
        }

        const emprestimoCadastrado = await emprestimosModel.criar(data_emprestimo, data_devolucao, livro_id, usuario_id);

        res.status(200).json({
            message: `Empréstimo cadastrado com sucesso`,
            emprestimo: emprestimoCadastrado
        });

    }catch(err){
        res.status(500).json({
            erro: `Não foi possível realizar o cadastro. Erro interno do Servidor`
        });
    }
}

const editarEmprestimo = async (req, res) => {
    try{
        const id = req.params.id;
        let {data_emprestimo, data_devolucao, livro_id, usuario_id} = req.body;
        const emprestimo = emprestimosModel.selecionarPorId(id);

        if(emprestimo.length === 0){
            return res.status(404).json({
                message: `Nenhum emprestimo com id ${id} cadatrado na biblioteca ainda`
            });
        }

        if(!data_devolucao){
            data_devolucao = emprestimo[0].data_devolucao;
        }

        if(!data_emprestimo){
            data_emprestimo = emprestimo[0].data_emprestimo;
        }
        
        if(!validadorData(data_devolucao, responseType="boolean") || !validadorData(data_emprestimo, responseType="boolean")){
            return res.status(400).json({
                erro: `Datas são obrigatórias e devem ser válidas`
            });
        }

        if(data_devolucao < data_emprestimo){
           return res.status(400).json({
                erro: `A data de devolução deve ser no mínimo no mesmo dia que a data de empréstimo`
            });
        }

        if(!livro_id){
            livro_id = emprestimo[0].livro_id;
        }

        if(!usuario_id){
            usuario_id = emprestimo[0].usuario_id;
        }

        const livro = await livrosModel.selecionarPorId(livro_id);
        const usuario = await usuariosModel.selecionarPorId(usuario_id);

        if(livro.length === 0){
            return res.status(404).json({
                erro: `Nenhum livro com com o id ${id} cadastrado na biblioteca`
            });
        }

        if(usuario.length === 0){
            return res.status(404).json({
                erro: `Nenhum usuario com com o id ${id} cadastrado na biblioteca`
            });
        }

        const emprestimoEditado = await emprestimosModel.editar(id, data_emprestimo, data_devolucao, livro_id, usuario_id);

        res.status(200).json({
            message: `Empréstimo editado com sucesso`,
            emprestimo: emprestimoEditado
        });

    }catch(err){
        res.status(500).json({
            erro: `Não foi possível editar o empréstimo. Erro interno do Servidor`
        });
    }
}

const deletarEmprestimo = async (req, res) => {
    try{
        const id = req.params.id;
        const emprestimo = emprestimosModel.selecionarPorId(id);

        if(emprestimo.length === 0){
            return res.status(404).json({
                message: `Nenhum emprestimo com id ${id} cadatrado na biblioteca ainda`
            });
        }

        await emprestimosModel.deletar(id);

        res.status(200).json({
            message: `Emprestimo excluído com sucesso`
        });

    }catch(err){
        res.status(500).json({
            erro: `Não foi possível deletar o empréstimo. Erro interno do Servidor`
        });
    }
}

module.exports = {
    listarEmprestimos,
    listarEmprestimosPorId,
    cadastrarEmprestimo,
    editarEmprestimo,
    deletarEmprestimo
}
