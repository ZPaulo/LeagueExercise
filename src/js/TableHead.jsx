import React, { Component } from "react";
import { FaSort, FaSortAsc, FaSortDesc } from "react-icons/lib/fa";
import PropTypes from "prop-types";
import "../css/TableHead.css";

class TableHead extends Component {
    state = {
        activeElem: 0,
        ascend: true
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.reset !== nextProps.reset && nextProps.reset) {
            this.setState({ activeElem: 0 });
        }
    }

    handleClick(id, key) {
        this.setState({ activeElem: id, ascend: !this.state.ascend });
        this.props.handleSort(key, !this.state.ascend);
    }

    buildIcon(name, elemId, key) {
        let iconComponent;
        let iconClass = "";
        if (elemId === this.state.activeElem) {
            iconClass = "active-icon";
            if (this.state.ascend) {
                iconComponent = (
                    <FaSortAsc
                        className="sorting-icon"
                        onClick={() => this.handleClick(elemId, key)}
                    />
                );
            } else {
                iconComponent = (
                    <FaSortDesc
                        className="sorting-icon"
                        onClick={() => this.handleClick(elemId, key)}
                    />
                );
            }
        } else {
            iconComponent = (
                <FaSort className="sorting-icon" onClick={() => this.handleClick(elemId, key)} />
            );
        }
        return (
            <th className={iconClass}>
                {name} {iconComponent}
            </th>
        );
    }

    render() {
        return (
            <thead className="thead-dark">
                <tr>
                    {this.buildIcon("Position", 1, "position")}
                    {this.buildIcon("Team Name", 2, "team_name")}
                    {this.buildIcon("Played", 3, "overall.games_played")}
                    {this.buildIcon("Won", 4, "overall.won")}
                    {this.buildIcon("Drawn", 5, "overall.draw")}
                    {this.buildIcon("Lost", 6, "overall.lost")}
                    {this.buildIcon("Goals", 7, "overall.goals_scored")}
                    {this.buildIcon("Goal Difference", 8, "total.goal_difference")}
                    {this.buildIcon("Points", 9, "points")}
                </tr>
            </thead>
        );
    }
}

TableHead.propTypes = {
    handleSort: PropTypes.func.isRequired,
    reset: PropTypes.bool.isRequired
};

export default TableHead;
