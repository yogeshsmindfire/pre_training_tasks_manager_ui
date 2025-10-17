import './App.css';
import { store } from './global/store';
import { Provider } from 'react-redux';

import Home from './views/Home';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
