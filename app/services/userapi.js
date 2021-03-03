const serviceBaseUrlUser = "https://localhost:5001/user"

class Userapi {

    getAllUser(){
        return fetchJSON(`${serviceBaseUrlUser}`)
    }
    getUserById(id){
        return fetchJSON(`${serviceBaseUrlUser}/${id}`)
    }
}