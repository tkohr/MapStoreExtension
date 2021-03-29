export const mockSchemas = [{
    layer_id: "espub_mob:gev_jeu__23",
    title: "Rapport aires des jeux 23",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Titre", "default": ""},
        description: {type: "string", title: "Déscription"},
        open: {type: "boolean", title: "ouvert", "default": false},
        size: {type: "number", title: "Taille (en m²)"},
        date: {type: "string", format: "date", title: "Date"},
        file: {type: "string", format: "data-url", title: "Photo"},
        more: {type: "string", title: "Notes", "default": ""}
    }
}, {
    layer_id: "espub_mob:gev_ajeu__22",
    title: "Rapport aires des jeux 22",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Titre", "default": ""},
        description: {type: "string", title: "Déscription"},
        open: {type: "boolean", title: "ouvert", "default": false},
        size: {type: "number", title: "Taille (en m²)"},
        date: {type: "string", format: "date", title: "Date"},
        file: {type: "string", format: "data-url", title: "Photo"},
        "public": {type: "boolean", title: "publique", "default": false}
    }
}, {
    layer_id: "gs:us_states__6",
    title: "Rapport de l'état",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Titre", "default": ""},
        description: {type: "string", title: "Déscription"},
        open: {type: "boolean", title: "ouvert", "default": false},
        size: {type: "number", title: "Taille (en m²)"},
        date: {type: "string", format: "date", title: "Date"},
        file: {type: "string", format: "data-url", title: "Photo"},
        count: {type: "number", title: "Quantité"}
    }
}, {
    layer_id: "espub_mob:gev_jeu__23",
    title: "Rapport de la végétation 23",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Titre", "default": ""},
        description: {type: "string", title: "Déscription"},
        open: {type: "boolean", title: "ouvert", "default": false},
        size: {type: "number", title: "Taille (en m²)"},
        date: {type: "string", format: "date", title: "Date"},
        file: {type: "string", format: "data-url", title: "Photo"},
        expiration: {type: "string", format: "date", title: "Expiration"}
    }
}, {
    layer_id: "espub_mob:gev_ajeu__22",
    title: "Rapport de la végétation 22",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Titre", "default": ""},
        description: {type: "string", title: "Déscription"},
        open: {type: "boolean", title: "ouvert", "default": false},
        size: {type: "number", title: "Taille (en m²)"},
        date: {type: "string", format: "date", title: "Date"},
        file: {type: "string", format: "data-url", title: "Photo"},
        doc: {type: "string", format: "data-url", title: "Document"}
    }
}, {
    layer_id: "gs:us_states__6",
    title: "Rapport de la population",
    type: "object",
    required: ["title"],
    properties: {
        title: {type: "string", title: "Titre", "default": ""},
        description: {type: "string", title: "Déscription"},
        open: {type: "boolean", title: "ouvert", "default": false},
        size: {type: "number", title: "Taille (en m²)"},
        date: {type: "string", format: "date", title: "Date"},
        file: {type: "string", format: "data-url", title: "Photo"}
    }
}];
