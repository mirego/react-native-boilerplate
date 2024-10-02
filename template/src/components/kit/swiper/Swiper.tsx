import { ContentStyle, FlashList, FlashListProps } from '@shopify/flash-list';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import React, { Ref, useImperativeHandle, useMemo, useRef } from 'react';
import { useCenteredTileOffsets } from './hooks';

export interface SwiperProps<TItem>
  extends Omit<
    FlashListProps<TItem>,
    | 'contentContainerStyle'
    | 'snapToOffsets'
    | 'horizontal'
    | 'estimatedItemSize'
  > {
  containerWidth: number;
  containerHorizontalPadding: number;
  tileWidth: number;
  gap: number;
  contentContainerStyle?: Pick<
    ContentStyle,
    'backgroundColor' | 'paddingVertical' | 'paddingTop' | 'paddingBottom'
  >;
  footerWidth?: number;
  forwardedRef?: Ref<SwiperMethods>;
}

export type SwiperMethods = { scrollToStart: (animated?: boolean) => void };
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<any>);

export function Swiper<TItem>({
  containerWidth,
  tileWidth,
  gap,
  containerHorizontalPadding,
  contentContainerStyle,
  snapToAlignment = 'start',
  scrollIndicatorInsets,
  footerWidth = 0,
  forwardedRef,
  ...props
}: SwiperProps<TItem>) {
  const internalRef = useRef<any>(null);

  useImperativeHandle(
    forwardedRef,
    () => {
      return {
        scrollToStart: (animated) => {
          internalRef.current?.scrollToOffset({ animated, offset: 0 });
        },
      };
    },
    []
  );

  const offsets = useCenteredTileOffsets({
    containerWidth,
    gap,
    tileWidth,
    tileCount: props.data?.length ?? 0,
    containerHorizontalPadding,
    alignment: snapToAlignment,
    footerWidth,
  });

  const Gap = useMemo(() => {
    return () => <View style={{ width: gap }} />;
  }, [gap]);

  return (
    <AnimatedFlashList
      ref={internalRef}
      horizontal
      disableHorizontalListHeightMeasurement
      contentContainerStyle={{
        paddingHorizontal: containerHorizontalPadding,
        ...contentContainerStyle,
      }}
      estimatedItemSize={props.data?.length === 1 ? 1 : tileWidth}
      scrollIndicatorInsets={{
        left: containerHorizontalPadding,
        right: containerHorizontalPadding,
        ...scrollIndicatorInsets,
      }}
      ItemSeparatorComponent={Gap}
      snapToOffsets={offsets}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={8}
      {...props}
    />
  );
}
