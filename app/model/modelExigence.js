class ModelExigence {
    constructor() {
        this.apiexigence = new Exigenceapi()
    }

    async getlastid(){
        return this.apiexigence.getlastid()
    }
    async getAllExigencesByProject(id){
        let exigences = []
        for(let exigence of await this.apiexigence.getAllExigencesByProject(id)){
            exigences.push(Object.assign(new Exigences(), exigence))
        }
        return exigences
    }
    async getAllExigences(){
        let exigences = []
        for(let exigence of await this.apiexigence.getAllExigences()){
            exigences.push(Object.assign(new Exigences(), exigence))
        }
        return exigences
    }
    async getExigenceById(id){
        let exigence = await this.apiexigence.getExigenceById(id)
        Object.assign(new Exigences(), exigence)
        return exigence
    }

    async insert(obj){
        return this.apiexigence.insert(obj).then(res => res.status)
    }
    async update(obj){
        return this.apiexigence.update(obj).then(res => res.status)
    }
    async delete(obj){
        return this.apiexigence.delete(obj).then(res => res.status)
    }
}