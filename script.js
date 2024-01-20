const inputText = document.querySelector('.input') 
const addBtn = document.querySelector('.add')
const taskList = document.querySelector('.task-list')
const activeList = document.querySelector('.active-list')
const completedList = document.querySelector('.completed-list')
const reset = document.querySelector('.reset')

function addToActiveList (taskValue) {
  const taskCont = document.createElement('div')
  const taskCheckbox = document.createElement('input')
  const task = document.createElement('span')
  const deleteBtn = document.createElement('div')

  taskCont.classList.add('task-cont', 'flex')
  taskCheckbox.setAttribute('type', 'checkbox')
  taskCheckbox.classList.add('checkbox')
  task.innerHTML = taskValue
  deleteBtn.classList.add('delete-btn')
  deleteBtn.innerText = '🗑️'

  taskCont.appendChild(taskCheckbox)
  taskCont.appendChild(task)
  taskCont.appendChild(deleteBtn)
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
  const deleteBtns = document.querySelectorAll('.delete-btn')

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

  deleteBtns.forEach(delBtn => {
    if(delBtn.contains(e.target)) {
      const taskContainer = delBtn.parentNode
      taskContainer.remove()
    }
  })

})


reset.addEventListener('click', () => {
  const activeTitle = activeList.firstElementChild
  const completedTitle = completedList.firstElementChild
  activeList.innerText = ''
  completedList.innerHTML = ''
  activeList.appendChild(activeTitle)
  completedList.appendChild(completedTitle)
})
