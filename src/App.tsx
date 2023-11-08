import { Header } from './components/header/header';
// import { SellerProfile } from './pages/seller-profile/seller-profile';
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
                {/* <SellerProfile /> */}
            </div>
        </div>
    );
}

export default App;
