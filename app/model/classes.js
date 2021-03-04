class Projets{
    constructor(id_user, nom) {
        this.id_user = id_user
        this.nom = nom
    }
}
class User{
    constructor(id_user, username, password, droits) {
        this.id_user = id_user
        this.username = username
        this.password = password
        this.droits = droits
    }
}
class Exigences{
    constructor(description, type, fonctionnel) {
        this.description = description
        this.type = type
        this.fonctionnel = fonctionnel
    }
}
class Jalons{
    constructor(libelle, id_user, date_livraison_prevue, date_livraison_reelle) {
        this.libelle = libelle
        this.id_user = id_user
        this.date_livraison_prevue = date_livraison_prevue
        this.date_livraison_reelle = date_livraison_reelle
    }
}
class Taches{
    constructor(libelle, description, id_user, date_debut_theorique, date_debut_reelle, charge, termine, id_tache_liee) {
        this.libelle = libelle
        this.description = description
        this.id_user = id_user
        this.date_debut_theorique = date_debut_theorique
        this.date_debut_reelle = date_debut_reelle
        this.charge = charge
        this.termine = termine
        this.id_tache_liee = id_tache_liee
    }
}
class Liaison{
    constructor(id_projets, id_exigences, id_taches, id_jalons) {
        this.id_projets = id_projets
        this.id_exigences = id_exigences
        this.id_taches = id_taches
        this.id_jalons = id_jalons
    }
}