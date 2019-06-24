import React from 'react';
import { connect } from 'react-redux';

const preloadApp = {
    app1: {
        name: 'app1',
        routeHash: 'app1',
        appUrl: '/app1/singleSpaEntry.js',
        storeUrl: '/app1/store.js',
    },
    app2: {
        name: 'app2',
        routeHash: 'app2',
        appUrl: '/app2/singleSpaEntry.js',
        storeUrl: '/app2/store.js',
    },
    app3: {
        name: 'app3',
        routeHash: 'app3',
        appUrl: '/app3/singleSpaEntry.js',
        storeUrl: '/app3/store.js',
    },
    app4: {
        name: 'app4',
        routeHash: 'app4',
        appUrl: '/app4/singleSpaEntry.js',
        storeUrl: '/app4/store.js',
    },
    app5: {
        name: 'app5',
        routeHash: 'app5',
        appUrl: '/app5/singleSpaEntry.js',
        storeUrl: '/app5/store.js',
    },
    navbar: {
        name: 'navbar',
        routeHash: 'navbar',
        appUrl: '/navbar/singleSpaEntry.js',
        storeUrl: '/navbar/store.js',
    },
    device: {
        name: 'device',
        routeHash: 'device',
        appUrl: '/device/singleSpaEntry.js',
        storeUrl: '/device/store.js',
    },
    adapter: {
        name: 'adapter',
        routeHash: 'adapter',
        appUrl: '/adapter/singleSpaEntry.js',
        storeUrl: '/adapter/store.js',
    },
};

class AppSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedApp: preloadApp.app1, preloadApp };
    }
    globalIncrement = () => {
        this.props.globalEventDistributor.dispatch({ type: 'INCREMENT' });
    };

    globalDecrement = () => {
        this.props.globalEventDistributor.dispatch({ type: 'DECREMENT' });
    };
    handleChange = (event) => {
        this.setState({selectedApp: preloadApp[event.target.value]});
    };
    handleSubmit = () => {
        const {selectedApp} = this.state;
        console.log(selectedApp);
        this.props.globalEventDistributor.dispatch({
            type: 'APP_ADD',
            payload: selectedApp });
    };
    inputChange = (event) => {
        const {selectedApp} = this.state;
        const newObj = {
            ...selectedApp,
            [event.target.name]: event.target.value,
        };
        this.setState({
            selectedApp: newObj,
        });
    };
    reset = () => this.setState({
        selectedApp: preloadApp.app1, preloadApp
    });

    render() {
        const { preloadApp, selectedApp } = this.state;
        const keys = ['name', 'routeHash', 'appUrl', 'storeUrl'];
        return (
            <div>
                <br />
                <div>
                    <select value={this.state.selectedApp.name} onChange={this.handleChange}>
                        {Object.values(preloadApp).map((eachApp) => <option value={eachApp.name}>{eachApp.name}</option>)}
                    </select>
                    {keys.map(eachK =>
                        <span key={eachK}>
                            {eachK}:
                            <input type="text" name={eachK} value={selectedApp[eachK]} onChange={this.inputChange} />
                        </span> )}
                    <button onClick={this.handleSubmit}>Update</button>
                    <button onClick={this.reset}>Reset</button>
                    <br/>

                    <b> Count: {this.props.count}</b>
                    <button onClick={this.globalIncrement}>global increment</button>
                    <button onClick={this.globalDecrement}>global decrement</button><br/>
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        count: state.reducer.count
    };
}

export default connect(mapStateToProps)(AppSelection);
