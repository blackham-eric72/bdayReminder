import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { deleteBirthday } from '../../actions/birthdayActions';
// import axios from 'axios';

class BirthdayItem extends Component {
  onDeleteClick(id) {
    if (window.confirm('Are you sure you wanna delete this?')) {
      this.props.deleteBirthday(id);
    }
  }
  render() {
    const { birthday } = this.props;
    const arrayOfBdays = birthday.birthdays;

    function formatDate(d) {
      const date = new Date(d);
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      return (d = mm + '/' + dd + '/' + yyyy);
    }

    let listOfBdays = arrayOfBdays.map(birthdays => (
      <li key={birthdays._id} className="list-group-item flex-space-between">
        <p>
          {' '}
          <b>Name:</b> {birthdays.name}{' '}
        </p>
        <p>
          <b>Birthday: </b>
          {formatDate(birthdays.DOB)}
        </p>{' '}
        <div
          className="btn btn-danger"
          // type="div"
          onClick={this.onDeleteClick.bind(this, birthdays._id)}
        >
          <i className="fas fa-trash" />
        </div>
      </li>
    ));
    return (
      <div>
        <ul className="list-group">{listOfBdays}</ul>
      </div>
    );
  }
}
BirthdayItem.proptypes = {
  deleteBirthday: PropTypes.func.isRequired,
  birthday: PropTypes.object.isRequired
  // auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  birthday: state.birthday
});

export default connect(
  mapStateToProps,
  { deleteBirthday }
)(BirthdayItem);
