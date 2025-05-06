import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ContactPage: FC = () => {
  return (
    <div className="bg-background px-6 py-24 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Contact
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Get in touch to discuss your photography needs and create lasting memories together.
        </p>
      </div>
      <form method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2 lg:col-span-1 space-y-2.5">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" name="first-name" type="text" placeholder="John" />
          </div>
          <div className="sm:col-span-2 lg:col-span-1 space-y-2.5">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" name="last-name" type="text" placeholder="Doe" />
          </div>
          <div className="sm:col-span-2 space-y-2.5">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" type="text" placeholder="Your Company" />
          </div>
          <div className="sm:col-span-2 space-y-2.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="example@email.com" />
          </div>
          <div className="sm:col-span-2 space-y-2.5">
            <Label htmlFor="phone-number">Phone number</Label>
            <div className="flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">US</SelectItem>
                  <SelectItem value="CA">CA</SelectItem>
                  <SelectItem value="EU">EU</SelectItem>
                </SelectContent>
              </Select>
              <Input id="phone-number" name="phone-number" type="text" placeholder="123-456-7890" />
            </div>
          </div>
          <div className="sm:col-span-2 space-y-2.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={4} placeholder="Write your message here..." />
          </div>
        </div>
        <div className="mt-10">
          <Button type="submit" className="w-full">
            Let's talk
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
