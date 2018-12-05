import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BirthdayItem from './BirthdayItem';

class BirthdayList extends Component {
  render() {
    const { birthday } = this.props;

    let birthdays = birthday.birthdays;

    return birthdays.map(birthday => (
      <BirthdayItem key={birthday._id} birthday={birthday} />
    ));
  }
}

BirthdayList.propTypes = {
  birthdays: PropTypes.array.isRequired
};

export default BirthdayList;
