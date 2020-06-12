// Exercicio 1
//Crie uma função que recebe a idade de um usuário e retorna uma Promise que depois de 2
//segundos retornará se usuário é maior ou não que 18 anos. Se o usuário ter mais que 18 anos de
//idade o resultado deve cair no .then, caso contrário, no .catch

function checaIdade(idade) {
  return new Promise(function(resolve, reject) {   
    var maiorIdade = function() {
      if ( idade > 18) {       
          resolve('Maior que 18');
        } else {
          reject('Menor que 18')
        }
      }
    setTimeout(maiorIdade, 2000);
  });
 }

 checaIdade(20)
  .then(function(response) {
  console.log(response);
  })
  .catch(function(error) {
  console.log(error);
  });
//===========================================================================

// Exercicio 2
//Crie uma tela com um <input> que deve receber o nome de um usuário no Github. Após digitar o
//nome do usuário e clicar no botão buscar a aplicação deve buscar pela API do Github (conforme
//URL abaixo) os dados de repositórios do usuário e mostrá-los em tela:
//URL de exemplo: https://api.github.com/users/diego3g/repos
//Basta alterar "diego3g" pelo nome do usuário.

var container = document.querySelector('#container')
var inputElement = document.querySelector('input')
var btnElement = document.querySelector('button')

btnElement.onclick = function() { 
  var listElement = document.querySelector('#container ul')

  if (!listElement) {
    var listElement = document.createElement('ul')
  } else {
    listElement.innerHTML = '';
  }
     
  var githubUser = inputElement.value  

  if (!githubUser) {
    alert('Digite um usuário do github')
    return
  }

  var txtLoading = document.createTextNode('Carregando...') // Exercicio 3
  var loadingElement = document.createElement('li')  // Exercicio 3
  
  loadingElement.appendChild(txtLoading)  // Exercicio 3
  listElement.appendChild(loadingElement)  // Exercicio 3

  axios.get(`https://api.github.com/users/${githubUser}/repos`)
  .then(function(response) {
    var repos = response.data 

    listElement.innerHTML = '';

    container.appendChild(listElement)

    for (repo of repos) {      
      var repoElement = document.createElement('li')
      var repoName = document.createTextNode(repo.name)

      repoElement.appendChild(repoName)
      listElement.appendChild(repoElement)
    }
  })
  .catch(function(error) {
    listElement.innerHTML = ''; // Exercicio 3
    alert('Erro: usuário não encontrado')  // Exercicio 3  
  })
}
//=====================================================================

// Exercicio 3
//A partir do resultado do exemplo anterior adicione um indicador de carregamento em tela no lugar
//da lista apenas enquanto a requisição estiver acontecendo:
//<li>Carregando...</li>
//Além disso, adicione uma mensagem de erro em tela caso o usuário no Github não exista.
//Dica: Quando o usuário não existe, a requisição irá cair no .catch com código de erro 404



 