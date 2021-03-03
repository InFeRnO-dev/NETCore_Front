class ModelProject {

    constructor() {
        this.apiproject = new Projectapi()
    }

    async getAllProjects(){
        let projects = []
        for(let project of await this.apiproject.getAllProjects()){
            projects.push(Object.assign(new Projets(), project))
            console.log(projects)
        }
        return projects
    }
    async insert(obj){
        return this.apiproject.insert(obj).then(res => res.status)
    }
}