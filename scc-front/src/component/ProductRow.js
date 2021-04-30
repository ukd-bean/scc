import './css/row.css';

export function ProductRow({product, noCheckbox}) {

    return(
        <div className="row">
            {noCheckbox ? <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : <div className="row__section option">x</div>}
            <div className="row__section">{product.name}</div>
            <div className="row__section">{product.parent}</div>
            <div className="row__section cost">{product.cost}</div>
        </div>
    );
}