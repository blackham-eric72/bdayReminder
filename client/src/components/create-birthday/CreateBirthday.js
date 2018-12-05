import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import moment from 'moment';
// import Calendar from 'react-calendar';
import {
  createBirthday
  // getCurrentBirthdays
} from '../../actions/birthdayActions';

class CreateBirthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      DOB: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let bday = this.state.DOB;
    let day = bday.substr(8, 2);
    let year = bday.substr(0, 4);
    let month = bday.substr(5, 2);
    if (Number(day)) {
      day = Number(day) + 1;
      if (day < 10) {
        day = '0' + day;
      }
    }
    let newBday = year + '-' + month + '-' + day;

    const birthdayData = {
      name: this.state.name,
      DOB: newBday
    };

    this.props.createBirthday(birthdayData, this.props.history);
    this.setState({ name: '', DOB: '' });
    // this.props.getCurrentBirthdays();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Add A Birthday!</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <h6>Name:</h6>
              <TextFieldGroup
                placeholder="Name: i.e. Johnny Lingo"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <h6>Birthday:</h6>
              <TextFieldGroup
                name="DOB"
                type="date"
                value={this.state.DOB}
                onChange={this.onChange}
                error={errors.DOB}
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateBirthday.propTypes = {
  birthday: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  birthday: state.birthday,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createBirthday }
)(withRouter(CreateBirthday));
