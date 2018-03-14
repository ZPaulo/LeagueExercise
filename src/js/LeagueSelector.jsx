import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import PropTypes from "prop-types";
import FlagIcon from "./FlagIcon";
import "../css/LeagueSelector.css";

class LeagueSelector extends Component {
    handleClick(index, id, title) {
        this.props.handleSelect(index, id, title);
    }

    render() {
        let leagueItems;
        let flag = "";
        if (this.props.data.length > 0) {
            leagueItems = this.props.data.map((elem, index) => {
                if (this.props.type === "leagues") {
                    flag = (
                        <span className="flag-svg">
                            <FlagIcon icon={elem.country.data.extra.flag} />
                        </span>
                    );
                }
                return (
                    <MenuItem
                        className="league-dropdown-item"
                        key={elem.id}
                        eventKey={index}
                        onSelect={() => this.props.handleSelect(index, elem.id, elem.name)}
                    >
                        <p> {elem.name} </p> {flag}
                    </MenuItem>
                );
            });
        }
        return (
            <DropdownButton
                className="league-dropdown"
                bsStyle="primary"
                title={this.props.title}
                id={`dropdown-basic-1`}
            >
                {leagueItems}
            </DropdownButton>
        );
    }
}

LeagueSelector.defaultProps = {
    type: ""
};

LeagueSelector.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            country: PropTypes.shape({
                data: PropTypes.shape({
                    extra: PropTypes.shape({
                        flag: PropTypes.string
                    })
                })
            })
        })
    ).isRequired,
    title: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired,
    type: PropTypes.string
};

export default LeagueSelector;
