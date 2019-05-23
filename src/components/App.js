import React, { Component } from 'react';
import './App.css';
import { fetchPlanets, fetchVehicles, findFalcone } from "../utils/data";
import PlanetShipSelector from './PlanetShipSelector/PlanetShipSelector';
import Result from './Result/Result';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      vehicles: [],
      selectedPlanets: [null, null, null, null],
      selectedVehicles: [null, null, null, null],
      loading: true,
      result: null
    };
  }

  async componentDidMount() {
    try{
      const planets = await fetchPlanets();
      const vehicles = await fetchVehicles();
      this.setState({
        planets,
        vehicles,
        loading: false
      });
    } catch(err) {
      console.error(err);
      return alert("Something is not working well today. Please try again in some time.");
    }
  }

  handlePlanetChange = ({ target: { value } }, i) => {
    const chosenPlanet = this.state.planets.find(planet => planet.name === value);
    let selectedPlanets = [...this.state.selectedPlanets];
    selectedPlanets[i] = chosenPlanet;
    this.setState({ selectedPlanets });
  };

  handleVehicleChange = ({ target: { value } }, i) => {
    let selectedVehicles = [...this.state.selectedVehicles];
    selectedVehicles[i] = value;
    this.setState({ selectedVehicles });
  };

  handleFind = async () => {
    const planet_names = this.state.selectedPlanets.map(p => p && p.name);
    const vehicle_names = this.state.selectedVehicles.filter(v => v !== null);
    if (planet_names.length < 4 || vehicle_names.length < 4) return alert("It seems like you've not selected all the planets and vehicles properly.");
    try{
      const data = await findFalcone(planet_names, vehicle_names);
      this.setState({ result: data });
    } catch(err) {
      console.error(err);
      return alert("Something is not working well today. Please try again after some time.");
    }
  };

  handleReset = () => this.setState((prevState) => ({
    ...prevState,
    selectedPlanets: [null, null, null, null],
    selectedVehicles: [null, null, null, null],
    result: null
  }));

  getAvailablePlanets() {
    return this.state.planets.filter(planet => {
      return this.state.selectedPlanets.indexOf(planet) === -1
    });
  }

  getAvailableVehicles() {
    return this.state.vehicles.map(vehicle => {
      const total_no = vehicle.total_no - this.state.selectedVehicles.filter(v => vehicle.name === v).length;
      return {
        ...vehicle,
        total_no
      }
    });
  }

  getTimetaken() {
    if(!this.state.result || !this.state.result.status) return null;
    const idx = this.state.selectedPlanets.findIndex(p => p.name === this.state.result.planet_name);
    if(idx < 0) return null;
    const selectedPlanet = this.state.selectedPlanets[idx];
    const selectedVehicle = this.state.vehicles.find(v => v.name === this.state.selectedVehicles[idx]);
    return selectedPlanet.distance / selectedVehicle.speed;
  }

  render() {
    return <section className="App">
      <h1>FIND FALCONE</h1>
      <section className="selector-result-container">
        <div className={`selector-container ${this.state.result && 'hide-left'}`}>
          {
            [0, 1, 2, 3].map(i => {
              return <PlanetShipSelector
                key={i}
                selectedPlanet={this.state.selectedPlanets[i] || ""}
                selectedVehicle={this.state.selectedVehicles[i] || ""}
                handlePlanetChange={e => this.handlePlanetChange(e, i)}
                handleVehicleChange={e => this.handleVehicleChange(e, i)}
                planets={this.getAvailablePlanets()}
                vehicles={this.getAvailableVehicles()}
              />
            })
          }
        </div>
        <Result className={`hide-right ${this.state.result && 'show'}`} result={this.state.result}
          timeTaken={this.getTimetaken()}
        />
      </section>
      {
        (!this.state.result) ? <button onClick={this.handleFind}>FIND</button>
          : <button onClick={this.handleReset}>RESET</button>
      }
    </section>
  }
}

export default App;
