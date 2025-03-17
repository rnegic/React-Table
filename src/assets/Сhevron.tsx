interface ChevronProps {
    isOpen: boolean;
    className?: string;
}

const ChevronDown = ({ isOpen }: ChevronProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out',
        }}

    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="m6 9 6 6 6-6"
        ></path>
    </svg>
);

export default ChevronDown;