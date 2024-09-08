import React, { useEffect, useState } from 'react';

const Loading = ({ isLoading }) => {
    const [classNames, setClassNames] = useState('w-0 h-0');

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => setClassNames('w-full h-full'), 100); // start the animation
        } else {
            setClassNames('w-0 h-0');
        }
    }, [isLoading]);

    return (
        <div className={`absolute bg-black z-50 top-0 transition-all duration-500 ${classNames}`}>
            Loading
        </div>
    );
};

export default Loading;
