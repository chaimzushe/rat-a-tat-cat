import React from 'react';

const CardsContext = React.createContext({});

export default props => {
    return <CardsContext.Provider>
        {props.children}
    </CardsContext.Provider>
}