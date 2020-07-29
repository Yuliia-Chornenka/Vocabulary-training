const LOCALSTORAGE_KEY = 'vocabulary';

export default class LexicoService {
    getVocabulary() {
        return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    }

    getDeck(id) {
        const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
        return vocabulary.decks.find(deck => deck.id === id);
    }

    getRecord(id) {
        const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
        return vocabulary.records.find(record => record.id === id);
    }

    exportVocabulary(data) {
        const dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);

        const downloadAnchorElem = document.createElement('a');
        downloadAnchorElem.setAttribute('href', dataString);
        downloadAnchorElem.setAttribute(
            'download',
            `vocabulary-${new Date().toISOString()}.json`,
        );
        downloadAnchorElem.click();
    }

    importVocabulary(data) {
        return new Promise((resolve) => {
            localStorage.setItem(LOCALSTORAGE_KEY, data);
            resolve(JSON.parse(data));
        });
    }

    deleteVocabulary() {
        return new Promise((resolve) => {
            localStorage.removeItem(LOCALSTORAGE_KEY);
            resolve(true);
        });
    }
}
