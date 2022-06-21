import React, { useState } from 'react';

export const Form = ({ handleAdd }) => {
  const [product, setProduct] = useState({
    name: '',
    expireDate: '',
    category: '',
  });
  const handleChange = ({ target: { name, value } }) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.name.value = '';
    e.target.expireDate.value = '';
    e.target.category.value = '';
    handleAdd(product);
    setProduct({
      name: '',
      expireDate: '',
      category: '',
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name:</label>
      <input onChange={handleChange} name='name' type='text' />
      <label htmlFor='expireDate'>Expire Date</label>
      <input onChange={handleChange} name='expireDate' type='date' />
      <label htmlFor='category'>Category</label>
      <select defaultValue='' onChange={handleChange} name='category'>
        <option value='diary'>diary</option>
        <option value='meat'>meat</option>
        <option value='vegetables'>vegetables</option>
        <option value='fruits'>fruits</option>
      </select>
      <button type='submit'>Add</button>
    </form>
  );
};
