// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import TextFieldGroup from '../common/TextFieldGroup';
// import { addBday } from '../../actions/bdayAction';

// class BdayForm extends Component {
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
//   componentWillReceiveProps(newProps) {
//     if (newProps.errors) {
//       this.setState({ errors: newProps.errors });
//     }
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     const { user } = this.props.auth;

//     const newBday = {
//       user: user._id,
//       name: this.state.name,
//       DOB: this.state.DOB
//     };

//     this.props.addBday(newBday);
//     this.setState({
//       name: '',
//       DOB: ''
//     });
//   }

//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   render() {
//     const { errors } = this.state;

//     return (
//       <div className="post-form mb-3">
//         <div className="card card-info">
//           <div className="card-header bg-info text-white">Add A Birthday!</div>
//           <div className="card-body">
//             <form onSubmit={this.onSubmit}>
//               <h6>Name:</h6>
//               <TextFieldGroup
//                 placeholder="Name: i.e. Johnny Lingo"
//                 name="name"
//                 value={this.state.name}
//                 onChange={this.onChange}
//                 error={errors.name}
//               />
//               <h6>Birthday:</h6>
//               <TextFieldGroup
//                 name="DOB"
//                 type="date"
//                 value={this.state.DOB}
//                 onChange={this.onChange}
//                 error={errors.DOB}
//               />
//               <input
//                 type="submit"
//                 value="Submit"
//                 className="btn btn-info btn-block mt-4"
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// BdayForm.propTypes = {
//   addBday: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   errors: state.errors,
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { addBday }
// )(BdayForm);
