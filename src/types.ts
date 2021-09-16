interface sectionType {
    stepsCount: number
}

interface StepProgressBarLineProps {
    activeStep: number,
    sections: sectionType[]
}

export type ProgressBarComponent = (props:StepProgressBarLineProps) => any

export interface UseStepProgressBarProps extends StepProgressBarLineProps {
    stepChangeCallback: (currentStep: number) => any,
    finishCallback: (currentStep: number) => any
}

export type UseStepProgressBar = (props:UseStepProgressBarProps) => [number, sectionType[], () => any, () => any]