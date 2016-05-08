import React, { Component, PropTypes } from 'react'
import { Tab, Grid, Row, Col, Nav, NavItem } from 'react-bootstrap'
import ClockPanel from './ClockPanel'
import CanvasMatrix from './CanvasMatrix'

class SideMenu extends Component {
  render() {
    const centered = {
      display: 'block',
      margin: '0 auto',
    }
    return (
      <Tab.Container id="side-menu" defaultActiveKey="clockPanel">
        <div>
          <Row >
            <Col xs={12}>
              <Nav bsStyle="pills" pullLeft>
                <NavItem eventKey="clockPanel">
                  Clock Panel
                </NavItem>
                <NavItem eventKey="weatherPanel">
                  Weather Panel
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col xs ={12} md={5}>
              <Tab.Content animation>
                <Tab.Pane eventKey="clockPanel">
                  <ClockPanel />
                </Tab.Pane>
                <Tab.Pane eventKey="weatherPanel">

                </Tab.Pane>
              </Tab.Content>
            </Col>
            <Col xs ={12} md={7}>
              <CanvasMatrix style={centered} />
            </Col>
          </Row>
        </div>
      </Tab.Container>
    )
  }
}

SideMenu.propTypes = {

}

export default SideMenu
