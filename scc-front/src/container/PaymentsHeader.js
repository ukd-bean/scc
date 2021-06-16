import "./css/productsHeader.css"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { globalEdit, finishReplaceGroup, resetSelecting, cutPayments } from "../store/actions";

function PaymentsHeader({ commonSum, date, changeMonth, newGroup, actions, store }) {

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
      <div className="row_action new" onClick={() => actions.globalEdit()}>
        🕹️
      </div>
      {store.replacingGroupId &&
        <div className="row_action new" onClick={() => actions.finishReplaceGroup()}>
          🔽
        </div>
      }
      {store.selectedPayments.length > 0 && !store.arePaymentsCuted &&
        <div className="row_action new" onClick={() => actions.cutPayments()}>
          ▶️
        </div>
      }
      {store.selectedPayments.length > 0 && store.arePaymentsCuted &&
        <div className="row_action new" onClick={() => actions.resetSelecting()}>
          🔽
        </div>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ globalEdit, finishReplaceGroup, resetSelecting, cutPayments }, dispatch)
});

const mapStateToProps = ({store}) => {
  return {store};
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsHeader);