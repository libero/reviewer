import React from 'react';
import { Link } from 'react-router-dom';

const navBarItemStyle = {
    padding: '8px 16px 8px 16px',
    lineHeight: '24px',
    fontSize: '16px',
    fontFamily: '"Noto Sans", Arial, Helvetica, sans-serif, sans-serif',
    width: '100px',
    fontWeight: 400,
    textDecoration: 'none',
    color: 'rgb(32,32,32)',
};

const containerStyle = {
    paddingLeft: '24px',
    paddingRight: '24px',
    display: 'flex',
    boxAlign: 'center' as 'center',
    alignItems: 'center',
    height: '72px',
    borderBottom: '1px solid rgb(224, 224, 224)',
    marginBottom: '0px',
    boxPack: 'justify' as 'justify',
    justifyContent: 'space-between',
};

const NavBar = () => {
    return (
        <div style={containerStyle}>
            <div
                style={{
                    display: 'flex',
                    flex: '1 1 auto',
                }}
            >
                <Link to="/" style={navBarItemStyle}>
                    Malcolm
                </Link>
                <Link to="/dashboard" style={navBarItemStyle}>
                    Dashboard
                </Link>
            </div>
        </div>
    );
};
export default NavBar;
