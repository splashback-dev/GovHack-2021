import React from 'react';
import {Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';

export const Header: React.FC<any> = () => {
    const {pathname} = useLocation();

    return (
        <div className="w-full h-full flex bg-blue-dark">
            <div className="mx-8 h-full">
                <img className="h-full w-auto" src="favicon.ico"/>
            </div>
            <Menu className="h-full" mode="horizontal" theme="dark" selectedKeys={[pathname]}>
                <Menu.Item key="/">
                    <Link to="/">
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="/about">
                    <Link to="/about">
                        About
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};
