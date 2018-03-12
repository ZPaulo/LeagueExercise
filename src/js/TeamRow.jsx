import React from "react";
import PropTypes from "prop-types";

const TeamRow = props => (
    <tr>
        <td>{props.position}</td>
        <td>
            <a href="/" onClick={props.handleClick}>
                {props.team_name}
            </a>
        </td>
        <td>{props.overall.games_played}</td>
        <td>{props.overall.won}</td>
        <td>{props.overall.draw}</td>
        <td>{props.overall.lost}</td>
        <td>{props.overall.goals_scored}</td>
        <td>{props.total.goal_difference}</td>
        <td>{props.points}</td>
    </tr>
);

TeamRow.propTypes = {
    position: PropTypes.number.isRequired,
    team_name: PropTypes.string.isRequired,
    overall: PropTypes.shape({
        games_played: PropTypes.number,
        won: PropTypes.number,
        draw: PropTypes.number,
        lost: PropTypes.number,
        goals_scored: PropTypes.number,
        goals_against: PropTypes.number
    }).isRequired,
    total: PropTypes.shape({
        goal_difference: PropTypes.string,
        points: PropTypes.number
    }).isRequired,
    points: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default TeamRow;
