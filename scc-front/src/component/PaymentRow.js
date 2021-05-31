import './css/row.css';
import { useState, useEffect } from "react";
import { createPayment, deletePayment, updatePayment } from "../requests";
import { dateTimeFormat } from "../util/utils";

export function PaymentRow({ payment, refreshGroup }) {

  const [isEdit, setIsEdit] = useState(false);

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
      setDate(new Date(Date.now()).toLocaleDateString('en-CA'))
      setGroupId(payment.groupId)
      setIsEdit(true);
    }
  }, [])

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

  return (
    <div className="row">
      <div className="row_info">
        &nbsp;&#128178;&nbsp;
        {isEdit ?
          <>
            <input className="row_edit" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input className="row_edit cost" value={cost} type="number" min="0.01" step="0.01" max="10000" onChange={(e) => setCost(e.target.value)} />
            <input className="row_edit comment" value={comment} onChange={(e) => setComment(e.target.value)} />
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
  );
}