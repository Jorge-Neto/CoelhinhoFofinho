import React, { useCallback, useEffect, useRef } from "react"
import { Audio } from "expo-av"
import { useAudio } from "../context/AudioContext"

const withClickSound = (Component) => {
  return (props) => {
    const { isClickSoundEnabled } = useAudio()
    const soundRef = useRef(null)

    useEffect(() => {
      const loadSound = async () => {
        try {
          const { sound } = await Audio.Sound.createAsync(require("../../assets/music/click.mp3"))
          soundRef.current = sound
        } catch (error) {
          // console.error("Erro ao carregar som:", error)
        }
      }
      loadSound()

      return () => {
        if (soundRef.current) {
          soundRef.current.unloadAsync()
        }
      }
    }, [])

    const playClickSound = useCallback(async () => {
      if (!isClickSoundEnabled || !soundRef.current) return
      try {
        await soundRef.current.replayAsync()
      } catch (error) {
        // console.error("Erro ao reproduzir som:", error)
      }
    }, [isClickSoundEnabled])

    const handlePress = useCallback(async () => {
      await playClickSound()
      if (props.onPress) props.onPress()
    }, [playClickSound, props.onPress])

    return <Component {...props} onPress={handlePress} />
  }
}

export default withClickSound
