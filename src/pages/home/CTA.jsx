import React from "react";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import Input from "../../components/Input";

const CTA = () => {
  return (
    <section className="py-16 bg-lightBlue text-flashWhite">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Stay Updated with Our Programs
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive updates on courses, events, and
          medical education resources.
        </p>
        <form className="flex items-center gap-4 max-w-md mx-auto">
          <div className="w-2/3">
            <Input placeholder="email" customStyle="text-primary" />
          </div>
          <div>
            <PrimaryButton label="Subscribe" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default CTA;
