function Overlay({ onClick, opacity, zIndex }) {
  return (
    <div
      className={`fixed inset-0 bg-black ${
        opacity ? '!opacity-' + opacity : 'opacity-10'
      } ${zIndex ? `!z-[55]` : '-z-10'}`}
      onClick={() => onClick(false)}
    ></div>
  );
}

export default Overlay;
