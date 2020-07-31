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

    createDeck(title) {
        const newDeck = {
            id: Date.now() + '',
            title,
            iteration: 0,
            lastRepetition: null,
            learnedRecordsIds: [],
            nextRepetition: null,
            recordsIds: [],
            status: "inProgress",
            type: "deck",
        };
        const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
        vocabulary.decks.push(newDeck);
        vocabulary.appData.decksCount++;
        return localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(vocabulary));
    }

    createRecord(valueFirstSide, valueSecondSide, deckId) {
        return new Promise((resolve) => {
            const recordId = Date.now() + '';
            const newRecord = {
                id: recordId,
                firstSide: valueFirstSide,
                secondSide: valueSecondSide,
                deckId: deckId,
                iteration: 0,
                lastRepetition: null,
                nextRepetition: null
            };
            const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
            vocabulary.records.push(newRecord);
            vocabulary.appData.recordsCount++;
            const deckById = vocabulary.decks.find(deck => deck.id === deckId);
            deckById.recordsIds.push(recordId);
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(vocabulary))
            resolve(vocabulary);
        });
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
        const dataString = 'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(data));

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
            resolve(localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(initialVocabulary)));
        });
    }
}
