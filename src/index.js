import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'


import MatrixRenderer from './matrixRenderer/matrixRenderer'
import CanvasMatrix from './matrixRenderer/canvasMatrix'

const store = configureStore()
const rootEl = document.getElementById('react_root')

let matrixRenderer = new MatrixRenderer()
let canvasMatrix = new CanvasMatrix(document.getElementById('virtual_clock_root'))
matrixRenderer.render(canvasMatrix, store.getState())
store.subscribe(() => {
    matrixRenderer.render(canvasMatrix, store.getState())
})



let render = () => {
    const App = require('./containers/App').default
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootEl
    )
}

if (module.hot) {
    // Support hot reloading of matrix renderer
    module.hot.accept('./matrixRenderer/matrixRenderer', () => {
        matrixRenderer.unmount();
        matrixRenderer = new (require('./matrixRenderer/matrixRenderer').default)()
        matrixRenderer.render(canvasMatrix, store.getState())
    })
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderApp = render
    const renderError = (error) => {
        const RedBox = require('redbox-react')
        ReactDOM.render(
            <RedBox error={error} />,
            rootEl
        )
    }
    render = () => {
        try {
            renderApp()
        } catch (error) {
            renderError(error)
        }
    }
    module.hot.accept('./containers/App', () => {
        setTimeout(render)
    })
}

render()


// if (module.hot) {
//     // accept update of dependency
//     module.hot.addStatusHandler((status) => {
//         if (status === 'idle') {
//             console.log('rerender');
//             //matrixRenderer.render(canvasMatrix, store.getState())

//         }
//     })
// }

// render(
//     <App />,
//     document.getElementById('react_root')
// )






