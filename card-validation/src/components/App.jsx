import CardForm from './CardForm';

function App() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Payment information</h1>
      </header>
      <main className="main">
        <CardForm onSubmit={() => {}} />
      </main>
    </>
  );
}

export default App;
