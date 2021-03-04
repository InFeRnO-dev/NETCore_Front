const serviceBaseUrlLiaison = "https://localhost:5001/liaison"
class Liaisonapi{

    async insertExigenceForProject(obj){
        return fetch(`${serviceBaseUrlLiaison}/projet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
}