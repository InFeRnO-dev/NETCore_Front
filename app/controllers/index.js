class IndexController extends BaseController {

    constructor() {
        super();
        this.cardsindex = document.getElementById('cardsindex')
        this.displayProjects()
    }
    openModal (modal) {             //fonction d'ouverture d'un modal
        this.getModal(modal).open()
    }
    closeModal (modal) {            //fonction de fermeture d'un modal
        this.getModal(modal).close()
    }
    async displayProjects(){
        let content = ''
        try{
            const projects = await this.modelProject.getAllProjects()
            for (const project of projects) {
                content += `
                                <div class="col s3 m4">
                                    <div id="cardindex" class="card">
                                    <div class="card-content" style="background-color: #a7a7a7 !important;" >
                                        <p style="font-family: 'Arial Black';color: #ffb962" class="card-title">${project.nom}</p>
                                        <p style="font-family: 'Arial'; color: #ffb962"> By: ${project.id_user}</p>
                                    </div>
                                    <div class="card-action" style="background-color: #7c7c7c !important;">
                                        <a type="button" onclick="">Voir plus</a>
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

    async addProject(){
        let inputaddiduser = this.validateRequiredField("#inputaddiduser", 'Trigramme')
        let inputaddnom = this.validateRequiredField("#inputaddnom", 'Nom')
        if (inputaddiduser === null || inputaddnom === null) return
        try {
            if (await this.modelProject.insert(new Projets(inputaddiduser, inputaddnom)) === 200) {
                this.closeModal('#modalAddProject')
                this.toast("L'ajout a été effectué")
                $("#inputaddiduser").value = ""
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
}
window.indexController = new IndexController()