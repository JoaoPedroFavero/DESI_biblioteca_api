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

const criar = async(nome, cpf, email, telefone, data_nascimento) => {
    const [resultado] = await db.query(
        "INSERT INTO usuarios (nome_completo, cpf, email, telefone, data_nascimento) VALUES (?, ?, ?, ?, ?)",
        [nome, cpf, email, telefone, data_nascimento]
    );

    return {
        id: resultado.insertId,
        nome,
        cpf,
        email,
        telefone,
        data_nascimento 
    }
}

const editar = async(id, nome, cpf, email, telefone, data_nascimento) => {
    const [resultado] = await db.query(
        "UPDATE usuarios SET nome_completo=?, cpf=?, email=?, telefone=?, data_nascimento=? WHERE id = ?",
        [nome, cpf, email, telefone, data_nascimento, id]
    );

    return {
        id,
        nome,
        cpf,
        email,
        telefone,
        data_nascimento
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