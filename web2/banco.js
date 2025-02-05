const sqlite = require('sqlite') //Importa o módulo sqlite do Node.js, usado para criar e manipular bancos de dados SQLite.
const sqlite3 = require('sqlite3') //Importa o módulo sqlite3 do Node.js, usado para criar e manipular bancos de dados SQLite

class Banco{//Cria uma classe chamada Banco.

    constructor(){//Inicializa o construtor da classe Banco.
        this.criarTabela()//Chama o método criarTabela() para criar a tabela no banco de dados.
    }
        async sqlConnection(){ //Cria uma função assíncrona chamada sqlConnection que retorna uma conexão com o banco

            const banco = await sqlite.open({ //Abre uma conexão com o banco de dados usando o módulo sqlite.open()
                filename: 'database.db', //Define o nome do arquivo de banco de dados
                driver: sqlite3.Database //Define o driver do banco de dados como sqlite3.Database
        })
        return banco; //Retorna a conexão com o banco de dados
        }
    async criarTabela(){ //Cria uma função assíncrona chamada criarTabela que cria a tabela no banco de dados.

        const banco = await this.sqlConnection(); //Chama a função sqlConnection para obter uma conexão com o banco de dados.

        const tabela = `CREATE TABLE IF NOT EXISTS alunos (
                       id integer primary key autoincrement,
                       uuid varchar(100),
                       nome varchar(100),
                       email varchar(100)
                       );`;//Cria a tabela alunos no banco de dados se ela não existir.
        await banco.exec(tabela)//Executa a tabela no banco de dados usando o método exec().
    }

    async inserir(aluno){//Cria uma função assíncrona chamada inserir que insere um aluno no banco

        const {uuid, nome, email} = aluno;//Extrai os campos uuid, nome e email do objeto aluno.

        const banco = await this.sqlConnection();//Chama a função sqlConnection para obter uma conexão com o banco de dados.

        await banco.run("INSERT INTO alunos(uuid, nome, email) values(?, ?, ?)", uuid, nome, email)//Insere um novo aluno no banco de dados usando o método run().

    }
    async remover (id){//Cria uma função assíncrona chamada remover que remove um aluno do banco de dados.

        const banco = await this.sqlConnection();//Chama a função sqlConnection para obter uma conexão com o banco de dados.

        await banco.run("DELETE FROM alunos WHERE id =?", id)//Remove um aluno do banco de dados usando o método run().
        //DELETE FROM alunos WHERE id = 1;
    }
    async atualizar(aluno){//Cria uma função assíncrona chamada atualizar que atualiza um aluno no banco

        const {nome, email, id} = aluno//Extrai os campos nome, email e id do objeto aluno.

        const banco = await this.sqlConnection();//Chama a função sqlConnection para obter uma conexão com o banco de dados.

        await banco.run("UPDATE alunos SET nome=?, email=? WHERE id =?", nome, email, id)//Atualiza um aluno no banco de dados usando o método run().

        //UPDATE alunos SET nome=miguel, email='miguel@email.com' WHERE id =3
    }
    async listar(){//Cria uma função assíncrona chamada listar que lista todos os alunos do banco
        const banco = await this.sqlConnection();//Chama a função sqlConnection para obter uma conexão com o banco de dados.

        const result = await banco.all("SELECT * FROM alunos")//Lista todos os alunos do banco de dados usando o método all().

        //console.log (result)

        return result //Retorna a lista de alunos como resposta em formato JSON.
    }
    async buscar(id){ //Cria uma função assíncrona chamada buscar que busca um aluno pelo ID
        const banco = await this.sqlConnection(); //Chama a função sqlConnection para obter uma conexão com o banco de dados.
        const result = await banco.all("SELECT id FROM alunos WHERE id = ?", id)//Busca um aluno pelo ID no banco de dados usando o método all().

        return result; //Retorna o aluno encontrado como resposta em formato JSON.
    }
}
    module.exports = Banco; //Exporta a classe Banco para ser usada em outros arquivos do Node.js.