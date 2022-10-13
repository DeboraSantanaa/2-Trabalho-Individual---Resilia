var select = document.getElementById('selecione')


//criar evento no campo de seleção entre cesar e base64
select.addEventListener('click', function () {
  if (select.value == 'cesar') {
    passo.style.display = 'flex'
  } else {
    passo.style.display = 'none'
  }
})



function criptografia() {
  var text = document.getElementById('texto')//texto no campo inserir texto
  var selecionar = document.getElementById('selecione')//tipo de criptografia
  if (selecionar.value === 'cesar') {
    cesar(text.value)
  } else {
    base64(text)
  }
}
//cesar
function cesar(text) {
  var steps = parseInt(document.getElementById('passos').value)
  var escolher = document.querySelector('input[name="escolher"]:checked').value   //faz a verificaçao para saber se é encode ou decode
  if (escolher === 'decodificar') {
    steps = steps * -1
  }
  var alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('') 
  //linha 34 : transformando alfabeto em array
  var textoOriginal = text.split('') //recebendo o texto, variavel que foi passada como parametro e tranformando em aray
  var textoCriptografado = ''
  for (var i = 0; i < textoOriginal.length; i++) {
    var posicaoNoAlfabeto = alfabeto.indexOf(textoOriginal[i])
    // if para caso ultrapasse o alfabeto
    if (posicaoNoAlfabeto + steps > alfabeto.length) {
      // caso transborde para maior do que o tamanho
      var somaSteps = posicaoNoAlfabeto + steps
      var diferenca = somaSteps - alfabeto.length
      posicaoNoAlfabeto = diferenca
    } else if (posicaoNoAlfabeto + steps < 0) {
      // caso transborde para menor do que o tamanho (negativo)
      var somaSteps = posicaoNoAlfabeto + steps
      var diferenca = alfabeto.length - somaSteps
      posicaoNoAlfabeto = alfabeto.length + diferenca - 1
      console.log({ posicaoNoAlfabeto, diferenca, somaSteps })
    } else {
      posicaoNoAlfabeto += steps
    }
    console.log(alfabeto[posicaoNoAlfabeto])
    //espaço nas palavras
    if (textoOriginal[i] === ' ') {
      textoCriptografado += ' '
    } else {
      textoCriptografado += alfabeto[posicaoNoAlfabeto]
    }

    // += incrementa no que já existe
  }
  document.getElementById('resultado').value = textoCriptografado
}

//base 64
function base64(text) {
  var escolher = document.querySelector('input[name="escolher"]:checked').value
  if (escolher === 'codificar') {
    document.getElementById('resultado').value = btoa(text.value)
  } else if (escolher === 'decodificar') {
    document.getElementById('resultado').value = atob(text.value)
  } else {
    alert('selecione codificar ou decodificar')
  }
}