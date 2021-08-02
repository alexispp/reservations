import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
    Button,
    Menu,
    MenuItem
} from "@material-ui/core";

import "./Header.scss";
import { signOut } from "../../store/login/loginActions";

const NavBar = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);

    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
      <div className="NavBar">
      <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() => {dispatch(signOut(history));}}
      >
        Cerrar Sesión
      </Button>
      <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
      >
          Herramientas
      </Button>
      <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
      >
          <MenuItem onClick={() => {history.push("/admin");}}>
              Inicio
          </MenuItem>
          <MenuItem onClick={() => {history.push("/admin/ceremonies");}}>
              Ver Todas las Ceremonias
          </MenuItem>
      </Menu>

      </div>

    )
  }

  const Header =()=>{
    return (
        <div className="AdminHeader">
                <div className="AdminHeaderPanel">
                    {NavBar()}
                    <span>Ceremonias PL - Panel de Administración</span>
                </div>
            </div>
    )
  }


export default Header;
