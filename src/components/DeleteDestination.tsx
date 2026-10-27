"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";



const DeleteDestination = ({ id }: { id: string }) => {



    const handleDelete = async () => {
        await fetch(`http://localhost:8000/destination/${id}`, {
            method: "DELETE",
        });

        redirect('/destinations')


    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger render={<Button
                    variant="outline"
                    className="inline-flex h-8 items-center gap-2 rounded border border-red-200 bg-white px-3 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                    <Trash2 className="size-3.5" strokeWidth={1.8} />
                    Delete
                </Button>}>
                    Show Dialog
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteDestination;