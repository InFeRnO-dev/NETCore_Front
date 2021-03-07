class ExigencesController extends BaseController{
    constructor() {
        super();
        this.eventCheckBoxAdd()
        this.eventCheckBoxEdit()
        const idproject = indexController.getidproject()
        this.idproject = idproject
        this.tableAllExigences = document.getElementById('tableAllExigences')
        this.tableBodyAllExigences = document.getElementById('tableBodyAllExigences')
        this.displayExigences()
    }
    getidexigence(){
        return this.idexigence
    }
    goToTaches(idexigence){
        this.idexigence = idexigence
        navigate('tache')
    }
    goToJalons(idexigence){
        this.idexigence = idexigence
        navigate('jalon')
    }
    async displayExigences(){
        let content = ''
        this.tableAllExigences.style.display = "none"
        try{
            console.log(this.idproject)
            const exigences = await this.modelExigence.getAllExigencesByProject(this.idproject)
            for (const exigence of exigences) {
                let fonctionnel
                if (exigence.fonctionnel === 1){
                    fonctionnel = "Oui"
                } else {
                    fonctionnel = "Non"
                }
                content += `<tr></tr><td>${exigence.description}</td>
                    <td>${fonctionnel}</td>
                    <td>${exigence.type}</td>
                    <td><button class="btn" onclick="exigencesController.displayEditExigence(${exigence.id})"><i class="material-icons">edit</i></button></td>
                    <td><button class="btn" onclick="exigencesController.displayDeleteExigence(${exigence.id})" disabled><i class="material-icons">delete</i></button></td>
                    <td><button class="btn" onclick="exigencesController.goToJalons(${exigence.id})">Jalons</button></td></tr>`
            }
            this.tableBodyAllExigences.innerHTML = content
            this.tableAllExigences.style.display = "block"
        }catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    eventCheckBoxAdd(){
        let checkbox = document.querySelector("input[name=checkbox]");
        checkbox.addEventListener( 'change', function() {
            if(this.checked) {
                document.getElementById('typeexigence').style.display = "none"
            } else {
                document.getElementById('typeexigence').style.display = "block"
            }
        });
    }
    eventCheckBoxEdit(){
        let checkbox = document.querySelector("input[name=checkbox2]");
        checkbox.addEventListener( 'change', function() {
            if(this.checked) {
                document.getElementById('typeexigenceedit').style.display = "none"
            } else {
                document.getElementById('typeexigenceedit').style.display = "block"
            }
        });
    }
    async addExigences(){
        let inputaddexigencedescription = this.validateRequiredField("#inputaddexigencedescription", 'Description')
        let cbaddfonctionnel = document.getElementById('cbaddfonctionnel').checked
        let selectexigencetype = document.getElementById('selectexigencetype').value
        let fonctionnel
        if (inputaddexigencedescription === null || selectexigencetype === null) return
        if(cbaddfonctionnel === true){
            fonctionnel = 1
            selectexigencetype = "None"
        } else {
            fonctionnel = 0
        }
        try {
            if (await this.modelExigence.insert(new Exigences(inputaddexigencedescription, selectexigencetype, fonctionnel)) === 200) {
                let idexigence = await this.modelExigence.getlastid()
                await this.modelLiaison.insertExigenceForProject(new Liaison(this.idproject, idexigence))
                indexController.closeModal('#modalAddExigence')
                this.toast("L'ajout a été effectué")
                navigate('exigence')
            } else {
                this.displayServiceError()
            }
        }
        catch (err) {
            console.log(err)
            this.displayServiceError()
        }
        document.getElementById('inputaddexigencedescription').value = ""
        document.getElementById('cbaddfonctionnel').checked = false
    }

    async displayEditExigence(id) {                 //Fonction d'affichage du modal onclick btn edit
        try {
            const exigence = await this.modelExigence.getExigenceById(id)
            if (exigence === undefined) {
                this.displayServiceError()
                return
            }
            if (exigence === null) {
                this.displayNotFoundError()
                return
            }
            document.getElementById('inputeditexigencedescription').value = exigence.description
            document.getElementById('cbeditfonctionnel').checked = exigence.fonctionnel === 0 ? true : false
            document.getElementById('editexigencetype').value
            this.Exigence = exigence
            indexController.openModal('#modalEditExigence')
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async editExigence() {          //Fonction d'update d'une exigence
        const exigence = this.Exigence
        let fonctionnel
        let editdescription =  this.validateRequiredField("#inputeditexigencedescription", 'Description')
        let editexigencefonctionnel = document.getElementById('cbeditfonctionnel').checked
        let editexigencetype = document.getElementById('editexigencetype').value
        if(editexigencefonctionnel === true){
            fonctionnel = 1
            editexigencetype = "None"
        } else {
            fonctionnel = 0
        }
        if (editdescription != null) {
            try {
                exigence.description = editdescription
                exigence.fonctionnel = fonctionnel
                exigence.type = editexigencetype
                if (await this.modelExigence.update(exigence) === 200) {
                    indexController.closeModal('#modalEditExigence')
                    this.toast("Les informations de l'exigence ont été modifiées")
                    this.displayExigences()
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
    async displayDeleteExigence(id) {     //Fonction d'affichage du modal onclick btn delete
        const exigence = await this.modelExigence.getExigenceById(id)
        try {
            if (exigence === undefined) {
                this.displayServiceError()
                return
            }
            if (exigence === null) {
                this.displayNotFoundError()
                return
            }
            this.exigence = exigence
            indexController.openModal('#modalDeleteExigence')
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async deleteExigence() {                //fonction de suppression d'une exigence
        const exigence = this.exigence
        try {
            if (await this.modelExigence.delete(exigence) === 200) {
                indexController.closeModal('#modalDeleteExigence')
                this.toast("L'exigence a été supprimée")
                this.displayExigences()
            } else {
                this.displayServiceError()
            }
        }
        catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

}window.exigencesController = new ExigencesController()