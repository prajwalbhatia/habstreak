import React from 'react';

//CSS
import "../../index.css";
import './about.css';

//Components
import LandingHeader from 'components/landing-header/landingHeader';

function AboutUs() {

  return (
    <div className='aboutUs padding-global'>
      {/* Header */}
      <div className='global-background hero-background'>
        <LandingHeader
          navListing={false}
          sectionListing={false}
        />

        <div className='about-product'>
          <h1 className='mt-10 h1-30 font-jos'>What is HABSTREAK?</h1>
          <p className='mt-10 font-jos'>Habstreak is a platform that helps to create streak of task that you want to acheive in your life.
            <br />
            It can be a long term or short term goal. You create you streak with the time period in which you want to acheive that task.
            <br />
            Now you daily update your activity for that particular streak and if you are unable to fill the progress you will lost your streak and now you have to again start that streak.</p>

          <h1 className='mt-10 h1-30 font-jos'>Why you need HABSTREAK?</h1>
          <p className='mt-10 font-jos'>Most of the time what happens is that you think of achieving something but you only think or eithe rif you starts you are not able to complete it.
            <br />
            So what is so special about habstreak ????
            <br />
            In habstreak you first create your streak and along with streak you also assosiate rewards with it.
            <br />
            Example you have created your streak for 60 days. This 60 days seems very large time. Isn't it??
            <br />
            So to keep yourself motivated you assosiate some rewards with this streak.
            <br />
            You completed 1 week streak and you will gift yourself reward and the process go on.
            <br />
            This will help you to acheive more and will keep you motivated.
          </p>


          <h1 className='mt-10 h1-30 font-jos'>What exactly does Habstreak offer at the moment?</h1>
          <p className='mt-10 font-jos'>Currently following are the things Habstreak offers
            <br />
            1) You can create streak for the task you want to acheive.
            <br />
            2) You can assosiate rewards with your streak.
            <br />
            3) You can track progress of your streak journey.
            <br />
            4) You can see activities you have performed
            <br />
            5) All the things are summarized on dashboard for you for easy access.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs