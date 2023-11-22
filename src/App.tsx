import { BottomNavigation } from './components/bottom-navigation/bottom-navigation';
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
            <BottomNavigation />
        </div>
    );
}

export default App;
