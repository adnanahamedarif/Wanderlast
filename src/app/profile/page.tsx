"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, Plane, Globe, TrendingUp, DollarSign, Pencil } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const sessionUser = session?.user;

    const [bookings, setBookings] = useState<Array<{ price?: number | string }>>([]);
    const [loading, setLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (!sessionUser?.email) return;

        const fetchData = async () => {
            try {
                const userRes = await fetch(`http://localhost:8000/users/${sessionUser.email}`);
                const userData = await userRes.json();
                if (userData) {
                    setName(userData.name || sessionUser.name || "");
                } else {
                    setName(sessionUser.name || "");
                }
                setImage(userData?.image || sessionUser.image || "");

                const bookingRes = await fetch(`http://localhost:8000/bookings/${sessionUser.email}`);
                const bookingData = await bookingRes.json();
                if (Array.isArray(bookingData)) {
                    setBookings(bookingData);
                }
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sessionUser?.email]);

    const totalBookings = bookings.length;
    const totalSpent = bookings.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
    const memberSince = sessionUser?.createdAt
        ? new Date(sessionUser.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : "Mar 2024";

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sessionUser?.email) return;

        try {
            const response = await fetch(`http://localhost:8000/users/${sessionUser.email}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, image }),
            });

            if (response.ok) {
                alert("Profile updated successfully!");
                setIsOpen(false);
                window.location.reload();
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-normal text-slate-900 tracking-tight">
                    My Profile
                </h1>
                <p className="text-sm md:text-base text-slate-500 mt-1">
                    Manage your account settings and travel preferences
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-4">
                    <Card className="p-6 shadow-sm border border-slate-100 rounded-xl bg-white">
                        <div className="flex flex-col items-center pb-6 border-b border-slate-100">
                            <div className="relative w-28 h-28 mb-4">
                                <Image
                                    src={sessionUser?.image || "..."}
                                    alt={name || "User Profile"}
                                    width={112}
                                    height={112}
                                    unoptimized
                                    className="rounded-full object-cover w-full h-full shadow-inner"
                                    referrerPolicy="no-referrer"
                                />
                                <button
                                    aria-label="Change profile picture"
                                    onClick={() => setIsOpen(true)}
                                    className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-full shadow-md transition-colors"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <h2 className="text-xl font-medium text-slate-900">{name || "Guest User"}</h2>
                            <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <span>{sessionUser?.email || "No email provided"}</span>
                            </div>
                        </div>

                        <div className="py-6 space-y-4 text-sm border-b border-slate-100">
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="text-slate-500">Member since</span>
                                <span className="font-medium text-slate-900">{memberSince}</span>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger>
                                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white gap-2 py-2.5 font-medium shadow-sm">
                                        <Pencil className="w-4 h-4" />
                                        Edit Profile
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit Profile</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleUpdateProfile} className="space-y-4 pt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="image">Profile Image URL</Label>
                                            <Input
                                                id="image"
                                                type="url"
                                                placeholder="https://..."
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                            />
                                        </div>
                                        <div className="pt-4 flex justify-end gap-3">
                                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                                                Save Changes
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Travel Statistics */}
                <div className="lg:col-span-8 space-y-6">
                    <h3 className="text-xl font-medium text-slate-900">Travel Statistics</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Card className="p-6 shadow-sm border border-slate-100 rounded-xl bg-white flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Bookings</p>
                                <h4 className="text-3xl font-bold text-slate-900 mt-2">{loading ? "..." : totalBookings}</h4>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500">
                                <Plane className="w-6 h-6" />
                            </div>
                        </Card>

                        <Card className="p-6 shadow-sm border border-slate-100 rounded-xl bg-white flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Countries Visited</p>
                                <h4 className="text-3xl font-bold text-slate-900 mt-2">18</h4>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <Globe className="w-6 h-6" />
                            </div>
                        </Card>

                        <Card className="p-6 shadow-sm border border-slate-100 rounded-xl bg-white flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Upcoming Trips</p>
                                <h4 className="text-3xl font-bold text-slate-900 mt-2">{loading ? "..." : totalBookings}</h4>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                        </Card>

                        <Card className="p-6 shadow-sm border border-slate-100 rounded-xl bg-white flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Spent</p>
                                <h4 className="text-3xl font-bold text-slate-900 mt-2">{loading ? "..." : `$${totalSpent.toLocaleString()}`}</h4>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-fuchsia-50 flex items-center justify-center text-fuchsia-500">
                                <DollarSign className="w-6 h-6" />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;