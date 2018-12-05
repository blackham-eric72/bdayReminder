// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import TextFieldGroup from '../common/TextFieldGroup';
// // import Calendar from 'react-calendar';
// import { getEditBirthday } from '../../actions/birthdayActions';

// class EditBirthday extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       DOB: '',
//       errors: {}
//     };

//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }
//   // life cycle method:
//   componentDidMount() {
//     this.props.getEditBirthday(this.props.match.params.bdayId);
//     this.setState({ bday: 'hello' });
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }
//   onSubmit(e) {
//     e.preventDefault();

//     const birthdayData = {
//       name: this.state.name,
//       DOB: this.state.DOB
//     };

//     this.props.createBirthday(birthdayData, this.props.history);
//   }

//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   render() {
//     const { errors, birthday } = this.state;

//     return (
//       <div className="create-profile">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <h1 className="display-4 text-center">Edit Birthday</h1>
//               <form onSubmit={this.onSubmit}>
//                 <h6>Name:</h6>
//                 <TextFieldGroup
//                   placeholder="Name: i.e. Johnny Lingo"
//                   name="name"
//                   value={this.state.name}
//                   onChange={this.onChange}
//                   error={errors.name}
//                 />
//                 <h6>Birthday:</h6>
//                 <TextFieldGroup
//                   name="DOB"
//                   type="date"
//                   value={this.state.DOB}
//                   onChange={this.onChange}
//                   error={errors.DOB}
//                 />
//                 <input
//                   type="submit"
//                   value="Submit"
//                   className="btn btn-info btn-block mt-4"
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// EditBirthday.propTypes = {
//   getEditBirthday: PropTypes.func.isRequired,
//   bday: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   bday: state.bday
// });
// export default connect(
//   mapStateToProps,
//   { getEditBirthday }
// )(withRouter(EditBirthday));
