import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setShift } from '../redux/actions/cipherActions';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class Shift extends Component {
  state = {
    shift: 0
  }

  handleChange = e => {
    this.setState({ shift: e.target.value });

    this.props.setShift(e.target.value);
  };

  render() {
    return (
      <div className="shift">
        <center>
          <Select
            autoWidth={true}
            displayEmpty
            onChange={this.handleChange}
            value={this.state.shift}
            >
            <MenuItem value="" disabled>Enter shift amount</MenuItem>
            <MenuItem value="0">0</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </Select>
        </center>
      </div>
    );
  }  
};

const mapStateToProps = (state) => ({
    cipher: state.cipher
});

export default connect(mapStateToProps, { setShift })(Shift);