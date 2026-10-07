`use strict`;

const db = require(`../config/db`);

const selecionarTodos = async() =>{
    const [resultado] = await db.query(
        "SELECT * FROM autores"
    );

    return resultado;
}

const selecionarPorId = async(id) =>{
    const [resultado] = await db.query(
        "SELECT * FROM autores WHERE id = ?",
        [id]    
    );

    return resultado;
}

const criar = async (nome, nacionalidade, data_nascimento) => {
    const [resultado] = await db.query(
        "INSERT INTO autores (nome_completo, nacionalidade, data_nascimento) VALUES (?, ?, ?)",
        [nome, nacionalidade, data_nascimento]
    );

    return {
        id: resultado.insertId,
        nome, 
        nacionalidade,
        data_nascimento
    };
}

const editar = async(id, nome, nacionalidade, data_nascimento) => {
    const [resultado] = await db.query(
        "UPDATE autores SET nome_completo=?, nacionalidade=?, data_nascimento=? WHERE id = ?",
        [nome, nacionalidade, data_nascimento, id]
    );

    return {
        id,
        nome,
        nacionalidade,
        data_nascimento
    };
}

const deletar = async(id) => {
    const [resultado] = await db.query(
        "DELETE FROM autores WHERE id = ?",
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