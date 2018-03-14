import React from "react";
import PropTypes from "prop-types";

const FlagIcon = props => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.icon, "image/svg+xml");

    const svgElement = doc.querySelectorAll("svg")[0];

    let viewBox;
    if (svgElement.viewBox.baseVal.width > 0 || svgElement.viewBox.baseVal.height > 0) {
        viewBox = `0 0 ${svgElement.viewBox.baseVal.width} ${svgElement.viewBox.baseVal.height}`;
    } else {
        viewBox = `0 0 ${svgElement.width.baseVal.value} ${svgElement.height.baseVal.value}`;
    }
    return (
        <svg
            viewBox={viewBox}
            width="100%"
            height="100%"
            dangerouslySetInnerHTML={{ __html: svgElement.innerHTML }}
        />
    );
};

FlagIcon.propTypes = {
    icon: PropTypes.string.isRequired
};

export default FlagIcon;
