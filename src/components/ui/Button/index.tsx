import React from 'react';

import { IButtonProps } from './types';
import './styles.scss';

export const Button: React.FC<IButtonProps> = (props) => {
    const {
        children,
        variant = 'primary',
        size = 'medium',
        isLoading = false,
        disabled,
        ...restProps
    } = props;

  const classNames = `button ${variant} ${size} ${isLoading ? 'loading' : ''}`;

  return (
    <button className={classNames} {...restProps} disabled={isLoading || disabled}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};