import React from "react";

const History = () => {
  return (
    <section className="py-16 bg-flashWhite">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-secondary mb-8">
            Our History
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="text-lightBlue font-bold text-5xl mb-2">
                  1995
                </div>
                <div className="h-1 w-12 bg-lightBlue mb-4"></div>
                <h3 className="text-xl font-bold text-secondary/60">Founded</h3>
              </div>
              <div className="md:w-2/3 text-mistyMorning">
                <p className="mb-4">
                  The Continuous Medical Unit was established in 1995 as part of
                  the Faculty of Medicine’s Commitment to lifelong learning for
                  healthcare professionals. What began as a small Initiative
                  with occasional seminars has grown into a comprehensive
                  continuing medical Education program serving thousands of
                  practitioners annually.
                </p>
                <p>
                  Over the years, we’ve expanded our offerings to include
                  certificate programs, International conferences, and online
                  learning platforms, always maintaining our Focus on practical,
                  clinically relevant education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
