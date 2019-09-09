import useDataProvider from '@/hooks/useDataProvider';
import { GET } from '@/core/dataFetchActions';

const useConfigData = configKey => {
  const { response } = useDataProvider({
    type: GET,
    resource: `config/${configKey}`,
    init: true,
  });

  return { data: response || [] };
};

export default useConfigData;
