import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from './stores'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const app =(
<Provider store={store.configure(null)}>
    <App/>
</Provider>

)



ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
