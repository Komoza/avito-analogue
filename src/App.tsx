import { useDispatch, useSelector } from 'react-redux';
import { BottomNavigation } from './components/bottom-navigation/bottom-navigation';
import { AppRoutes } from './routes';
import { getTokenFromLocalStorage } from './utils/token';
import { saveUserIdToState } from './utils/users';
import { setIsMobile } from './store/actions/creators/creators';
import { RootState } from './store/actions/types/types';
import { useEffect } from 'react';

function App() {
    const dispatch = useDispatch();
    saveUserIdToState(getTokenFromLocalStorage());

    const isMobile = useSelector(
        (state: RootState) => state.otherState.isMobile
    );

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = innerWidth < 631;

            if (newIsMobile !== isMobile) {
                dispatch(setIsMobile(newIsMobile));
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch, isMobile]);

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
