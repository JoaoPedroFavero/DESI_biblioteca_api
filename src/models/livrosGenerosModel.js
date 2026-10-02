`use strict`;

const db = require(`../config/db`);

const selecionarTodos = async() => {
    const [resultado] = await db.query(
        "SELECT * FROM livros_generos"
    );

    return resultado;
}

const selecionarPorIdLivro = async(id) => {
    const [resultado] = await db.query(
        "SELECT * FROM livros_generos WHERE livro_id = ?",
        [id]   
    );

    return resultado;
}

const selecionarPorIdGenero = async(id) => {
    const [resultado] = await db.query(
        "SELECT * FROM livros_generos WHERE genero_id = ?",
        [id]   
    );

    return resultado;
}

const criar = async(livro_id, genero_id) => {
    const [resultado] = await db.query(
        "INSERT INTO livros_generos (livro_id, genero_id) VALUES (?, ?)",
         [livro_id, genero_id]
    );

    return {
        livro_id,
        genero_id
    }
}


module.exports = {
    selecionarTodos,
    selecionarPorIdGenero,
    selecionarPorIdLivro,
    criar
}