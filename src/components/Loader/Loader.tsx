import { ProgressBar } from '@fluentui/react-components';
import './Loader.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../global/store.types';

const Loader = ({ value }: { value: number }) => {
  const isLightTheme = useSelector(
    (state: RootState) => state.theme.isLightTheme
  );
  return (
    <div className={`loader-container ${isLightTheme ? 'light' : 'dark'}`}>
      <ProgressBar value={value} />
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
