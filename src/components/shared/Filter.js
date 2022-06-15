import { useEffect } from 'react';

const fill = ['All', 'Movies', 'Tv series'];
function Filter({ data, setFiltered, active, setActive }) {
  useEffect(() => {
    if (active === 0)
      setFiltered(data);
    else
    {
      const filtered = data.filter((item) => item.domainType === active - 1);
      setFiltered(filtered);
    }
  }, [active, data, setFiltered]);

  return (
    <div className='flex pb-4'>
      {fill.map((item, index) => (
        <button
          key={index}
          onClick={() => setActive(index)}
          className={`${
            index === active ? 'bg-orange-600 text-white' : 'bg-slate-300 dark:text-black'
          } px-4 border border-transparent rounded-full mr-2 hover:bg-orange-600 hover:!text-white shadow shadow-orange-600`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Filter;
