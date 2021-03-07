class JalonController extends BaseController{
    constructor() {
        super();
        const iduser = loginController.getiduser()
        this.iduser = iduser
        const idexigence = exigencesController.getidexigence()
        this.idexigence = idexigence
        this.tableAllJalons = document.getElementById('tableAllJalons')
        this.tableBodyAllJalons = document.getElementById('tableBodyAllJalons')
        this.displayJalons()
    }

    async displayJalons(){
        let content = ''
        this.tableAllJalons.style.display = "none"
        try{
            const jalons = await this.modelJalon.getAllJalonsByExigence(this.idexigence)
            for (const jalon of jalons) {
                let date_prevue = new Date(jalon.date_livraison_prevue).toLocaleDateString()
                let date_reelle = new Date(jalon.date_livraison_reelle).toLocaleDateString()
                content += `<tr></tr><td>${jalon.libelle}</td>
                    <td>${jalon.id_user}</td>
                    <td>${date_prevue}</td>
                    <td>${date_reelle}</td>
                    <td><button class="btn" onclick="jalonController.displayEditJalon(${jalon.id})"><i class="material-icons">edit</i></button></td>
                    <td><button class="btn" onclick="jalonController.displayDeleteJalon(${jalon.id})" disabled><i class="material-icons">delete</i></button></td>
                    <td><button class="btn" onclick="jalonController.goToTaches(${jalon.id})">Taches</button></td></tr>`

            }
            this.tableBodyAllJalons.innerHTML = content
            this.tableAllJalons.style.display = "block"
        }catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    getidjalon(){
        return this.idjalon
    }
    goToTaches(idjalon){
        this.idjalon = idjalon
        navigate('tache')
    }

    async addJalon() {
        let inputaddlibellejalon = this.validateRequiredField("#inputaddlibellejalon", 'Libelle')
        let dateprevueaddjalon = new Date(document.getElementById('dateprevueaddjalon').value)
        let datereelleaddjalon = new Date(document.getElementById('datereelleaddjalon').value)
        if (inputaddlibellejalon === null || dateprevueaddjalon === null) return
        try {
            if (await this.modelJalon.insert(new Jalons(inputaddlibellejalon, this.iduser, dateprevueaddjalon, datereelleaddjalon)) === 200) {
                let idjalon = await this.modelJalon.getlastid()

                await this.modelLiaison.insertJalonForExigence(new Liaison(0, this.idexigence, 0, idjalon))
                indexController.closeModal('#modalAddJalon')
                this.toast("L'ajout a été effectué")
                this.displayJalons()
            } else {
                this.displayServiceError()
            }
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    async displayEditJalon(id) {                 //Fonction d'affichage du modal onclick btn edit
        try {
            const jalon = await this.modelJalon.getJalonById(id)
            if (jalon === undefined) {
                this.displayServiceError()
                return
            }
            if (jalon === null) {
                this.displayNotFoundError()
                return
            }
            document.getElementById('inputeditlibellejalon').value = jalon.libelle
            document.getElementById('dateprevueeditjalon').value = jalon.date_livraison_prevue
            this.Jalon = jalon
            indexController.openModal('#modalEditJalon')
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async editJalon() {          //Fonction d'update d'un jalon
        const jalon = this.Jalon
        let inputeditlibellejalon =  this.validateRequiredField("#inputeditlibellejalon", 'Libelle')
        let dateprevueeditjalon = new Date(document.getElementById('dateprevueeditjalon').value)
        if (inputeditlibellejalon != null || dateprevueeditjalon != null) {
            try {
                jalon.libelle = inputeditlibellejalon
                jalon.date_livraison_prevue = dateprevueeditjalon
                if (await this.modelJalon.update(jalon) === 200) {
                    indexController.closeModal('#modalEditJalon')
                    this.toast("Les informations du jalon ont été modifiés")
                    this.displayJalons()
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

    async displayDeleteJalon(id) {     //Fonction d'affichage du modal onclick btn delete
        const jalon = await this.modelJalon.getJalonById(id)
        try {
            if (jalon === undefined) {
                this.displayServiceError()
                return
            }
            if (jalon === null) {
                this.displayNotFoundError()
                return
            }
            this.jalon = jalon
            indexController.openModal('#modalDeleteJalon')
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    async deleteJalon() {                //fonction de suppression d'un jalon
        const jalon = this.jalon
        try {
            if (await this.modelJalon.delete(jalon) === 200) {
                indexController.closeModal('#modalDeleteJalon')
                this.toast("Le Jalon a été supprimée")
                this.displayJalons()
            } else {
                this.displayServiceError()
            }
        }
        catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
}window.jalonController = new JalonController()