class LoginController extends BaseController{
    constructor() {
        super();
    }
    getiduser() {
        return this.iduser
    }
    goToProject(iduser){
        this.iduser = iduser
        navigate('index')
    }
    async authenticate() {
        let login = this.validateRequiredField('#inputlogin', 'Login')
        let password = this.validateRequiredField('#inputpassword', 'Mot de passe')
        let user
        if ((login != null) && (password != null)) {
            try{
                user = await this.modelUser.authenticate(login, password)
                if(user !== null){
                    this.goToProject(user.id_user)
                }
            }catch (e) {
                this.toast("Login ou mot de passe incorrect")
            }

        }else{
                this.toast("Login ou mot de passe incorrect")
        }
    }
}window.loginController = new LoginController()