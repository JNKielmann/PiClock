import React, { Component, PropTypes } from 'react'
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import ClockPanel from './ClockPanel'
import CanvasMatrix from './CanvasMatrix'

class SideMenu extends Component {
  render() {
    return (
      <Tab.Container id="side-menu" defaultActiveKey="clockPanel">
        <Row className="clearfix">
          <Col sm={2}>
            <Nav bsStyle="pills" stacked>
              <NavItem eventKey="clockPanel">
                Clock Panel
              </NavItem>
              <NavItem eventKey="weatherPanel">
                Weather Panel
              </NavItem>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content animation>
              <Tab.Pane eventKey="clockPanel">
                <ClockPanel />
              </Tab.Pane>
              <Tab.Pane eventKey="weatherPanel">
                <CanvasMatrix />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
  }
}

SideMenu.propTypes = {

}

export default SideMenu
