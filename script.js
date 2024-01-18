const inputText = document.querySelector('.input') 
const addBtn = document.querySelector('.add')
const activeList = document.querySelector('.active-list')
const completedList = document.querySelector('.completed-list')

const tasksActiveList = []


inputText.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    tasksActiveList.push(e.target.value)
    inputText.value = ''
  }
})

addBtn.addEventListener('click', () => {
  tasksActiveList.push(inputText.value)
  inputText.value = ''
})

