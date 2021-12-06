import React from "react";
import { AppContext } from '../App/AppProvider';

function Welcome(props) {
    return (
        <AppContext.Consumer>
            {({firstVisit}) => 
                !firstVisit ? null :
                <div>
                    Welcome to CryptoDash, please select your favorite coins to begin.{' '}
                </div>
            }
        </AppContext.Consumer>
        
    );
}

export default Welcome;
  