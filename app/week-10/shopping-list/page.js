"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import { MealIdeas}  from "./meal-ideas";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";

export default function Page() {
    const { user } = useUserAuth();
    const [items, setItems] = useState([]);
    const [selectedItemName, setSelectedItemName ] = useState();

    async function loadItems() {
        if (user) {
            const userItems = await getItems(user.uid);
            setItems(userItems);
        }
    }

    useEffect(() => {
        if (user) {
            loadItems();
        }
    }, [user]); 

    const handleItemSelect = (id) => {
        let name = items.find((item) => item.id === id).name;
        let cleanedName = name.split(",")[0];
        cleanedName = cleanedName.replace(/[^a-z0-9\s,]/gi, "").trim();
        console.log(cleanedName);
        setSelectedItemName(cleanedName);
    };

    const handleAddItem = async (item) => {
        if (user) {
            const itemId = await addItem(user.uid, item);
            const newItem = { ...item, id: itemId };
            setItems([...items, newItem]);
        }
    }

    const handleDeleteItem = async (itemId) => {
        if (user) {
            try {
                await deleteItem(user.uid, itemId);
                setItems(items.filter(item => item.id !== itemId));
            } catch (error) {
                console.error("Failed to delete item:", error);
            }
        }
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Please Sign In</h1>
                    <Link href="/week-10" className="text-blue-400 hover:underline">
                        Go to Sign In
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Shopping List</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <NewItem onAddItem={handleAddItem} />
                        <ItemList items={items} onSelect={handleItemSelect} onDelete={handleDeleteItem} />
                    </div>
                    <div>
                        <MealIdeas ingredient={selectedItemName} />
                    </div>
                </div>
            </div>
        </main>
    );
}