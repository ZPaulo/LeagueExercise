import React, { Component } from "react";
import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import "../css/TeamDialogue.css";

class TeamDialogue extends Component {
    state = {
        teamName: "",
        teamImg: "",
        players: []
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.teamId !== nextProps.teamId) {
            axios
                .get(
                    `${nextProps.url}teams/${nextProps.teamId}?${
                        nextProps.token
                    }&include=squad.player`
                )
                .then(response => {
                    this.setState({
                        players: response.data.data.squad.data,
                        teamName: response.data.data.name,
                        teamImg: response.data.data.logo_path
                    });
                });
        }
    }

    render() {
        let playerItems;
        if (this.state.players.length > 0) {
            playerItems = this.state.players.map(playerInfo => (
                <ListGroupItem key={playerInfo.player_id}>
                    {playerInfo.player.data.common_name}{" "}
                </ListGroupItem>
            ));
        }
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header>
                    <Modal.Title>{this.state.teamName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <span className="float-md-left">
                                <figure className="center-block">
                                    <img
                                        src={this.state.teamImg}
                                        alt={`Logo for ${this.state.teamImg}`}
                                    />
                                </figure>
                            </span>
                        </div>
                        <div className="col-md-8">
                            <span className="float-md-right">
                                <ListGroup className="player-list">{playerItems}</ListGroup>
                            </span>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Close</Button>
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
