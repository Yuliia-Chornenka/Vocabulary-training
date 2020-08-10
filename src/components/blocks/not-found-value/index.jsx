import React, { Component } from 'react';
import './index.scss';
import { Button } from '../../shared-ui/button';
import { Container } from "../../shared-ui/container";
import LexicoService from "../../../services/lexico-service";
import { withRouter } from "react-router-dom";

class NotFoundValue extends Component {
    constructor(props) {
        super(props);
        this.state = { decksRecordsCount: 0 };
    }

    lexicoService = new LexicoService();

    componentDidMount() {
        const { match } = this.props;
        const { id } = match.params;
        if (id) {
            const deck = this.lexicoService.getDeck(id);
            this.setState({ decksRecordsCount: deck.recordsIds.length });
        }
    }

    render() {
        const { decksRecordsCount } = this.state;
        const { searchValue, blockName, createNewDeck, openNewRecordForm } = this.props;
        return (
            <Container>
                <p className='text'>
                    oops, no {`'${searchValue}'-containing ${blockName}s found`}
                </p>
                {decksRecordsCount === 30 ?
                    <p className='error'>
                        And you cannot create a new record because the maximum number of records in a deck is 30
                        <span role="img" aria-label="trophy"> 😊 </span>
                    </p>
                    :
                    <Button
                        name={`Create '${searchValue}' ${blockName}`}
                        className='btn__main'
                        onClick={blockName === 'deck' ? createNewDeck : openNewRecordForm}
                    />
                }
            </Container>
        )
    };
}

export default withRouter(NotFoundValue);
