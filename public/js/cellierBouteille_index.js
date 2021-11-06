document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
        /**
         * Requête fetch pour incrémenter la quantité d'une bouteille à un cellier sans recharger la page
         */
        const btnAjouter = section.querySelector(
            '[name="btnAjouterBouteille"]'
        );
        const quantitePrecedent = section.querySelector(".quantite > span");

        btnAjouter.addEventListener("click", (e) => {
            e.preventDefault();

            fetch(btnAjouter.href)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    quantitePrecedent.innerHTML =
                        parseInt(quantitePrecedent.innerHTML) + response;
                })
                .catch((error) => console.log(error));
        });

        /**
         * Requête fetch pour décrémenter la quantité d'une bouteille à un cellier sans recharger la page
         */
        const btnRetirer = section.querySelector(
            '[name="btnRetirerBouteille"]'
        );

        btnRetirer.addEventListener("click", (e) => {
            e.preventDefault();

            fetch(btnRetirer.href)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    if (parseInt(quantitePrecedent.innerHTML) + response >= 0)
                        quantitePrecedent.innerHTML =
                            parseInt(quantitePrecedent.innerHTML) + response;
                })
                .catch((error) => console.log(error));
        });
    });

    /**
     * Message Dialogue si une bouteille a été créé
     */

    const nouvelleBouteille = document.querySelector(".nouvelleBouteille");

    if (nouvelleBouteille) {
        var toastHTML =
            '<span>Une nouvelle bouteille a été ajoutée</span><button class="btn-flat toast-action">Fermer</button>';
        M.toast({ html: toastHTML, displayLength: 5000 });

        const message = document.querySelector(".toast-action");

        message.addEventListener("click", () => {
            M.Toast.dismissAll();
        });
    }

    /**
     * Note
     */
    new StarRating(".star-rating", {
        maxStars: 5,
        clearable: true,
        classNames: {
            active: "gl-active",
            base: "gl-star-rating",
            selected: "gl-selected",
        },
        stars: function (el, item, index) {
            el.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect class="gl-star-full" width="19" height="19" x="2.5" y="2.5"/><polygon fill="#FFF" points="12 5.375 13.646 10.417 19 10.417 14.665 13.556 16.313 18.625 11.995 15.476 7.688 18.583 9.333 13.542 5 10.417 10.354 10.417"/></svg>';
        },
        tooltip: false,
    });

    /**
     * Ajouter un note à une bouteille en cliquant sur une étoile
     */
    const notes = document.querySelectorAll(".star-rating");

    notes.forEach((note) => {
        note.addEventListener("change", (e) => {
            const idBouteille = e.target.dataset.idBouteille;
            const millesime = e.target.dataset.millesime;
            const idCellier = location.pathname.split("/")[2];
            const note = document.querySelector("[data-rating]").dataset.rating;

            fetch(
                `/ajouterNote/${idCellier}/${idBouteille}/${millesime}/${note}`
            ).catch((error) => console.log(error));
        });
    });

    /**
     * Un select permettant de changer de cellier
     */
    var selectCellier = document.querySelector('[name="id"]');
    M.FormSelect.init(selectCellier);

    selectCellier.addEventListener("change", (e) => {
        location.href = location.origin + "/cellier/" + e.target.value;
    });

    const btnRecherche = document.querySelector(".searchbutton");
    const barreRecherche = document.querySelector(".search");
    const btnAjouterVin = document.querySelector(".bouton-ajout-vin");

    btnRecherche.addEventListener("click", (e) => {
        e.preventDefault();

        btnRecherche.classList.toggle("focus");

        if (btnRecherche.classList.contains("focus")) {
            btnAjouterVin.style.visibility = "hidden";
            barreRecherche.focus();
        } else {
            barreRecherche.blur();
            btnAjouterVin.style.visibility = "visible";
        }
    });

    window.addEventListener("click", (e) => {
        if (!btnRecherche.contains(e.target)) {
            btnRecherche.classList.remove("focus");
            btnAjouterVin.style.visibility = "visible";
        }
    });

    const idCellier = location.pathname.split("/")[2];
    const articlesConteneur = document.querySelector(".articlesConteneur");
    let chemin;
    barreRecherche.addEventListener("input", () => {
        chemin = `/rechercheDansCellier/${barreRecherche.value}/${idCellier}`;
            if(barreRecherche.value.trim() == '')  {
                chemin = `/reinitialiserCellier/${idCellier}`;
            }
            articlesConteneur.innerHTML = "";
            fetch(chemin)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    let bouteilles = {};

                    for (let index = 0; index < response.length; index++) {
                        if (!bouteilles[response[index].bouteille_id]) {
                            bouteilles[response[index].bouteille_id] = {
                                nom: response[index].nom,
                                pays: response[index].pays,
                                taille: response[index].taille,
                                url_img: response[index].url_img,
                                url_saq: response[index].url_saq,
                                type: response[index].type,
                                millesimes: [
                                    {
                                        millesime: response[index].millesime,
                                        quantite: response[index].quantite,
                                        note: response[index].note,
                                    },
                                ],
                            };
                        } else {
                            bouteilles[
                                response[index].bouteille_id
                            ].millesimes.push({
                                millesime: response[index].millesime,
                                quantite: response[index].quantite,
                                note: response[index].note,
                            });
                        }
                    }
                    for (const key of Object.keys(bouteilles)) {
                        
                        let saq = "";
                        if (bouteilles[key].url_saq != null) {
                            saq = `<div class="bouteilleSAQConteneur"> <a class="lienSAQ" href="${bouteilles[key].url_saq}">SAQ</a>
                                        <div class="cercle ">
                                            <i class="material-icon check">check</i>
                                        </div>
                                    </div>`;
                        } else {
                            saq = ` <div class="bouteilleSAQConteneur"> 
                                        <p>SAQ</p>
                                        <div class="cercle ">
                                            <i class="material-icon check">close</i>
                                        </div>
                                    </div>`;
                        }
                        let infoCellierBouteilleConteneur = '<div class="infoCellierBouteilleConteneur">'
                        bouteilles[key].millesimes.forEach((millesime) => {
                            if (millesime.millesime > 0) {
                                millesimeTexte = `  <p>${millesime.millesime}</p>`;
                            } else {
                                millesimeTexte = `<p>Non millisimé</p>`;
                            }

                            note = `  <div class="select">
                                            <select class="star-rating" data-id-bouteille="${key}" data-millesime="${millesime.millesime}" name="note">
                                                <option value="">Choisir une note</option>
                                                <option value="5"`; if(millesime.note == 5) {note += `selected`} note +=`>Excellent</option>
                                                <option value="4"`; if(millesime.note == 4) {note += `selected`} note +=`>Très bon</option>
                                                <option value="3"`; if(millesime.note == 3) {note += `selected`} note +=`>Passable</option>
                                                <option value="2"`; if(millesime.note == 2) {note += `selected`} note +=`>Médiocre</option>
                                                <option value="1"`; if(millesime.note == 1) {note += `selected`} note +=`>Terrible</option>
                                            </select>
                                        </div>`;
                            infoCellierBouteilleConteneur += `   <section class="infoCellierBouteille">
                                                                    <div class="infoUnitaires">
                                                                        ${millesimeTexte}     
                                                                        ${note}
                                                
                                                                        <p class="quantite">Quantité : <span>${millesime.quantite}</span></p>
                                                                    </div>
                                                                    <div class=" flex bouton-conteneur">
                                                                        <div class="cercle bouton-cercle-remove">
                                                                            <a class="btn-floating btn-large waves-effect waves-light " name="btnRetirerBouteille" href="/boireBouteille/${idCellier}/${key}/${millesime.millesime}">
                                                                                <i class="material-icon">remove</i>
                                                                            </a>
                                                                        </div>
                                                                        <div class="cercle bouton-cercle-add">
                                                                            <a class="btn-floating btn-large waves-effect waves-light" name="btnAjouterBouteille" href="/ajouterBouteille/${idCellier}/${key}/${millesime.millesime}">
                                                                                <i class="material-icon">add</i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </section>`;
                        });
                        infoCellierBouteilleConteneur += '</div>'
                        
                        articlesConteneur.innerHTML += `<article class="articleVin">
                                                            <a href="/cellier/${idCellier}/${key}">
                                                                <div class="nomVinConteneur">
                                                                    <h2>${bouteilles[key].nom}</h2>
                                                                </div>
                                                            </a>
                                                            <div class="infoBouteilleConteneur">
                                                                <img class="image" src="${bouteilles[key].url_img}" alt="Image ${bouteilles[key].nom}">
                                                                <div class="info">
                                                                    <div>
                                                                        <p>${bouteilles[key].pays}</p>
                                                                        <p>${bouteilles[key].type}</p>
                                                                    </div>                
                                                                    <p class="taille">${bouteilles[key].taille} cl</p>                 
                                                                </div>
                                                                ${saq}
                                                            </div>
                                                            ${infoCellierBouteilleConteneur}
                                                                
                                                        </article>`;
                    }

                    new StarRating(".star-rating", {
                        maxStars: 5,
                        clearable: true,
                        classNames: {
                            active: "gl-active",
                            base: "gl-star-rating",
                            selected: "gl-selected",
                        },
                        stars: function (el, item, index) {
                            el.innerHTML =
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect class="gl-star-full" width="19" height="19" x="2.5" y="2.5"/><polygon fill="#FFF" points="12 5.375 13.646 10.417 19 10.417 14.665 13.556 16.313 18.625 11.995 15.476 7.688 18.583 9.333 13.542 5 10.417 10.354 10.417"/></svg>';
                        },
                        tooltip: false,
                    });
                 
                    const sections = document.querySelectorAll("section");

                    sections.forEach((section) => {
                        /**
                         * Requête fetch pour incrémenter la quantité d'une bouteille à un cellier sans recharger la page
                         */
                        const btnAjouter = section.querySelector(
                            '[name="btnAjouterBouteille"]'
                        );
                        const quantitePrecedent =
                            section.querySelector(".quantite > span");

                        btnAjouter.addEventListener("click", (e) => {
                            e.preventDefault();

                            fetch(btnAjouter.href)
                                .then((response) => {
                                    return response.json();
                                })
                                .then((response) => {
                                    quantitePrecedent.innerHTML =
                                        parseInt(quantitePrecedent.innerHTML) +
                                        response;
                                })
                                .catch((error) => console.log(error));
                        });

                        /**
                         * Requête fetch pour décrémenter la quantité d'une bouteille à un cellier sans recharger la page
                         */
                        const btnRetirer = section.querySelector(
                            '[name="btnRetirerBouteille"]'
                        );

                        btnRetirer.addEventListener("click", (e) => {
                            e.preventDefault();

                            fetch(btnRetirer.href)
                                .then((response) => {
                                    return response.json();
                                })
                                .then((response) => {
                                    if (
                                        parseInt(quantitePrecedent.innerHTML) +
                                            response >=
                                        0
                                    )
                                        quantitePrecedent.innerHTML =
                                            parseInt(
                                                quantitePrecedent.innerHTML
                                            ) + response;
                                })
                                .catch((error) => console.log(error));
                        });
                    });

                        /**
     * Ajouter un note à une bouteille en cliquant sur une étoile
     */
    const notes = document.querySelectorAll(".star-rating");

    notes.forEach((note) => {
        note.addEventListener("change", (e) => {
            const idBouteille = e.target.dataset.idBouteille;
            const millesime = e.target.dataset.millesime;
            const idCellier = location.pathname.split("/")[2];
            const note = document.querySelector("[data-rating]").dataset.rating;

            fetch(
                `/ajouterNote/${idCellier}/${idBouteille}/${millesime}/${note}`
            ).catch((error) => console.log(error));
        });
    });

                })
                .catch((error) => console.log(error));
        
    });
});

