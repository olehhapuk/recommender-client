import { TextareaHTMLAttributes } from 'react';

import styles from './TextArea.module.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({
  className = styles.input,
  ...otherProps
}: TextAreaProps) => {
  return <textarea {...otherProps} className={className} />;
};

export default TextArea;
