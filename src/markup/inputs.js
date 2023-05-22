const markup = (item, handleChange, value) => {
  return (
    <div className="form__group">
      <p>{item.inputName}</p>
      <input
        type={item.type}
        name={item.name}
        value={value}
        onChange={handleChange}
        placeholder={item.placeholder}
      ></input>
    </div>
  );
};

export default markup;
