import React from 'react'
import { Image, Button } from 'semantic-ui-react'
import "./LandingPage.css"

export class LandingPage extends React.Component {
  goTo = (url) => {
    this.props.history.push(url);
  };
  render() {
    return (
      <div className="LandingPage" >
        {/* <Image style={{ opacity: .3, position: "fixed" }} src="https://images.unsplash.com/photo-1494346480775-936a9f0d0877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1003&q=80" fluid /> */}
        <Button className="landing" onClick={() => this.goTo('/login')} color='blue'>
          Enter Site
      </Button >

      </div>
    )
  }
}
export default LandingPage
