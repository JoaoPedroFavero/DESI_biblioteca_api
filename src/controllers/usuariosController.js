`use strict`;

const usuariosModel = require(`../models/usuariosModel`);
const validarCpf = require(`validar-cpf`);
const validadorData = require(`validate-date`);

const listarUsuarios = async (req, res) => {
    try{
        const usuarios = await usuariosModel.selecionarTodos();

        if(usuarios.length === 0){
            return res.status(404).json({
                message: `Nenhum usuario cadastrado na biblioteca`
            });
        }

        res.status(200).json({
            usuarios
        });

    }catch(err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`,
        });
        console.log(err);
    }
}

const listarUsuariosPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const usuario = await usuariosModel.selecionarPorId(id);

        if(usuario.length === 0){
            return res.status(404).json({
                message: `Nenhum usuario com id ${id} cadastrado na biblioteca`
            });
        }

        res.status(200).json({
            usuario
        });
        
    }catch (err){
        res.status(500).json({
            erro: `Não foi possível realizar a busca. Erro interno do Servidor`
        });
        console.log(err);
    }
}

const cadastrarUsuario = async (req, res) => {
    try{
        const {nome, cpf, email, telefone, data_nascimento} = req.body;

        if(!nome){
            res.status(400).json({
                erro: `O Nome é obrigatório para cadastrar um usuário`
            });
        }

        if(!cpf){
            res.status(400).json({
                erro: `O CPF é obrigatório para cadastrar um usuário`
            });
        }

        if(!validarCpf(cpf)){
            res.status(400).json({
                erro: `O CPF está inválido. `
            });
        }

        if(!email || !(email.includes(`@`)) || !(email.includes(`.com`))){
            res.status(400).json({
                erro: `O Email é obrigatório e deve ser válido.`
            });
        }

        if(!telefone || !(/^\d+$/.test(telefone))){
            res.status(400).json({
                erro: `Telefone é obrigatório e deve conter apenas números`
            });
        }

        if(!data_nascimento || !validadorData(data_nascimento, responseType="boolean")){
            return res.status(400).json({
                erro: `Data de Nascimento é obrigatória e aceita somente no padrão DD/MM/AAAA`
            });
        }

        const usuariosCadastrado = await usuariosModel.criar(nome, cpf, email, telefone, data_nascimento);

        res.stauts(200).json({
            message: `Usuario cadastrado com sucesso`,
            usuario: usuariosCadastrado
        });

    }catch(err){
        res.status(500).json({
            erro: `Não foi possível cadastrar usuario. Erro interno do Servidor`
        });
    }
}

const editarUsuario = async (req, res) => {
    try{
        let {nome, cpf, email, telefone, data_nascimento} = req.body;
        const id = req.params.id;
        const usuario = await usuariosModel.selecionarPorId(id);

        if(usuario.length === 0){
            return res.status(404).json({
                message: `Nenhum usuario com id ${id} cadastrado na biblioteca`
            });
        }

        if(!nome){
            nome = usuario[0].nome;
        }

        if(!cpf){
            cpf = usuario[0].cpf;
        }

        if(!validarCpf(cpf)){
            return res.status(400).json({
                erro: `O CPF está inválido. `
            });
        }

        if(!email){
            email = usuario[0].email;
        }

        if(!(email.includes(`@`)) || !(email.includes(`.com`))){
            return res.status(400).json({
                erro: `Email inválido.`
            });
        }

        if(!telefone){
            telefone = usuario[0].telefone;
        }

        if(!(/^\d+$/.test(telefone))){
            return res.status(400).json({
                erro: `Telefone deve conter apenas números`
            });
        }

        if(!data_nascimento){
            data_nascimento = usuario[0].data_nascimento;
        }

        if(data_nascimento && !validadorData(data_nascimento, responseType="boolean")){
            return res.status(400).json({
                erro: `Data de Nascimento aceita somente no padrão DD/MM/AAAA`
            });
        }

        const usuariosEditado = await usuariosModel.editar(id, nome, cpf, email, telefone, data_nascimento);

        res.status(200).json({
            message: `Usuario Editado com sucesso`,
            usuario: usuariosEditado
        });

    }catch(err){
        res.status(500).json({
            erro: `Não foi possível Editar usuario. Erro interno do Servidor`
        });
        console.log(err);

    }
}

const deletarUsuario = async (req, res) =>{
    try{
        const id = req.params.id;
        const usuario = await usuariosModel.selecionarPorId(id);

        if(usuario.length === 0){
            res.status(404).json({
                message: `Nenhum usuario com id ${id} cadastrado na biblioteca`
            });
        }

        await usuariosModel.deletar(id);

        res.status(200).json({
            message: `Usuario ${id} excluído com sucesso`
        });

    }catch(err){
        res.status(500).json({
            erro: `Não foi possível Deletar usuario. Erro interno do Servidor`
        });
    }
}

module.exports = {
    listarUsuarios,
    listarUsuariosPorId,
    cadastrarUsuario,
    editarUsuario,
    deletarUsuario
}