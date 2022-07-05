import React from 'react';

const Filter = ({ value, onChange }) => {

    // const { value, onChange } = this.props;
    return (
        <div>
            <label >
                Filter <input value={value} onChange={onChange} />
            </label>
        </div>
    );
};
export default Filter;