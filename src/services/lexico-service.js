const LOCALSTORAGE_KEY = 'vocabulary';

export default class LexicoService {
    setInitialVocabulary() {
        if (localStorage.getItem(LOCALSTORAGE_KEY)) {
            return
        }
        const initialVocabulary = {
            appData: {
                decksCount: 0,
                learnedDecksCount: 0,
                recordsCount: 0,
                learnedRecordsCount: 0,
            },
            decks: [],
            records: [],
        };
        return localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(initialVocabulary));
    }

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
