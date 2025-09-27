export default function Item({ name, quantity, category }) {
    return (
        <div className="p-2 m-4 bg-slate-800 max-w-sm rounded-2xl">
            <h2 className="font-bold text-2xl">{name}</h2>
            <p>Buy <span className="font-bold text-green-500">{quantity}</span> in {category}</p>
        </div>
    );
}