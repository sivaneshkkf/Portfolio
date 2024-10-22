function ContactInput({lable,type, id, className,register,error}) {
  return (
    <div className="space-y-1">
      <label htmlFor="name" className="text-sm text-textHead font-semibold">{lable}</label>
      <input
        type={type}
        id={id}
        name={id}
        {...register}
        className={`py-2 px-3 bg-secondary rounded outline-none w-full ${className} ${error ? "border-2 border-accent" : ""}`}
      />
      {error && <span className="text-xs text-red-600 font-medium">{error.message}</span>}
    </div>
  );
}

export default ContactInput;
