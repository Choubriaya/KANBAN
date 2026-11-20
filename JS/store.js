// LOCAL STORAGE 
export function sauvegarder(cards){
    localStorage.setItem("cards",JSON.stringify(cards))
}

export function cardsLocal(){
    let cards = localStorage.getItem("cards")
    if(cards){
        return JSON.parse(cards)
    }
}