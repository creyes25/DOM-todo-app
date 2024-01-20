const inputText = document.querySelector('.input') 
const addBtn = document.querySelector('.add')
const activeList = document.querySelector('.active-list')
const completedList = document.querySelector('.completed-list')

const tasksActiveList = []

function addToActiveList (taskValue) {
  const activeDiv = document.createElement('div')
  const newTask = document.createElement('input')
  const span = document.createElement('span')
  
  newTask.setAttribute('type', 'checkbox')
  span.innerHTML = taskValue

  activeDiv.appendChild(newTask)
  activeDiv.appendChild(span)
  activeList.appendChild(activeDiv)
}


inputText.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    addToActiveList(e.target.value)
    inputText.value = ''
  }
})

addBtn.addEventListener('click', () => {
  addToActiveList(inputText.value)
  inputText.value = ''

})
