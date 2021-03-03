class ModelUser{
    constructor() {
        this.apiuser = new Userapi()
    }

    async getAllUser(){
            let users = []
            for(let user of await this.apiuser.getAllUser()){
                users.push(Object.assign(new User(), user))
            }
            return users
    }
}