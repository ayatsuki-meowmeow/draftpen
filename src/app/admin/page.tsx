function App() {
  return (
    <>
      <div className="flex flex-col text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to DraftPen!</h1>
        <div className="text-gray-600">
          <p>ログインは<a href="/admin/auth" className="text-blue-500 hover:underline">こちら</a>から</p>
        </div>
      </div>
    </>
  );
}

export default App;
