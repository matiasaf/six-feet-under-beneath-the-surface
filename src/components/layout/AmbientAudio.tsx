"use client"

import { useEffect, useRef, useState } from "react"

const STORAGE_KEY = "ambient-audio-enabled"

type AudioNodes = {
  context: AudioContext
  gain: GainNode
  oscillators: OscillatorNode[]
  noise: AudioBufferSourceNode
}

function createNoiseBuffer(context: AudioContext) {
  const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.12
  }

  return buffer
}

export function AmbientAudio() {
  const nodesRef = useRef<AudioNodes | null>(null)
  const [enabled, setEnabled] = useState(false)

  function persistPreference(nextEnabled: boolean) {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(nextEnabled))
    } catch {
      // Ignore storage access failures and keep runtime behavior intact.
    }
  }

  function stopAudio() {
    const nodes = nodesRef.current
    if (nodes) {
      nodes.gain.gain.setTargetAtTime(0, nodes.context.currentTime, 0.6)
      window.setTimeout(() => {
        nodes.context.close()
        if (nodesRef.current === nodes) nodesRef.current = null
      }, 900)
    }

    setEnabled(false)
  }

  async function startAudio() {
    if (nodesRef.current) {
      await nodesRef.current.context.resume()
      setEnabled(true)
      return
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    const context = new AudioContextClass()
    const gain = context.createGain()
    const filter = context.createBiquadFilter()
    const noiseFilter = context.createBiquadFilter()
    const noiseGain = context.createGain()
    const noise = context.createBufferSource()

    gain.gain.value = 0
    filter.type = "lowpass"
    filter.frequency.value = 420
    noiseFilter.type = "lowpass"
    noiseFilter.frequency.value = 920
    noiseGain.gain.value = 0.018

    const oscillators = [82.41, 110, 146.83].map((frequency) => {
      const oscillator = context.createOscillator()
      const oscillatorGain = context.createGain()
      oscillator.type = "sine"
      oscillator.frequency.value = frequency
      oscillatorGain.gain.value = 0.05
      oscillator.connect(oscillatorGain)
      oscillatorGain.connect(filter)
      oscillator.start()
      return oscillator
    })

    noise.buffer = createNoiseBuffer(context)
    noise.loop = true
    noise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(gain)
    filter.connect(gain)
    gain.connect(context.destination)
    noise.start()

    gain.gain.setTargetAtTime(0.16, context.currentTime, 1.2)
    nodesRef.current = { context, gain, oscillators, noise }
    await context.resume()
    setEnabled(true)
  }

  async function toggleAudio() {
    const nextEnabled = !enabled
    persistPreference(nextEnabled)

    if (!nextEnabled) {
      stopAudio()
      return
    }

    await startAudio()
  }

  useEffect(() => {
    async function syncStoredPreference() {
      try {
        if (window.localStorage.getItem(STORAGE_KEY) === "true") {
          await startAudio()
        }
      } catch {
        // Ignore storage access failures and keep the default behavior.
      }
    }

    void syncStoredPreference()

    return () => {
      nodesRef.current?.context.close()
      nodesRef.current = null
    }
  }, [])

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className="fixed bottom-4 right-4 z-40 rounded-md border border-white/10 bg-[#0a0a0a]/85 px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-neutral-400 backdrop-blur transition-colors hover:border-white/20 hover:text-neutral-200"
      aria-pressed={enabled}
    >
      Audio {enabled ? "on" : "off"}
    </button>
  )
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}
