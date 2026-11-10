import { afficherCartes } from "./ui.js"

fetch('https://flowboard-api-virid.vercel.app/cards', {
  headers: {
    'X-Workspace': 'public'
  }
})
.then(reponce=>{
    if(!reponce.ok){
        throw new Error("erreur")
    }
    return reponce.json()
  })

.then(data=> {
    console.log(data)
    console.log(data.length)

    afficherCartes(data)
}) 
.catch(function (Erreur) {
    console.log(Erreur)
})