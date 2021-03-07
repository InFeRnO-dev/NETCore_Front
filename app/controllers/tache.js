class TacheController extends BaseController{
    constructor() {
        super();
        const iduser = loginController.getiduser()
        this.iduser = iduser
        const idexigence = exigencesController.getidexigence()
        this.idexigence = idexigence
        this.addtachecombobox = document.getElementById('addtachecombobox')
        this.tableAllTaches = document.getElementById('tableAllTaches')
        this.tableBodyAllTaches = document.getElementById('tableBodyAllTaches')
        this.displayTaches()
    }
    async displayTaches(){
        let content = ''
        this.tableAllTaches.style.display = "none"
        try{
            const taches = await this.modelTache.getAllTachesByExigence(this.idexigence)

            for (const tache of taches) {
                let date_theorique = new Date(tache.date_debut_theorique).toLocaleDateString()
                let date_reelle = new Date(tache.date_debut_reelle).toLocaleDateString()
                content += `<tr></tr><td>${tache.libelle}</td>
                    <td>${tache.description}</td>
                    <td>${tache.id_user}</td>
                    <td>${date_theorique}</td>
                    <td>${date_reelle}</td>
                    <td>${tache.charge}</td>`
                if(tache.encours === 1){
                    content += `<td><p><label><input id="cbEncours" type="checkbox" onchange="tacheController.onChangeEnCoursTache(${tache.id})" checked disabled/><span></span></label></p></td>`
                } else{
                    content += `<td><p><label><input id="cbEncours" type="checkbox" onchange="tacheController.onChangeEnCoursTache(${tache.id})"/><span></span></label></p></td>`
                }
                if(tache.termine === 1){
                    content += `<td><p><label><input id="cbTermine" type="checkbox" onchange="tacheController.onChangeTermineTache(${tache.id})" checked disabled/><span></span></label></p></td>
                    <td>${tache.id_tache_liee}</td>
                    <td><button class="btn" onclick="tacheController.displayEditTache(${tache.id})" disabled><i class="material-icons">edit</i></button></td>
                    <td><button class="btn" onclick="tacheController.displayDeleteTache(${tache.id})" disabled><i class="material-icons">delete</i></button></td></tr>`
                }else {
                    content += `<td><p><label><input id="cbTermine" type="checkbox" onchange="tacheController.onChangeTermineTache(${tache.id})"/><span></span></label></p></td>
                    <td>${tache.id_tache_liee}</td>
                    <td><button class="btn" onclick="tacheController.displayEditTache(${tache.id})"><i class="material-icons">edit</i></button></td>
                    <td><button class="btn" onclick="tacheController.displayDeleteTache(${tache.id})" disabled><i class="material-icons">delete</i></button></td></tr>`
                }
            }
            this.tableBodyAllTaches.innerHTML = content
            this.tableAllTaches.style.display = "block"
        }catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async onChangeEnCoursTache(id){
        const tache = await this.modelTache.getTacheById(id)
        tache.encours = 1
        tache.date_debut_reelle = new Date()
        await this.modelTache.update(tache)
        document.getElementById('cbEncours').disabled = true
        this.displayTaches()
        this.toast("La tache vient de demarrer")
    }
    async onChangeTermineTache(id){
        const tache = await this.modelTache.getTacheById(id)
        tache.termine = 1
        await this.modelTache.update(tache)
        document.getElementById('cbTermine').disabled = true
        this.displayTaches()
        this.toast("La tache est terminée")
    }
    async displayTachesliee() {
        try {
            let content = ''
            content += `<option value="0" disabled selected>Tache Liée</option>`
            for(const tache of await this.modelTache.getAllTaches()) {
                content += `<option value="${tache.id}">${tache.libelle}</option>`
            }
            this.addtachecombobox.innerHTML = content
            M.FormSelect.init(this.addtachecombobox)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async addTache(){
        let inputaddlibelle = this.validateRequiredField("#inputaddlibelle", 'Libelle')
        let inputaddcharge = parseInt(document.getElementById('inputaddcharge').value)
        let inputadddescription = this.validateRequiredField("#inputadddescription", 'Description')
        let datetheoriqueadd = new Date(document.getElementById('datetheoriqueadd').value)
        let datereelleadd = new Date(document.getElementById('datereelleadd').value)
        let addtachecombobox = parseInt(document.getElementById('addtachecombobox').value)
        console.log(inputaddlibelle, inputadddescription , this.iduser, datetheoriqueadd, datereelleadd, inputaddcharge, addtachecombobox)
        if (inputaddlibelle === null || inputaddcharge === null || inputadddescription === null || datetheoriqueadd === null || datereelleadd === null || addtachecombobox === null) return
        try {
            if (await this.modelTache.insert(new Taches(inputaddlibelle, inputadddescription, this.iduser, datetheoriqueadd, datereelleadd, inputaddcharge, 0,0, addtachecombobox)) === 200) {
                let idtache = await this.modelTache.getlastid()
                await this.modelLiaison.insertTacheForExigence(new Liaison(0, this.idexigence, idtache,0 ))
                indexController.closeModal('#modalAddTache')
                this.toast("L'ajout a été effectué")
                this.displayTaches()
            } else {
                this.displayServiceError()
            }
        }
        catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    async displayEditTache(id){
        try {
            const tache = await this.modelTache.getTacheById(id)
            if (tache === undefined) {
                this.displayServiceError()
                return
            }
            if (tache === null) {
                this.displayNotFoundError()
                return
            }
            document.getElementById('inputeditlibelle').value = tache.libelle
            document.getElementById('inputeditcharge').value = tache.charge
            document.getElementById('inputeditdescription').value = tache.description
            document.getElementById('datetheoriqueedit').value = tache.date_debut_theorique
            document.getElementById('datereelleedit').value = tache.date_debut_reelle
            this.Tache = tache
            indexController.openModal('#modalEditTache')
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }

    }

    async editTache(){
        const tache = this.Tache
        let editlibelle = this.validateRequiredField("#inputeditlibelle", 'Libelle')
        let editcharge = parseInt(this.validateRequiredField("#inputeditcharge", 'Chrage'))
        let editdescription =  this.validateRequiredField("#inputeditdescription", 'Description')
        let datetheoriqueedit = new Date(document.getElementById('datetheoriqueedit').value)
        let datereelleedit = new Date(document.getElementById('datereelleedit').value)
        if (editlibelle != null && editdescription != null && editcharge != null) {
            try {
                tache.libelle = editlibelle
                tache.charge = editcharge
                tache.description = editdescription
                tache.date_debut_theorique = datetheoriqueedit
                tache.date_debut_reelle = datereelleedit
                if (await this.modelTache.update(tache) === 200) {
                    indexController.closeModal('#modalEditTache')
                    this.toast("Les informations de la tache ont été modifiées")
                    this.displayTaches()
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

    async displayDeleteTache(id) {     //Fonction d'affichage du modal onclick btn delete
        const tache = await this.modelTache.getTacheById(id)
        try {
            if (tache === undefined) {
                this.displayServiceError()
                return
            }
            if (tache === null) {
                this.displayNotFoundError()
                return
            }
            this.tache = tache
            indexController.openModal('#modalDeleteTache')
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }

    async deleteExigence() {                //fonction de suppression d'une tache
        const tache = this.tache
        try {
            if (await this.modelTache.delete(tache) === 200) {
                indexController.closeModal('#modalDeleteTache')
                this.toast("La tache a été supprimée")
                this.displayTaches()
            } else {
                this.displayServiceError()
            }
        }
        catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
}window.tacheController = new TacheController()