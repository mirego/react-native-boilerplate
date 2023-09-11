import { nanoid } from 'nanoid';
import React, {
  FunctionComponent,
  createContext,
  PropsWithChildren,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { Toast, ToastProps } from './Toast';
import { Flex } from '~/components/kit';

type ToastPosition = 'top' | 'bottom';

type ToastParams = Omit<ToastProps, 'onClose'> & {
  id?: string;
  onClose?: (id: string) => void;
  position?: ToastPosition;
};

type ToastData = ToastParams & { id: string; position: ToastPosition };

type ToastContextValue = [
  toasts: ToastData[],
  actions: {
    add: (toast: ToastParams, customId?: string) => void;
    remove: (id: string) => void;
  }
];

const DEFAULT_POSITION: ToastPosition = 'bottom';

const DEFAULT_ACTION = () => {
  throw Error('Must be a child of ToasterContextProvider to use toasts.');
};

const DEFAULT_STATE: ToastContextValue = [
  [],
  {
    add: DEFAULT_ACTION,
    remove: DEFAULT_ACTION,
  },
];

const ToasterContext = createContext(DEFAULT_STATE);

type ToasterProviderProps = PropsWithChildren;

export const ToasterProvider: FunctionComponent<ToasterProviderProps> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((params: ToastParams) => {
    setToasts((currentToasts) => {
      const toast: ToastData = {
        ...params,
        id: params.id ?? nanoid(),
        position: params.position ?? DEFAULT_POSITION,
      };

      const index = currentToasts.findIndex(
        (currentToast) => currentToast.id === toast.id
      );

      if (index !== -1) {
        const newToasts = [...currentToasts];
        newToasts[index] = toast;
        return newToasts;
      }

      return [toast, ...currentToasts];
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const toaster = useMemo(
    () => ({ add: addToast, remove: removeToast }),
    [addToast, removeToast]
  );

  const value = useMemo<ToastContextValue>(
    () => [toasts, toaster],
    [toasts, toaster]
  );

  return (
    <ToasterContext.Provider value={value}>{children}</ToasterContext.Provider>
  );
};

interface AnimatedToastProps {
  toast: ToastData;
  zIndex: number;
  removeToast: (id: string) => void;
}

function AnimatedToast({ toast, zIndex, removeToast }: AnimatedToastProps) {
  const { id, onClose: onCloseProp, ...props } = toast;

  const onClose = useCallback(() => {
    removeToast(id);
    onCloseProp?.(id);
  }, [id, removeToast, onCloseProp]);

  return (
    <Animated.View
      layout={Layout}
      entering={toast.position === 'bottom' ? FadeInDown : FadeInUp}
      pointerEvents="box-none"
      style={[
        {
          zIndex,
        },
      ]}
    >
      <Toast {...props} onClose={onClose} />
    </Animated.View>
  );
}

export function Toaster() {
  const insets = useSafeAreaInsets();
  const { height: keyboardHeight } = useReanimatedKeyboardAnimation();
  const [toasts, { remove }] = useToasterContext();
  const topToasts = toasts.filter(({ position }) => position === 'top');
  const bottomToasts = toasts.filter(({ position }) => position === 'bottom');
  const wrapperAnimatedStyles = useAnimatedStyle(
    () => ({
      top: insets.top,
      left: 0,
      right: 0,
      zIndex: 100,
      bottom: keyboardHeight.value || insets.bottom,
    }),
    [insets.top, insets.bottom, keyboardHeight]
  );

  return (
    <>
      <Flex
        as={Animated.View}
        grow
        absolute
        padding={16}
        gap={8}
        pointerEvents="box-none"
        style={wrapperAnimatedStyles}
      >
        {topToasts.map((toast, index) => {
          return (
            <AnimatedToast
              key={toast.id}
              toast={toast}
              zIndex={topToasts.length - index}
              removeToast={remove}
            />
          );
        })}
      </Flex>

      <Flex
        as={Animated.View}
        absolute
        justify="flex-end"
        padding={16}
        gap={8}
        pointerEvents="box-none"
        style={wrapperAnimatedStyles}
      >
        {bottomToasts.map((toast, index) => {
          return (
            <AnimatedToast
              key={toast.id}
              toast={toast}
              zIndex={bottomToasts.length - index}
              removeToast={remove}
            />
          );
        })}
      </Flex>
    </>
  );
}

export const useToasterContext = () => useContext(ToasterContext);

export const useToaster = () => {
  const [, toaster] = useContext(ToasterContext);

  return toaster;
};
