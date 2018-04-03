import React, { Component } from 'react'
import { Head } from 'react-static'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Prose from '../components/prose/Prose'

const constants = require('../utils/constants')

class FaqsPage extends Component {
  render () {
    const title = 'FAQs'
    const description = `Frequently asked questions about ${constants.meta.name}`

    return (
      <PageContainer>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
        </Head>
        <Card>
          <Lockup primary center kicker="Frequently asked" heading="Questions" />
          <Prose>
            <h2>What is {constants.meta.name}?</h2>
            <p>{constants.meta.name} is a website designed to be a clan vs clan weekly competition across a variety of game types with bonus point modifiers to keep it new and exciting each week.</p>
            <a id="points" />
            <h2>How do you earn points in {constants.meta.name}?</h2>
            <p>Once your clan has been enrolled, you will automatically be tracked and added, and start appearing in the leaderboards as soon as you score some points against the current event. You have nothing more to do.</p>
            <h2>How many points do you earn in {constants.meta.name}?</h2>
            <p>Unless stated otherwise, each event will be made up of the following points:</p>
            <ul>
              <li>100 points per kill</li>
              <li>25 points per assist</li>
              <li>-50 points per death</li>
            </ul>
            <p>You will also earn 2 sets of bonus points and a total score modifier which will vary each event. The active bonus & modifier will clearly be visible on the homepage.</p>
            <a id="enrollment" />
            <h2>How do I enroll into {constants.meta.name}?</h2>
            <p>At the top of the home page, you will be able to search for, and enroll, your clan. Please allow 60-90 minutes for you clan and clan members to start appearing on the leaderboards. Your clan will not appear on the leaderboards until a clan member has scored some points against the current event.</p>
            <p>We will lock your clan member list in place for the duration of the event. A snapshot will be taken when the event starts and any amendments to your roster will not be taken into account until the next event starts.</p>
            <p>Please note - there is a limit on clan participation at this time so if we are full, please check back each week as we accept more clans.</p>
            <h2>When will enrollment be open again?</h2>
            <p><a href={constants.social.twitter} target="_blank" rel="noopener noreferrer">Follow us on Twitter</a>, or <a href={constants.social.discord} target="_blank" rel="noopener noreferrer">join our Discord server</a> to find out first when enrollment opens again.</p>
            <h2>Will I have to enroll my clan for every events?</h2>
            <p>No. Once you are enrolled, you will automatically be entered into all future events. Just score some points, and you'll appear on the leaderboards.</p>
            <a id="size" />
            <h2>What if my clan is only small, I’ll never win anything?</h2>
            <p>Whilst you may not win the tournament as a whole, everything we do is split into 3 divisions based on clan size increasing your chances of performing well.</p>
            <p>The divisions are as follows:</p>
            <ul>
              <li>Squad: 1-30 members</li>
              <li>Platoon: 31-60 members</li>
              <li>Company: 61+ members</li>
            </ul>
            <a id="raids" />
            <h2>Do you plan to run any Raid based events?</h2>
            <p>We have some concerns regarding Raid based events. We believe that engagement will probably be low due to the requirement for a fireteam of six. One of our core pillars for {constants.meta.name} is that any clan member can get to contribute, even if they don't have the time to team up with others.</p>
            <p>Additionally, only completed activities contribute towards the score of our events, and as we are currently unable to identify individual raid encounters, this means that to score any points what so ever a much large commitment of time is required compared to other events.</p>
            <p>A further potential contentious issue is that the Castellum of the Leviathan provides and infinite number of enemies, and because kills are one of the cornerstones of our scoring system, this is likely to give rise to farming this area and then moving onto Callus for the completion.</p>
            <p>We will however keep considering the idea, and are open to <a href={constants.social.discord} target="_blank" rel="noopener noreferrer">suggestions via Discord</a>.</p>
          </Prose>
        </Card>
      </PageContainer>
    )
  }
}

export default FaqsPage
