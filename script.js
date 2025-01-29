import ApiConnection from "./api.js";

const api = new ApiConnection()

const button = document.querySelector("#btn-entrada")

button.addEventListener('click', async ()=>{
    const inputNome = document.querySelector("#input-nome")
    const inputEmail = document.querySelector("#input-email")

    const email = inputEmail.value
    const nome = inputNome.value

    if(nome !="" && email != ""){
    const aluno = {
    nome,
    email
}
  await api.cadastrarAluno(aluno)

inputNome.value= ""
inputEmail.value= ""

await carregarPagina()
}else{
    alert("Digite o Nome e o Email para cadastrar!")
}
})
function limparTabela(){
    const tbody = document.querySelector("tbody")

    //console.log(tbody)
    
    //tbody.innerHTML = ""

    const trs = tbody.querySelectorAll("tr")

    trs.forEach(tr => tr.remove())

    //console.log(trs)
}


async function carregarPagina(){
    limparTabela()

    const dados = await api.listarAlunos()
    console.log(dados)

    //dados.then(dados => console.log(dados))

    dados.forEach(aluno => {
        console.log(aluno.nome + " " + aluno.email)
        /*
        <tr>
        <td>João</td>
        <td>joao@email.com</td>
        <td><button>Remover</button></td>
    </tr>
    */

    const tr = document.createElement("tr")

    const nome = document.createElement("td")
    nome.innerText = aluno.nome

    const email = document.createElement("td")
    email.innerText = aluno.email

    const btn = document.createElement("td")
    btn.appendChild(criarButton(aluno.id))

    tr.appendChild(nome)
    tr.appendChild(email)
    tr.appendChild(btn)

    const tbody = document.querySelector("tbody")

    tbody.appendChild(tr)
    })
}



 function criarButton(id){
    const btn = document.createElement("button")

    btn.innerText = "Remover"

    btn.addEventListener('click', async ()=>{
        console.log(id)
        await api.removerAluno(id)
        await carregarPagina()
    })
    return btn;
}


carregarPagina()