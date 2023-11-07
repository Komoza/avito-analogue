import { Header } from './components/header/header';
import { Main } from './pages/main/main';

function App() {
    return (
        <div className="container">
            <Header />
            <div className="wrapper">
                <Main />
            </div>
        </div>
    );
}

export default App;
