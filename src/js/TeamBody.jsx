import FaMedkit from "react-icons/lib/fa/medkit";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import PropTypes from "prop-types";
import "../css/TeamBody.css";

const TeamBody = props => {
    const injuredIcon = <FaMedkit className="injured-icon" />;
    return (
        <ListGroup className="player-list">
            {props.players.map(playerInfo => {
                const icon = playerInfo.injured ? injuredIcon : "";
                return (
                    <ListGroupItem
                        onClick={() =>
                            props.handleClick(
                                playerInfo.player_id,
                                playerInfo.player.data.common_name,
                                playerInfo.player.data.image_path
                            )
                        }
                        key={playerInfo.player_id}
                    >
                        <span>{playerInfo.player.data.common_name}</span>
                        {icon}
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
};

TeamBody.propTypes = {
    players: PropTypes.arrayOf(
        PropTypes.shape({
            injured: PropTypes.bool.isRequired,
            player_id: PropTypes.number.isRequired,
            player: PropTypes.shape({
                data: PropTypes.shape({
                    common_name: PropTypes.string.isRequired,
                    image_path: PropTypes.string.isRequired
                }).isRequired
            }).isRequired
        })
    ).isRequired
};

export default TeamBody;
