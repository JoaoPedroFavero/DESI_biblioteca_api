CREATE DATABASE biblioteca_db;
USE biblioteca_db;

CREATE TABLE autores(
	id INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
	nome_completo VARCHAR(150) NOT NULL, 
	nacionalidade VARCHAR(80) NOT NULL,
	data_nascimento DATE NOT NULL
);

CREATE TABLE livros(
	id INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
	titulo VARCHAR(200) NOT NULL,
	isbn VARCHAR(20) NOT NULL UNIQUE,
	ano_publicacao YEAR NOT NULL,
	numero_paginas INT NOT NULL,
	sinopse TEXT
);

CREATE TABLE autores_livros(
	autor_id INT NOT NULL,
	livro_id INT NOT NULL,
    
    CONSTRAINT fk_autor_livro FOREIGN KEY (autor_id) REFERENCES autores (id) ON DELETE CASCADE,
    CONSTRAINT fk_livro_autor FOREIGN KEY (livro_id) REFERENCES livros (id) ON DELETE CASCADE
);

CREATE TABLE generos(
	id INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
	nome VARCHAR(80) NOT NULL
);

CREATE TABLE livros_generos(
	livro_id INT NOT NULL,
	genero_id INT NOT NULL,
    
    CONSTRAINT fk_livro_genero FOREIGN KEY (livro_id) REFERENCES livros (id) ON DELETE CASCADE,
    CONSTRAINT fk_genero_livro FOREIGN KEY (genero_id) REFERENCES generos (id) ON DELETE CASCADE
);

CREATE TABLE usuarios(
	id INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
	nome_completo VARCHAR(250) NOT NULL,
	cpf VARCHAR(20) UNIQUE NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE,
	telefone VARCHAR(20) NOT NULL,
	data_nascimento DATE NOT NULL
);

CREATE TABLE emprestimos(
	id INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
	data_emprestimo DATE NOT NULL,
	data_devolucao DATE NOT NULL,
	livro_id INT,
	usuario_id INT,
    
    CONSTRAINT fk_livro_emprestimo FOREIGN KEY (livro_id) REFERENCES livros (id) ON DELETE CASCADE,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);
