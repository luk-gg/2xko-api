
const allAnimations = import.meta.glob("../../game/client/Plugins/GameFeatures/Champions/**/Content/Base/Animations/*.json", { import: "default", eager: true })

export default Object.entries(allAnimations)
    .reduce((acc, [path, fileData]) => {
        const animationData = fileData.find(obj => obj.Type === "AnimSequence")
        if (!animationData) return acc

        const animationName = animationData.Name
        const frameRate =
            animationData.Properties.TargetFrameRate?.Numerator
            ?? animationData.Properties.PlatformTargetFrameRate?.Default.Numerator
            ?? 60 // braum_base_msc_sel_dash doesn't have a frame rate but it has a sequence length.
        const secPerFrame = 1 / frameRate
        const durationSec = animationData.Properties.SequenceLength
        const durationFrames = Math.round(durationSec / secPerFrame)
        
        acc[animationName] = durationFrames
        return acc
    }, {})