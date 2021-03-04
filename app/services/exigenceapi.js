const serviceBaseUrlExigence = "https://localhost:5001/exigences"
const serviceBaseUrlLiaison2 =  "https://localhost:5001/liaison"
class Exigenceapi {

    getlastid(){
        return fetchJSON(`${serviceBaseUrlExigence}/lastid`)
    }
    getAllExigencesByProject(id){
        return fetchJSON(`${serviceBaseUrlLiaison2}/projet/${id}`)
    }
    getAllExigences(){
        return fetchJSON(`${serviceBaseUrlExigence}`)
    }
    getExigenceById(id){
        return fetchJSON(`${serviceBaseUrlExigence}/${id}`)
    }
    insert(obj) {
        return fetch(`${serviceBaseUrlExigence}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
    update(obj) {
        return fetch(`${serviceBaseUrlExigence}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
    delete(obj) {
        return fetch(`${serviceBaseUrlExigence}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
}