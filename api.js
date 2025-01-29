class ApiConnection{

    url = "http://localhost:4444/alunos"

async removerAluno(id){
    const response = await fetch(this.url + "/" + id, {
        method: "DELETE", 
     });
 }

async listarAlunos(){

    const response = await fetch(this.url)

    const dados = response.json()

    console.log(dados)

    return dados

    }

async cadastrarAluno(aluno){

    const response = await fetch(this.url, { //faz conexão com o banco
       method: "POST", 
       body: JSON.stringify(aluno),
       headers: {"Content-Type": "application/json"}
    });
}

}

export default ApiConnection;

//const api = new ApiConnection()

//const aluno = {
   // nome: "alunonovo",
   // email:"alunonovo@gmail.com"
//}
//api.cadastrarAluno(aluno)
//api.removerAluno(5)
//api.listarAlunos()