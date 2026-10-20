`use strict`;

const db = require(`../config/db`);

const selecionarTodos = async() => {
    const [resultado] = await db.query(
        "SELECT * FROM usuarios"
    );

    return resultado;
}

const selecionarPorId = async(id) => {
    const [resultado] = await db.query(
        "SELECT * FROM usuarios WHERE id = ?",
        [id]
    );

    return resultado;
}

const criar = async(nome, cpf, email, telefone, data_nascimento, senha) => {
    const [resultado] = await db.query(
        "INSERT INTO usuarios (nome_completo, cpf, email, telefone, data_nascimento, senha) VALUES (?, ?, ?, ?, ?, ?)",
        [nome, cpf, email, telefone, data_nascimento, senha]
    );

    return {
        id: resultado.insertId,
        nome,
        cpf,
        email,
        telefone,
        data_nascimento ,
        senha
    }
}

const editar = async(id, nome, cpf, email, telefone, data_nascimento, senha) => {
    const [resultado] = await db.query(
        "UPDATE usuarios SET nome_completo=?, cpf=?, email=?, telefone=?, data_nascimento=?, senha=? WHERE id = ?",
        [nome, cpf, email, telefone, data_nascimento, senha, id]
    );

    return {
        id,
        nome,
        cpf,
        email,
        telefone,
        data_nascimento,
        senha
    }
}

const deletar = async(id) => {
    const [resultado] = await db.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id]
    );

    return resultado.affectedRows;
}

module.exports = {
    selecionarTodos,
    selecionarPorId,
    criar,
    editar,
    deletar
}