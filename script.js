const inputText = document.querySelector('.input') 
const addBtn = document.querySelector('.add')
const activeList = document.querySelector('.active-list')
const completedList = document.querySelector('.completed-list')





const tasksActiveList = []

function addToActiveList (taskValue) {
  const activeDiv = document.createElement('div')
  const newTask = document.createElement('input')
  const span = document.createElement('span')
  
  activeDiv.classList.add('task-cont')
  newTask.setAttribute('type', 'checkbox')
  span.classList.add('task')
  span.innerHTML = taskValue

  activeDiv.appendChild(newTask)
  activeDiv.appendChild(span)
  activeList.appendChild(activeDiv)
}


inputText.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    if(e.target.value === '') return
    addToActiveList(e.target.value)
    inputText.value = ''
  }

})

addBtn.addEventListener('click', () => {
  if(inputText.value === '') return
  addToActiveList(inputText.value)
  inputText.value = ''
})

activeList.addEventListener('click', (e) => {
  const checkboxes = document.querySelectorAll("input[type=checkbox]")
  checkboxes.forEach(checkbox => {
    if(checkbox.contains(e.target)) {
      if(checkbox.checked) {
        const taskContainer = checkbox.parentNode
        completedList.appendChild(taskContainer)
      }
    }
  })
})

completedList.addEventListener('click', (e) => {
  const checkboxes = document.querySelectorAll("input[type=checkbox]")
  checkboxes.forEach(checkbox => {
    if(checkbox.contains(e.target)) {
      if(!checkbox.checked) {
        const taskContainer = checkbox.parentNode
        activeList.appendChild(taskContainer)
      }
    }
  })
})