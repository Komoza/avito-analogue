import { AppRoutes } from './routes';
import { getTokenFromLocalStorage } from './utils/token';
import { saveUserIdToState } from './utils/users';

function App() {
    saveUserIdToState(getTokenFromLocalStorage());

    return (
        <div className="container">
            <div className="wrapper">
                <AppRoutes />
            </div>
        </div>
    );
}

export default App;
