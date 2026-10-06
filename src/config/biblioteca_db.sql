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

INSERT INTO autores (nome_completo, nacionalidade, data_nascimento) VALUES
('John Ronald Reuel Tolkien', 'Britanico', '1892-01-03'),
('Joanne Rowling', 'Britanica', '1965-07-31'),
('Jules Gabriel Verne', 'Francês', '1868-02-08'),
('Timothy Zahn','Estadunidense','1951-09-01');

INSERT INTO livros (titulo, isbn ,ano_publicacao, numero_paginas, sinopse) VALUES
('O Hobbit (The Hobbit)', '9780618260300','1937','310','Bilbo Bolseiro é um hobbit pacato que é recrutado pelo mago Gandalf e por um grupo de treze anões para uma jornada perigosa. O objetivo é recuperar o reino dos anões e seu tesouro guardado pelo temível dragão Smaug. No caminho, Bilbo encontra uma criatura chamada Gollum e um anel misterioso que mudará o destino da Terra Média.'),
('Harry Potter e a Pedra Filosofal', '9780747532699', '1997', '223', 'Harry Potter é um garoto órfão que vive infeliz com seus tios malvados. No seu aniversário de 11 anos, ele descobre que seus pais eram bruxos e que ele foi convidado a estudar na Escola de Magia e Bruxaria de Hogwarts. Lá, além de aprender feitiços e fazer amigos, Harry descobre que um artefato mágico de valor inestimável — a Pedra Filosofal — está em perigo.'),
('Vinte Mil Léguas Submarinas', '9780140367218', '1901', '497', ''),
('Star Wars: Herdeiro do Império', '9780553404715', '1991', '404', 'Cinco anos após os eventos do filme O Retorno de Jedi, a Nova República tenta se reestruturar. No entanto, nos confins da galáxia, o último dos grandes líderes imperiais — o genial Grande Almirante Thrawn — assume o controle dos restos da frota do Império. Ele cria uma estratégia brilhante que ameaça destruir Luke Skywalker, Leia e a frágil paz galáctica.');

INSERT INTO generos (nome) VALUES
('Ficção Científica'),
('Fantasia');

SELECT * FROM autores;
SELECT * FROM livros;
SELECT * FROM autores_livros;

INSERT INTO autores_livros (autor_id, livro_id) VALUES
('5', '1'),
('6', '2'),
('7', '3'),
('8', '4');

INSERT INTO livros_generos (livro_id, genero_id) VALUES
('1', '2'),
('2', '2'),
('3', '1'),
('4', '1');

INSERT INTO usuarios (nome_completo, cpf, email, telefone, data_nascimento) VALUES
('Bento Gonçalves', '46278101050', 'bento@gmail.com', '47991018202', '1995-04-01'),
('Sung Ji Wong', '69441047090', 'sung@gmail.com', '47999008125', '2001-09-27');

INSERT INTO emprestimos (data_emprestimo, data_devolucao, livro_id, usuario_id) VALUES
('2026-10-01', '2026-11-01', '1', '1'),
('2026-10-05', '2026-10-15', '2', '2');

