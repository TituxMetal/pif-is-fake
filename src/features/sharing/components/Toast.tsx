interface ToastProps {
  message: string | null
}

export const Toast = ({ message }: ToastProps) => {
  if (message === null) return null

  return (
    <div
      role='status'
      aria-live='polite'
      className='fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-hi bg-panel px-4 py-2 font-mono text-xs uppercase tracking-wide text-hi'
    >
      {message}
    </div>
  )
}
