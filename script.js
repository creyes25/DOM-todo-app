const inputText = document.querySelector('.input') 
const dueTime = document.querySelector('.time-due')
const addBtn = document.querySelector('.add')
const taskList = document.querySelector('.task-list')
const activeList = document.querySelector('.active-list')
const completedList = document.querySelector('.completed-list')
const reset = document.querySelector('.reset')


function getTime() {
  if(dueTime.value === '') return undefined

  const selectedTime = dueTime.value.split(':')
  let hours = selectedTime[0]
  let mins = selectedTime[1]
  let meridiem

  if (hours > 12) {
    meridiem = 'PM'
    hours -= 12
  }else {
    meridiem = 'AM'
    if (hours === '00') {
      hours = 12
    }else {
      meridiem = 'PM'
    }
  }

  return `${hours}:${mins} ${meridiem}`
}


function addToActiveList (taskValue, setTime) {
  
  const taskCont = document.createElement('div')
  const taskCheckbox = document.createElement('input')
  const task = document.createElement('span')
  const deleteBtn = document.createElement('div')
  const leftDiv = document.createElement('div')
  const rightDiv = document.createElement('div')

  taskCont.classList.add('task-cont', 'flex')
  taskCheckbox.setAttribute('type', 'checkbox')
  taskCheckbox.classList.add('checkbox')
  task.classList.add('task')
  task.innerHTML = taskValue
  deleteBtn.classList.add('delete-btn')
  deleteBtn.innerText = '🗑️'
  leftDiv.classList.add('left', 'flex')
  rightDiv.classList.add('right', 'flex')


  taskCont.appendChild(leftDiv)
  taskCont.appendChild(rightDiv)

  leftDiv.appendChild(taskCheckbox)
  leftDiv.appendChild(task)
  activeList.appendChild(taskCont)

  if (setTime !== undefined) {
    const time = document.createElement('div')
    time.classList.add('time')
    time.innerHTML = setTime
    rightDiv.appendChild(time)
  }

  rightDiv.appendChild(deleteBtn)
}


inputText.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    if(e.target.value === '') return
    const timeDue = getTime()
    addToActiveList(e.target.value, timeDue)
    inputText.value = ''
    dueTime.value = ''
  }

})

addBtn.addEventListener('click', () => {
  if(inputText.value === '') return
  const timeDue = getTime()
  addToActiveList(inputText.value, timeDue)
  inputText.value = ''
  dueTime.value = ''
})

taskList.addEventListener('click', (e) => {
  const checkboxes = document.querySelectorAll("input[type=checkbox]")
  const deleteBtns = document.querySelectorAll('.delete-btn')

  checkboxes.forEach(checkbox => {
    if(checkbox.contains(e.target)) {
      const taskContainer = checkbox.parentNode.parentNode
      

      if(checkbox.checked) {
        completedList.appendChild(taskContainer)
      }else {
        activeList.appendChild(taskContainer)
      }
    }
  })

  deleteBtns.forEach(delBtn => {
    if(delBtn.contains(e.target)) {
      const taskContainer = delBtn.parentNode.parentNode
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
