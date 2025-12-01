export default function Item({ name, quantity, category, onDelete }) {
    return (
        <div className="p-2 m-4 bg-slate-800 max-w-sm rounded-2xl flex justify-between items-center">
            <div>
                <h2 className="font-bold text-2xl">{name}</h2>
                <p>Buy <span className="font-bold text-green-500">{quantity}</span> in {category}</p>
            </div>
            {onDelete && (
                <button
                    onClick={onDelete}
                    className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                    Delete
                </button>
            )}
        </div>
    );
}