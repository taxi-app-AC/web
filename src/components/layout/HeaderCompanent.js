import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

 const HeaderComponent = (props) => {

    return (
       <div className="header">
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
               <button
                   className="navbar-toggler"
                   type="button"
                   data-toggle="collapse"
                   data-target="#navbarText"
                   aria-controls="navbarText"
                   aria-expanded="false"
                   aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarText">
                   <ul className="navbar-nav mr-auto">

                       {
                            props.nav.map((value, i) => {

                                return (
                                    <li className="nav-item" key={i}>
                                        <Link className="nav-link" to={value.url}>{value.label} </Link>
                                    </li>
                                )
                            })
                       }

                   </ul>
                   <ul className='navbar-nav mr-auto'>
                       <li className='nav-item'>
                           <Link className='nav-link' to={props.login.url}>{props.login.label}</Link>
                       </li>
                   </ul>
                   <span className="navbar-text">
                        Navbar text with an inline element
                    </span>
               </div>
           </nav>
       </div>
    );
}

HeaderComponent.propTypes = {
     nav: PropTypes.array
}

export default HeaderComponent;



