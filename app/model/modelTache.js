class ModelTache {
    constructor() {
        this.apitache = new Tacheapi()
    }
    async getlastid(){
        return this.apitache.getlastid()
    }
    async getAllTachesByExigence(id){
        let taches = []
        for(let tache of await this.apitache.getAllTachesByExigence(id)){
            taches.push(Object.assign(new Taches(), tache))
        }
        return taches
    }
    async getAllTachesByJalon(id){
        let taches = []
        for(let tache of await this.apitache.getAllTachesByJalon(id)){
            taches.push(Object.assign(new Taches(), tache))
        }
        return taches
    }
    async getAllTaches(){
        let taches = []
        for(let tache of await this.apitache.getAllTaches()){
            taches.push(Object.assign(new Taches(), tache))
        }
        return taches
    }
    async getTacheById(id){
        let tache = await this.apitache.getTacheById(id)
        Object.assign(new Taches(), tache)
        return tache
    }

    async insert(obj){
        return this.apitache.insert(obj).then(res => res.status)
    }
    async update(obj){
        return this.apitache.update(obj).then(res => res.status)
    }
    async delete(obj){
        return this.apitache.delete(obj).then(res => res.status)
    }
}