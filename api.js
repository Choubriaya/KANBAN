export function recup(resolved, rejected,status = "",priority = "",assignee = ""){

 let url = new URLSearchParams()

if(status.trim() !== ""){
    url.set("q",status)
}
if(priority.trim() !== ""){
    url.set("priority",priority)
}

if(assignee){
    url.set("assignee",assignee)
}
fetch('https://flowboard-api-virid.vercel.app/cards?'+ url.toString() , {
  headers: {
    'X-Workspace': 'public'
  }
})
.then(reponse=>{
    if(!reponse.ok){
        throw new Error("erreur")
    }
    return reponse.json()
  })

.then(data=> {
    // console.log(data)
    // console.log(data.length)
    resolved(data)


}) 
.catch(()=> {
    rejected()
})
}




