import './App.css';

import Home from './pages/home';

// MUI
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

//Stars
import Stars from './components/Stars'

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';

let theme = createTheme({
  palette: {
    primary: {
      main: '#121858',
      contrastText: '#fff'
    },
    secondary: {
      main: '#fff',
      contrastText: '#121858'
    }, 
    warning: {
      main: '#263238',
      contrastText: '#fff'
    },
    error: {
      main: '#d84315',
      contrastText: '#fff'
    }, 
    success: {
      main: '#d84315',
      contrastText: '#fff'
    }
  }
  
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Stars stars={20}/>
        <Home/>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
