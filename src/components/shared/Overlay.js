

function Overlay({ onClick }) {
    return (
        <div
            className={`fixed inset-0 bg-black opacity-10 -z-10`}
            onClick={() => onClick(false)}
        ></div>
    )
}

export default Overlay;
