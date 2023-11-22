import './close-modal.scss';

interface CloseModalProps {
    setIsModalWindow: (value: boolean) => void;
}
export const CloseModal: React.FC<CloseModalProps> = ({ setIsModalWindow }) => {
    const handleClickCloseWindow = () => {
        setIsModalWindow(false);
    };
    return (
        <svg
            onClick={handleClickCloseWindow}
            className="close-modal"
            width="43"
            height="43"
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M31.8193 10.6066L10.6061 31.8198"
                stroke="#D9D9D9"
                stroke-width="2"
            />
            <path
                d="M31.8193 31.8198L10.6061 10.6066"
                stroke="#D9D9D9"
                stroke-width="2"
            />
        </svg>
    );
};
