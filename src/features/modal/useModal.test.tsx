import { act, renderHook } from '@testing-library/react';
import useModal from './useModal';

describe('useModal', () => {
  test('false by default', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBeFalsy();
  });

  test('should be true on open', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpen).toBeTruthy();
  });

  test('should be false on open', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBeFalsy();
  });
});
