import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

const accordionData = [
  {
    title: "Chapter one - Introduction to ultrasound",
    chapterContent: [
      {
        title: "Ultrasound physics",
        time: "23:45",
      },
      {
        title: "Device configuration 1",
        time: "30:01",
      },
      {
        title: "Device configuration 2",
        time: "20:15",
      },
      {
        title: "Device configuration 3",
        time: "18:19",
      },
    ],
  },
  {
    title: "Chapter two - Anatomy of lower limb",
    chapterContent: [
      {
        title: "Bones",
        time: "45:16",
      },
      {
        title: "Thigh muscles",
        time: "30:01",
      },
      {
        title: "Calf muscles",
        time: "20:15",
      },
      {
        title: "Foot arch",
        time: "18:19",
      },
    ],
  },

  {
    title: "Chapter three - Venous duplex",
    chapterContent: [
      {
        title: "Great saphenous vein and saphenous opening",
        time: "20:16",
      },
      {
        title: "Perforators and communicators",
        time: "22:01",
      },
      {
        title: "Deep venous thrombosis",
        time: "20:15",
      },
      {
        title: "Varicose veins",
        time: "18:19",
      },
      {
        title: "Venous ulcer",
        time: "18:19",
      },
    ],
  },
];

function CourseAccordion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {accordionData?.map((acc, i) => {
        return (
          <Accordion
            key={i}
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
            className="mb-4 !shadow-sm !border-none !static"
          >
            <AccordionSummary
              expandIcon={<FaChevronDown />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <h1 className="text-primary">{acc.title}</h1>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="pl-6">
                {acc.chapterContent.map((c, y) => {
                  return (
                    <li
                      className="flex justify-between items-center bg-silverFrost/20 rounded-sm p-1 mb-2 text-secondary/80"
                      key={y}
                    >
                      <p>{c.title}</p>
                      <p>{c.time}</p>
                    </li>
                  );
                })}
              </ul>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default CourseAccordion;
