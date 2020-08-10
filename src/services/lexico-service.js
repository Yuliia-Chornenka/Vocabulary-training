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
            learnedRecordsIds: [],
            recordsIds: [],
            status: "in progress",
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
            };
            const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
            vocabulary.records.push(newRecord);
            vocabulary.appData.recordsCount++;
            const deckById = vocabulary.decks.find(deck => deck.id === deckId);
            deckById.recordsIds.push(recordId);
            deckById.status = "in progress";
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(vocabulary));
            resolve(vocabulary);
        });
    }

    learnRecord(id) {
        const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
        const learnedRecord = vocabulary.records.find(record => record.id === id);
        learnedRecord.iteration++;
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(vocabulary))
    }

    setLearnedRecord(deckId, recordId) {
        const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
        vocabulary.appData.learnedRecordsCount++;
        const deck = vocabulary.decks.find(deck => deck.id === deckId);
        if(deck.learnedRecordsIds.indexOf(recordId) === -1){
            deck.learnedRecordsIds = [...deck.learnedRecordsIds, recordId];
        }
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(vocabulary))
    }

    learnDeck(id) {
        const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
        const learnedDeck = vocabulary.decks.find(deck => deck.id === id);
        learnedDeck.iteration++;
        learnedDeck.status = 'learned';
        if (learnedDeck.iteration === 1) {
            vocabulary.appData.learnedDecksCount++
        }
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(vocabulary))
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

    deleteDeck(id) {
        return new Promise((resolve) => {
            const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
            vocabulary.appData.decksCount--;
            const deck= vocabulary.decks.find(deck => deck.id === id);
            if(deck.iteration >= 1) {
                vocabulary.appData.learnedDecksCount--;
            }
            const deckIndex = vocabulary.decks.findIndex(deck => deck.id === id);
            vocabulary.decks.splice(deckIndex, 1);
            vocabulary.records = vocabulary.records.filter(record => record.deckId !== id);
            vocabulary.appData.recordsCount = vocabulary.records.length;
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(vocabulary));
            resolve(vocabulary);
        });
    }

    deleteRecord(recordId, deckId) {
        return new Promise((resolve) => {
            const vocabulary = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
            vocabulary.appData.recordsCount--;
            const record = vocabulary.records.find(record => record.id === recordId);
            if(record.iteration >= 5) {
                vocabulary.appData.learnedRecordsCount--;
            }
            const recordIndex = vocabulary.records.findIndex(record => record.id === recordId);
            vocabulary.records.splice(recordIndex, 1);
            const deckIndex = vocabulary.decks.findIndex(deck => deck.id === deckId);
            const recordIndexInDecks = vocabulary.decks[deckIndex].recordsIds
                .findIndex(record => record === recordId);
            vocabulary.decks[deckIndex].recordsIds.splice(recordIndexInDecks, 1);
            const learnedRecordIndexInDecks = vocabulary.decks[deckIndex].learnedRecordsIds
                .findIndex(record => record === recordId);
            vocabulary.decks[deckIndex].learnedRecordsIds.splice(learnedRecordIndexInDecks, 1);
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(vocabulary));
            resolve(vocabulary);
        });
    }
}
