const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sIdade = document.querySelector('#m-idade')
const sMedico = document.querySelector('#m-medico')
const sSala = document.querySelector('#m-sala')
const sSituacao = document.querySelector('#m-situacao')
const btnSalvar = document.querySelector('#btnSalvar')
const btnFecharModal = document.querySelector('#btnFechar');
const btnClearAll = document.querySelector('#btnClearAll');

let itens
let id

document.addEventListener('DOMContentLoaded', function() {
  const tbody = document.getElementById('pacientesTableBody');

  // Função para carregar e exibir os pacientes
  function showPatients() {
    // Obtém os pacientes armazenados localmente
    const pacientes = getItensBD();

    // Limpa a tabela
    tbody.innerHTML = '';

    // Itera sobre os pacientes e os insere na tabela
    pacientes.forEach(function(paciente) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${paciente.nome}</td>
        <td>${paciente.idade}</td>
        <td>${paciente.medico}</td>
        <td>${paciente.situacao}</td>
        <td>${paciente.sala}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Função auxiliar para obter os pacientes armazenados localmente
  function getItensBD() {
    return JSON.parse(localStorage.getItem('dbfunc')) || [];
  }

  // Chama a função para exibir os pacientes quando a página é carregada
  showPatients();
});

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  sNome.addEventListener('input', function() {
    if (this.value.length > 4) {
      this.value = this.value.substring(0, 4);
    }
    this.value = this.value.toUpperCase();
  });

  sIdade.addEventListener('input', function(){
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 2){
      this.value = this.value.substring(0, 2);
    }
  }) 

  if (edit) {
    sNome.value = itens[index].nome
    sIdade.value = itens[index].idade
    sMedico.value = itens[index].medico
    sSituacao.value = itens[index].situacao
    sSala.value = itens[index].sala
    id = index
  } else {
    sNome.value = ''
    sIdade.value = ''
    sMedico.value = ''
    sSituacao.value = ''
    sSala.value = ''
  }

  btnFecharModal.addEventListener('click', function() {
    modal.classList.remove('active');
});
  
}

function editItem(index) {

  openModal(true, index)

}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.idade}</td>
    <td>${item.medico}</td>
    <td>${item.situacao}</td>
    <td>${item.sala}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class="fa-solid fa-pen-to-square" style="color: #292929; font-size: 18px; cursor: pointer;"></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class="fa-solid fa-trash" style="color: #292929; font-size: 18px; cursor: pointer;"></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sIdade.value == '' || sMedico.value == '' || sSituacao.value == '' || sSala.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].idade = sIdade.value
    itens[id].medico = sMedico.value
    itens[id].situacao = sSituacao.value
    itens[id].sala = sSala.value
  } else {
    itens.push({'nome': sNome.value, 'idade': sIdade.value, 'medico': sMedico.value, 'situacao': sSituacao.value, 'sala': sSala.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

btnClearAll.addEventListener('click', function() {
  itens = [];
  setItensBD();
  loadItens();
});
