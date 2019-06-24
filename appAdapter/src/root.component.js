import React from 'react';
import {Provider} from 'react-redux';
import AppSelection from './appSelection';
import reactLogo from './assets/react-logo.png'


export default class Root extends React.Component {


    state = {
      store: this.props.store,
      globalEventDistributor: this.props.globalEventDistributor,
    };

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        let ret = <div> </div>;

        if (this.state.store && this.state.globalEventDistributor) {
            ret =
                <Provider store={this.state.store}>
                    <div>
                        <img src={reactLogo} style={{width: 100}}/> <br />
                        This was rendered by App Adapter, which is written in React.
                        <AppSelection globalEventDistributor={this.state.globalEventDistributor}/>
                    </div>
                </Provider>
        }

        return ret;
    }
}
