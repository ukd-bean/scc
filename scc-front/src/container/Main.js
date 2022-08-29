import React from 'react';
import { useState } from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import './css/main.css';
import PaymentsContainer from "./PaymentsContainer";
import HistoryContainer from "./HistoryContainer";
import { setAllPaymentsCollapsed, switchMode, setIsHiddenMode } from "../store/actions";

const Main = ({ store, actions}) => {

  const [date, setDate] = useState(Date.now());

  function changeMonth(monthOffset) {
    const dateT = new Date(date);
    let newDate;
    if (monthOffset > 0) {
      if (dateT.getMonth() == 11) {
        newDate = new Date(dateT.getFullYear() + 1, 0, 1);
        setDate(newDate.getTime());
      } else {
        newDate = new Date(dateT.getFullYear(), dateT.getMonth() + 1, 1);
        setDate(newDate.getTime());
      }
    } else {
      if (dateT.getMonth() == 0) {
        newDate = new Date(dateT.getFullYear() - 1, 0, 1);
        setDate(newDate.getTime());
      } else {
        newDate = new Date(dateT.getFullYear(), dateT.getMonth() - 1, 1);
        setDate(newDate.getTime());
      }
    }
    return newDate;
  }

  function commandInput(value) {
    if (value === 'showmethemoney') {
      actions.setIsHiddenMode(false);
    } else {
      if (!store.isHiddenMode) {
        actions.setIsHiddenMode(true);
      }
    }
  }

  return (
    <div>
      <div style={{ display: "block" }} >
        {store.isGroupMode
          ? <button style={{ margin: "5px" }} onClick={() => actions.switchMode()} >History</button>
          : <button style={{ margin: "5px" }} onClick={() => actions.switchMode()} >Groups</button>
        }
        <input onChange={e => commandInput(e.target.value)}/>
      </div>
      <div className="main">
        <div
          className="collapse_all"
          onClick={() => actions.setAllPaymentsCollapsed(true)}
        ></div>
        {store.isGroupMode
         ? <PaymentsContainer date={date} changeMonth={changeMonth} />
         : <HistoryContainer date={date} />
        }
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setAllPaymentsCollapsed, switchMode, setIsHiddenMode }, dispatch)
});

const mapStateToProps = (store) => {
  return store;
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);