import { NavLink } from 'react-router-dom';
import './Page404.css';


function Page404() {
    return (
        <section className="page404">
            <h1 className="page404-title">404</h1>
            <div className="page404-content">
                Такая страница не существует
            </div>
            <br />
            <p><NavLink to="/" className="footer-home-link">Главная страница</NavLink></p>
        </section>
    );
}

export default Page404;