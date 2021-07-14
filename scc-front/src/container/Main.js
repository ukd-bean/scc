import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import './css/main.css';
import PaymentsContainer from "./PaymentsContainer";
import HistoryContainer from "./HistoryContainer";
import { setAllPaymentsCollapsed, switchMode } from "../store/actions";

const Main = ({ store, actions}) => {

  return (
    <div>
      <div style={{ display: "block" }} >
        {store.isGroupMode
          ? <button style={{ margin: "5px" }} onClick={() => actions.switchMode()} >History</button>
          : <button style={{ margin: "5px" }} onClick={() => actions.switchMode()} >Groups</button>
        }        
      </div>
      <div className="main">
        <div
          className="collapse_all"
          onClick={() => actions.setAllPaymentsCollapsed(true)}
        ></div>
        {store.isGroupMode
         ? <PaymentsContainer />
         : <HistoryContainer />
        }
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setAllPaymentsCollapsed, switchMode }, dispatch)
});

const mapStateToProps = (store) => {
  return store;
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);