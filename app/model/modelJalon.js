class ModelJalon {

    constructor() {
        this.apijalons = new Jalonapi()
    }

    async getlastid(){
        return this.apijalons.getlastid()
    }
    async getAllJalonsByExigence(id){
        let jalons = []
        for(let jalon of await this.apijalons.getAllJalonsByExigence(id)){
            jalons.push(Object.assign(new Jalons(), jalon))
        }
        return jalons
    }

    async getAllJalons(){
        let jalons = []
        for(let jalon of await this.apijalons.getAllJalons()){
            jalons.push(Object.assign(new Jalons(), jalon))
        }
        return jalons
    }

    async getJalonById(id){
        let jalon = await this.apijalons.getJalonById(id)
        Object.assign(new Jalons(), jalon)
        return jalon
    }

    async insert(obj){
        return this.apijalons.insert(obj).then(res => res.status)
    }
    async update(obj){
        return this.apijalons.update(obj).then(res => res.status)
    }
    async delete(obj){
        return this.apijalons.delete(obj).then(res => res.status)
    }
}