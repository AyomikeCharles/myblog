'use client'

import React, { useEffect, useRef } from 'react';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';


const useCodeSerializer = ({ node }) => {
  const { code, language } = node;
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, []);

  return (
    <pre data-line={code.split('\n').length} className='line-numbers'>
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default useCodeSerializer