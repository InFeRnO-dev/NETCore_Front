const serviceBaseUrlTache =  "https://localhost:5001/taches"
const serviceBaseUrlLiaison3 =  "https://localhost:5001/liaison"
class Tacheapi{

    getlastid(){
        return fetchJSON(`${serviceBaseUrlTache}/lastid`)
    }
    getAllTachesByExigence(id){
        return fetchJSON(`${serviceBaseUrlLiaison3}/exigence/${id}`)
    }
    getAllTaches(){
        return fetchJSON(`${serviceBaseUrlTache}`)
    }
    getTacheById(id){
        return fetchJSON(`${serviceBaseUrlTache}/${id}`)
    }
    insert(obj) {
        console.log(obj)
        return fetch(`${serviceBaseUrlTache}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
    update(obj) {
        return fetch(`${serviceBaseUrlTache}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
    delete(obj) {
        return fetch(`${serviceBaseUrlTache}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
}