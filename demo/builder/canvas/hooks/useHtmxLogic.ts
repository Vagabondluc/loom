
import { useEffect } from 'react';
import { useRuntimeStore } from '../../../../stores/runtimeStore';

interface HtmxProps {
  'data-url'?: string;
  'data-trigger'?: 'load' | 'click';
  'data-method'?: string;
  'data-key'?: string;
}

export const useHtmxLogic = (props: Record<string, any>, isPreviewMode: boolean) => {
  const fetchData = useRuntimeStore(s => s.fetchData);
  const htmxProps = props as HtmxProps;

  // Handle 'load' trigger
  useEffect(() => {
    if (isPreviewMode && htmxProps['data-url'] && htmxProps['data-trigger'] === 'load' && htmxProps['data-key']) {
      fetchData(
        htmxProps['data-url'],
        htmxProps['data-method'] || 'GET',
        htmxProps['data-key']
      );
    }
  }, [isPreviewMode, htmxProps['data-url'], htmxProps['data-trigger'], htmxProps['data-key']]);

  // Handler for 'click' trigger
  const handleHtmxClick = () => {
    if (isPreviewMode && htmxProps['data-url'] && htmxProps['data-trigger'] === 'click' && htmxProps['data-key']) {
      fetchData(
        htmxProps['data-url'],
        htmxProps['data-method'] || 'GET',
        htmxProps['data-key']
      );
    }
  };

  return { handleHtmxClick };
};
