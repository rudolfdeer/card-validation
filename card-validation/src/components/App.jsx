import Card from './Card';
import Form from './Form';

function App() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Payment information</h1>
      </header>
      <main className="main">
        <Card/>
        <Form/>
      </main>
    </>
  );
}

export default App;
