import "./css/products.css";
import { getFilledPaymentGroups } from "../requests";
import { useEffect, useState } from "react";
import GroupRow from "../component/GroupRow";
import PaymentsHeader from "./PaymentsHeader";
import { calcPaymentsSum } from "../util/utils";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setAllPaymentsCollapsed, replaceGroup, finishReplaceGroup, selectPayment, resetSelecting } from "../store/actions";

function PaymentsContainer({ store, actions }) {

  const [date, setDate] = useState(Date.now());
  const [commonSum, setCommonSum] = useState(0);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    refreshRoot();
    window.scc = { last_date: new Date(Date.now()).toLocaleDateString('en-CA') };
  }, [])

  function refreshRoot(newDate) {
    getFilledPaymentGroups(newDate ? newDate : date).then(items => {
      let groupsSum = 0;
      setGroups(items);
      if (items) {
        groupsSum += items.reduce((common, group) => { return common + calcPaymentsSum(group) }, 0);
      }
      setCommonSum(groupsSum.toFixed(2));
    });
  }

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
    refreshRoot(newDate.getTime());
  }

  function onNewGroup(e) {
    e.stopPropagation();
    const groupsCopy = [...groups];
    groupsCopy.push({ isNew: true, id: 0 });
    setGroups(groupsCopy);
  }

  return (
    <div className="container">
      <PaymentsHeader
        commonSum={commonSum}
        date={date}
        changeMonth={(offset) => changeMonth(offset)}
        newGroup={(e) => onNewGroup(e)}
      />

      {groups ? groups.map((group, index) =>
        <GroupRow
          key={group.id}
          group={group}
          parentId='root'
          refreshRoot={() => refreshRoot()}
          store={store}
          actions={actions}
        />
      ) : ''}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setAllPaymentsCollapsed, replaceGroup, finishReplaceGroup, selectPayment, resetSelecting }, dispatch)
});

const mapStateToProps = (store) => (store);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsContainer);