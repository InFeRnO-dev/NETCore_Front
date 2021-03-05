const serviceBaseUrlUser = "https://localhost:5001/user"

class Userapi {

    authenticate(login, password) {
        return fetchJSON(`${serviceBaseUrlUser}/${login}/${password}`)
    }
    getAllUser(){
        return fetchJSON(`${serviceBaseUrlUser}`)
    }
    getUserById(id){
        return fetchJSON(`${serviceBaseUrlUser}/${id}`)
    }
}