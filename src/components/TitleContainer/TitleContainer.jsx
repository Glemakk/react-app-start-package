import React from 'react';

function TitleContainer({ title, children }) {
    return (
        <div>
            {title && <h2>{title}</h2>}
            {children}
        </div>
    );
}

export default TitleContainer;