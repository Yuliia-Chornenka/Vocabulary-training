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
            translateValue: '',
            wordIndex: 0,
            wordFirstSide: '',
            wordSecondSide: '',
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
        if (this.state.wordIndex !== prevState.wordIndex) {
            this.getDeck();
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
        this.setState({
            decksArray: [ deck ],
            recordsList: recordsList,
            wordFirstSide: recordsList[wordIndex].firstSide,
            wordSecondSide: recordsList[wordIndex].secondSide,
        });
    };

    handleChange = (e) => {
        const { wordSecondSide, wordIndex, recordsList } = this.state;
        this.setState({ translateValue: e.target.value });
        if (wordSecondSide === e.target.value && wordIndex - recordsList.length === -1) {
            this.setState({ isTrainingFinished: true });
            this.playTrainingSuccessAudio();
            return;
        }

        if (wordSecondSide === e.target.value) {
            this.setState((state) => ({
                wordIndex: state.wordIndex + 1,
                translateValue: ''
            }));
            this.playRecordSuccessAudio();
        }
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
        const { decksArray, wordFirstSide, translateValue, isTrainingFinished } = this.state;
        return (
            <Fragment>
                <DeckBlock
                    backBtn={true}
                    deleteBtn={false}
                    decksArray={decksArray}
                    searchValue=''
                    isDeckPage={true}
                />

                { !isTrainingFinished &&
                <WordToTrain
                    wordFirstSide={wordFirstSide}
                /> }

                { !isTrainingFinished &&
                <TrainingForm
                    label='enter translation of the record above'
                    handleChange={this.handleChange}
                    value={translateValue}
                /> }

                { isTrainingFinished &&
                <TrainingFinished /> }

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
