import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

// import reducers
import reducer from "./reducers/offeredassignments";

// import sagas
import Dashboard from "./components/Dashboard";
import {TableComp} from './components/TableComp';
import rootSaga from "./sagas/saga";



const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);


export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
            {/*<Text>Open up App.js to start working on your app!</Text>*/}
              <TableComp/>
            {/*<Dashboard/>*/}
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
