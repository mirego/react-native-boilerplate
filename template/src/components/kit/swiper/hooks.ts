import { useMemo } from 'react';
import { getAlignmentOffset } from './utils';

export interface UseTileOffsetsParams {
  containerWidth: number;
  containerHorizontalPadding: number;
  tileWidth: number;
  tileCount: number;
  gap: number;
  alignment: 'start' | 'center' | 'end';
  footerWidth: number;
}

export function useCenteredTileOffsets({
  containerWidth,
  tileWidth,
  tileCount,
  containerHorizontalPadding,
  gap,
  alignment,
  footerWidth,
}: UseTileOffsetsParams): number[] {
  const paddedTileWidth = tileWidth + gap;
  const alignmentOffset = getAlignmentOffset({
    alignment,
    containerWidth,
    containerHorizontalPadding,
    tileWidth,
  });
  const upperBound =
    tileCount * tileWidth +
    (tileCount - 1) * gap +
    containerHorizontalPadding * 2 +
    footerWidth -
    containerWidth;

  const offsets = useMemo(() => {
    const allOffsets: number[] = [];

    for (let i = 0; i < tileCount; i++) {
      const startOfTile = i * paddedTileWidth + containerHorizontalPadding;
      const offset = startOfTile - alignmentOffset;

      if (offset >= upperBound) {
        allOffsets.push(upperBound);
        break;
      }

      allOffsets.push(offset);
    }

    return allOffsets;
  }, [
    tileCount,
    upperBound,
    alignmentOffset,
    containerHorizontalPadding,
    paddedTileWidth,
  ]);

  return offsets;
}
