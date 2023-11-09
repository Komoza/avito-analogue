import './background-dark.scss';

interface BackgorundDarkProps {
    setIsAuthModal: (value: boolean) => void;
}

export const BackgorundDark: React.FC<BackgorundDarkProps> = ({
    setIsAuthModal,
}) => {
    const handleClickBackground = () => {
        setIsAuthModal(false);
    };

    return (
        <div className="background-dark" onClick={handleClickBackground}></div>
    );
};
