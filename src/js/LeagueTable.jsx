import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { get, orderBy } from "lodash";
import TeamRow from "./TeamRow";
import TeamDialogue from "./TeamDialogue";

const BASE_URL = "https://soccer.sportmonks.com/api/v2.0/";
const TOKEN = "api_token=HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC";

class LeagueTable extends Component {
    state = {
        apiData: [],
        ascend: false,
        show: false,
        apiTeam: {}
    };
    componentDidMount() {
        axios.get(`${BASE_URL}standings/season/825?${TOKEN}`).then(response => {
            this.setState({ apiData: response.data.data[0].standings.data });
        });
    }

    handleShowModal(e, teamId) {
        e.preventDefault();
        axios.get(`${BASE_URL}teams/${teamId}?${TOKEN}&include=squad`).then(response => {
            this.setState({ apiTeam: response.data });
        });
        this.setState({ show: true });
    }

    handleCloseModal() {
        this.setState({ show: false });
    }

    handleSort(key) {
        const { apiData, ascend } = this.state;
        let orderedData;
        if (key === "total.goal_difference") {
            orderedData = apiData.sort((a, b) => {
                if (ascend) {
                    return get(b, key) - get(a, key);
                }
                return get(a, key) - get(b, key);
            });
        } else {
            const order = ascend ? "asc" : "desc";
            orderedData = orderBy(apiData, key, order);
        }
        this.setState({ apiData: orderedData, ascend: !ascend });
    }

    render() {
        const rows = this.state.apiData.map(team => (
            <TeamRow
                key={team.team_id}
                handleClick={e => this.handleShowModal(e, team.team_id)}
                {...team}
            />
        ));
        return (
            <div>
                <pre>{JSON.stringify(this.state.apiTeam, null, 4)}</pre>
                <Table striped hover>
                    <thead className="thead-dark">
                        <tr>
                            <th onClick={() => this.handleSort("position")}>Position</th>
                            <th onClick={() => this.handleSort("team_name")}>Team Name</th>
                            <th onClick={() => this.handleSort("overall.games_played")}>Played</th>
                            <th onClick={() => this.handleSort("overall.won")}>Won</th>
                            <th onClick={() => this.handleSort("overall.draw")}>Drawn</th>
                            <th onClick={() => this.handleSort("overall.lost")}>Lost</th>
                            <th onClick={() => this.handleSort("overall.goals_scored")}>Goal</th>
                            <th onClick={() => this.handleSort("total.goal_difference")}>
                                Difference
                            </th>
                            <th onClick={() => this.handleSort("points")}>Points</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
                <TeamDialogue show={this.state.show} handleClose={() => this.handleCloseModal()} />
            </div>
        );
    }
}

export default LeagueTable;
