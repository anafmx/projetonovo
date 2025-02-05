const { randomUUID } = require("crypto") //Importa a função randomUUID do módulo crypto, que é usado para gerar identificadores únicos universais (UUIDs).
const cors = require ("cors")
const express = require("express") //Importa o módulo express do Node.js, usado para criar servidores web.
const Banco = require('./banco') //Importa o módulo Banco do arquivo banco.js.
const app = express()//Instancia um objeto express e armazena-o na variável app.

app.use(cors())
app.use(express.json())//Adiciona um middleware para que o servidor possa interpretar requisições com corpo no formato JSON.
const banco = new Banco ()//Cria uma instância do objeto Banco e armazena em uma variável chamada banco
alunos = []//Inicializa um array vazio que armazenará objetos de alunos.

app.get("/alunos", async  (request, response) => { //Cria uma rota GET para a URL /alunos, que retorna todos os alunos cadastrados.
    //const { uuid } = request.query//Extrai o UUID da query string da requisição.

    //console.log(uuid)//Imprime o UUID extraído da query string.

    //if (uuid) {//Verifica se o UUID foi fornecido.
      //  const pos = alunos.findIndex(aluno => aluno.uuid == uuid)//Procura o aluno com o UUID fornecido no array de alunos.
        //if (pos >= 0)//Verifica se o aluno foi encontrado.
          //  return response.json(alunos[pos])//Se o aluno foi encontrado, retorna o aluno encontrado como resposta em formato JSON.
    //}

    const lista = await banco.listar()//Chama o método listar() do objeto banco para obter uma lista de todos os alunos cadastrados

    //console.log (lista)

    return response.json(lista)//Retorna a lista de alunos como resposta em formato JSON.
})

app.post("/alunos", (request, response) => {//Cria uma rota POST para a URL /alunos, que recebe um objeto de aluno como cor
    const { nome, email } = request.body//Extrai os campos nome e email do corpo da requisição.
    const uuid = randomUUID();//Gera um UUID aleatório para o aluno.
    const aluno = {//Cria um objeto de aluno com os campos nome, email e UUID.
        uuid,//Atribui o UUID gerado ao objeto de aluno.
        nome,//Atribui o nome fornecido ao objeto de aluno.
        email//Atribui o email fornecido ao objeto de aluno.
    }
    banco.inserir(aluno) //Chama o método inserir() do objeto banco para inserir o aluno no banco de dados.
    //alunos.push(aluno)//Adiciona o objeto de aluno ao array de alunos.
    return response.json(aluno)//Retorna o objeto de aluno como resposta em formato JSON.
})
app.delete("/alunos/:id", async (request, response) => {//Cria uma rota DELETE para a URL /alunos/:id, que recebe um ID de aluno
    const {id} = request.params//Extrai o ID do parâmetro :id da requisição.
    console.log(id)//Imprime o ID extraído do parâmetro :id.

    const pos = await banco.buscar(id) //Chama o método buscar() do objeto banco para buscar o aluno com o ID fornecido.
    console.log(pos) //Imprime o aluno encontrado.
    if(pos <= 0) //Verifica se o aluno foi encontrado.
        return response.status(400).json({ message: "Aluno não encontrado!" })//Se o aluno não foi encontrado, retorna uma mensagem de erro como resposta em formato JSON.

    await banco.remover(id)//Chama o método remover() do objeto banco para remover o aluno do banco de dados.
    return response.json({message:"Removido!"})//Retorna uma mensagem de sucesso como resposta em formato JSON.
})
app.put("/alunos/:id", async (request, response) => {//Cria uma rota PUT para a URL /alunos/:id, que recebe um ID de aluno
    const { id } = request.params//Extrai o ID do parâmetro :id da requisição.
    const { nome, email } = request.body//Extrai os campos nome e email do corpo da requisição.

    const pos = await banco.buscar(id)//Chama o método buscar() do objeto banco para buscar o aluno com o ID fornecido.
    console.log(pos)//Imprime o aluno encontrado.
    if(pos <= 0)//Verifica se o aluno foi encontrado.
        return response.status(400).json({ message: "Aluno não encontrado!" })//Se o aluno não foi encontrado, retorna uma mensagem de erro como resposta em formato JSON.

    const aluno = {//Cria um objeto de aluno com os campos nome, email e ID.
    id,//Atribui o ID fornecido ao objeto de aluno.
    nome,//Atribui o nome fornecido ao objeto de aluno.
    email//Atribui o email fornecido ao objeto de aluno.
    }

    banco.atualizar(aluno)//Chama o método atualizar() do objeto banco para atualizar o aluno no banco de dados.
    return response.json({message: "Atualizado!"})//Retorna uma mensagem de sucesso como resposta em formato JSON.
})
app.listen(4444, () => {//Inicia o servidor na porta 4444.
    console.log("Servidor foi Inicializado!")//Imprime uma mensagem de inicialização do servidor.
})