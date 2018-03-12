import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const TeamDialogue = props => (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>One fine body...</Modal.Body>

        <Modal.Footer>
            <Button>Close</Button>
        </Modal.Footer>
    </Modal>
);

TeamDialogue.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default TeamDialogue;
