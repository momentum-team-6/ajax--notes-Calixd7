const url = 'http://localhost:3000/notes'
const notesList = document.querySelector('#noteslist')

document.addEventListener('submit', function (event) {
    event.preventDefault()
    createnotes()
    rendernotes()
})

notesList.addEventListener('click', function (event) {
    if (event.target.matches('.delete')) {
        deletenotes(event.target.parentElement.dataset.id)
    }
   else if (event.target.matches('.edit')) {
        editnotes(event.target.parentElement.dataset.id)
    }
})
function createnotes() {
    const notesInput = document.querySelector('#notesinput')
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            noteItem: notesInput.value,
            created_at: moment().format()
        })
    })
        .then(res => res.json())
        .then(data => {
            notesInput.value = 
            console.log(data)
            rendernotesItem(data)
        })
    }
    function rendernotes () {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let note of data) {
                rendernotesItem(note) 
            }
        })  
    }
function rendernotesItem(note) {
    const notesItemEl = document.createElement('li')
    notesItemEl.dataset.id = note.id
    notesItemEl.id = `note${note.id}`
    notesItemEl.innerHTML = note.notesItem
    notesList.appendChild(notesItemEl)
}

/*function editnotes(noteId) {
    fetch (url + '/' + noteId, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            noteItem: notesInput.value,
        })
    })
        .then(res => res.json())
        .then(data => console.log(data)) 
            const notesToEdit = document.querySelector(`#note${noteId}`)
            rendernotesItem(note)
        }
*/

function deletenotes (noteId) {
    fetch (url + '/' + noteId, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            const notesToRemove = document.querySelector(`#note${noteId}`)
            noteToRemove.remove()
        })
}

rendernotes()

