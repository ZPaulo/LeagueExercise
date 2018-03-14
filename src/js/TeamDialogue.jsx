import React, { Component } from "react";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import TeamBody from "./TeamBody";
import PlayerBody from "./PlayerBody";
import "../css/TeamDialogue.css";

class TeamDialogue extends Component {
    state = {
        teamLogo: "",
        teamName: "",
        players: [],
        title: "",
        logo: "",
        playerId: 0,
        teams: []
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.teamId !== nextProps.teamId) {
            this.reset();
            const index = this.state.teams.findIndex(elem => elem.id === nextProps.teamId);
            if (index > -1) {
                this.setState({
                    players: this.state.teams[index].squad.data,
                    teamName: this.state.teams[index].name,
                    title: this.state.teams[index].name,
                    teamLogo: this.state.teams[index].logo_path,
                    logo: this.state.teams[index].logo_path
                });
            } else {
                axios
                    .get(
                        `${nextProps.url}teams/${nextProps.teamId}?${
                            nextProps.token
                        }&include=squad.player.position`
                    )
                    .then(response => {
                        this.setState({
                            players: response.data.data.squad.data,
                            teamName: response.data.data.name,
                            title: response.data.data.name,
                            teamLogo: response.data.data.logo_path,
                            logo: response.data.data.logo_path,
                            teams: [...this.state.teams, response.data.data]
                        });
                    });
            }
        }
    }

    handleClick(id, title, logo) {
        this.setState({ title, logo, playerId: id });
    }

    handleBack() {
        this.setState({
            title: this.state.teamName,
            logo: this.state.teamLogo,
            playerId: 0
        });
    }

    reset() {
        this.setState({
            teamLogo: "",
            teamName: "",
            players: [],
            title: "",
            logo: "",
            playerId: 0
        });
    }

    render() {
        let backButton = "";
        let listComponent;
        if (this.state.players.length > 0) {
            if (this.state.playerId > 0) {
                const index = this.state.players.findIndex(
                    elem => elem.player_id === this.state.playerId
                );
                listComponent = <PlayerBody player={this.state.players[index]} />;

                backButton = (
                    <Button bsStyle="primary" onClick={() => this.handleBack()}>
                        Back
                    </Button>
                );
            } else {
                listComponent = (
                    <TeamBody
                        players={this.state.players}
                        handleClick={(id, title, logo) => this.handleClick(id, title, logo)}
                    />
                );
            }
        }

        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row">
                        <div className="col-md-4">
                            <span className="float-md-left">
                                <figure className="center-block">
                                    <img src={this.state.logo} alt={`Logo for team`} />
                                </figure>
                            </span>
                        </div>
                        <div className="col-md-8">
                            <span className="float-md-right">{listComponent}</span>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <ButtonToolbar className="modal-buttons">
                        {backButton}
                        <Button onClick={this.props.handleClose}>Close</Button>
                    </ButtonToolbar>
                </Modal.Footer>
            </Modal>
        );
    }
}

TeamDialogue.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    teamId: PropTypes.number.isRequired
};

export default TeamDialogue;
