import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Calculator from '../components/calculator'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Calculator />
  </Layout>
)

export default IndexPage
