import React from 'react';
import {Menu, Typography} from 'antd';
import {Link, useLocation} from 'react-router-dom';

export const Header: React.FC<any> = () => {
    const {pathname} = useLocation();

    return (
        <div className="w-full h-full flex bg-blue-dark">
            <div className="h-full mx-8 flex items-center text-white space-x-4">
                <img className="h-full w-auto" alt="sir frogly" src="favicon.ico"/>
                <Typography.Title className="text-white font-serif m-0">THE FROG RETURNS</Typography.Title>
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
