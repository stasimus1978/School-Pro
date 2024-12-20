"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

import { createClass } from "@/actions/classes";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { Button } from "@/components/ui/button";
import useSchoolStore from "@/store/school";
import { ClassCreateProps } from "@/types/types";
import { Check, Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type ClassProps = {
  // userId?: string;
  initialContent?: string;
  editingId?: string;
};

export default function ClassForm({ initialContent, editingId }: ClassProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassCreateProps>({
    defaultValues: {
      title: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { school } = useSchoolStore();

  async function saveClass(data: ClassCreateProps) {
    // data.userId = userId;
    data.schoolId = school?.id ?? "";
    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        console.log("data", data);

        const res = await createClass(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div>
      <div className="py-1">
        <Dialog>
          <DialogTrigger asChild>
            {editingId ? (
              <button title="Edit Folder" className="text-blue-600">
                <Pencil className="w-4 h-4 " />
              </button>
            ) : (
              <Button variant="ghost" size="icon" className="size-8">
                <Plus className="size-4" />
                <span className="sr-only">Add Class</span>
              </Button>
            )}
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Class" : "Add New Class"}</DialogTitle>
              {/* <DialogDescription>
                Please Write your Comment here, with respect
              </DialogDescription> */}
            </DialogHeader>
            <form className="" onSubmit={handleSubmit(saveClass)}>
              <div className="">
                <div className="space-y-3">
                  <div className="grid gap-3">
                    <TextInput register={register} errors={errors} label="" name="title" icon={Check} />
                  </div>
                </div>
                <div className="py-3">
                  <SubmitButton title={editingId ? "Update" : "Add"} loading={loading} />
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
