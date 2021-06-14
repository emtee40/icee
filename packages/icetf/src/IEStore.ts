import { createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import MiddlewareFactory from './MiddlewareFactory'
import IceReduxFactroy from './IceRedux/IceReduxFactroy'
import BaseIceRedux from './IceRedux/BaseIceRedux';

class IEStore  {
    ieStore: any = undefined;

    createIEStore() {
        var middlewares = [
            thunkMiddleware, // 这里添加了一个thunk中间件，他会处理thunk action
            ...(MiddlewareFactory.getMiddlewares())
        ];
        
        this.ieStore = createStore(
            IceReduxFactroy.createRootReducer<any>(),
            applyMiddleware(...middlewares));
    }

    register(iceRedux: BaseIceRedux){
        IceReduxFactroy.register(iceRedux);
    }
}

export default new IEStore();