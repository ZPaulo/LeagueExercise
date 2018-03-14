import React, { Component } from "react";
import axios from "axios";
import LeagueTable from "./js/LeagueTable";
import LeagueSelector from "./js/LeagueSelector";

const BASE_URL = "https://soccer.sportmonks.com/api/v2.0/";
const TOKEN = "api_token=HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC";

class App extends Component {
    state = {
        loaded: false,
        apiData: [],
        league: -1,
        season: -1,
        stage: -1,
        leagueName: "Leagues",
        seasonName: "Seasons",
        stageName: "Stages"
    };

    componentDidMount() {
        axios.get(`${BASE_URL}leagues?${TOKEN}&include=seasons.stages,country`).then(response => {
            this.setState({ apiData: response.data.data, loaded: true });
        });
    }

    handleSelectedLeague(league, leagueName) {
        this.setState({
            league,
            leagueName,
            season: -1,
            seasonName: "Seasons",
            stageName: "Stages"
        });
    }

    handleSelectedSeason(season, seasonName) {
        this.setState({ season, seasonName, stageName: "Stages" });
    }

    handleSelectedStage(stage, stageName) {
        this.setState({ stage, stageName });
    }

    render() {
        let leagueSelector;
        let seasonSelector;
        let stageSelector;
        if (this.state.loaded) {
            leagueSelector = (
                <LeagueSelector
                    data={this.state.apiData}
                    handleSelect={(e, id, name) => this.handleSelectedLeague(e, name)}
                    title={this.state.leagueName}
                />
            );

            console.log(this.state.league);
            if (this.state.league > -1) {
                seasonSelector = (
                    <LeagueSelector
                        data={this.state.apiData[this.state.league].seasons.data}
                        handleSelect={(e, id, name) => this.handleSelectedSeason(id, name)}
                        title={this.state.seasonName}
                    />
                );
            }

            if (this.state.season > -1) {
                const seasonIndex = this.state.apiData[this.state.league].seasons.data.findIndex(
                    elem => elem.id === this.state.season
                );
                if (seasonIndex > -1) {
                    stageSelector = (
                        <LeagueSelector
                            data={
                                this.state.apiData[this.state.league].seasons.data[seasonIndex]
                                    .stages.data
                            }
                            handleSelect={(e, id, name) => this.handleSelectedStage(id, name)}
                            title={this.state.stageName}
                        />
                    );
                }
            }
        }

        return (
            <div>
                {leagueSelector}
                {seasonSelector}
                {stageSelector}
                <LeagueTable
                    url={BASE_URL}
                    token={TOKEN}
                    season={this.state.season}
                    stage={this.state.stage}
                />
            </div>
        );
    }
}

export default App;
