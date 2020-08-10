import React, { Component, Fragment } from 'react';
import './index.scss';
import { TrainingForm } from '../../blocks/training-form';
import { WordToTrain } from '../../blocks/word-to-train';
import { TrainingFinished } from '../../blocks/training-finished';
import DeckBlock from '../../blocks/deck-block';
import recordSuccess from '../../../shared/audio/recordSuccess.mp3'
import trainingSuccess from '../../../shared/audio/trainingSuccess.mp3'
import { withRouter } from "react-router-dom";
import LexicoService from "../../../services/lexico-service";

class TrainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decksArray: [],
            recordsList: [],
            listToTrain: [],
            translateValue: '',
            wordIndex: 0,
            wordFirstSide: '',
            wordId: '',
            progressPercent: 0,
            trainingPercent: 0,
            isTrainingFinished: false,
        };
    }

    lexicoService = new LexicoService();
    recordSuccessAudio = React.createRef();
    trainingSuccessAudio = React.createRef();

    componentDidMount() {
        this.getDeck();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { wordIndex, listToTrain } = this.state;
        if (wordIndex !== prevState.wordIndex) {
            this.setState({
                wordFirstSide: listToTrain[wordIndex].firstSide,
                wordId: listToTrain[wordIndex].id,
            });
        }
    }

    getDeck = () => {
        const { wordIndex } = this.state;
        const { match } = this.props;
        const { id } = match.params;
        const deck = this.lexicoService.getDeck(id);
        const recordsList = [];
        deck.recordsIds.forEach((recordId) => {
            const record = this.lexicoService.getRecord(recordId);
            recordsList.push(record);
        });

        const listToTrain = recordsList.sort((a, b) => a.iteration > b.iteration ? 1 : -1)
            .slice(0, 5);

        this.setState({
            decksArray: [ deck ],
            recordsList: recordsList,
            listToTrain: listToTrain,
            wordId: listToTrain[wordIndex].id,
            wordFirstSide: listToTrain[wordIndex].firstSide,
        });
    };

    handleChange = (e) => {
        const { match } = this.props;
        const { id } = match.params;
        const { wordIndex, wordId, listToTrain } = this.state;
        this.setState({ translateValue: e.target.value });

        const wordSecondSide = listToTrain[wordIndex].secondSide.toLowerCase();

        if (wordSecondSide=== e.target.value.toLowerCase() && wordIndex - listToTrain.length === -1) {
            this.setState({
                isTrainingFinished: true,
                trainingPercent: 100
            });
            this.playTrainingSuccessAudio();
            this.lexicoService.learnRecord(wordId);

            const record = this.lexicoService.getRecord(wordId);
            if(record.iteration === 5) {
                this.lexicoService.setLearnedRecord(id, wordId);
            }

            const deck = this.lexicoService.getDeck(id);
            if(deck.recordsIds.length === deck.learnedRecordsIds.length) {
                this.lexicoService.learnDeck(id);
                const deck = this.lexicoService.getDeck(id);
                this.setState({ decksArray: [ deck ] });
            }
            return;
        }

        if (wordSecondSide === e.target.value.toLowerCase()) {
            this.setState((state) => ({
                wordIndex: state.wordIndex + 1,
                translateValue: '',
                progressPercent: 0,
            }));
            this.playRecordSuccessAudio();
            this.lexicoService.learnRecord(wordId);

            const record = this.lexicoService.getRecord(wordId);
            if(record.iteration === 5) {
                this.lexicoService.setLearnedRecord(id, wordId);
                const deck = this.lexicoService.getDeck(id);
                this.setState({ decksArray: [ deck ] });
            }
            return;
        }

        if (!wordSecondSide.startsWith(e.target.value.toLowerCase())) {
            this.setState({ progressPercent: 0 });
            return;
        }

        this.setState({ progressPercent: (e.target.value.length / wordSecondSide.length) * 100 });
    };

    playRecordSuccessAudio = () => {
        this.playAudio(this.recordSuccessAudio.current);
    };

    playTrainingSuccessAudio = () => {
        this.playAudio(this.trainingSuccessAudio.current);
    };

    playAudio = (audio) => {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    };

    render() {
        const { decksArray, wordFirstSide, translateValue, progressPercent,
            isTrainingFinished, listToTrain, wordIndex, trainingPercent } = this.state;
        const percent = trainingPercent ? trainingPercent : (wordIndex / listToTrain.length) * 100;
        return (
            <Fragment>
                <DeckBlock
                    backBtn={true}
                    deleteBtn={false}
                    decksArray={decksArray}
                    searchValue=''
                    isDeckPage={true}
                    percent={percent}
                />

                {!isTrainingFinished &&
                <WordToTrain
                    wordFirstSide={wordFirstSide}
                />}

                {!isTrainingFinished &&
                <TrainingForm
                    label='enter translation of the record above'
                    handleChange={this.handleChange}
                    value={translateValue}
                    progressPercent={progressPercent}
                />}

                {isTrainingFinished &&
                <TrainingFinished />}

                <p className='sound'> Sound effects obtained from
                    <a
                        href="https://www.zapsplat.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='sound__link'
                    > https://www.zapsplat.com
                    </a>
                </p>

                <audio
                    ref={this.recordSuccessAudio}
                    src={recordSuccess}
                />
                <audio
                    ref={this.trainingSuccessAudio}
                    src={trainingSuccess}
                />
            </Fragment>
        )
    }
}

export default withRouter(TrainPage);
