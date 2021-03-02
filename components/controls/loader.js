const Loader = () => {
  const showCubes = () => {
    let cubes = [];
    for (let i = 0; i <= 10; i++) {
      cubes.push(
        <div
          key={`cube-loader cube-loader-${i}`}
          className={`cube-loader cube-loader-${i}`}
        ></div>
      );
    }
    return cubes;
  };
  return (
    <>
      <div className="cube-spinner">{showCubes()}</div>
      <p className="text-center">Capturing screenshot, please wait...</p>
    </>
  );
};

export default Loader;
