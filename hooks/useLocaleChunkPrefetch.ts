import { useEffect } from 'react';
import type { Lang } from '../translations';

/**
 * Подгружает в фоне чанки локалей, которые пользователь с большой вероятностью выберет.
 * Ориентир — `navigator.language` / `navigator.languages`, без гео и IP.
 * Текущий язык из localStorage не подменяем: только прогрев кэша модулей.
 */
export function useLocaleChunkPrefetch(activeLang: Lang): void {
  useEffect(() => {
    // Single-locale build (ru only): nothing to prefetch.
    void activeLang;
  }, [activeLang]);
}
