export async function recup(status = "",priority = "",assignee = ""){
 let objet ={}

if(status.trim()){
    objet.q = status
}
if(priority.trim()){
   objet.priority = priority
}

if(assignee){
   objet.assignee = assignee
}
const response = await axios.get('https://flowboard-api-virid.vercel.app/cards?', {   
  headers: {
    'X-Workspace': 'public'
  },
  params : objet
})
return response.data
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