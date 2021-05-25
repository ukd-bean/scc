import './css/row.css';
import { useState, useEffect } from "react";

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
      setComment(payment.comment)
      setCost(payment.cost)
      setDate(payment.date)
    } else {
      setDate(new Date(Date.now()).toLocaleDateString('en-CA'))
      setIsEdit(true);
    }
  }, [])

  function dateTimeFormat(value) {
    const date = new Date(value);
    return date.toLocaleDateString("en-GB", { year: 'numeric', month: 'short', day: '2-digit' });
  }

  function onEdit(e) {
    e.stopPropagation();
    setIsEdit(!isEdit)
  }

  function applyEdit(e) {
    e.stopPropagation();
    setIsEdit(!isEdit)
    refreshGroup();
  }

  function onRemove(e) {
    if (isEdit && payment.isNew) {
      refreshGroup();
    } else if (isEdit) {
      setComment(payment.comment)
      setCost(payment.cost)
      setDate(payment.date)
      setIsEdit(!isEdit)
    }
    e.stopPropagation();
  }

  return (
    <div className="row">
      <div className="row_info">
        &nbsp; &#128178;
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