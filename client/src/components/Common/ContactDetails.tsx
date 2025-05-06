import { FC } from "react";
import { useContactQuery } from "./../../hooks/useContactQuery";
import { Loader } from "lucide-react";
import { IContactDetails } from "@/types";
import { Button } from "../ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { useContactMutation } from "@/hooks/useContantMutation";

const ContactDetails: FC = () => {
  const { contacts, isPending } = useContactQuery();
  const { deleteContactMutation } = useContactMutation();

  const handleDeleteContact = async (id: string) => {
    await deleteContactMutation.mutateAsync(id);
  };

  return (
    <div className="my-8 bg-(--background) p-6 rounded-lg shadow-sm  min-h-[10vh]">
      <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
      {isPending ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          {contacts?.data?.length > 0 ? (
            contacts?.data?.map((contact: IContactDetails) => (
              <div
                key={contact.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold">
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleString()}
                </span>
                <Button
                  variant="outline"
                  className="ml-4"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  <FaRegTrashAlt />
                </Button>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center ">
              <p className="text-lg">No contacts found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
