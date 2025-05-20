import * as zod from "zod";
import { FocusModal, Button, Input, Label, Heading } from "@medusajs/ui";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { sdk } from "../../lib/sdk";

const schema = zod.object({
  title: zod.string(),
  status: zod.string().optional(),
});

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function CreateProductModal({ open, onClose, onCreated }: CreateProductModalProps) {
  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      title: "",
      status: "draft",
    },
  });

  const handleSubmit = form.handleSubmit(async ({ title, status }) => {
    try {
      await sdk.client.fetch("/admin/products", {
        method: "POST",
        body: { title, status },
      });
      onCreated();
      onClose();
    } catch (err: any) {
      console.log(err);
    }
  });

  return (
    <FocusModal open={open} onOpenChange={onClose}>
      <FocusModal.Content>
        <div className="max-w-md mx-auto p-6">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FocusModal.Header>
                <div className="flex items-center justify-end gap-x-2">
                  <FocusModal.Close asChild>
                    <Button size="small" variant="secondary">Cancel</Button>
                  </FocusModal.Close>
                  <Button type="submit" size="small">Save</Button>
                </div>
              </FocusModal.Header>
              <FocusModal.Body>
                <div>
                  <Heading className="capitalize mb-4">Create Product</Heading>
                  <div className="grid grid-cols-1 gap-4">
                    <Controller
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">Title</Label>
                          </div>
                          <Input {...field} />
                        </div>
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">Status</Label>
                          </div>
                          <Input {...field} />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </FocusModal.Body>
            </form>
          </FormProvider>
        </div>
      </FocusModal.Content>
    </FocusModal>
  );
}
