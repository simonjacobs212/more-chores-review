const choreList = document.querySelector('div#chore-list')
const newChoreForm = document.querySelector("#new-chore-form")
const url = 'http://localhost:3000/chores'

const getChores = _ => {
    fetch(url)
    .then(res => res.json())
    .then(choresArray => choresArray.forEach(chore => renderChore(chore)))
}

const renderChore = chore => {
    const choreCard = document.createElement('div')
    choreCard.className = 'chore-card'
    choreCard.dataset.id = chore.id
    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-button'
    deleteButton.dataset.id = chore.id
    const choreTitle = document.createElement('h3')
    choreTitle.textContent = chore.title
    const choreDuration = document.createElement('p')
    choreDuration.textContent = chore.duration
    const chorePriority = document.createElement('input')
    chorePriority.value = chore.priority
    
    choreCard.append(deleteButton, choreTitle, choreDuration, chorePriority)
    choreList.append(choreCard)
}

const postChore = event => {
    event.preventDefault()
    const title = event.target.title.value
    const priority = event.target.priority.value
    const duration = event.target.duration.value

    newChore = {title, priority, duration}

    configObj = {
        method: "POST", 
        headers: { "Content-type":"application/json" },
        body: JSON.stringify(newChore)
    }

    fetch(url, configObj)
    .then( response => response.json() )    
    .then( newChore => renderChore(newChore) )

}

const handleClick = event => {
    if (event.target.className === 'delete-button'){
        deleteChore(event.target)
    }
}

const deleteChore = target => {
    configObj = {
        method: "DELETE"
    }

    fetch(url + `/${target.dataset.id}`, configObj)
    .then( response => response.json() )    
    .then(target.closest('.chore-card').remove())
}

newChoreForm.addEventListener('submit', postChore)
getChores()
choreList.addEventListener('click', handleClick)


