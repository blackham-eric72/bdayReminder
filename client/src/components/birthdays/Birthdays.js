import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import BirthdayList from './BirthdayList';
import Spinner from '../common/Spinner';
import { getCurrentBirthdays } from '../../actions/birthdayActions';
import BirthdayItem from './BirthdayItem';

class Birthdays extends Component {
  // componentDidMount() {
  //   this.props.getCurrentBirthdays();
  // }

  render() {
    const { birthdays, loading } = this.props.birthday;
    let birthdayContent;

    if (birthdays === null || loading) {
      birthdayContent = <Spinner />;
    } else {
      birthdayContent = <BirthdayItem />; //brithday list
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col md-12">{birthdayContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
Birthdays.propTypes = {
  getCurrentBirthdays: PropTypes.func.isRequired,
  birthday: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  birthday: state.birthday
});

export default connect(
  mapStateToProps,
  { getCurrentBirthdays }
)(Birthdays);
