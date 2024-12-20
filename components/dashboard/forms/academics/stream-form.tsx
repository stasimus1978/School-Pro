"use client";

import { createStream } from "@/actions/streams";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useSchoolStore from "@/store/school";
import { StreamCreateProps } from "@/types/types";
import { Check, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface StreamFormProps {
  classId: string;
  initialContent?: string;
  editingId?: string;
}

export default function StreamForm({ classId, initialContent, editingId }: StreamFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StreamCreateProps>({
    defaultValues: {
      title: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { school } = useSchoolStore();

  async function saveStream(data: StreamCreateProps) {
    data.classId = classId;
    data.schoolId = school?.id ?? "";

    console.log(data);

    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createStream(data);
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
              <Button variant="outline" size="sm" className="h-8">
                <Plus className="size-4 mr-2" />
                Add Stream
              </Button>
            )}
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Stream" : "Add New Stream"}</DialogTitle>
              {/* <DialogDescription>
                Please Write your Comment here, with respect
              </DialogDescription> */}
            </DialogHeader>
            <form className="" onSubmit={handleSubmit(saveStream)}>
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
