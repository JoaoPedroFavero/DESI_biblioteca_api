`use strict`;

const db = require(`../config/db`);

const selecionarTodos = async() => {
    const [resultado] = await db.query(
        "SELECT * FROM autores_livros"
    );

    return resultado;
}

const selecionarPorIdAutor = async(id) => {
    const [resultado] = await db.query(
        "SELECT * FROM autores_livros WHERE autor_id = ?",
        [id]   
    );

    return resultado;
}

const selecionarPorIdLivro = async(id) => {
    const [resultado] = await db.query(
        "SELECT * FROM autores_livros WHERE livro_id = ?",
        [id]   
    );

    return resultado;
}

const criar = async(autor_id, livro_id) => {
    const [resultado] = await db.query(
        "INSERT INTO autores_livros (autor_id, livro_id) VALUES (?, ?)",
         [autor_id, livro_id]
    );

    return {
        autor_id,
        livro_id
    }
}


module.exports = {
    selecionarTodos,
    selecionarPorIdAutor,
    selecionarPorIdLivro,
    criar
}