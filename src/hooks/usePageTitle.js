import { useEffect } from 'react';

/**
 * Custom hook to update the document title dynamically.
 * @param {string} title 
 * @param {boolean} includeSuffix - Whether to append " | YUKAS" 
 */
export default function usePageTitle(title, includeSuffix = true) {
  useEffect(() => {
    const defaultTitle = 'YUKAS | India\'s Premier Conference Platform';
    if (!title) {
      document.title = defaultTitle;
      return;
    }
    document.title = includeSuffix ? `${title} | YUKAS` : title;
  }, [title, includeSuffix]);
}
