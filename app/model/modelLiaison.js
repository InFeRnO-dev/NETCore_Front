class ModelLiaison {
    constructor() {
        this.apiliaison = new Liaisonapi()
    }

    async insertExigenceForProject(obj){
        return this.apiliaison.insertExigenceForProject(obj).then(res => res.status)
    }
    async insertTacheForExigence(obj){
        return this.apiliaison.insertTacheForExigence(obj).then(res => res.status)
    }
}