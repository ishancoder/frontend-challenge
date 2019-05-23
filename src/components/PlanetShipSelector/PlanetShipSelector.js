import React from "react";
import "./PlanetShipSelector.css";
import PlanetSelector from "../PlanetSelector/PlanetSelector";
import ShipSelector from "../ShipSelector/ShipSelector";

function PlanetShipSelector(props) {
    const {planets, vehicles, selectedPlanet, selectedVehicle, handlePlanetChange, handleVehicleChange} = props;
    return <div className="planet-ship-selector">
        <PlanetSelector
            selectedPlanet={selectedPlanet}
            planets={planets}
            handlePlanetChange={handlePlanetChange}
        />
        <ShipSelector
            selectedPlanet={selectedPlanet}
            selectedVehicle={selectedVehicle}
            vehicles={vehicles}
            handleVehicleChange={handleVehicleChange}
        />
    </div>;
}

export default PlanetShipSelector;