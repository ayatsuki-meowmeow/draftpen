"use client";

function App() {
  return (
    <div className="font-mono min-h-screen flex justify-center items-center flex-col space-y-4">
      <h2 className="tracking-wide text-5xl text-gray-300">todos</h2>
      <div className="border border-gray-300 max-w-xs w-full">
        {/* <TodoForm todos={todos} />
        <TodoList todos={todos} />
        <ActionBar todos={todos} /> */}
      </div>
      <div className="text-xs text-center">
        <span>ログインは</span>
        <a className="text-blue-500 underline ml-1" href="/admin/auth">
          こちら
        </a>
      </div>
    </div>
  );
}

export default App;
