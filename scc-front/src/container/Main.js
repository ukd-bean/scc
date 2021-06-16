import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import './css/main.css';
import PaymentsContainer from "./PaymentsContainer";
import { setAllPaymentsCollapsed } from "../store/actions";

const Main = ({state, actions}) => {

  return (
    <div className="main">
      <div
        className="collapse_all"
        onClick={() => actions.setAllPaymentsCollapsed(true)}
      ></div>
      <PaymentsContainer />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setAllPaymentsCollapsed }, dispatch)
});

const mapStateToProps = (state) => {
  return {state};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);