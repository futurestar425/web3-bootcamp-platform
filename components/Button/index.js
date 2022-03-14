export default function Button({
  props,
  style,
  type,
  children,
  onClick,
  disabled,
}) {
  const primaryButton =
    'text-black-300 dark:text-white-100 rounded-lg bg-primary-300 px-6 py-3 text-sm transition duration-150 ease-in-out hover:bg-primary-200 dark:hover:bg-primary-400'

  const secondaryButton =
    'bg-transparent rounded-lg px-6 py-3 border-2 border-primary-300 text-sm text-primary-300 transition duration-150 ease-in-out hover:border-primary-400 hover:text-primary-400'

  return (
    <button
      disabled={disabled}
      type={type || 'button'}
      className={
        style === 'primary'
          ? primaryButton
          : style === 'secondary'
          ? secondaryButton
          : primaryButton
      }
      onClick={onClick || null}
    >
      {children}
    </button>
  )
}
