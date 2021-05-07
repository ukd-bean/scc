import {useEffect, useRef, useState} from "react";


export function ContextMenu() {

    const menu = useRef(null);

    const [isShown, setIsShown] = useState(false);
    const [coordinated, setCoordinates] = useState(null);

    useEffect(() => {
        document.addEventListener("contextmenu", (e) => {
            if (e?.target?.classList?.contains("row") || e?.target?.parentNode?.classList?.contains("row")) {
                e.preventDefault();
                const x = e.pageX;
                const y = e.pageY;

                menu.current.style.top = y;
                menu.current.style.left = x;
                //
                // menu.style.top = y;
                // menu.style.left = x;

                setIsShown(true);
            } else {
                console.log("XUY")
                console.log(e.target.classList);
                setIsShown(false);
            }
        })
    }, []);

    return(
        <div className={`context-menu ${isShown ? " " : "hidden"}`} ref={menu}>
            <div className="menu-row">редактировать</div>
            <div className="menu-row">удалить</div>
        </div>
    )
}