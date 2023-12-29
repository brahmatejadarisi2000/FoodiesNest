import React, { useEffect, useRef } from 'react';
import { getMenuBranchSelector } from '../store/menu-branch/menu-branch.selector';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuBranch, setSelectedCategory, setIsOpen } from '../store/menu-branch/menu-branch.slice';

export const FeatureMenuBranch = () => {
  const getMenuBranchSelection = useSelector(getMenuBranchSelector);

  const { content, isOpen } = getMenuBranchSelection;
  const dispatch = useDispatch();
  const overlayRef = useRef();

  const onCloseBranch = event => {
    dispatch(
      setMenuBranch({
        selectedCategory: '',
        content: [],
        isOpen: false,
      })
    );
  };

  const preventScroll = event => {
    event.preventDefault();
  };

  const handleSelectedCategory = title => {
    dispatch(setSelectedCategory(title));
    dispatch(setIsOpen(false));
  };

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('mousedown', onCloseBranch);
    overlayRef?.current?.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('mousedown', onCloseBranch);
      overlayRef?.current?.removeEventListener('wheel', preventScroll, { passive: false });
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="modal" onMouseDown={e => e.stopPropagation()}>
        {content?.map(
          ({ title, count }, index) =>
            count >= 0 && (
              <div className="flex-wrapper" key={index}>
                <span className="select-wrapper" onMouseDown={() => handleSelectedCategory(title)}>
                  {title}
                </span>
                <span>{count}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
};
export default FeatureMenuBranch;
