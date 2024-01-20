const inputText = document.querySelector('.input') 
const addBtn = document.querySelector('.add')
const taskList = document.querySelector('.task-list')
const activeList = document.querySelector('.active-list')
const completedList = document.querySelector('.completed-list')

function addToActiveList (taskValue) {
  const taskCont = document.createElement('div')
  const taskCheckbox = document.createElement('input')
  const task = document.createElement('span')
  const deleteBtnCont = document.createElement('div')
  // const deleteBtn = document.createElement('button')


  taskCont.classList.add('task-cont', 'flex')
  taskCheckbox.setAttribute('type', 'checkbox')
  taskCheckbox.classList.add('checkbox')
  task.innerHTML = taskValue
  deleteBtnCont.classList.add('delete-containter')
  deleteBtnCont.innerText = '🗑️'

  taskCont.appendChild(taskCheckbox)
  taskCont.appendChild(task)
  taskCont.appendChild(deleteBtnCont)
  activeList.appendChild(taskCont)
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

taskList.addEventListener('click', (e) => {
  const checkboxes = document.querySelectorAll("input[type=checkbox]")
  checkboxes.forEach(checkbox => {
    if(checkbox.contains(e.target)) {
      const taskContainer = checkbox.parentNode

      if(checkbox.checked) {
        completedList.appendChild(taskContainer)
      }else {
        activeList.appendChild(taskContainer)
      }
    }
  })
})

