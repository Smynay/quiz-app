import React, { useState } from 'react';
import './Layout.scss';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

function Layout(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className="Layout">
      <Drawer
        isOpen={isOpen}
        onClose={closeMenuHandler}
        isAuth={props.isAuth}
      />
      <MenuToggle onToggle={toggleMenuHandler} isOpen={isOpen}></MenuToggle>
      <main>{props.children}</main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
