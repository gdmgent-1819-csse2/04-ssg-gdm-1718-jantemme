import React from "react"
import { Link } from "gatsby"
import headerStyles from "./header.module.css"

export default () => (
  <header>
    <div className={headerStyles.container}>
      <h1 className={headerStyles.logo}>WebGl2</h1>
      <Link className={headerStyles.link} to="/">Home</Link>
      <Link className={headerStyles.link} to="/goal">Goal</Link>
      <Link className={headerStyles.link} to="/page2"> How </Link>
    </div>
  </header>
)

//export default Header