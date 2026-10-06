`use strict`;

const db = require(`../config/db`);

const selecionarTodos = async() => {
    const [resultado] = await db.query(
        "SELECT * FROM emprestimos"
    );

    return resultado;
}

const selecionarPorId = async(id) => {
    const [resultado] = await db.query(
        "SELECT * FROM emprestimos WHERE id = ?",
        [id]
    );

    return resultado;
}

const criar = async(data_emprestimo, data_devolucao, livro_id, usuario_id) => {
    const [resultado] = await db.query(
        "INSERT INTO emprestimos (data_emprestimo, data_devolucao, livro_id, usuario_id) VALUES (?, ?, ?, ?)",
        [data_emprestimo, data_devolucao, livro_id, usuario_id]
    );

    return {
        id: resultado.insertId,
        data_emprestimo,
        data_devolucao,
        livro_id,
        usuario_id
    }
}

const editar = async(id, data_emprestimo, data_devolucao, livro_id, usuario_id) => {
    const [resultado] = await db.query(
        "UPDATE emprestimos SET data_emprestimo=?, data_devolucao=?, livro_id=?, usuario_id=? WHERE id = ?",
        [data_emprestimo, data_devolucao, livro_id, usuario_id, id]
    );

    return {
        id,
        data_emprestimo,
        data_devolucao,
        livro_id,
        usuario_id
    }
}

const deletar = async(id) => {
    const [resultado] = await db.query(
        "DELETE FROM emprestimos WHERE id = ?",
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