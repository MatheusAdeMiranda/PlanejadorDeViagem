// bibliotecas e códigos de terceiros
const formatador = (data) => {
  
  return {
    dia: {
      numerico:  dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }
}

// object {}
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true
}

// lista, array, vetor []
let atividades = [
  atividade,
  {
    nome: 'Academia em grupo',
    data: new Date("2024-07-09 12:00"),
    finalizada: false
  },
  {
    nome: 'Gamming session',
    data: new Date("2024-07-09 16:00"),
    finalizada: true
  },
]

// atividades = []

// arrow function
const criarItemDeAtividade = (atividade) => {
  let input = `
  <input
  onchange="concluirAtividade(event)"
  value="${atividade.data}"
  type="checkbox"
  `

  if(atividade.finalizada) {
    input += 'checked'
  }

  input += '>'

  const formatar = formatador(atividade.data)

  return `
  <div class="card-bg">
    ${input}

    <div>
      <svg class="active" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>

      <svg class="inactive" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>


      <span>${atividade.nome}</span>
    </div>

    <time class="short">
      ${formatar.dia.semana.curto}.
      ${formatar.dia.numerico} <br>
      ${formatar.hora}
    </time>

    <time class="full">
    ${formatar.dia.semana.longo},
     dia ${formatar.dia.numerico}
     de ${formatar.mes}
     às ${formatar.hora}h 
     </time>
  </div>
  `
}

const atualizarListaDeAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  // verificar se a minha lista está vazia
  if(atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  for(let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade)
  }

}
atualizarListaDeAtividades()

const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)

  const nome = dadosDoFormulario.get('atividade')
  const dia = dadosDoFormulario.get('dia')
  const hora = dadosDoFormulario.get('hora')
  const data = `${dia} ${hora}` 

  const novaAtividade = {
    nome,
    data,
    finalizada: false
  }

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if(atividadeExiste) {
    return alert('Dia/Hora não disponível')
  }

  atividades = [novaAtividade, ...atividades]
  atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]

  let diasSelecao = ''

  for(let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
    ${formatar.dia.numerico} de
    ${formatar.mes}
    `
    diasSelecao += `
    <option value="${dia}">${dia}</option>
    `
  }


  document
  .querySelector('select[name="dia"]')
  .innerHTML = diasSelecao

}
criarDiasSelecao()

const criarHorasSelecao = () => {
  let horasDisponiveis = ''

  for(let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, '0')
    horasDisponiveis += `
    <option value="${hora}:00">${hora}:00</option>`
    horasDisponiveis += `
    <option value="${hora}:30">${hora}:30</option>`
  } 

  document
  .querySelector('select[name="hora"]')
  .innerHTML = horasDisponiveis
}
criarHorasSelecao()

const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput
  })

  if(!atividade) {
    return
  }

  atividade.finalizada = !atividade.finalizada
}
