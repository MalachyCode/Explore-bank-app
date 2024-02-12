import './Search.scss';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const Search = () => (
  <div className='search'>
    <form onSubmit={handleSubmit}>
      <input type='text' className='input' placeholder='Search for Client' />
    </form>
  </div>
);

export default Search;
