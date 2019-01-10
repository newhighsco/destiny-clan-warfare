import React, { PureComponent } from 'react'
import { Link } from '@reach/router'
import { OutboundLink } from 'react-ga-donottrack'
import PageContainer from '../components/page-container/PageContainer'
import Card from '../components/card/Card'
import { Lockup } from '../components/lockup/Lockup'
import Prose from '../components/prose/Prose'

const constants = require('../utils/constants')

const meta = {
  title: 'FAQs',
  description: `Frequently asked questions about ${constants.meta.name}`
}

class FrequentlyAskedQuestionsPage extends PureComponent {
  render () {
    return (
      <PageContainer meta={meta}>
        <Card>
          <Lockup primary center kicker="Frequently asked" heading="Questions" />
          <Prose>
            <h2><Link id="what" to="#what" className="anchor" />What is {constants.meta.name}?</h2>
            <p>{constants.meta.name} is a website designed to be a clan vs clan weekly competition across a variety of game types with bonus point modifiers to keep it new and exciting each week.</p>
            <h2><Link id="enrollment" to="#enrollment" className="anchor" />How do I enroll into {constants.meta.name}?</h2>
            <p>At the top of the home page, you will be able to search for, and enroll, your clan. Please allow 60-90 minutes for you clan and clan members to start appearing on the leaderboards. Your clan will not appear on the leaderboards until a clan member has scored some points against the current event.</p>
            <p>We will lock your clan member list in place for the duration of the event. A snapshot will be taken when the event starts and any amendments to your roster will not be taken into account until the next event starts.</p>
            <p>Please note - there is a limit on clan participation at this time so if we are full, please check back each week as we accept more clans.</p>
            <h3>When will enrollment be open again?</h3>
            <p><OutboundLink to={constants.social.twitter} eventLabel={constants.social.twitter} target="_blank">Follow us on Twitter</OutboundLink> to find out first when it reopens.</p>
            <h3>Will I have to enroll my clan for every events?</h3>
            <p>No. Once you are enrolled, you will automatically be entered into all future events. Just score some points, and you'll appear on the leaderboards.</p>
            <h2><Link id="points" to="#points" className="anchor" />How do I earn points in {constants.meta.name}?</h2>
            <p>Once your clan has been enrolled, you will automatically be tracked and added, and start appearing in the leaderboards as soon as you score some points against the current event. You have nothing more to do.</p>
            <p>Points are only calculated for completed activities, so if you get kicked from a PvP match, or leave a Strike before the end, it will not count towards your score on the leaderboard.</p>
            <h3>How many points do I earn in {constants.meta.name}?</h3>
            <p>Unless stated otherwise, each event will be made up of the following points:</p>
            <ul>
              <li>100 points per kill</li>
              <li>25 points per assist</li>
              <li>-50 points per death</li>
            </ul>
            <p>You will also earn 2 sets of bonus points and a total score modifier which will vary each event. The active bonus & modifier will clearly be visible on the homepage.</p>
            <h3><Link id="strikes" to="#strikes" className="anchor" />How do I earn points in Strikes?</h3>
            <p>Strikes follow the same base scoring method as other events - base points for kills, assists and deaths plus a variety of bonus points. The additional thing that strikes have is a timer failsafe - sadly strikes are able to be exploited a little more so there is a limitation on time to avoid this. Any strike taking 25 minutes or more will receive a 0 score. Any strike taking 20 to 25 minutes will receive a half score penalty. All other strikes will receive their full score.</p>
            <p>These calculations are based on the amount of time the player was in the game, NOT the total time to complete the strike - for instance if you join a strike that's been running for 30 minutes, your timer starts from when you first load in and not when the strike started.</p>
            <h3><Link id="raids" to="#raids" className="anchor" />How do I earn points in Raids?</h3>
            <p>Only completions of the Leviathan raid will count towards your {constants.meta.name} score - a completion is currently defined as killing Calus so starting at a checkpoint would be valid, as long as you finish.</p>
            <p>Raids also follow the very same base scoring methods as all other event based on kills, assists and deaths alongside 2 bonus sets of points and a score % modifier. However, raids have an additional timer based modifier in a bid to try and level the playing field and promote playing the event as was intended.</p>
            <ul>
              <li>If your completion time is less than 60 minutes, your score is multiplied by 4.</li>
              <li>If your completion time is between 60 and 89 minutes, your score is multiplied by 2.</li>
              <li>If your completion time is between  90 minutes and 119 minutes, your score is multiplied by 1.5</li>
              <li>If your completion time is between 120 and 150 minutes, your score is kept the same.</li>
              <li>If your completion time is over 150 minutes, your score is reset to 0.</li>
            </ul>
            <p>Please note, our raid events are currently only available on a trial basic and the numbers above are subject to change for future events. All calculations are based on the time provided to us by Bungie via the API - historically this has seen to be a little different to what you see in games but sadly, that's out of our control.</p>
            <h2><Link id="size" to="#size" className="anchor" />What if my clan is only small, I’ll never win anything?</h2>
            <p>Whilst you may not win the tournament as a whole, everything we do is split into 3 divisions based on clan size increasing your chances of performing well.</p>
            <p>The divisions are as follows:</p>
            <ul>
              {constants.divisions.reverse().map((division, i) => (
                <li key={i}>{division.name}: {division.size}</li>
              ))}
            </ul>
          </Prose>
        </Card>
      </PageContainer>
    )
  }
}

export default FrequentlyAskedQuestionsPage
