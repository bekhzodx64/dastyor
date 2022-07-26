import React from 'react';

const DetailCharacteristics = ({characteristic}) => {
  return (
    <table className='detail-page__charac'>
      <tbody>
      {characteristic.length === 0 ? <div>Характеристики не найдены!</div> : characteristic.map(item => (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>
            {item.product_details.map((feature) => {
              let index = item.product_details.indexOf(feature);
              let sign = "";
              if (index < item.product_details.length - 1) {
                sign = ",";
              }
              return (
                <span key={feature.id}>{feature.value}{sign} &nbsp;</span>
              );
            })}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default DetailCharacteristics;