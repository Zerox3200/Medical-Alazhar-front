import React, { useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import { useGetDirectLearningQuery } from "../../../../services/intern/api/hooks/directLearningHooks";
import { useSelector } from "react-redux";
import DirectLearningContent from "./DirectLearningContent";
import { useIntern } from "../../../../services/intern/api/hooks/authHooks";
import EditHeader from "../../components/edit/EditHeader";

const DirectLearning = () => {
  const { role, id } = useSelector((state) => state.auth.user);
  const { activityId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { data: directLearningData } = useGetDirectLearningQuery({
    activityId,
  });
  const { internData } = useIntern({
    userRole: role,
    userId: id,
    internId: id,
  });

  return (
    <div className="p-6 pt-0">
      <div className="bg-white rounded-md shadow-sm p-6 grid grid-cols-2 items-center gap-4">
        {/* Direct Learning header */}
        <EditHeader
          editMode={editMode}
          setEditMode={setEditMode}
          objectData={directLearningData?.data?.activityState}
        />
        {/* Direct Learning content */}
        <DirectLearningContent
          directLearningData={directLearningData}
          editMode={editMode}
          setEditMode={setEditMode}
          internData={internData}
        />
      </div>
    </div>
  );
};

export default DirectLearning;
