import React from "react";
import "./styles.scss";
import logo from "./logo.png";

import { withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import BookIcon from "@material-ui/icons/Book";

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[50],
      cursor: "pointer",
    },
  },
}))(Chip);

export class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ marginBottom: 50 }}>
        <img src={logo} />
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="/"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            component="a"
            href="/products"
            label="Products"
            icon={<FavoriteRoundedIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            component="a"
            href="/diary"
            label="My Skincare Diary"
            icon={<BookIcon fontSize="small" />}
          />
          {!this.props.loginStatus && (
            <StyledBreadcrumb
              component="a"
              href="/login"
              label="Login / Register"
              icon={<PersonRoundedIcon fontSize="small" />}
            />
          )}
          {this.props.loginStatus && (
            <StyledBreadcrumb
              component="a"
              label="Log out"
              icon={<PersonRoundedIcon fontSize="small" />}
              onClick={this.props.handleLogout}
            />
          )}
        </Breadcrumbs>
      </div>
    );
  }
}
