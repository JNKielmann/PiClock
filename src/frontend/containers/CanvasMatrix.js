import React, { Component, PropTypes } from 'react'
import MatrixRenderer from 'shared/matrixRenderer/matrixRenderer'
import { connect } from 'react-redux'

const pixelSize = 13
const padding = 1
const matrixSize = 32

class CanvasMatrix extends Component {
  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d')
    this.matrixRenderer = new MatrixRenderer(this)
    this.renderInterval = setInterval(() => {
      this.matrixRenderer.render(this.props.state)
    }, 1000 / 30)
    if (module.hot) {
      // Support hot reloading of matrix renderer
      module.hot.accept('../../shared/matrixRenderer/matrixRenderer', () => {
        const NewMatrixRenderer = require('../../shared/matrixRenderer/matrixRenderer').default
        this.matrixRenderer = new NewMatrixRenderer(this)
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.renderInterval)
  }


  setPixel(x, y, { r, g, b }) {
    if (!this.ctx) return
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(
      x * (pixelSize + 2 * padding),
      y * (pixelSize + 2 * padding),
      pixelSize, pixelSize)
    this.ctx.beginPath()
    this.ctx.arc(x * (pixelSize + 2 * padding) + pixelSize / 2,
            y * (pixelSize + 2 * padding) + pixelSize / 2,
            pixelSize / 2, 0, 2 * Math.PI)
    this.ctx.fillStyle = `rgb(${r + 5},${g + 5},${b + 5})`
    this.ctx.fill()
  }
  width() {
    return matrixSize
  }
  height() {
    return matrixSize
  }

  clear(color = { r: 0, g: 0, b: 0 }) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    if (!this.ctx) return
    for (let x = 0; x < matrixSize; ++x) {
      for (let y = 0; y < matrixSize; ++y) {
        this.setPixel(x, y, color)
      }
    }
  }

  render() {
    const size = (pixelSize + 2 * padding) * matrixSize
    return (
      <div>
        <canvas ref="canvas" width={size} height={size} />
      </div>
    )
  }
}

CanvasMatrix.propTypes = {
  state: PropTypes.object.isRequired,
}

export default connect(state => ({ state }), {})(CanvasMatrix)
