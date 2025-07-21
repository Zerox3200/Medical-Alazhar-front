import React, { useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import { useGetSelfLearningQuery } from "../../../../services/intern/api/hooks/selfLearningHooks";
import { useSelector } from "react-redux";
import SelfLearningContent from "./SelfLearningContent";
import { useIntern } from "../../../../services/intern/api/hooks/authHooks";
import EditHeader from "../../components/edit/EditHeader";

const SelfLearning = () => {
  const { role, id } = useSelector((state) => state.auth.user);
  const { activityId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { data: selfLearningData } = useGetSelfLearningQuery({ activityId });

  const { internData } = useIntern({
    userRole: role,
    userId: id,
    internId: id,
  });

  return (
    <div className="p-6 pt-0">
      <div className="bg-white rounded-md shadow-sm p-6 grid grid-cols-2 items-center gap-4">
        {/* Self Learning header */}
        <EditHeader
          editMode={editMode}
          setEditMode={setEditMode}
          objectData={selfLearningData?.data}
        />
        {/* Self Learning content */}
        <SelfLearningContent
          selfLearningData={selfLearningData}
          editMode={editMode}
          setEditMode={setEditMode}
          internData={internData}
        />
      </div>
    </div>
  );
};

export default SelfLearning;
