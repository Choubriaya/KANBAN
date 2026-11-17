export async function recup(resolved, rejected,status = "",priority = "",assignee = ""){
 let objet ={}

if(status.trim() !== ""){
    objet.q = status
}
if(priority.trim() !== ""){
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
