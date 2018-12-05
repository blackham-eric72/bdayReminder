// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import BdayForm from './BdayForm';
// import Spinner from '../common/Spinner';
// import { getCurrentBirthdays } from '../../actions/bdayAction';

// class Bday extends Component {
//   componentDidMount() {
//     this.props.getCurrentBirthdays();
//   }

//   render() {
//     return (
//       <div className="feed">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <BdayForm />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Bday.propTypes = {
//   getCurrentBirthdays: PropTypes.func.isRequired,
//   bday: PropTypes.object
// };

// const mapStateToProps = state => ({
//   post: state.post
// });

// export default connect(
//   mapStateToProps,
//   { getCurrentBirthdays }
// )(Bday);
