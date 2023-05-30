import AnimatedLottieView, {
  AnimatedLottieViewProps,
} from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

export const Lottie = React.forwardRef<
  AnimatedLottieView,
  AnimatedLottieViewProps
>(({ autoPlay = false, ...props }, forwardedRef) => {
  const internalRef = useRef<AnimatedLottieView | null>(null);
  const previousAutoplay = useRef(autoPlay ?? false);

  useEffect(() => {
    // If we init LottieAnimatedView with autoPlay=false (which is the default)
    // then set autoPlay=true, it won't start automatically like we expected, so we fix this behaviour.
    if (!previousAutoplay.current && autoPlay) {
      internalRef.current?.play();
    }

    // If the animation was playing and then stopped, we wan't to reset it.
    // This might not cover every usecases, but it's what we need right now.
    // If this doesn't cover your usecase, you might want to use AnimatedLottieView directly
    // or dont use the autoPlay property. If you use AnimatedLottieView directly,
    // keep in mind the other fixed behaviours here, you might need to reproduce those fixes too.
    if (previousAutoplay.current && !autoPlay) {
      internalRef.current?.reset();
    }

    previousAutoplay.current = autoPlay;
  }, [autoPlay]);

  useEffect(() => {
    // When the app comes back from background, the animation reset to its first frame
    // but then it will not play, so if autoPlay is still true, we play it.
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active' && autoPlay) {
        internalRef.current?.play();
      }
    });

    return () => subscription.remove();
  }, [autoPlay]);

  return (
    <AnimatedLottieView
      ref={(lottie) => {
        internalRef.current = lottie;

        if (!forwardedRef) return;

        if (typeof forwardedRef === 'function') {
          forwardedRef(lottie);
        } else if (typeof forwardedRef === 'object') {
          forwardedRef.current = lottie;
        }
      }}
      autoPlay={autoPlay}
      {...props}
    />
  );
});
