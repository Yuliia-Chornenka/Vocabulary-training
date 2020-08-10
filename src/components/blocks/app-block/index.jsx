import React, { Component, Fragment } from 'react';
import './index.scss';
import { Container } from '../../shared-ui/container';
import { ContainerTitle } from '../../shared-ui/container-title';
import { ProgressBar } from '../../shared-ui/progress-bar';
import { Button } from '../../shared-ui/button';
import LexicoService from '../../../services/lexico-service';


export class AppBlock extends Component {
    lexicoService = new LexicoService();
    fileInput = React.createRef();

    componentDidMount() {
        const { loadVocabulary } = this.props;
        loadVocabulary();
    }

    importVocabulary = () => {
        this.fileInput.current.click();
    };

    exportVocabulary = () => {
        const data = this.lexicoService.getVocabulary();
        this.lexicoService.exportVocabulary(data);
    };

    render() {
        const { isVocabulary, onFileChange, resetVocabulary, decksCount,
            recordsCount, learnedDecksCount, learnedRecordsCount } = this.props;
        return (
            <Container>
                <ContainerTitle name='Lexico' />
                {isVocabulary ? (
                    <Fragment>
                        <ProgressBar
                            height='2px'
                            marginTop='0'
                            percent={(learnedDecksCount / decksCount) * 100}
                            colored={false}
                        />
                        <p>{learnedDecksCount}/{decksCount} decks learned</p>
                        <p>{learnedRecordsCount}/{recordsCount} records learned</p>
                        <div className='btn__container'>
                            <input
                                ref={this.fileInput}
                                id="fileInput"
                                type="file"
                                accept="application/JSON"
                                onChange={onFileChange}
                                hidden
                            />
                            <Button
                                name='Import vocabulary'
                                className='btn__main'
                                htmlFor="fileInput"
                                onClick={this.importVocabulary}
                            />
                            <Button
                                name='Export vocabulary'
                                className='btn__second'
                                onClick={this.exportVocabulary}
                            />
                            <Button
                                name='Reset'
                                className='btn__danger'
                                onClick={resetVocabulary}
                            />
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p><i>Vocabulary is empty</i></p>
                        <input
                            ref={this.fileInput}
                            id="fileInput"
                            type="file"
                            accept="application/JSON"
                            onChange={onFileChange}
                            hidden
                        />
                        <Button
                            name='Import vocabulary'
                            className='btn__second btn__big'
                            htmlFor="fileInput"
                            onClick={this.importVocabulary}
                        />
                    </Fragment>
                )}
            </Container>
        )
    };
}
