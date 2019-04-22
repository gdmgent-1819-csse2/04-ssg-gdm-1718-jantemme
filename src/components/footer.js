import React from "react"
import { Link } from "gatsby"
import footerStyles from "./footer.module.css"

import heart from "../images/heart.png"

export default () => (
  <header>
    <div className={footerStyles.container}>
      <p className={footerStyles.text}>Made with a </p>
      <img className={footerStyles.image} src={heart} alt="heart"/>
      <p className={footerStyles.text}> by </p>
      <Link className={footerStyles.link} to="https://github.com/gdm-1718-jantemme">Jan Temmerman</Link>
      <p className={footerStyles.text}> using </p>
      <Link className={footerStyles.link} to="https://www.gatsbyjs.org/">Gatsby</Link>
    </div>
  </header>
)
