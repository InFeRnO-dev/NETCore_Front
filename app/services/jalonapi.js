const serviceBaseUrlJalons =  "https://localhost:5001/jalons"
const serviceBaseUrlLiaison4 =  "https://localhost:5001/liaison"

class Jalonapi {

    getlastid(){
        return fetchJSON(`${serviceBaseUrlJalons}/lastid`)
    }

    getAllJalonsByExigence(id){
        return fetchJSON(`${serviceBaseUrlLiaison4}/exigence/jalons/${id}`)
    }

    getAllJalons(){
        return fetchJSON(`${serviceBaseUrlJalons}`)
    }

    getJalonById(id){
        return fetchJSON(`${serviceBaseUrlJalons}/${id}`)
    }

    insert(obj) {
        console.log(obj)
        return fetch(`${serviceBaseUrlJalons}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
    update(obj) {
        return fetch(`${serviceBaseUrlJalons}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
    delete(obj) {
        return fetch(`${serviceBaseUrlJalons}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }

}