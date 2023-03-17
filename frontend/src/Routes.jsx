import { Route, Switch, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import { TopBar } from './components/Topbar';
import { Beranda } from './pages/Beranda';
import { JobDetail } from './pages/JobDetail';
import { JobList } from './pages/JobList';

export const Routes = (props) => {

    return (
        <>
            <TopBar />
            <Switch>
                <Route path="/beranda" component={Beranda} />
                <Route path="/job-list" component={JobList} />
                <Route path="/job-detail" component={JobDetail} />

                {/* <Route path="*" component={NotFound} /> */}
            </Switch>
            <Footer />
        </>
    )
}
export default Routes