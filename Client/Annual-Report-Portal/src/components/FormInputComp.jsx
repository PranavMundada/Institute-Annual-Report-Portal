export default function FormInputComponent({
  name,
  ref,
  type,
  placeholder,
  style,
  defaultValue,
}) {
  return (
    <div className="flex  flex-col mb-10 text-xl md:flex-row">
      <h1 className="mr-2 md:text-2xl">{name} :</h1>
      <input
        className={`flex-grow border-1 ${style}`}
        type={type}
        placeholder={placeholder}
        ref={ref}
        defaultValue={defaultValue}
      />
    </div>
  );
}
