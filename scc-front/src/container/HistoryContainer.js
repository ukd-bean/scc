import "./css/products.css";
import { getHistoryPaymentsByMonth } from "../requests";
import { useEffect, useState } from "react";
import { PaymentRow } from "../component/PaymentRow";
import { setAllPaymentsCollapsed, replaceGroup, finishReplaceGroup, selectPayment, resetSelecting } from "../store/actions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

function HistoryContainer({ store, actions, date }) {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        getHistoryPaymentsByMonth(date).then((resp) => {
            setPayments(resp)
        })
    }, [])

    return (
        <div>
            {payments ? payments.map(payment =>
                payment.hiddenPayment == 'true' && store.isHiddenMode
                    ? ''
                    : <PaymentRow
                        key={payment.id}
                        payment={payment}
                        refreshGroup={() => console.log('no refresh')}
                        store={store}
                        actions={actions}
                      />
            ) : ""}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ setAllPaymentsCollapsed, replaceGroup, finishReplaceGroup, selectPayment, resetSelecting }, dispatch)
  });
  
const mapStateToProps = (store) => (store);

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);