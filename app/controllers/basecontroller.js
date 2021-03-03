class BaseController {
    constructor() {
        M.AutoInit();
        this.modelProject = new ModelProject()
        this.modelUser = new ModelUser()
    }
    validateRequiredField(selector, name) {
        const value =  $(selector).value
        if ((value == null) || (value === "")) {
            this.toast(`Le champ '${name}' est obligatoire`)
            $(selector).style.borderColor = 'red'
            return null
        }
        return value
    }
    toast(msg) {
        M.toast({html: msg, classes: 'rounded'})
    }
    displayNotFoundError() {
        this.toast('Objet introuvable')
    }
    displayServiceError() {
        this.toast('Service injoignable ou problème réseau')
    }
    getModal(selector) {
        return M.Modal.getInstance($(selector))
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }
    toDate(date){
        return date.toLocaleDateString()
    }
}
