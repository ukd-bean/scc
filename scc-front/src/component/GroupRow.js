import './css/row.css'
import { useEffect, useState } from "react";
import { PaymentRow } from "./PaymentRow";
import { calcPaymentsSum } from "../util/utils";
import { createGroup, updateGroupName, getFilledPaymentSingleGroup, deleteGroup } from "../requests";

export function GroupRow({ group, parentId, refreshParent }) {

  const [expanded, setExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [children, setChildren] = useState("");
  const [payments, setPayments] = useState("");
  const [commonSum, setCommonSum] = useState("");

  useEffect(() => {
    if (!group.isNew) {
      setId(group.id)
      setName(group.name)
      setChildren(group.children)
      setPayments(group.payments)
      setCommonSum(calcPaymentsSum(group).toFixed(2));
    } else {
      setId(0)
      setName('');
      setChildren([])
      setPayments([])
      setIsEdit(true);
    }
  }, [group])

  function expand(e) {
    if ((e.target.getAttribute("data-key") === id.toString()
      || e.target.parentNode.getAttribute("data-key") === id.toString()
      || e.target.parentNode.parentNode.getAttribute("data-key") === id.toString())
      && e.target.className !== 'row_edit') {
      e.preventDefault();
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
      createGroup(name, parentId).then(() => refreshParent());
    } else {
      updateGroupName(id, name).then(() => refreshParent())
    }
    setIsEdit(!isEdit)
  }

  function onRemove(e) {
    e.stopPropagation();
    if (isEdit && group.isNew) {
      refreshParent();
    } else if (isEdit) {
      setName(group.name)
      setIsEdit(!isEdit)
    } else if (window.confirm("Are you sure want to DELETE '" + name + "' group?!?!")) {
      deleteGroup(id, parentId).then(() => refreshParent());
    }
    
  }

  function onNewGroup(e) {
    e.stopPropagation();
    if (!expanded) {
      setExpanded(true);
    }
    const childrenCopy = [...children];
    childrenCopy.push({ isNew: true, id: 0 });
    setChildren(childrenCopy);
  }

  function onNewPayment(e) {
    e.stopPropagation();
    if (!expanded) {
      setExpanded(true);
    }
    const paymentsCopy = [...payments];
    paymentsCopy.push({ isNew: true, id: 0, groupId: id });
    setPayments(paymentsCopy);
  }

  function refresh() {
    getFilledPaymentSingleGroup(id, Date.now()).then((data) => {
      setChildren(data.children);
      setPayments(data.payments);
      setCommonSum(calcPaymentsSum(group).toFixed(2));
    });

  }

  return (
    <>
      <div key={id} data-key={id} className="row"
        onClick={(e) => expand(e)}
      >
        <div className="row_info">
          &#128193;
          {isEdit ?
            <input className="row_edit" value={name} onChange={(e) => setName(e.target.value)} />
            :
            <div className="row__section short">{name}</div>
          }
          <div className="row__section-cost">{commonSum}</div>
        </div>
        <div className="row_actions">
          {isEdit ?
            <>
              <div id="row_edit-apply" className="row_action new" onClick={(e) => applyEdit(e)}>
                &#10004;
              </div>
              <div id="row_delete" className="row_action small" onClick={(e) => onRemove(e)}>
                &#10060;
              </div>
            </>
            :
            <>
              <div id="row_new-group" className="row_action new" onClick={(e) => onNewGroup(e)}>
                &#128193;
              </div>
              <div id="row_new-pay" className="row_action new" onClick={(e) => onNewPayment(e)}>
                &#128178;
              </div>
              <div id="row_edit" className="row_action small" onClick={(e) => onEdit(e)}>
                &#128295;
              </div>
              <div id="row_delete" className="row_action small" onClick={(e) => onRemove(e)}>
                &#10060;
              </div>
            </>
          }
        </div>
      </div>
      <div className="row__expand-zone">
        {expanded ? children.map(child => <GroupRow key={child.id} group={child} parentId={group.id} refreshParent={() => refresh()} />) : ""}
        {expanded ? payments.map(payment => <PaymentRow key={payment.id} payment={payment} refreshGroup={() => refresh()} />) : ""}
      </div>
    </>
  )

}