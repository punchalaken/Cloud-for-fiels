import React from "react";
import './Footer.css';
import { NavLink } from "react-router-dom";


const Footer:React.FC = () => {

    return (
        <footer className="footer">
            <div className="footer-name">
                Рады Вас приветствовать!
            </div>
            <p><NavLink to="/" className="footer-home-link">Главная страница</NavLink></p>
            <ul className="footer-link">
                <li className="item-tg">
                    <a href="https://t.me/punchalaken" target="_blank" rel="noopener noreferrer" title="Перейти в Telegram">
                        <i className="fab fa-telegram"></i>
                    </a>
                </li>
                <li className="item-github">
                    <a href="https://github.com/punchalaken" target="_blank" rel="noopener noreferrer" title="Перейти на GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                </li>
            </ul>
        </footer>
    )
};

export default Footer;