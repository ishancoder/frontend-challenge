import React from "react";
import "./ShipSelector.css";

function ShipSelector(props) {
    if(!props.selectedPlanet) return null;
    return <div className="ship-selector">
        {
            props.vehicles.map(vehicle => {
                const checked = vehicle.name === props.selectedVehicle;
                return <label key={vehicle.name}><input type="radio" value={vehicle.name} checked={checked} disabled={props.selectedPlanet.distance > vehicle.max_distance || (vehicle.total_no <= 0 && !checked)} onChange={props.handleVehicleChange}/>{vehicle.name} - ({vehicle.total_no})</label>
            })
        }
    </div>
}

export default ShipSelector;