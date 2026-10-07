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
        let {data_emprestimo, data_devolucao, livro_id, usuario_id} = req.body;

        if(!data_devolucao || !data_emprestimo || !validadorData(data_devolucao.toString(), "boolean", "dd/mm/yyyy") || !validadorData(data_emprestimo.toString(), "boolean", "dd/mm/yyyy")){
            return res.status(400).json({
                erro: `Datas são obrigatórias e devem ser válidas`
            });
        }

        const dataD = new Date(data_devolucao);
        const dataE = new Date(data_emprestimo);

        if(dataD < dataE){
           return res.status(400).json({
                erro: `A data de devolução deve ser no mínimo no mesmo dia que a data de empréstimo`
            });
        }

        const [diaD, mesD, anoD] = data_devolucao.split("/");
        data_devolucao = `${anoD}-${mesD}-${diaD}`;

        const [diaE, mesE, anoE] = data_emprestimo.split("/");
        data_emprestimo = `${anoE}-${mesE}-${diaE}`;

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
                erro: `Nenhum livro com com o id ${livro_id} cadastrado na biblioteca`
            });
        }

        if(usuario.length === 0){
            return res.status(404).json({
                erro: `Nenhum usuario com com o id ${usuario_id} cadastrado na biblioteca`
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
        console.log(err);
    }
}

const editarEmprestimo = async (req, res) => {
    try{
        const id = req.params.id;
        let {data_emprestimo, data_devolucao, livro_id, usuario_id} = req.body;

        const emprestimo = await emprestimosModel.selecionarPorId(id);

        let dataDevAntiga = false;
        let dataEmpAntiga = false;

        if(emprestimo.length === 0){
            return res.status(404).json({
                message: `Nenhum emprestimo com id ${id} cadatrado na biblioteca ainda`
            });
        }

        if(!data_devolucao){
            data_devolucao = emprestimo[0].data_devolucao;
            dataDevAntiga = true;
        }

        if(!data_emprestimo){
            data_emprestimo = emprestimo[0].data_emprestimo;
            dataEmpAntiga = true;
        }
        
        if(data_devolucao && dataDevAntiga === false && !validadorData(data_devolucao.toString(), "boolean", "dd/mm/yyyy")){
            return res.status(400).json({
                erro: `Data de Devolução é obrigatória e deve ser válida`
            });
        }

        if(data_emprestimo && dataEmpAntiga === false && !validadorData(data_emprestimo.toString(), "boolean", "dd/mm/yyyy")){
            return res.status(400).json({
                erro: `Data de Empréstimo é obrigatória e deve ser válida`
            });
        }

        if(data_devolucao && dataDevAntiga === false){
            const [diaD, mesD, anoD] = data_devolucao.split("/");
            data_devolucao = `${anoD}-${mesD}-${diaD}`;
            console.log(data_devolucao);
        }

        if(data_emprestimo && dataEmpAntiga === false){
            const [diaE, mesE, anoE] = data_emprestimo.split("/");
            data_emprestimo = `${anoE}-${mesE}-${diaE}`;
        }

        const dataD = new Date(data_devolucao);
        const dataE = new Date(data_emprestimo);

        console.log(`data d`, dataD);
        console.log(`data e`, dataE);

        if(dataD < dataE){
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
        console.log(err);
    }
}

const deletarEmprestimo = async (req, res) => {
    try{
        const id = req.params.id;
        const emprestimo = await emprestimosModel.selecionarPorId(id);

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
