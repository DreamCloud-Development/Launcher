// langLoader.js

const fs = require('fs-extra');
const path = require('path');
const toml = require('toml');
const merge = require('lodash.merge');

let lang = {};

// Fun��o para carregar um idioma
function loadLanguage(id) {
    lang = merge(lang, toml.parse(fs.readFileSync(path.join(__dirname, '..', 'lang', `${id}.toml`))) || {});
}

// Fun��o para consultar um texto no idioma atual
function query(id, placeHolders) {
    let query = id.split('.');
    let res = lang;
    for (let q of query) {
        res = res[q];
    }
    let text = res === lang ? '' : res;
    if (placeHolders) {
        Object.entries(placeHolders).forEach(([key, value]) => {
            text = text.replace(`{${key}}`, value);
        });
    }
    return text;
}

// Fun��o para configurar o idioma
function setupLanguage(languageCode) {
    loadLanguage(languageCode);

    // Carregue o arquivo de idioma personalizado para o Launcher Customizer
    loadLanguage('_custom');
}

// Fun��o para mudar o idioma
function changeLanguage(languageCode) {
    loadLanguage(languageCode);
}

// Exportando as fun��es necess�rias
module.exports = {
    loadLanguage,
    query,
    queryJS: (id, placeHolders) => query(`js.${id}`, placeHolders),
    queryEJS: (id, placeHolders) => query(`ejs.${id}`, placeHolders),
    setupLanguage,
    changeLanguage
};
