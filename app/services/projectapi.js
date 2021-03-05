const serviceBaseUrlProject = "https://localhost:5001/projets"

class Projectapi {

    getAllProjectsByIduser(id){
        return fetchJSON(`${serviceBaseUrlProject}/user/${id}`)
    }
    getAllProjects(){
        return fetchJSON(`${serviceBaseUrlProject}`)
    }
    getProjectById(id){
        return fetchJSON(`${serviceBaseUrlProject}/${id}`)
    }
    insert(obj) {
        return fetch(`${serviceBaseUrlProject}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
    update(obj) {
        return fetch(`${serviceBaseUrlProject}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
    delete(obj) {
        console.log(obj)
        return fetch(`${serviceBaseUrlProject}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj)
        })
    }
}