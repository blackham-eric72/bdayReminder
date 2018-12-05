import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentBirthdays } from '../../actions/birthdayActions';
import Birthdays from '../birthdays/Birthdays';
import Spinner from '../common/Spinner';
import CreateBirthday from '../create-birthday/CreateBirthday';

// import BirthdayActions from './BirthdayActions';

class Dashboard extends Component {
  // life cycle method:
  componentDidMount() {
    this.props.getCurrentBirthdays();
  }

  render() {
    const { user } = this.props.auth;
    const { birthdays, loading } = this.props.birthdays;
    // const birthdays = this.props.birthdays;
    // console.log(birthdays);

    // const loading = true;

    let dashboardContent;

    if (birthdays === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if Logged in user has birthdays:
      if (Object.keys(birthdays).length > 0) {
        dashboardContent = (
          <div>
            {/* <p className="lead text-muted">Welcome {user.name} </p> */}
            <h4>Here are the birthdays you currently have saved: </h4>
            <br />
            <br />
            <Birthdays />

            <CreateBirthday />
            {/* <h5 className="add-more-head">Want to add another?</h5>
            <Link to="/create-birthday" className="btn btn-lg btn-info">
              Add Birthday
            </Link> */}
          </div>
        );
      } else {
        // User is logged in but has no birthdays saved
        dashboardContent = (
          <div>
            <p>
              {' '}
              You have not yet saved any birthdays - please get started now!
            </p>
            <Link to="/create-birthday" className="btn btn-lg btn-info">
              Add Birthday
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Welcome {user.name}</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  // getCurrentBirthdays: PropTypes.func.isrequired,
  auth: PropTypes.object.isRequired
  // birthday: PropTypes.object.isrequired
};

const mapStateToProps = state => ({
  birthdays: state.birthday,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentBirthdays }
)(Dashboard);
