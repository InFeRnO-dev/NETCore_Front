class ModelProject {

    constructor() {
        this.apiproject = new Projectapi()
    }

    async getAllProjectsByIduser(id){
        let projects = []
        for(let project of await this.apiproject.getAllProjectsByIduser(id)){
            projects.push(Object.assign(new Projets(), project))
        }
        return projects
    }
    async getAllProjects(){
        let projects = []
        for(let project of await this.apiproject.getAllProjects()){
            projects.push(Object.assign(new Projets(), project))
        }
        return projects
    }
    async getProjectById(id){
        let project = await this.apiproject.getProjectById(id)
        Object.assign(new Projets(), project)
        return project
    }

    async insert(obj){
        return this.apiproject.insert(obj).then(res => res.status)
    }
    async update(obj){
        return this.apiproject.update(obj).then(res => res.status)
    }
    async delete(obj){
        return this.apiproject.delete(obj).then(res => res.status)
    }
}