import React from 'react';

const DetailDescription = ({description}) => {
    return (
        <>
            {description.map((item, index) => (
                <article className='detail-page__description' key={index}>
                    {item.description}
                </article>
            ))}
        </>

    );
};

export default DetailDescription;