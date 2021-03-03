class Projets{
    constructor(id_user, nom) {
        this.Id_user = id_user
        this.Nom = nom
    }
}
class User{
    constructor(Id_user, Username, Password, Droits) {
        this.Id_user = Id_user
        this.Username = Username
        this.Password = Password
        this.Droits = Droits
    }
}
class exigences{
    constructor(Description, Type, Fonctionnel) {
        this.Description = Description
        this.Type = Type
        this.Fonctionnel = Fonctionnel
    }
}
class jalons{
    constructor(Libelle, Id_user, Date_livraison_prevue, Date_livraison_reelle) {
        this.Libelle = Libelle
        this.Id_user = Id_user
        this.Date_livraison_prevue = Date_livraison_prevue
        this.Date_livraison_reelle = Date_livraison_reelle
    }
}
class taches{
    constructor(Libelle, Description, Id_user, Date_debut_theorique, Date_debut_reelle, Charge, Termine, Id_tache_liee) {
        this.Libelle = Libelle
        this.Description = Description
        this.Id_user = Id_user
        this.Date_debut_theorique = Date_debut_theorique
        this.Date_debut_reelle = Date_debut_reelle
        this.Charge = Charge
        this.Termine = Termine
        this.Id_tache_liee = Id_tache_liee
    }
}
class liaison_exigences_taches{
    constructor(Id_Projets, Id_Exigences, Id_Taches, Id_Jalons) {
        this.Id_Projets = Id_Projets
        this.Id_Exigences = Id_Exigences
        this.Taches = Id_Taches
        this.Id_Jalons = Id_Jalons
    }
}