import React from "react";
import PropTypes from "prop-types";

/* eslint camelcase: 0 */

const TeamRow = props => {
    const { position, team_name, overall, total, points } = props.team;
    const { games_played, won, draw, lost, goals_scored } = overall;
    return (
        <tr>
            <td>{position}</td>
            <td>
                <a href="/" onClick={props.handleClick}>
                    {team_name}
                </a>
            </td>
            <td>{games_played}</td>
            <td>{won}</td>
            <td>{draw}</td>
            <td>{lost}</td>
            <td>{goals_scored}</td>
            <td>{total.goal_difference}</td>
            <td>{points}</td>
        </tr>
    );
};
TeamRow.propTypes = {
    team: PropTypes.shape({
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
        points: PropTypes.number.isRequired
    }).isRequired,
    handleClick: PropTypes.func.isRequired
};

export default TeamRow;
