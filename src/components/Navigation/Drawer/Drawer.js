import React from 'react';
import { NavLink } from 'react-router-dom';
import './Drawer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

function Drawer(props) {
  const links = [
    {
      to: '/',
      label: 'Список',
      exact: true,
    },
  ];

  if (props.isAuth) {
    links.push({
      to: '/quiz-creator',
      label: 'Создать тест',
      exact: false,
    });
    links.push({
      to: '/logout',
      label: 'Выйти',
      exact: false,
    });
  } else {
    links.push({
      to: '/auth',
      label: 'Авторизация',
      exact: false,
    });
  }

  const renderLinks = (links) => {
    return links.map((link, index) => (
      <li key={index}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName="active"
          onClick={props.onClose}
        >
          {link.label}
        </NavLink>
      </li>
    ));
  };

  const cls = ['Drawer'];

  if (!props.isOpen) {
    cls.push('close');
  }

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>{renderLinks(links)}</ul>
      </nav>
      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
    </>
  );
}

export default Drawer;
