import { onScopeDispose, ref, watch, type Ref } from 'vue'
import Hls from 'hls.js'
import type { VideoPlayerQualityItemProps } from '@/types/PropsType'

export function useHlsPlayer(video: Ref<HTMLVideoElement | undefined>, source: () => string) {
  const error = ref('')
  const qualities = ref<VideoPlayerQualityItemProps[]>([])
  const quality = ref(-1)
  let hls: Hls | undefined
  let releaseNative: (() => void) | undefined

  function dispose() {
    releaseNative?.()
    releaseNative = undefined
    hls?.destroy()
    hls = undefined
  }

  function load() {
    dispose()
    error.value = ''
    qualities.value = []
    quality.value = -1
    const media = video.value
    const src = source()
    if (!media || !src) return
    if (Hls.isSupported()) {
      const instance = new Hls()
      hls = instance
      instance.on(Hls.Events.MANIFEST_PARSED, () => {
        qualities.value = instance.levels.map((level, id) => ({
          id, text: `${level.height || '?'}P · ${Math.round(level.bitrate / 1000)} kbps`,
          value: String(id), vip: false, show: true,
        })).reverse()
      })
      instance.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          error.value = '视频加载失败，请检查网络后重试'
          instance.destroy()
          if (hls === instance) hls = undefined
        }
      })
      instance.attachMedia(media)
      instance.loadSource(src)
    } else if (media.canPlayType('application/vnd.apple.mpegurl')) {
      const onError = () => { error.value = '视频加载失败，请重试' }
      media.addEventListener('error', onError)
      releaseNative = () => media.removeEventListener('error', onError)
      media.src = src
      media.load()
    } else {
      error.value = '当前浏览器不支持此视频格式'
    }
  }

  function selectQuality(id: number) {
    if (hls && (id === -1 || (id >= 0 && id < hls.levels.length))) {
      hls.currentLevel = id
      quality.value = id
    }
  }

  watch([video, source], load, { flush: 'post' })
  onScopeDispose(dispose)
  return { error, qualities, quality, load, selectQuality }
}
