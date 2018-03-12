import React, { Component } from "react";
import axios from "axios";
// eslint-disable-next-line
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";

const BASE_URL = "https://soccer.sportmonks.com/api/v2.0/";
const TOKEN = "api_token=HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC";

class LeagueTable extends Component {
    state = {
        apiData: []
    };
    componentDidMount() {
        axios.get(`${BASE_URL}standings/season/825?${TOKEN}`).then(response => {
            this.setState({ apiData: response.data.data[0].standings.data });
        });
    }

    handleSort(event, key) {
        const tempData = this.state.apiData.sort((a, b) => a[key] - b[key]);
        this.setState({ tempData });
    }

    render() {
        const rows = this.state.apiData.map(team => <TeamRow key={team.team_id} {...team} />);
        return (
            <Table striped hover>
                <thead className="thead-dark">
                    <tr>
                        <th onClick={e => this.handleSort(e, "position")}>Position</th>
                        <th>Team Name</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Drawn</th>
                        <th>Lost</th>
                        <th>Goal</th>
                        <th>Difference</th>
                        <th onClick={e => this.handleSort(e, "points")}>Points</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }
}
const TeamRow = props => (
    <tr>
        <td>{props.position}</td>
        <td>{props.team_name}</td>
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
    points: PropTypes.number.isRequired
};

export default LeagueTable;
