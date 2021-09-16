interface sectionType {
    stepsCount: number;
}
interface StepProgressBarLineProps {
    activeStep: number;
    sections: sectionType[];
}
export declare type ProgressBarComponent = (props: StepProgressBarLineProps) => any;
export interface UseStepProgressBarProps extends StepProgressBarLineProps {
    stepChangeCallback: (currentStep: number) => any;
    finishCallback: (currentStep: number) => any;
}
export declare type UseStepProgressBar = (props: UseStepProgressBarProps) => [number, sectionType[], () => any, () => any];
export {};
