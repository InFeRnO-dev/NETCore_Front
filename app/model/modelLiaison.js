class ModelLiaison {
    constructor() {
        this.apiliaison = new Liaisonapi()
    }

    async insertExigenceForProject(obj){
        return this.apiliaison.insertExigenceForProject(obj).then(res => res.status)
    }

    async insertTacheIntoJalonExigence(obj){
        return this.apiliaison.insertTacheIntoJalonExigence(obj).then(res => res.status)
    }

    async insertJalonForExigence(obj){
        return this.apiliaison.insertJalonForExigence(obj).then(res => res.status)
    }
}