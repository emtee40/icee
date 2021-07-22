import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IEApp } from 'icetf';

// 部件
import Error from './Parts/Error';
import Loading from './Parts/Loading'

// 导入当前模块
import './Module'
import './index.css';

const Router = ({pages}) => (
    <BrowserRouter>
        <Switch>
            {pages.map(item => (<Route key={item.url} path={item.url} component={item.component} />))}
        </Switch>
        <Error />
        <Loading />
    </BrowserRouter>
)

class App extends React.Component {
    render() {
        return <IEApp router={Router} />
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root'));