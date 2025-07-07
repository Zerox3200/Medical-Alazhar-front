import React, { useState } from "react";
import TrainingNavbar from "./TrainingNavbar";
import CaseBox from "./CaseBox";
import ProcedureBox from "./ProcedureBox";
import SelfLearningBox from "./SelfLearningBox";
import DirectLeraningBox from "./DirectLeraningBox";
import CaseDetails from "./CaseDetails";
import ProcedureDetails from "./ProcedureDetails";

const Content = ({ trainingProgress }) => {
  const [activeLink, setActiveLink] = useState(0);

  const [openCaseModal, setOpenCaseModal] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const handleCaseModalOpen = () => setOpenCaseModal(true);
  const handleCaseModalClose = () => setOpenCaseModal(false);

  const [openProcedureModal, setOpenProcedureModal] = useState(true);
  const [selectedProcedureId, setSelectedProcedureId] = useState("");
  const handleProcedureModalOpen = () => setOpenProcedureModal(true);
  const handleProcedureModalClose = () => setOpenProcedureModal(false);

  const renderTrainingDomains = () => {
    switch (activeLink) {
      case 0:
        return trainingProgress?.[0]?.cases?.map((c) => (
          <>
            <CaseBox
              theCase={c}
              selectedCaseId={selectedCaseId}
              setSelectedCaseId={setSelectedCaseId}
              activeLink={activeLink}
              open={openCaseModal}
              handleOpen={handleCaseModalOpen}
              handleClose={handleCaseModalClose}
            />
            {c?._id === selectedCaseId && (
              <CaseDetails
                theCase={c}
                open={openCaseModal}
                handleOpen={handleCaseModalOpen}
                handleClose={handleCaseModalClose}
              />
            )}
          </>
        ));
      case 1:
        return trainingProgress?.[0]?.procedures?.map((p) => (
          <>
            <ProcedureBox
              procedure={p}
              activeLink={activeLink}
              selectedCaseId={selectedCaseId}
              setSelectedProcedureId={setSelectedProcedureId}
              open={openProcedureModal}
              handleOpen={handleProcedureModalOpen}
              handleClose={handleProcedureModalClose}
            />
            {p?._id === selectedProcedureId && (
              <ProcedureDetails
                procedure={p}
                open={openProcedureModal}
                handleOpen={handleProcedureModalOpen}
                handleClose={handleProcedureModalClose}
              />
            )}
          </>
        ));
      case 2:
        return trainingProgress?.[0]?.selfLearning?.map((p) => (
          <SelfLearningBox selfLearning={p} activeLink={activeLink} />
        ));
      case 3:
        return trainingProgress?.[0]?.directLearning?.map((p) => (
          <DirectLeraningBox directLearning={p} activeLink={activeLink} />
        ));
    }
  };

  return (
    <div className="p-6 flex gap-6 items-start">
      <div className="w-1/6 h-full">
        <TrainingNavbar activeLink={activeLink} setActiveLink={setActiveLink} />
      </div>

      {/* Training Content */}
      <div className="grid grid-cols-3 gap-4 w-5/6">
        {renderTrainingDomains()}
      </div>
    </div>
  );
};

export default Content;
