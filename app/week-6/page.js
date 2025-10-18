import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">Shopping List</h1>
      <ItemList />
    </main>
  );
}
