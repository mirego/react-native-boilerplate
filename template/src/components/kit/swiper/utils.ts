export interface GetAlignmentOffsetParams {
  alignment: 'start' | 'center' | 'end';
  containerWidth: number;
  containerHorizontalPadding: number;
  tileWidth: number;
}

export function getAlignmentOffset({
  alignment,
  containerWidth,
  containerHorizontalPadding,
  tileWidth,
}: GetAlignmentOffsetParams) {
  switch (alignment) {
    case 'start':
      return containerHorizontalPadding;
    case 'center':
      return (containerWidth - tileWidth) / 2;
    case 'end':
      return containerWidth - (tileWidth + containerHorizontalPadding);
  }
}
