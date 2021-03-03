const serviceBaseUrlProject = "https://localhost:5001/projets"

class Projectapi {

    getAllProjects(){
        return fetchJSON(`${serviceBaseUrlProject}`)
    }
    getProjectById(id){
        return fetchJSON(`${serviceBaseUrlProject}/${id}`)
    }
    insert(obj) {
        return fetch(`${serviceBaseUrlProject}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
}