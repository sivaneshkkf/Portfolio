function ContactInput({lable,type, id, className,register,error}) {
  return (
    <div className="space-y-1">
      <label htmlFor="name" className="text-xs md:text-sm text-textHead dark:text-dark-textHead font-semibold">{lable}</label>
      <input
        type={type}
        id={id}
        name={id}
        {...register}
        className={`md:py-2 md:px-3 py-1 px-2 bg-secondary dark:bg-dark-secondary rounded outline-none w-full ${className} ${error ? "border-2 border-accent" : ""}`}
      />
      {error && <span className="text-xs text-red-600 font-medium">{error.message}</span>}
    </div>
  );
}

export default ContactInput;
