import React from "react";

const LeagueTable = () => (
    <table className="table table-striped table-bordered table-condensed table-hover">
        <thead className="thead-dark">
            <tr>
                <th>Position</th>
                <th>Team Name</th>
                <th>Played</th>
                <th>Won</th>
                <th>Drawn</th>
                <th>Lost</th>
                <th>Goal</th>
                <th>Difference</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
            </tr>
        </tbody>
    </table>
);

export default LeagueTable;
