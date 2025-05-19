import React, { useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import {
  useEditCaseMutation,
  useGetInternQuery,
  useGetSingleCaseQuery,
} from "../../../../services/api/internApiSlice";
import CaseHeader from "./CaseHeader";
import CaseContent from "./CaseContent";
import { useSelector } from "react-redux";

const Case = () => {
  const { id } = useSelector((state) => state.auth.user);
  const { caseId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { data: caseData } = useGetSingleCaseQuery({ caseId });
  const { data: internData } = useGetInternQuery({ internId: id });

  const [editCase] = useEditCaseMutation();

  const handleEditCase = async () => {
    try {
      const response = await editCase({ editMode, caseId, ...caseData });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-md shadow-sm p-6 grid grid-cols-2 items-center gap-4">
        {/* Case header */}
        <CaseHeader
          editMode={editMode}
          setEditMode={setEditMode}
          caseData={caseData}
        />
        {/* Case content */}
        <CaseContent
          caseData={caseData}
          editMode={editMode}
          internData={internData}
        />
      </div>
    </div>
  );
};

export default Case;
