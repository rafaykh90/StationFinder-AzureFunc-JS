import React, { Component } from 'react';

export class Stations extends Component {
	static displayName = Stations.name;

	constructor(props) {
		super(props);
		this.state = {
			deviceStationData: [],
			forecasts: [],
			loading: true,
			X: 0.0,
			Y: 0.0,
			endMessage: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
	}


	onChangeX = (event) => {
		this.setState({
			X: event.target.value
		});
	};

	onChangeY = (event) => {
		this.setState({
			Y: event.target.value
		});
	};

	getEndMessage = () => {
		var maxPower = Math.max.apply(Math, this.state.deviceStationData.map(function (ds) { return ds.power; }))
		var maxObj = this.state.deviceStationData.find(function (ds) { return ds.power === maxPower; })
		if (maxObj.power !== 0) {
			this.setState({
				endMessage: "Best link station for point " + this.state.X + ", " + this.state.Y +
					" is " + maxObj.station.location.x + ", " + maxObj.station.location.y + " with power " + maxObj.power
			});
		}
		else {
			this.setState({
				endMessage: "No link station within reach for point " + this.state.X + ", " + this.state.Y
			});
		}
	};

	onSubmit(event) {
		event.preventDefault();
		fetch('http://localhost:5000/api/Stations?x=' + this.state.X + '&y=' + this.state.Y)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState({ deviceStationData: data, loading: false });
				this.getEndMessage();
			});
	}

	static renderDeviceStationTable(devStationData) {
		return (
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Location</th>
						<th>Reach</th>
						<th>Distance</th>
						<th>Power</th>
					</tr>
				</thead>
				<tbody>
					{devStationData.map((ds, key) =>
						<tr key={key}>
							<td>{ds.station.location.x},{ds.station.location.y}</td>
							<td>{ds.station.reach}</td>
							<td>{ds.distance}</td>
							<td>{ds.power}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = this.state.loading
			? <p><em></em></p>
			: Stations.renderDeviceStationTable(this.state.deviceStationData);
		let endMessage = this.state.endMessage;
		return (
			<div>
				<h1>Linked Stations</h1>
				<p>This component demonstrates finding the suitable Link Station for the Device at some point</p>

				<div className='panel panel-default'>
					<div className='panel-body'>

						<form className='point-form'>
							<label>
								X:
							</label>
							<input type='text'
								value={this.state.X}
								onChange={this.onChangeX}
								className='form-control'
								id='name'
								placeholder='X' />
							<label>
								Y:
							</label>
							<input type='text'
								value={this.state.Y}
								onChange={this.onChangeY}
								className='form-control'
								id='name'
								placeholder='Y' />
							<button onClick={this.onSubmit}>Fetch</button >
						</form>
					</div>
				</div>

				{contents}
				<p>{endMessage}</p>
			</div>
		);
	}
}