const colTodo = document.querySelector("#colTodo")
const colEncour = document.querySelector("#colEncour")
const colDone = document.querySelector("#colDone")

const cptTodo = document.querySelector("#cptTodo")
const cptEncour = document.querySelector("#cptEncour")
const cptDone = document.querySelector("#cptDone")

const tableau = document.querySelector("#tableau")
const titre = document.querySelector("#titre")
const description = document.querySelector("#description")
const assigneCarte = document.querySelector("#assigneCarte")
const prioriteCarte = document.querySelector("#prioriteCarte")
const statutCarte = document.querySelector("#statutCarte")
const date = document.querySelector("#date")

const formDialog =document.querySelector("#formDialog")
const nouvelleCarte = document.querySelector("#nouvelleCarte")
console.log(nouvelleCarte)
const popUp = document.querySelector("#popUp")
console.log(popUp)
const close = document.querySelector("#close")
const annuler = document.querySelector("#annuler")
const creer =document.querySelector("#creer")


const regexTitre = /^[A-Za-zÀ-ÿ0-9\s'-]{3,50}$/
const regexDescription = /^[A-Za-zÀ-ÿ0-9\s.,!?'-]{5,300}$/
const regexAssigne = /^[A-Za-zÀ-ÿ\s'-]{2,30}$/


let allCards =[]


export function afficherCartes(cards) {
allCards = cards

    colTodo.textContent = ""
    colEncour.textContent = ""
    colDone.textContent = ""


    let nombreTodo = 0;
    let nombreEncour = 0;
    let nombreDone = 0;

    for (let i = 0; i < cards.length; i++) {
        let tables = '<div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200">' +
            '<h3 class="font-bold text-lg mb-2">' + cards[i].title + '</h3>' +
            '<p class="text-slate-500 text-sm mb-3">' + cards[i].description + '</p>' +
            '<p class ="text-sm mb-2"> Priorité : ' + cards[i].priority + '</p>' +
            '<p class="text-sm text-slate-600">' + cards[i].assignee + '</p>' +
            '<p class="text-sm text-slate-600">' + cards[i].dueDate + '</p>' +

            '</div>'
    

    if (cards[i].status == "todo") {
        colTodo.innerHTML +=  tables
        nombreTodo++;
    }
    if (cards[i].status == "in-progress") {
        colEncour.innerHTML +=  tables
        nombreEncour++;
    }
    if (cards[i].status == "done") {
        colDone.innerHTML +=  tables
        nombreDone++;
    }
    
cptTodo.textContent = nombreTodo;
    cptEncour.textContent = nombreEncour;
    cptDone.textContent = nombreDone;


}
}
nouvelleCarte.addEventListener("click", function(e){
    e.preventDefault()
    popUp.showModal()
})
close.addEventListener("click",function(){
    popUp.close()
})
annuler.addEventListener("click",function(){
    popUp.close()
    formDialog.reset()
})

formDialog.addEventListener("submit",function(event){

    event.preventDefault()
    let titreValide = check(titre, regexTitre)
    let descriptionValide = check(description, regexDescription)
    let assigneValide = check(assigneCarte, regexAssigne)

let prioriteValide = false
    let messagePriorite = prioriteCarte.nextElementSibling
   if (prioriteCarte.value === "") {
        messagePriorite.classList.remove("hidden")
         messagePriorite.style.color = "red"
        prioriteCarte.style.border = "1px solid red"
    } else {
        messagePriorite.classList.add("hidden")
        prioriteCarte.style.border = "1px solid green"
        prioriteValide = true
    }


     let statutValide = false
    let messageStatut = statutCarte.nextElementSibling

    if (statutCarte.value === "") {
        messageStatut.classList.remove("hidden")
          messageStatut.style.color = "red"
        statutCarte.style.border = "1px solid red"
    } else {
        messageStatut.classList.add("hidden")
        statutCarte.style.border = "1px solid green"
        statutValide = true
    }
  let dateValide = verifierDate(date.value)
  if(titreValide && descriptionValide && assigneValide && prioriteValide && statutValide && dateValide){

let nouvCarte = {
        title: titre.value,
        description: description.value,
        status: statutCarte.value,
        priority: prioriteCarte.value ,
        assignee: assigneCarte.value,
        dueDate :date.value
    }
allCards.push(nouvCarte)
afficherCartes(allCards)
formDialog.reset()
popUp.close()

  }
})


function check(a, b) {
    let message = a.nextElementSibling

    if (!b.test(a.value.trim())) {
        message.classList.remove("hidden")
        a.style.border = "1px solid red"
        message.style.color = "red"
        return false

    } else {
        message.classList.add("hidden")
        a.style.border = "1px solid green"
        return true
    }
}


function verifierDate(dateChoisie){
    let message = date.nextElementSibling
    let ajourdhui = new Date()
    let dateActuelle = ajourdhui.getFullYear() +"-"+
        String(ajourdhui.getMonth()+1).padStart(2,"0")+"-"+
        String(ajourdhui.getDate()).padStart(2,"0")

        if (dateChoisie === "") {
        message.textContent = "Veuillez choisir une date."
        date.style.border = "1px solid red"
        return false
    }
        if (dateChoisie < dateActuelle) {
        message.textContent = "Votre date est déjà passée, veuillez choisir une nouvelle date."
        date.style.border = "1px solid red"
        return false
    }
    message.classList.add("hidden")
    date.style.border = "1px solid green"
    return true
}

