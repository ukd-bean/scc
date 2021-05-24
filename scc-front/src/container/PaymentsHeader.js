import "./css/productsHeader.css"

export function PaymentsHeader({commonSum}) {

    return(
        <div className="root-group">
            <div id="row_new-group" className="row_action new">
                &#128193;
            </div>
            <div id="row_new-pay" className="row_action new">
                &#128178;
            </div>
            <div className="row__section-cost">{commonSum}</div>
        </div>
    )
}