import './css/row.css'
import { useEffect, useState } from "react";
import { PaymentRow } from "./PaymentRow";
import { calcPaymentsSum } from "../util/utils";
import { createGroup, updateGroupName, deleteGroup, replaceGroupTo, replacePayments } from "../requests";

function GroupRow({ group, parentId, refreshRoot, store, actions, rootCommonSum }) {

  const {isGlobalCollapse, isGlobalEdit, replacingGroupId, selectedPayments, arePaymentsCuted} = store;

  const [expanded, setExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [children, setChildren] = useState("");
  const [payments, setPayments] = useState("");
  const [commonSum, setCommonSum] = useState("");
  const [percents, setPercents] = useState("");

  useEffect(() => {
    if (!group.isNew) {
      setId(group.id)
      setName(group.name)
      setChildren(group.children)
      setPayments(group.payments)
      const paymentsSum = calcPaymentsSum(group).toFixed(2);
      setCommonSum(paymentsSum);
      setPercents(rootCommonSum > 0 ? (paymentsSum / rootCommonSum).toFixed(1) : 0)
    } else {
      setId(0)
      setName('');
      setChildren([])
      setPayments([])
      setIsEdit(true);
    }
  }, [group])

  useEffect(() => {
    if (isGlobalCollapse) {
      setExpanded(!isGlobalCollapse);
    }
  }, [isGlobalCollapse])

  function expand(e) {
    if ((e.target.getAttribute("data-key") === id.toString()
      || e.target.parentNode.getAttribute("data-key") === id.toString()
      || e.target.parentNode.parentNode.getAttribute("data-key") === id.toString())
      && !e.target.classList.contains('no-expand')) {
      e.preventDefault();
      if (isGlobalCollapse === true) {
        actions.setAllPaymentsCollapsed(false);
      }
      setExpanded(!expanded);
    }
  }

  function onEdit(e) {
    e.stopPropagation();
    setIsEdit(!isEdit)
  }

  function applyEdit(e) {
    e.stopPropagation();
    if (group.isNew) {
      createGroup(name, parentId).then(() => refreshRoot());
    } else {
      updateGroupName(id, name).then(() => refreshRoot())
    }
    setIsEdit(!isEdit)
  }

  function onRemove(e) {
    e.stopPropagation();
    if (isEdit && group.isNew) {
      refreshRoot();
    } else if (isEdit) {
      setName(group.name)
      setIsEdit(!isEdit)
    } else if (window.confirm("Are you sure want to DELETE '" + name + "' group?!?!")) {
      deleteGroup(id, parentId).then(() => refreshRoot());
    }
  }

  function onNewGroup(e) {
    e.stopPropagation();
    if (!expanded) {
      setExpanded(true);
    }
    const childrenCopy = [...children];
    childrenCopy.unshift({ isNew: true, id: 0 });
    setChildren(childrenCopy);
  }

  function onNewPayment(e) {
    e.stopPropagation();
    if (!expanded) {
      setExpanded(true);
    }
    const paymentsCopy = [...payments];
    paymentsCopy.unshift({ isNew: true, id: 0, groupId: id });
    setPayments(paymentsCopy);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      applyEdit(e)
    }
  }

  function replaceTo() {
    if (selectedPayments.length > 0 && arePaymentsCuted) {
      replacePayments(selectedPayments, group.id).then(() => {
        actions.resetSelecting();
        refreshRoot();
        setExpanded(true)
      })
    } else if (replacingGroupId) {
      replaceGroupTo(replacingGroupId, group.id).then(() => {
        actions.finishReplaceGroup();
        refreshRoot();
      })
    }
  }

  return (
    <>
      <div key={id} data-key={id} className="row"
        onClick={(e) => expand(e)}
        style={replacingGroupId === group.id ? { 'display': 'none' } : {}}
      >
        <div className="row_info">
          &#128193;
          {isEdit ?
            <input className="row_edit" value={name} autoFocus onChange={(e) => setName(e.target.value)} onKeyDown={(e) => onKeyDown(e)} />
            :
            <div className="row__section short">{name}</div>
          }
          <div className="row__section-cost">{commonSum}</div>
        </div>
        <div className="recents_wrapper">
          <div className="row__section-percents"
            style={{width: commonSum > 0 ? (commonSum / rootCommonSum * 100).toFixed(1) + '%' : 0}}
          >{commonSum > 0 ? (commonSum / rootCommonSum * 100).toFixed(1) + '%' : 0}</div>
        </div>
        <div className="row_actions">
          <div className="row_action new" style={isGlobalEdit || isEdit ? { 'visibility': 'hidden' } : {}} onClick={(e) => onNewGroup(e)}>
            &#128193;
          </div>
          <div className="row_action new" style={isGlobalEdit || isEdit ? { 'visibility': 'hidden' } : {}} onClick={(e) => onNewPayment(e)}>
            &#128178;
          </div>
          {!isEdit ?
            <div className="row_action no-expand small" onClick={(e) => onEdit(e)} style={isGlobalEdit || isEdit ? {} : { 'visibility': 'hidden' }}>
              &#128295;
            </div>
            :
            <div id="row_edit-apply" className="row_action new" onClick={(e) => applyEdit(e)}>
              &#10004;
            </div>
          }
          <div className="row_action no-expand small" onClick={(e) => onRemove(e)} style={isGlobalEdit || isEdit ? {} : { 'visibility': 'hidden' }}>
            &#10060;
          </div>
          {isGlobalEdit && replacingGroupId || selectedPayments.length > 0 && arePaymentsCuted ?
            <div className="row_action no-expand small" onClick={() => replaceTo()} style={replacingGroupId === group.id ? { 'visibility': 'hidden' } : {}}>
              ◀️
            </div>
            :
            <div className="row_action no-expand small" onClick={() => actions.replaceGroup(group.id)} style={!isGlobalEdit ? { 'visibility': 'hidden' } : {}}>
              ▶️
            </div>
          }
        </div>
      </div>
      <div className="row__expand-zone" style={replacingGroupId === group.id ? { 'display': 'none' } : {}}>
        {expanded && !isGlobalCollapse ? children.map(child =>
          <GroupRow
            key={child.id}
            group={child}
            parentId={group.id}
            rootCommonSum={rootCommonSum}
            refreshRoot={() => refreshRoot()}
            store={store}
            actions={actions}
          />) : ""}
        {expanded && !isGlobalCollapse ? payments.map(payment =>
          <PaymentRow
            key={payment.id}
            payment={payment}
            refreshGroup={() => refreshRoot()}
            store={store}
            actions={actions}
          />) : ""}
      </div>
    </>
  )
}

export default GroupRow;