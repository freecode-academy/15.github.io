import { NextSeo } from 'next-seo'

import { Page } from '../_App/interfaces'
import { Game15Page } from './View'

export const MainPage: Page = () => {
  return (
    <>
      <NextSeo title="15 Game" description="Main page description" />

      <Game15Page />
    </>
  )
}

/**
 * Example.
 * Commit this if not needed.
 *
 * Get data before render page
 */
MainPage.getInitialProps = () => {
  return {
    statusCode: 200,
  }
}

export default MainPage
