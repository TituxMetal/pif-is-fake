type CaretProps = {
  className?: string
}

export const Caret = ({ className = '' }: CaretProps) => (
  <span
    aria-hidden='true'
    className={`inline-block h-[3px] w-[0.55em] animate-pif-blink bg-current align-baseline ${className}`}
  />
)
