import { Header } from './components/header/header';
import { Profile } from './pages/profile/profile';
// import { Advertisement } from './pages/advertisement/advertisement';
// import { Main } from './pages/main/main';

function App() {
    return (
        <div className="container">
            <Header />
            <div className="wrapper">
                {/* <Main /> */}
                {/* <Advertisement/> */}
                <Profile />
            </div>
        </div>
    );
}

export default App;
