class ModelUser{
    constructor() {
        this.apiuser = new Userapi()
    }

    async authenticate(login, password){
        return await this.apiuser.authenticate(login, password)
    }
    async getAllUser(){
            let users = []
            for(let user of await this.apiuser.getAllUser()){
                users.push(Object.assign(new User(), user))
            }
            return users
    }
}