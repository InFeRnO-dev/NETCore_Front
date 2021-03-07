const serviceBaseUrlLiaison = "https://localhost:5001/liaison"
class Liaisonapi{

    async insertExigenceForProject(obj){
        return fetch(`${serviceBaseUrlLiaison}/projet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }

    async insertTacheIntoJalonExigence(obj){
        return fetch(`${serviceBaseUrlLiaison}/jalon/exigence/tache`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }

    async insertJalonForExigence(obj){
        return fetch(`${serviceBaseUrlLiaison}/exigence/jalon`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
}