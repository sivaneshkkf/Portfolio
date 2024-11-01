function FeedbackInput({lable,type, id,placeholder, className,register,error}) {
  return (
    <div className="space-y-1">
      <label htmlFor="name" className="text-xs md:text-sm text-textHead dark:text-dark-textHead font-semibold">{lable}</label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        {...register}
        className={`md:px-3 py-2 px-2 text-xs text-textHead dark:text-dark-textHead bg-secondary dark:bg-dark-secondary rounded outline-none w-full ${className} ${error ? "border-2 border-accent" : ""}`}
      />
      {error && <span className="text-xs text-red-600 font-medium">{error.message}</span>}
    </div>
  );
}

export default FeedbackInput;
