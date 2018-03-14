import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import PropTypes from "prop-types";

class LeagueSelector extends Component {
    handleClick(index, id, title) {
        this.props.handleSelect(index, id, title);
    }
    // <div dangerouslySetInnerHTML={{ __html: flag }} />
    render() {
        let leagueItems;
        let flag = "";
        if (this.props.data.length > 0) {
            leagueItems = this.props.data.map((elem, index) => {
                if (this.props.title === "Leagues") {
                    flag = elem.country.data.extra.flag;
                }
                return (
                    <MenuItem
                        key={elem.id}
                        eventKey={index}
                        onSelect={() => this.props.handleSelect(index, elem.id, elem.name)}
                    >
                        {elem.name}
                    </MenuItem>
                );
            });
        }
        return (
            <div>
                <DropdownButton bsStyle="primary" title={this.props.title} id={`dropdown-basic-1`}>
                    {leagueItems}
                </DropdownButton>
            </div>
        );
    }
}

LeagueSelector.propTypes = {
    data: PropTypes.any,
    title: PropTypes.string.isRequired,
    handleSelect: PropTypes.func.isRequired
};

export default LeagueSelector;
