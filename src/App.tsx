import { Header } from './components/header/header';
// import { Main } from './pages/main/main';
import { Advertisement } from './pages/advertisement/advertisement';
// import { Profile } from './pages/profile/profile';
// import { SellerProfile } from './pages/seller-profile/seller-profile';

function App() {
    return (
        <div className="container">
            <Header />
            <div className="wrapper">
                {/* <Main /> */}
                <Advertisement />
                {/* <Profile />
                <SellerProfile /> */}
            </div>
        </div>
    );
}

export default App;
