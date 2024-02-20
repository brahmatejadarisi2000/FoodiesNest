import { getIsLoadingSelector } from "../store/loading/loading.selector";
import { useSelector } from "react-redux";

export const FeatureLoading = () => {
  const isLoading = useSelector(getIsLoadingSelector);

  if (!isLoading) return null;

  return (
    <div className='loading-overlay'>
      <div className='loading-dialog'>{"Loading..."}</div>
    </div>
  );
};

export default FeatureLoading;
