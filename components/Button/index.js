import React from 'react';

export const Button = React.forwardRef((
  props,
  ref,
) => {
  const primaryButton =  props?.disabled ?
    `${props?.customClass} text-black-300 dark:text-white-100 rounded-lg bg-primary-300 px-6 py-3 text-sm transition duration-150 ease-in-out` : `${props?.customClass || ''} text-black-300 dark:text-white-100 rounded-lg bg-primary-300 px-6 py-3 text-sm transition duration-150 ease-in-out hover:bg-primary-200 dark:hover:bg-primary-400` ;

  const secondaryButton = 
    `${props?.customClass || ''} bg-transparent rounded-lg px-6 py-3 border-2 border-primary-300 text-sm text-primary-300 transition duration-150 ease-in-out hover:border-primary-400 hover:text-primary-400` ;
  return (
    <button
    disabled={props?.disabled}
    type={props?.type || 'button'}
    ref={ref}
    id={props?.id}
    className={
      props?.style === 'primary'
      ? primaryButton
      : props?.style === 'secondary'
      ? secondaryButton
      : primaryButton
    }
    onClick={props?.onClick || null}
    >
      {props?.children}
    </button>
  );
});
