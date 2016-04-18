import { ChromePicker } from 'react-color'
import React, {Component, PropTypes} from 'react';

class ColorPicker extends Component {
    constructor() {
        super();
        this.state = {
            displayColorPicker: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose() {
        this.setState({ displayColorPicker: false })
    };

    render() {
        var props = this.props
        const panel = {
            backgroundColor: `rgb(${props.color.r}, ${props.color.g}, ${props.color.b})`,
            height: '20px',
            borderStyle: 'solid',
            borderWidth: '2px',
            cursor: 'pointer'
            
        }
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
        }
        return (
            <div>
                <div style={ panel } onClick={ this.handleClick }/>
                { this.state.displayColorPicker ? <div style={ popover }>
                    <div style={ cover } onClick={ this.handleClose }/>
                    <ChromePicker color={props.color} onChange={props.onChange}
                        onChangeComplete={props.onChangeComplete}/>
                </div> : null }
            </div>
        )
    }
}

ColorPicker.propTypes = {
    color: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
    onChangeComplete: React.PropTypes.func
};

export default ColorPicker;