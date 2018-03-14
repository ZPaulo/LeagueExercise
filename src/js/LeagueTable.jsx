import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { get, orderBy } from "lodash";
import PropTypes from "prop-types";
import TeamRow from "./TeamRow";
import TeamDialogue from "./TeamDialogue";
import TableHead from "./TableHead";

class LeagueTable extends Component {
    state = {
        apiData: [],
        ascend: false,
        show: false,
        teamId: 0,
        loading: true
    };

    componentWillReceiveProps(nextProps) {
        if (
            (this.props.season !== nextProps.season || this.props.stage !== nextProps.stage) &&
            nextProps.season !== 0 &&
            nextProps.stage !== -1
        ) {
            this.setState({ loading: true });
            axios
                .get(`${nextProps.url}standings/season/${nextProps.season}?${nextProps.token}`)
                .then(response => {
                    const stageIndex = response.data.data.findIndex(
                        elem => elem.stage_id === nextProps.stage
                    );
                    if (stageIndex > -1) {
                        this.setState({
                            apiData: response.data.data[stageIndex].standings.data
                        });
                    } else {
                        this.setState({
                            apiData: []
                        });
                    }
                    this.setState({
                        loading: false
                    });
                });
        }
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
        let rows;
        let error = "";
        if (this.state.loading) {
            error = <h3>Loading...</h3>;
        } else if (this.state.apiData.length > 0) {
            rows = this.state.apiData.map(elem => (
                <TeamRow
                    key={elem.team_id}
                    handleClick={e => this.handleShowModal(e, elem.team_id)}
                    team={elem}
                />
            ));
        } else {
            error = <h3>No data available</h3>;
        }
        return (
            <div>
                {error}
                <Table striped hover>
                    <TableHead handleSort={elem => this.handleSort(elem)} />
                    <tbody>{rows}</tbody>
                </Table>
                <TeamDialogue
                    show={this.state.show}
                    handleClose={() => this.handleCloseModal()}
                    teamId={this.state.teamId}
                    url={this.props.url}
                    token={this.props.token}
                />
            </div>
        );
    }
}

LeagueTable.propTypes = {
    url: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    season: PropTypes.number.isRequired,
    stage: PropTypes.number.isRequired
};

export default LeagueTable;
