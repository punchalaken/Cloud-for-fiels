import React from 'react'

function Header({ logOut }) {
        return (
            <nav className="navbar navbar-light mb-0">
                <div class="container-fluid">
                    <a className="navbar-brand">MyCloud</a>
                    <button className="btn btn-danger" type="button" onClick={logOut}>Выход</button>
                </div>
            </nav>
    )
}

export default Header