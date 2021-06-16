import './css/row.css';
import { useState, useEffect } from "react";
import { createPayment, deletePayment, updatePayment } from "../requests";
import { dateTimeFormat } from "../util/utils";

export function PaymentRow({ payment, refreshGroup, store, actions }) {

  const [isEdit, setIsEdit] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isCuted, setIsCuted] = useState(false);

  const [id, setId] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [date, setDate] = useState(null);
  const [cost, setCost] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!payment.isNew) {
      setId(payment.id)
      setGroupId(payment.groupId)
      setComment(payment.comment)
      setCost(payment.cost)
      setDate(payment.date)
    } else {
      setDate(window.scc.last_date)
      setGroupId(payment.groupId)
      setIsEdit(true);
    }
  }, [])

  useEffect(() => {
    if (store.arePaymentsCuted && isSelected) {
      setIsSelected(false);
      setIsCuted(true);
    } else if (!store.arePaymentsCuted) {
      setIsCuted(false)
    }
  }, [store.arePaymentsCuted]);

  function onEdit(e) {
    e.stopPropagation();
    setIsEdit(!isEdit)
  }

  function applyEdit(e) {
    e.stopPropagation();
    if (payment.isNew) {
      createPayment(date, cost, comment, groupId).then(() => refreshGroup());
    } else {
      updatePayment(id, date, cost, comment).then(() => refreshGroup())
    }
    setIsEdit(!isEdit)
  }

  function onRemove(e) {
    if (isEdit && payment.isNew) {
      refreshGroup();
    } else if (isEdit) {
      setComment(payment.comment)
      setCost(payment.cost)
      setDate(payment.date)
      setIsEdit(!isEdit)
    } else if (window.confirm("Are you sure want to DELETE this payment:\n " + " " + cost + "р. '" + comment + "' " + dateTimeFormat(date))) {
      deletePayment(id, groupId).then(() => refreshGroup());
    }
    e.stopPropagation();
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      applyEdit(e)
    }
  }

  function changeDate(e) {
    setDate(e.target.value)
    window.scc.last_date = e.target.value;
  }

  function clickCheckbox({ target }) {
    setIsSelected(target.checked)
    actions.selectPayment(payment.id, target.checked)
  }

  return (
    <div className="row" style={isCuted ? { 'display': 'none' } : {}}>
      <div className="row_info">
        &nbsp;&#128178;&nbsp;
        {isEdit ?
          <>
            <input className="row_edit" type="date" value={date} onChange={(e) => changeDate(e)} onKeyDown={(e) => onKeyDown(e)} />
            <input className="row_edit cost" value={cost} autoFocus type="number" min="0.01" step="0.01" max="10000" 
              onChange={(e) => setCost(e.target.value)} onKeyDown={(e) => onKeyDown(e)} />
            <input className="row_edit comment" value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => onKeyDown(e)} />
          </>
          :
          <>
            <div className="row__section short">{dateTimeFormat(date)}</div>
            <div className="row__section-cost">{cost}</div>
            <div className="row__section">{comment ? comment : ''}</div>
          </>
        }
      </div>
      <div className="row_actions">
        {isEdit ?
          <div id="row_edit-apply" className="row_action new" onClick={(e) => applyEdit(e)}>
            &#10004;
          </div>
          :
          <div id="row_edit" className="row_action small" onClick={(e) => onEdit(e)} style={store.isGlobalEdit ? {} : { 'visibility': 'hidden' }}>
            &#128295;
          </div>
        }
        <div id="row_delete" className="row_action small" onClick={(e) => onRemove(e)} style={store.isGlobalEdit || isEdit ? {} : { 'visibility': 'hidden' }}>
          &#10060;
        </div>
        <input type="checkbox" className="row_action-checkbox" checked={isSelected} onChange={(e) => clickCheckbox(e)} 
          style={store.isGlobalEdit && !store.arePaymentsCuted ? {} : { 'visibility': 'hidden' }}/>
      </div>
    </div>
  );
}