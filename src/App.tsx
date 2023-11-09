import { Header } from './components/header/header';
import { AppRoutes } from './routes';

function App() {
    return (
        <div className="container">
            <Header />
            <div className="wrapper">
                <AppRoutes />
            </div>
        </div>
    );
}

export default App;
