import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import PropTypes from "prop-types";

const PlayerBody = props => (
    <Tabs defaultActiveKey={1} id="player-info">
        <Tab eventKey={1} title="Personal Info">
            <dl className="dl-horizontal">
                <dt>Full Name</dt>
                <dd>{props.player.player.data.fullname}</dd>
                <dt>Position</dt>
                <dd>{props.player.player.data.position.data.name}</dd>
                <dt>Nationality</dt>
                <dd>{props.player.player.data.nationality}</dd>
                <dt>Birth Date</dt>
                <dd>{props.player.player.data.birthdate}</dd>
                <dt>Height</dt>
                <dd>{props.player.player.data.height}</dd>
                <dt>Weight</dt>
                <dd>{props.player.player.data.weight}</dd>
            </dl>
        </Tab>
        <Tab eventKey={2} title="Statistics">
            <dl className="dl-horizontal">
                <dt>Minutes Played</dt>
                <dd>{props.player.minutes}</dd>
                <dt>Goals</dt>
                <dd>{props.player.goals}</dd>
                <dt>Assists</dt>
                <dd>{props.player.assists}</dd>
                <dt>Yellow Cards</dt>
                <dd>{props.player.yellowcards}</dd>
                <dt>Double Yellow Cards</dt>
                <dd>{props.player.yellowred}</dd>
                <dt>Red Cards</dt>
                <dd>{props.player.redcards}</dd>
            </dl>
        </Tab>
    </Tabs>
);

PlayerBody.propTypes = {
    player: PropTypes.shape({
        minutes: PropTypes.number.isRequired,
        goals: PropTypes.number.isRequired,
        assists: PropTypes.number.isRequired,
        yellowcards: PropTypes.number.isRequired,
        yellowred: PropTypes.number.isRequired,
        redcards: PropTypes.number.isRequired,
        player: PropTypes.shape({
            data: PropTypes.shape({
                fullname: PropTypes.string.isRequired,
                nationality: PropTypes.string.isRequired,
                birthdate: PropTypes.string.isRequired,
                height: PropTypes.string,
                weight: PropTypes.string,
                position: PropTypes.shape({
                    data: PropTypes.shape({
                        name: PropTypes.string.isRequired
                    }).isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    }).isRequired
};

export default PlayerBody;
