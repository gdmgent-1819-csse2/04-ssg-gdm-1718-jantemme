import React from "react"
import footerStyles from "./footer.module.css"

import heart from "../images/heart.png"

export default () => (
  <header>
    <div className={footerStyles.container}>
      <p className={footerStyles.text}>Made with a </p>
      <img className={footerStyles.image} src={heart} alt="heart"/>
      <p className={footerStyles.text}> by </p>
      <a className={footerStyles.link} href="https://github.com/gdm-1718-jantemme">Jan Temmerman</a>
      <p className={footerStyles.text}> using </p>
      <a className={footerStyles.link} href="https://www.gatsbyjs.org/">Gatsby</a>
    </div>
  </header>
)
