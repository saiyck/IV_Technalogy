import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg width={120} height={120} viewBox="0 0 120 120" {...props}>
      <path fill="#0b7" d="M0 0h120v120H0z" />
      <path
        fillOpacity={0.1}
        d="M120 0v60L90 30 60 0H0l60 60-60 60h60l30-30 30-30V0z"
      />
    </svg>
  );
}

export default SvgComponent;
