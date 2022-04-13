import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import {
  titleSection,
  card,
  button,
} from './layout.module.css'


const Layout = ({ pageTitle, children }) => {
  
  return (
    <div>
      <title>{pageTitle}</title>

      <div className={titleSection}>        
        <p>Pokedex</p>
      </div>

      <div className={card}>
        {children}
      </div>
      
    </div>

    

    
  )
}

export default Layout
