import { formatTime } from "../../utils/formatTime";
import { useAppSelector } from "../../store/store";
import { selectLastStatedTimerId, selectTimers } from "../../entities/Timer/model/timerSlice";
import { Link, useLocation } from "react-router-dom";



const Header = () => {
    const timers = useAppSelector(selectTimers);
    const lastStartedTimerId = useAppSelector(selectLastStatedTimerId);
  
    const getLastStartedTimer = () => {
        return timers[lastStartedTimerId!];
  
    };
    const location = useLocation();
    const {  pathname } = location;
  


    return (
        <header>
                {
                    pathname === "/timeManagement" && 
                    <div className="current-timer-wrapper">
                        <span>
                            Last starded:
                        </span>
                        <div className="current-timer">
                            <div className="current-timer-text">
                                {getLastStartedTimer()?.title}
                            </div>
                            <div className="current-timer-text">
                                {getLastStartedTimer() && formatTime(getLastStartedTimer().time) }
                            </div>
                        </div>
                    </div>
                }
                
            

        <button>
            <Link className="nav-link"  to={ pathname === "/timeManagement" ? "/timeManagement/analytics" : "/timeManagement" }>
            {
                pathname === "/timeManagement" ? "Analitics page >" : "< Main page"
            }
            </Link>
        </button>
    </header>
    );
}
 
export default Header;