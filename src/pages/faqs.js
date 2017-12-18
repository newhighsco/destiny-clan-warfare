import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Prose from '../components/prose/Prose'

const constants = require('../utils/constants')

class FaqsPage extends Component {
  render () {
    const title = 'FAQs'
    const description = `Frequently asked questions about ${constants.name}`

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Helmet>
        <Card>
          <Lockup primary center kicker="Frequently asked" heading="Questions" />
          <Prose>
            <h2>What is {constants.name}?</h2>
            <p>{constants.name} is a website designed to be a clan vs clan weekly competition across a variety of game types with bonus point modifiers to keep it new and exciting each week.</p>
            <h2>How do you earn points in {constants.name}?</h2>
            <p>Once your clan has been enrolled, you will automatically be tracked and added. You have nothing more to do.</p>
            <h2>How many points do you earn in {constants.name}?</h2>
            <p>Unless stated otherwise, each event will be made up of the following points:</p>
            <ul>
              <li>100 points per kill</li>
              <li>25 points per assist</li>
              <li>-50 points per death</li>
            </ul>
            <p>You will also earn 2 sets of bonus points and a total score modifier which will vary each event. The active bonus & modifier will clearly be visible on the homepage.</p>
            <h2>How do I enrol into {constants.name}?</h2>
            <p>At the top of the home page, you will be able to search for, and enroll, your clan. Please allow 60-90 minutes for you clan and clan members to start appearing on the leaderboards.</p>
            <p>Please note - there is a limit on clan participation at this time so if we are full, please check back each week as we accept more clans.</p>
            <h2>What if my clan is only small, I’ll never win anything?</h2>
            <p>Whilst you may not win the tournament as a whole, everything we do is split into 3 divisions based on clan size increasing your chances of performing well.</p>
            <p>The divisions are as follows:</p>
            <ul>
              <li>Squad: 1-30 members</li>
              <li>Platoon: 31-60 members</li>
              <li>Company: 61+ members</li>
            </ul>
          </Prose>
        </Card>
      </PageContainer>
    )
  }
}

export default FaqsPage

export const data = {
  layout: 'content'
}
