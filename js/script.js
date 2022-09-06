import { Modal } from './modal.js'
import { AlertError } from "./alert-error.js"
import { calculateIMC, notANumber } from "./utils.js"

const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')

inputWeight.oninput = () => AlertError.close()
inputHeight.oninput = () => AlertError.close()
form.onsubmit = event => {
  event.preventDefault()
  
  const weight = inputWeight.value.replace(",", ".")
  const height = inputHeight.value.replace(",", ".")

  const weighOrHeightIsNotANumber = notANumber(weight) || notANumber(height)
  if (weighOrHeightIsNotANumber) {
    AlertError.open()
    return;
  } 

  const result = calculateIMC(weight, height)
  displayResultMessage(result)
}

function lowWeightOrObesity(result) {
  if (result <= 21) {
    return "Baixo peso"
  } else if (result >= 32) {
    return "Obesidade"
  } else {
    return "Peso normal"
  }
}

function displayResultMessage(result) {
  const resultIMC = lowWeightOrObesity(result)

  const message = `Seu IMC é de ${result}
  ${resultIMC}`
  
  Modal.messege.innerText = message
  Modal.open()
}





