import React from "react";
import "./PlanetSelector.css";

function PlanetSelector(props) {
    return <select value={(props.selectedPlanet && props.selectedPlanet.name) || ""} onChange={props.handlePlanetChange}>
        <option disabled value="">SELECT A PLANET</option>
        {props.selectedPlanet && <option value={props.selectedPlanet.name}>{props.selectedPlanet.name} - {props.selectedPlanet.distance}</option>}
        {
            props.planets.map(planet => {
                return <option key={planet.name} value={planet.name}>{planet.name} - {planet.distance}</option>
            })
        }
    </select>;
}

export default PlanetSelector;