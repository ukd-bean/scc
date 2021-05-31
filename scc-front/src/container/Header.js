import './css/header.css';
import { dateTimeFormat } from "../util/utils";

export function Header() {

    return(
      <div className="header">
        <div className="header__item">
          SC-CASH
        </div>
        <div className="header__item">
          {dateTimeFormat(new Date(Date.now()).toLocaleDateString('en-CA'))}
        </div>
      </div>
    );
}