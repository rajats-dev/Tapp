"use client";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateGroup from "@/hooks/mutation/useCreateGroup";
import {
  createGropupSchema,
  createGropupSchemaType,
} from "@/validation/schema";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { useModal } from "@/hooks/state/useModalStore";

export default function CreateGroup({
  user,
}: {
  user: CustomUser | undefined;
}) {
  const { isOpen, onClose, type } = useModal();
  const { createGroup } = useCreateGroup(user?.token || "");

  const isModalOpen = isOpen && type == "createGroup";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createGropupSchemaType>({
    resolver: zodResolver(createGropupSchema),
  });

  const onSubmit = async (payload: createGropupSchemaType) => {
    try {
      await createGroup(payload);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Your New Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input
              placeholder="Enter Group title"
              {...register("name")}
              disabled={isSubmitting}
            />
            <span className="text-red-400">{errors.name?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing.." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
