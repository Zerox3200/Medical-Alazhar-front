import React, { useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import CaseContent from "./CaseContent";
import { useGetCaseQuery } from "../../../../services/intern/api/hooks/casesHooks";
import { useIntern } from "../../../../services/intern/api/hooks/authHooks";
import EditHeader from "../../components/edit/EditHeader";

const Case = () => {
  const { role, id } = useSelector((state) => state.auth.user);
  const { caseId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { data: caseData } = useGetCaseQuery({ caseId });
  const { internData } = useIntern({
    userRole: role,
    userId: id,
    internId: id,
  });

  return (
    <div className="p-6 pt-0">
      <div className="bg-white rounded-md shadow-sm p-6 grid grid-cols-2 items-center gap-4">
        {/* Case header */}
        <EditHeader
          editMode={editMode}
          setEditMode={setEditMode}
          objectData={caseData?.data?.state}
        />
        {/* Case content */}
        <CaseContent
          caseData={caseData}
          editMode={editMode}
          setEditMode={setEditMode}
          internData={internData}
        />
      </div>
    </div>
  );
};

export default Case;
