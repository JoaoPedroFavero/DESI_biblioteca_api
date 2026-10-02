`use strict`;

const db = require(`../config/db`);

const selecionarTodos = async() => {
    const [resultado] = await db.query(
        "SELECT * FROM generos"
    );

    return resultado;
}

const selecionarPorId = async(id) => {
    const [resultado] = await db.query(
        "SELECT * FROM generos WHERE id = ?",
        [id]
    );

    return resultado;
}

const criar = async(nome) => {
    const [resultado] = await db.query(
        "INSERT INTO generos (nome) VALUES (?)",
        [nome]
    );

    return {
        id: resultado.insertId,
        nome
    }
}

const editar = async(id, nome) => {
    const [resultado] = await db.query(
        "UPDATE generos SET nome=? WHERE id = ?",
        [nome, id]
    );

    return {
        id: resultado.insertId,
        nome
    }
}

const deletar = async(id) => {
    const [resultado] = await db.query(
        "DELETE FROM generos WHERE id = ?",
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