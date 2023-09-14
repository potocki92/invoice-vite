const AuthenticationForm = (props) => {
  const { onSubmit, onChange, formData, buttonText, error } = props;
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="grid gap-3">
        <ul className="grid gap-3">
          {formData.map((data, index) => (
            <li className="flex flex-col space-y-1" key={index}>
              <label
                className="text-[#FBFCFF] font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm"
                htmlFor={data.name}
              >
                {data.label}
              </label>
              <input
                className="text-[#FBFCFF] flex h-10 w-full rounded-md border border-[#B8B3AF] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-[#B8B3AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id={data.name}
                placeholder={data.placeholder}
                autoCorrect="off"
                type={data.type}
                name={data.name}
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <p className="px-1 text-xs font-[500] text-red-500/90">{error}</p>
            </li>
          ))}
        </ul>
        <button
          className="text-[#FBFCFF] bg-[#EA580C] inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          type="submit"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default AuthenticationForm;
