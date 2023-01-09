import { InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className = styles.input, ...otherProps }: InputProps) => {
  return <input {...otherProps} className={className} />;
};

export default Input;
