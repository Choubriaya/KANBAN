export async function recup(status = "",priority = "",assignee = ""){
  if(localStorage.getItem('tasks').length || status.trim() || priority.trim() || assignee) {
    let objet ={}

    objet.q = status
    objet.priority = priority
    objet.assignee = assignee 

   const response = await axios.get('https://flowboard-api-virid.vercel.app/cards?', {   
     headers: {
       'X-Workspace': 'public'
     },
     params : objet
   })

    localStorage.setItem('tasks', JSON.stringify(response.data))
    return JSON.parse(localStorage.getItem("tasks"))
  }
  return JSON.parse(localStorage.getItem('tasks'))
}



export async function modifierCarte(id,cardData){
  const response = await axios.put(`https://flowboard-api-virid.vercel.app/cards/${id}?password=1234`, cardData,{
    headers: {
            'X-Workspace': 'public',
        },
      
  })
  console.log(response.data)
}

export async function fetchSelected(id) {
  const response = await axios.get('https://flowboard-api-virid.vercel.app/cards/' + id)
  return response.data
}

export async function supprimerCarte(id){
  const response = await axios.delete(`https://flowboard-api-virid.vercel.app/cards/${id}?password=1234`,
    {
    headers: {
            'X-Workspace': 'public',
        },
      
})
return response.data
}