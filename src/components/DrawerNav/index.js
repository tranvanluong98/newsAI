import Swiper from 'react-id-swiper';
import React, { useState, useEffect, useCallback } from 'react';
import get from 'lodash/get';

const DrawerNav = ({ children, activeIdx = 0, passProps, version }) => {
  const [swiper, updateSwiper] = useState(null);
  useEffect(() => {
    if (swiper) {
      swiper.slideTo(activeIdx);
    }
  }, [activeIdx, swiper, version]);

  const back = useCallback(
    (speed, cb) => {
      swiper.slidePrev(speed, cb);
    },
    [swiper],
  );

  const goTo = useCallback(
    (index, speed, cb) => {
      swiper.slideTo(index, speed, cb);
    },
    [swiper],
  );
  return (
    <Swiper getSwiper={updateSwiper}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          goTo,
          back,
          passProps: get(passProps, child.props.navKey),
          version,
        }),
      )}
    </Swiper>
  );
};

export default DrawerNav;
