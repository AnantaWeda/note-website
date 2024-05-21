export default function ErrorMessage({message, className, ...props}){
    return(
        <p className={`text-xs mt-1 text-red-500 ${className}`} {...props}>{message}</p>
    )
}