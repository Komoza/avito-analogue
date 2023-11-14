import './background-dark.scss';

interface BackgorundDarkProps {
    closeModal: (value: boolean) => void;
}

export const BackgorundDark: React.FC<BackgorundDarkProps> = ({
    closeModal,
}) => {
    const handleClickBackground = () => {
        closeModal(false);
    };

    return (
        <div className="background-dark" onClick={handleClickBackground}></div>
    );
};
