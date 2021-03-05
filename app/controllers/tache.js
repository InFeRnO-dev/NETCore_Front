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
                    <td>${tache.charge}</td>
                    <td><p><label><input id="cbEncours" type="checkbox" onchange=""/><span></span></label></p></td>
                    <td><p><label><input id="cbTermine" type="checkbox" onchange=""/><span></span></label></p></td>
                    <td>${tache.id_tache_liee}</td>
                    <td><button class="btn" onclick="" disabled><i class="material-icons">edit</i></button></td>
                    <td><button class="btn" onclick="" disabled><i class="material-icons">delete</i></button></td></tr>`
            }
            this.tableBodyAllTaches.innerHTML = content
            this.tableAllTaches.style.display = "block"
        }catch (err) {
            console.log(err)
            this.displayServiceError()
        }
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
}window.tacheController = new TacheController()