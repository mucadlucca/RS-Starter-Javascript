// Exercicio 1
//Crie uma função que recebe a idade de um usuário e retorna uma Promise que depois de 2
//segundos retornará se usuário é maior ou não que 18 anos. Se o usuário ter mais que 18 anos de
//idade o resultado deve cair no .then, caso contrário, no .catch

function checaIdade(idade) {
  return new Promise(function(resolve, reject) {   
    // var maiorIdade = function() {
    //   if ( idade > 18) {       
    //       resolve('Maior que 18');
    //     } else {
    //       reject('Menor que 18')
    //     }
    //   }
    // setTimeout(maiorIdade, 2000);
    
    setTimeout(function() {
      return idade > 18 ? resolve() : reject();
    }, 2000)
  });
 }

 checaIdade(20)
  .then(function(response) {
    console.log('Maior que 18');
  // console.log(response);
  })
  .catch(function(error) {
    console.log('Menor que 18')
  // console.log(error);
  });
//===========================================================================

// Exercicio 2
//Crie uma tela com um <input> que deve receber o nome de um usuário no Github. Após digitar o
//nome do usuário e clicar no botão buscar a aplicação deve buscar pela API do Github (conforme
//URL abaixo) os dados de repositórios do usuário e mostrá-los em tela:
//URL de exemplo: https://api.github.com/users/diego3g/repos
//Basta alterar "diego3g" pelo nome do usuário.

var container = document.querySelector('#container');
var inputElement = document.querySelector('input');
var btnElement = document.querySelector('button');

btnElement.onclick = function() {   
  renderListElement();
  var githubUser = inputElement.value; 

  if (!githubUser) {
    alert('Digite um usuário do github');
    return
  }  

  renderLoading();

  axios.get(`https://api.github.com/users/${githubUser}/repos`)
  .then(function(response) {    
    renderRepositories(response.data);    
  })
  .catch(function(error) {    
    renderError();
  }) 
}

function renderListElement() {
  var listElement = document.querySelector('#container ul');

  if (!listElement) {
    var listElement = document.createElement('ul');
    container.appendChild(listElement);
  } else {
    listElement.innerHTML = '';
  }
}

function renderRepositories(repos) {
  var listElement = document.querySelector('#container ul');
  listElement.innerHTML = '';  

  for (repo of repos) {      
    var repoElement = document.createElement('li');
    var repoName = document.createTextNode(repo.name);

    repoElement.appendChild(repoName);
    repoElement.classList.add('repositorios');
    listElement.appendChild(repoElement);
  } 
}

//=====================================================================

// Exercicio 3
//A partir do resultado do exemplo anterior adicione um indicador de carregamento em tela no lugar
//da lista apenas enquanto a requisição estiver acontecendo:
//<li>Carregando...</li>
//Além disso, adicione uma mensagem de erro em tela caso o usuário no Github não exista.
//Dica: Quando o usuário não existe, a requisição irá cair no .catch com código de erro 404

function renderLoading() {  
  var listElement = document.querySelector('#container ul');
  listElement.innerHTML = '';

  var txtLoading = document.createTextNode('Carregando...');
  var loadingElement = document.createElement('li'); 
  
  loadingElement.appendChild(txtLoading);
  loadingElement.classList.add('loading'); 
  listElement.appendChild(loadingElement); 
}

function renderError() { 
  var listElement = document.querySelector('#container ul');
  listElement.innerHTML = '';

  var txtError = document.createTextNode('Erro! Usuário não encontrado');
  var errorElement = document.createElement('li'); 

  errorElement.style.color = '#F00';
  
  errorElement.appendChild(txtError);
  errorElement.classList.add('error');
  listElement.appendChild(errorElement);
}
 