import Card from './Card';
import CardForm from './Form';

function App() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Payment information</h1>
      </header>
      <main className="main">
        <Card/>
        <CardForm/>
      </main>
    </>
  );
}

export default App;
