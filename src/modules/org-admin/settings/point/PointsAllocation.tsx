"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PointsManager({ initialData, onSave }: any) {
    const [allocations, setAllocations] = useState(initialData || []);
    const [newDept, setNewDept] = useState("");
    const [newPoints, setNewPoints] = useState("");

    const handleAdd = () => {
        if (newDept && newPoints) {
            setAllocations([...allocations, { id: Date.now(), department: newDept, points: Number(newPoints) }]);
            setNewDept(""); setNewPoints("");
        }
    };
    // const [departments, setDepartments] = useState([]);

    //   useEffect(() => {
    //     // API থেকে ডাটা ফেচ করা
    //     const fetchDepartments = async () => {
    //       try {
    //         const response = await fetch("/api/departments"); // আপনার API এন্ডপয়েন্ট
    //         const data = await response.json();
    //         setDepartments(data); // ডাটা স্টেট-এ সেট করা
    //       } catch (error) {
    //         console.error("Error fetching departments:", error);
    //       }
    //     };

    //     fetchDepartments();
    //   }, []);
    const departments = [
        { id: "d1", name: "Engineering" },
        { id: "d2", name: "Marketing" },
        { id: "d3", name: "Sales" },
        { id: "d4", name: "Product" },
        { id: "d5", name: "Design" },
        { id: "d6", name: "Customer Support" },
        { id: "d7", name: "HR" },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray">
            <h3 className="text-2xl font-light mb-6">Points Management</h3>
            <div className=" ">

                <div className="max-w-3xl bg-gray-50 p-4 rounded-xl border border-gray flex flex-col sm:flex-row  gap-4 items-end mb-8 justify-between">
                    <div className="w-full">
                        <label className="text-sm text-gray-500 mb-1 block">Department</label>
                        <div className="relative w-full">
                            <select
                                value={newDept}
                                onChange={(e) => setNewDept(e.target.value)}
                                className="w-full appearance-none border border-gray outline-0 rounded-lg px-3 py-2 pr-10 bg-white"
                            >
                                <option value="">Select Department</option>

                                {departments.map((dept: any) => (
                                    <option key={dept.id} value={dept.name}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-end w-full sm:w-auto">
                        <div className="w-32">
                            <label className="text-sm text-gray-500 mb-1 block">Points</label>
                            <input type="number" value={newPoints} onChange={(e) => setNewPoints(e.target.value)} className="w-full border border-gray outline-0 rounded-lg px-3 py-2" placeholder="100" />
                        </div>
                        <Button onClick={handleAdd} className="bg-gradient text-white"><Plus className="w-4 h-4" /> Add</Button>
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    {allocations.map((item: any) => (
                        <div key={item.id} className="flex justify-between border-b border-gray pb-3">
                            <span className="font-medium">{item.department}</span>
                            <span className="text-indigo-600 font-bold">{item.points} Pts</span>
                        </div>
                    ))}
                </div>

                <Button onClick={() => onSave(allocations)} size="lg" className="w-full bg-gradient text-white">
                    <Save className="w-4 h-4" /> Submit All Changes
                </Button>
            </div>
        </div>
    );
}