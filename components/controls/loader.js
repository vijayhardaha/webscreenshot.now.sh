const Loader = () => {
  return (
    <div className="spinner-wrap">
      <div className="spinner clock">
        <div className="dial">
          <div className="hour hand"></div>
          <div className="minute hand"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
