import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import templateStyles from "../components/template.module.css"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
        <div>
            <div>
                <h1 className={templateStyles.heading}>{frontmatter.title}</h1>
                <div
                dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`