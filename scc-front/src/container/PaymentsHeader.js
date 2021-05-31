import "./css/productsHeader.css"

export function PaymentsHeader({ commonSum, date, changeMonth, newGroup }) {

  function prevMonth() {
    changeMonth(-1);
  }

  function nextMonth() {
    changeMonth(1);
  }

  return (
    <div className="root-group">
      <div className="root-actions">
        <div id="row_new-group" className="row_action new" onClick={(e) => newGroup(e)}>
          &#128193;
        </div>
        <div id="row_new-pay" className="row_action new">
          &#128178;
        </div>
        <div className="row__section-cost">
          {commonSum}
        </div>
      </div>
      <div className="root-month-manage">
        <button className="manage-month" onClick={() => prevMonth()}>{'<'}</button>
        <div className="manage-month_month">
          {new Date(date).toLocaleString('default', { month: 'long' })}
        </div>
        <button className="manage-month" onClick={() => nextMonth()}>{'>'}</button>
      </div>
    </div>
  )
}