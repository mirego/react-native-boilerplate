import React from 'react';
import { Icon, IconName } from '../icon';
import { ToastType } from './types';

interface ToastIconProps {
  type: ToastType;
}

const ToastTypeIconName: Record<ToastType, IconName> = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
};

const ToastTypeIconTint: Record<ToastType, string> = {
  error: '#EA7676',
  warning: '#E5917E',
  success: '#19764F',
  info: '#4D9099',
};

function ToastIcon({ type }: ToastIconProps) {
  return (
    <Icon
      name={ToastTypeIconName[type]}
      size={24}
      tintColor={ToastTypeIconTint[type]}
    />
  );
}

export default ToastIcon;
