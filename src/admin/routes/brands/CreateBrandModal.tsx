import * as zod from "zod";
import { FocusModal, Button, Input, Label, Heading } from "@medusajs/ui";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { sdk } from "../../lib/sdk";

const schema = zod.object({
  name: zod.string(),
});

interface CreateBrandModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function CreateBrandModal({
  open,
  onClose,
  onCreated,
}: CreateBrandModalProps) {
  
  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = form.handleSubmit(async ({ name }) => {
    console.log(name);

    try {
      await sdk.client.fetch("/admin/brands", {
        method: "POST",
        body: { name },
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
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col overflow-hidden"
          >
            <FocusModal.Header>
              <div className="flex items-center justify-end gap-x-2">
                <FocusModal.Close asChild>
                  <Button size="small" variant="secondary">
                    Cancel
                  </Button>
                </FocusModal.Close>
                <Button type="submit" size="small">
                  Save
                </Button>
              </div>
            </FocusModal.Header>
            <FocusModal.Body>
              <div className="flex flex-1 flex-col items-center overflow-y-auto">
                <div className="mx-auto flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16">
                  <div>
                    <Heading className="capitalize">Create Brand</Heading>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={form.control}
                      name="name"
                      render={({ field }) => {
                        return (
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-x-1">
                              <Label size="small" weight="plus">
                                Name
                              </Label>
                            </div>
                            <Input {...field} />
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </FocusModal.Body>
          </form>
        </FormProvider>
      </FocusModal.Content>
    </FocusModal>
  );
}
