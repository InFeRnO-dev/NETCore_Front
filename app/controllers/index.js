class IndexController extends BaseController {

    constructor() {
        super();

        const iduser = loginController.getiduser()
        this.iduser = iduser
        console.log(this.iduser)
        this.cardsindex = document.getElementById('cardsindex')
        this.selectuser = document.getElementById('selectuser')
        this.displayProjects()
    }
    openModal (modal) {             //fonction d'ouverture d'un modal
        this.getModal(modal).open()
    }
    closeModal (modal) {            //fonction de fermeture d'un modal
        this.getModal(modal).close()
    }
    getidproject(){
        return this.idproject
    }
    goToExigences(idproject){
        this.idproject = idproject
        navigate('exigence')
    }
    async displayProjects(){
        let content = ''
        let user = await this.modelUser.getUserById(this.iduser)
        let projects;
        if(user.droits === 1){
             projects = await this.modelProject.getAllProjects()
        } else{
            projects = await this.modelProject.getAllProjectsByIduser(this.iduser)
        }
        try{
            for (const project of projects) {
                this.project = project
                content += `
                                <div class="col s3 l5">
                                    <div id="cardindex" class="card">
                                        <div class="card-content" style="background-color: #406aff !important;" >
                                            <p style="font-family: 'Arial Black';color: white" class="card-title">${project.nom}</p>
                                            <p style="font-family: 'Arial'; color: white"> By: ${project.id_user}</p>
                                        </div>
                                        <div class="card-action" style="background-color: navy !important;">
                                            <a style="color: white" type="button" onclick="indexController.goToExigences(${project.id})">Voir plus</a>
                                            <a style="color: white" type="button" onclick="indexController.displayEditProject(${project.id})"><i class="material-icons">create</i></a>
                                            <a style="color: white" type="button" onclick="indexController.displayDeleteProject(${project.id})"><i class="material-icons">delete</i></a>
                                        </div>
                                    </div>
                                </div>
                            `
            }
            this.cardsindex.innerHTML = content
        }catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async displayUser() {
        try {
            let content = ''
            for(const user of await this.modelUser.getAllUser()) {
                content += `<option value="${user.id_user}">${user.id_user}</option>`
            }
            this.selectuser.innerHTML = content
            M.FormSelect.init(this.selectuser)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async addProject(){
        let inputaddiduser = document.getElementById('selectuser').value
        let inputaddnom = this.validateRequiredField("#inputaddnom", 'Nom')
        if (inputaddiduser === null || inputaddnom === null) return
        try {
            if (await this.modelProject.insert(new Projets(inputaddiduser, inputaddnom)) === 200) {
                this.closeModal('#modalAddProject')
                this.toast("L'ajout a été effectué")
                $("#inputaddnom").value = ""
                navigate('index')
            } else {
                this.displayServiceError()
            }
        }
        catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async displayEditProject(id) {                 //Fonction d'affichage du modal onclick btn edit
        try {
            const project = await this.modelProject.getProjectById(id)
            if (project === undefined) {
                this.displayServiceError()
                return
            }
            if (project === null) {
                this.displayNotFoundError()
                return
            }
            $('#inputnom').value = project.nom
            this.Project = project
            this.openModal('#modalEditProject')
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async editProject() {          //Fonction d'update du projet
        const project = this.Project
        let inputnom =  this.validateRequiredField("#inputnom", 'Nom')
        if (inputnom != null) {
            try {
                project.nom = inputnom
                if (await this.modelProject.update(project) === 200) {
                    this.closeModal('#modalEditProject')
                    this.toast("Les informations du projet ont été modifiées")
                    this.displayProjects()
                } else {
                    this.displayServiceError()
                }
            }
            catch (err) {
                console.log(err)
                this.displayServiceError()
            }
        }
    }
    async displayDeleteProject(id) {     //Fonction d'affichage du modal onclick btn delete
        const project = await this.modelProject.getProjectById(id)
        try {
            if (project === undefined) {
                this.displayServiceError()
                return
            }
            if (project === null) {
                this.displayNotFoundError()
                return
            }
            this.project = project
            this.openModal('#modalDeleteProject')
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async deleteProject() {                //fonction de suppression d'un projet
        const project = this.project
        try {
            if (await this.modelProject.delete(project) === 200) {
                this.closeModal('#modalDeleteProject')
                this.toast("Le projet a été supprimé")
                this.displayProjects()
            } else {
                this.displayServiceError()
            }
        }
        catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
}
window.indexController = new IndexController()