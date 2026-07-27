import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function FeedbackInput({ label, type = "text", id, className = "", register, error, icon, success }) {
  const fieldClasses = `peer w-full rounded-2xl border bg-white/5 backdrop-blur-md text-sm text-hero-text outline-none transition-all duration-300 placeholder-transparent ${
    icon ? "pl-11 pr-4" : "px-4"
  } pt-5 pb-2 ${
    error
      ? "border-red-400/70 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
      : success
      ? "border-hero-success/50 focus:border-hero-success focus:ring-2 focus:ring-hero-success/20"
      : "border-white/10 focus:border-hero-primary focus:ring-2 focus:ring-hero-primary/25"
  } ${className}`;

  const labelClasses = `pointer-events-none absolute text-sm text-hero-muted transition-all duration-300 peer-focus:text-hero-primary peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:text-[11px] ${
    icon ? "left-11" : "left-4"
  } top-1/2 -translate-y-1/2 peer-focus:top-2 peer-focus:translate-y-0 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0`;

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          placeholder=" "
          {...register}
          className={fieldClasses}
        />

        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-hero-muted transition-colors duration-300 peer-focus:text-hero-primary">
            {icon}
          </span>
        )}

        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>

        {!error && success && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-hero-success">
            <CheckCircleIcon fontSize="small" />
          </span>
        )}
      </div>

      {error && (
        <span className="flex items-center gap-1 text-xs font-medium text-red-400">
          <ErrorOutlineIcon sx={{ fontSize: 14 }} />
          {error.message}
        </span>
      )}
    </div>
  );
}

export default FeedbackInput;
