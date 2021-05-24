import './css/row.css';
import { useState, useEffect } from "react";

export function PaymentRow({ payment, isNew }) {

  const [isEdit, setIsEdit] = useState(false);

  const [id, setId] = useState(false);
  const [groupId, setGroupId] = useState(false);
  const [date, setDate] = useState(false);
  const [cost, setCost] = useState(false);
  const [comment, setComment] = useState(false);

  useEffect(() => {
    if (!isNew) {
      setId(payment.id)
      setComment(payment.comment)
      setCost(payment.cost)
      setDate(payment.date)
    } else {
      setComment("")
      setCost(0)
      const newdate = new Date(Date.now());
      console.log(newdate.toLocaleDateString('en-CA'));
      setDate(newdate.toLocaleDateString('en-CA'))
      setIsEdit(true);
    }
  }, [])

  function dateTimeFormat(value) {
    const date = new Date(value);
    return date.toLocaleDateString("en-GB", { year: 'numeric', month: 'short', day: '2-digit' });
  }

  function onEdit(e) {
    console.log(date.substr(0, 10));
    e.stopPropagation();
    setIsEdit(!isEdit)
  }

  function applyEdit(e) {
    console.log(date);
    e.stopPropagation();
    setIsEdit(!isEdit)
  }

  function onRemove(e) {
    e.stopPropagation();
    alert("Are you stupid!?!?");
  }

  return (
    <div className="row">
      <div className="row_info">
        &nbsp; &#128178;
        {isEdit ?
          <>
            <input className="row_edit" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            <input className="row_edit cost" value={cost} type="number" min="0.01" step="0.01" max="10000" onChange={(e) => setCost(e.target.value)} />
            <input className="row_edit comment" value={comment} onChange={(e) => setComment(e.target.value)} />
          </>
        :
          <>
            <div className="row__section short">{dateTimeFormat(date)}</div>
            <div className="row__section short">{cost}</div>
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