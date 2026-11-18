import * as api from './api.js'
import * as ui from './ui.js'

let allCards = await api.recup()

// EVENT LISTENERS ...

async function chargerLesCartes(status = "", priority = "", assignee = "") {
    ui.afficherCharg()
    try {
        const cards = await api.recup(status, priority, assignee)
        allCards = cards
        ui.afficherCartes(cards)
    } catch (error) {
        console.error(error)
        ui.afficherErreur()
    }
}
chargerLesCartes()

ui.nouvelleCarte.addEventListener("click", function (e) {
    e.preventDefault()
    ui.popUp.showModal()
})
ui.close.addEventListener("click", function () {
    popUp.close()
})
ui.annuler.addEventListener("click", function () {
    ui.popUp.close()
    ui.formDialog.reset()
})

ui.formDialog.addEventListener("submit", function (event) {
event.preventDefault()
    let titreValide = ui.check(ui.titre, ui.regexTitre)
    let descriptionValide = ui.check(ui.description, ui.regexDescription)
    let assigneValide = ui.check(ui.assigneCarte, ui.regexAssigne)

    let prioriteValide = false
    let messagePriorite = ui.prioriteCarte.nextElementSibling
    if (ui.prioriteCarte.value === "") {
        messagePriorite.classList.remove("hidden")
        messagePriorite.style.color = "red"
        ui.prioriteCarte.style.border = "1px solid red"
    } else {
        messagePriorite.classList.add("hidden")
        ui.prioriteCarte.style.border = "1px solid green"
        prioriteValide = true
    }
    let statutValide = false
    let messageStatut = ui.statutCarte.nextElementSibling

    if (ui.statutCarte.value === "") {
        messageStatut.classList.remove("hidden")
        messageStatut.style.color = "red"
        ui.statutCarte.style.border = "1px solid red"
    } else {
        messageStatut.classList.add("hidden")
        ui.statutCarte.style.border = "1px solid green"
        statutValide = true
    }
    let dateValide = ui.verifierDate(ui.date.value)
    if (titreValide && descriptionValide && assigneValide && prioriteValide && statutValide && dateValide) {

        let data = {
            title: ui.titre.value,
            description: ui.description.value,
            status: ui.statutCarte.value,
            priority: ui.prioriteCarte.value,
            assignee: ui.assigneCarte.value,
            dueDate: ui.date.value
        }
        if (ui.carteId.value) {
        ui.popUp.close()
            Swal.fire({
                title: "Êtes-vous sûr ?",
                text: "Voulez-vous vraiment modifier cette carte ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#463ecc",
                cancelButtonColor: "#e65b5b",
                confirmButtonText: "Oui, modifier",
                cancelButtonText: "Annuler"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.modifierCarte(ui.carteId.value, data)
                        await chargerLesCartes()
                        ui.formDialog.reset()
                        ui.popUp.close()
                        Swal.fire("Modifié !", "La carte a été mise à jour avec succès.", "success")
                    } catch(error){
                        console.error(error)
                        Swal.fire("Erreur", "Une erreur est survenue lors de la modification.", "error")
                    }
                }
            })
        } else {
            ui.popUp.showModal()
        }
    }
})

ui.ressayer.addEventListener("click", () => {
    chargerLesCartes()
})


async function filter() {
    const cards = await api.recup(ui.chercher.value, ui.selection.value, ui.assigne.value)
    ui.afficherCartes(cards)
}

ui.chercher.addEventListener("input", filter)
ui.selection.addEventListener("change", filter)
ui.assigne.addEventListener("change", filter)


ui.nouvelleCarte.addEventListener("click", function (e) {
    e.preventDefault()
    ui.formDialog.reset()
    ui.carteId.value = ""

    ui.creer.classList.remove("hidden")
    ui.modifier.classList.add("hidden")

    ui.popUp.showModal()
})

ui.boutreset.addEventListener("click", function (event) {
    event.preventDefault()
    ui.chercher.value = ""
    ui.selection.value = ""
    ui.assigne.value = ""
    ui.vide.classList.add("hidden")
    chargerLesCartes()
})


ui.nouvelleCarte.addEventListener("click", function (e) {
    e.preventDefault()
    ui.carteId.value = ""
    ui.popUp.showModal()
})

ui.tableau.addEventListener("click", async function (e) {
    const bouton = e.target.closest(".btn-modifier")
    const id = bouton.getAttribute("data-id")
    console.log(id)

    let selectedCard = await api.fetchSelected(id)

    ui.carteId.value = selectedCard.id
    ui.titre.value = selectedCard.title
    ui.description.value = selectedCard.description
    ui.prioriteCarte.value = selectedCard.priority
    ui.assigneCarte.value = selectedCard.assignee
    ui.statutCarte.value = selectedCard.status
    ui.date.value = selectedCard.dueDate

    console.log(selectedCard)
    ui.creer.classList.add("hidden")
    ui.modifier.classList.remove("hidden")
    ui.popUp.showModal()
})





