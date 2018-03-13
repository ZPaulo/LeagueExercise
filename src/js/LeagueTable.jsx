import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { get, orderBy } from "lodash";
import TeamRow from "./TeamRow";
import TeamDialogue from "./TeamDialogue";
import TableHead from "./TableHead";

const BASE_URL = "https://soccer.sportmonks.com/api/v2.0/";
const TOKEN = "api_token=HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC";

class LeagueTable extends Component {
    state = {
        apiData: [],
        ascend: false,
        show: false,
        teamId: 0
    };
    componentDidMount() {
        axios.get(`${BASE_URL}standings/season/825?${TOKEN}`).then(response => {
            this.setState({ apiData: response.data.data[0].standings.data });
        });
    }

    handleShowModal(e, teamId) {
        e.preventDefault();
        this.setState({ show: true, teamId });
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
                team={team}
            />
        ));
        return (
            <div>
                <Table striped hover>
                    <TableHead handleSort={elem => this.handleSort(elem)} />
                    <tbody>{rows}</tbody>
                </Table>
                <TeamDialogue
                    show={this.state.show}
                    handleClose={() => this.handleCloseModal()}
                    teamId={this.state.teamId}
                    url={BASE_URL}
                    token={TOKEN}
                />
            </div>
        );
    }
}

export default LeagueTable;
