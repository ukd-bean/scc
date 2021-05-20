import './css/row.css';
import {useState} from "react";

export function PaymentRow({payment}) {

    const [isEdit, setIsEdit] = useState(false);

    function dateTimeFormat(value) {
        const date = new Date(value);
        return date.toLocaleDateString("en-GB", {year: 'numeric', month: 'short', day: '2-digit'});
    }

    return (
        <div className="row">
            <div className="row_info">
                &nbsp;
                &#128178;
                <div className="row__section short">{dateTimeFormat(payment.dateTime)}</div>
                <div className="row__section short">{payment.cost}</div>
                <div className="row__section">{payment.comment ? payment.comment : ''}</div>
            </div>
            <div className="row_actions">
                <div className="row_edit">
                &#128178;
                </div>
            </div>
        </div>
    );
}