import { FC } from "react";

const ContactDetails:FC = () => {
  

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="font-semibold">New user registration</p>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
          </div>
          <span className="text-sm text-gray-500">2 minutes ago</span>
        </div>
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="font-semibold">Photo upload</p>
            <p className="text-sm text-gray-500">vacation_2023.jpg</p>
          </div>
          <span className="text-sm text-gray-500">15 minutes ago</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Contact form submission</p>
            <p className="text-sm text-gray-500">Support inquiry</p>
          </div>
          <span className="text-sm text-gray-500">1 hour ago</span>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
